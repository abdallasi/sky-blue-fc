import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { SpotlightCarousel } from '@/components/home/SpotlightCarousel';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { MatchShotsCarousel } from '@/components/home/MatchShotsCarousel';
import { FixturesRail } from '@/components/home/FixturesRail';
import { StatsSlider } from '@/components/home/StatsSlider';
import { ClubSnapshot } from '@/components/home/ClubSnapshot';
import { FeaturedPlayer } from '@/components/home/FeaturedPlayer';
import { JoinUs } from '@/components/home/JoinUs';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SpotlightCarousel />
      <NewsCarousel />
      <MatchShotsCarousel />
      <FixturesRail />
      <ClubSnapshot />
      <FeaturedPlayer />
      <StatsSlider />
      <JoinUs />
      <CTASection />
    </Layout>
  );
};

export default Index;
