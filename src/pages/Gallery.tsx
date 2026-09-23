import { Layout } from '@/components/layout/Layout';
import { MediaGallery } from '@/components/media/MediaGallery';
import { useContent } from '@/context/ContentContext';
import { PageHero } from '@/components/layout/PageHero';

const Gallery = () => {
  const { content } = useContent();
  const galleryItems = (content.images.galleryImages || []).map(item => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    category: item.category,
    caption: item.caption,
  }));

  return (
    <Layout>
      <PageHero
        eyebrow="Media"
        title="Gallery"
        subtitle="The energy, the passion and the journey of AMTAY FC."
      />

      <section className="section-padding">
        <div className="container-premium">
          <MediaGallery items={galleryItems.length > 0 ? galleryItems : []} />
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
