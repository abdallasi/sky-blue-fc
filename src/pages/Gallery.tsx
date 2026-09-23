import { Layout } from '@/components/layout/Layout';
import { MediaGallery } from '@/components/media/MediaGallery';
import { useContent } from '@/context/ContentContext';
import { PageHero } from '@/components/layout/PageHero';
import galleryFallback from '@/assets/placeholder-club-moment.jpg';


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
        title="The club, photographed"
        subtitle="Training mornings, matchday noise and the faces behind both."
        image={content.images?.galleryHero || galleryFallback}
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
