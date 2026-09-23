import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { SpotlightCarousel } from '@/components/home/SpotlightCarousel';
import { MatchShotsCarousel } from '@/components/home/MatchShotsCarousel';
import { FixturesRail } from '@/components/home/FixturesRail';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { StatsSlider } from '@/components/home/StatsSlider';
import { ClubSnapshot } from '@/components/home/ClubSnapshot';
import { FeaturedPlayer } from '@/components/home/FeaturedPlayer';
import { VisionMission } from '@/components/home/VisionMission';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SpotlightCarousel />
      <MatchShotsCarousel />
      <FixturesRail />
      <ClubSnapshot />
      <FeaturedPlayer />
      <NewsCarousel />
      <StatsSlider />
      <VisionMission />
      <CTASection />
    </Layout>
  );
};

export default Index;
