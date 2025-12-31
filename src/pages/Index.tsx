import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSlider } from '@/components/home/StatsSlider';
import { ClubSnapshot } from '@/components/home/ClubSnapshot';
import { VisionMission } from '@/components/home/VisionMission';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSlider />
      <ClubSnapshot />
      <VisionMission />
      <CTASection />
    </Layout>
  );
};

export default Index;
