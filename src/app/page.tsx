import { Hero } from '@/components/home/Hero';
import { Benefits } from '@/components/home/Benefits';
import { BestSellers } from '@/components/home/BestSellers';
import { Packs } from '@/components/home/Packs';
import { BrandStory } from '@/components/home/BrandStory';

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <BestSellers />
      <Packs />
      <BrandStory />
    </>
  );
}
