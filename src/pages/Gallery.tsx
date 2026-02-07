import { Layout } from '@/components/layout/Layout';
import { MediaGallery } from '@/components/media/MediaGallery';

const Gallery = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero-dynamic text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px] animate-float" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-premium relative">
          <span className="text-label animate-fade-up">Media</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            Gallery
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2">
            Capturing the energy, passion, and journey of AMTAY FC.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <MediaGallery items={[]} />
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
