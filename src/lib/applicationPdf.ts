import { jsPDF } from 'jspdf';

type Row = [string, string | null | undefined];

export interface ApplicationForPdf {
  id: string;
  full_name: string;
  status: string;
  created_at: string;
  admin_notes?: string | null;
  message?: string | null;
  video_url?: string | null;
  [key: string]: unknown;
}

export const applicationFileName = (name: string) =>
  `${(name || 'Applicant').trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_') || 'Applicant'}_Application.pdf`;

export function downloadApplicationPdf(app: ApplicationForPdf) {
  const v = (k: string) => (app[k] as string | null | undefined) ?? null;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = 0;

  // Header band
  doc.setFillColor(0, 31, 90);
  doc.rect(0, 0, W, 110, 'F');
  doc.setTextColor(0, 255, 212);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('AMTAY FOOTBALL CLUB  ·  ACADEMY & TRIALS', M, 40);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(doc.splitTextToSize(app.full_name || 'Applicant', W - M * 2 - 110)[0], M, 72);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Submitted ${new Date(app.created_at).toLocaleString()}  ·  Ref ${app.id.slice(0, 8).toUpperCase()}`, M, 92);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  const status = app.status.toUpperCase();
  const sw = doc.getTextWidth(status) + 20;
  doc.setFillColor(0, 88, 255);
  doc.roundedRect(W - M - sw, 56, sw, 22, 11, 11, 'F');
  doc.text(status, W - M - sw + 10, 70);
  y = 140;

  const ensure = (h: number) => {
    if (y + h > H - 50) {
      doc.addPage();
      y = 50;
    }
  };

  const section = (title: string, rows: Row[]) => {
    const filled = rows.filter(([, val]) => val && String(val).trim());
    if (!filled.length) return;
    ensure(50);
    doc.setTextColor(0, 54, 163);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title.toUpperCase(), M, y);
    doc.setDrawColor(225, 229, 238);
    doc.line(M, y + 6, W - M, y + 6);
    y += 24;
    const colW = (W - M * 2 - 20) / 2;
    for (let i = 0; i < filled.length; i += 2) {
      const pair = filled.slice(i, i + 2);
      const heights = pair.map(([, val]) => doc.splitTextToSize(String(val), colW).length * 13);
      const h = Math.max(...heights) + 16;
      ensure(h);
      pair.forEach(([label, val], j) => {
        const x = M + j * (colW + 20);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(120, 128, 145);
        doc.text(label, x, y);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(10, 20, 45);
        doc.text(doc.splitTextToSize(String(val), colW), x, y + 14);
      });
      y += h + 6;
    }
    y += 10;
  };

  section('Identity', [
    ['Full name', app.full_name],
    ['Date of birth', v('date_of_birth')],
    ['Nationality', v('nationality')],
    ['State of origin', v('state_of_origin')],
    ['LGA', v('lga')],
    ['NIN / ID number', v('nin')],
  ]);
  section('Contact & residence', [
    ['Phone', v('phone')],
    ['Email', v('email')],
    ['Address', v('address')],
    ['City', v('city')],
    ['Location', v('location')],
  ]);
  section('Football profile', [
    ['Preferred position', v('position')],
    ['Preferred foot', v('preferred_foot')],
    ['Preferred jersey number', v('jersey_number')],
    ['Current club', v('current_club')],
    ['Previous club contact', v('previous_club_contact')],
    ['Highest level played', v('highest_level')],
    ['Current FA status', v('fa_status')],
    ['Player licence', v('player_license')],
    ['Highlight reel', app.video_url],
  ]);
  section('Next of kin', [
    ['Name', v('nok_name')],
    ['Phone', v('nok_phone')],
    ['Relationship', v('nok_relationship')],
  ]);
  section('Medical', [
    ['Medical conditions', v('medical_conditions')],
    ['Current medication', v('current_medications')],
  ]);
  section('Notes', [
    ['Applicant message', app.message],
    ['Management notes', app.admin_notes],
  ]);

  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 156, 170);
    doc.text('Confidential · AMTAY FC player application', M, H - 24);
    doc.text(`${p} / ${pages}`, W - M, H - 24, { align: 'right' });
  }

  doc.save(applicationFileName(app.full_name));
}
