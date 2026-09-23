import { supabase } from '@/integrations/supabase/client';

const BUCKET = 'site-media';
const TEN_YEARS_SECONDS = 60 * 60 * 24 * 365 * 10;
const MAX_EDGE = 2000; // px — plenty for full-bleed hero photography
const QUALITY = 0.82;

/** Shrink a large camera photo in the browser before it ever leaves the device. */
async function compressImage(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', QUALITY)
  );
  if (!blob) return file;
  // Keep whichever is smaller
  return blob.size < file.size ? blob : file;
}

function randomName(ext = 'jpg') {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

/** Upload an image to Cloud Storage and return a long-lived link for the database. */
export async function uploadSiteImage(file: File, folder = 'uploads'): Promise<string> {
  const blob = await compressImage(file);
  const isJpeg = blob.type === 'image/jpeg' || blob instanceof Blob === false;
  const ext = isJpeg ? 'jpg' : (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${folder}/${randomName(ext)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type || file.type || 'image/jpeg',
    upsert: false,
    cacheControl: '31536000',
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, TEN_YEARS_SECONDS);
  if (signError || !data?.signedUrl) throw signError || new Error('Could not create image link');

  return data.signedUrl;
}

/** Upload a base64 data URL that is already stored in content, returning the new link. */
export async function uploadDataUrl(dataUrl: string, folder = 'migrated'): Promise<string> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const file = new File([blob], 'photo.jpg', { type: blob.type || 'image/jpeg' });
  return uploadSiteImage(file, folder);
}

export const isDataUrl = (v: unknown): v is string =>
  typeof v === 'string' && v.startsWith('data:');

/** Walk any content object and replace embedded base64 images with uploaded links. */
export async function migrateDataUrls<T>(
  value: T,
  onProgress?: (done: number) => void,
  counter = { done: 0 }
): Promise<T> {
  if (isDataUrl(value)) {
    const url = await uploadDataUrl(value);
    counter.done += 1;
    onProgress?.(counter.done);
    return url as unknown as T;
  }
  if (Array.isArray(value)) {
    const out: any[] = [];
    for (const item of value) out.push(await migrateDataUrls(item, onProgress, counter));
    return out as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(value as any)) {
      out[k] = await migrateDataUrls(v, onProgress, counter);
    }
    return out;
  }
  return value;
}
