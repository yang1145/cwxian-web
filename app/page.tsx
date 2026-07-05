import { Hero } from "@/components/sections/Hero";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { Stats } from "@/components/sections/Stats";
import { ShowcasePreview } from "@/components/sections/ShowcasePreview";
import { GettingStartedSteps } from "@/components/sections/GettingStartedSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { BottomCTA } from "@/components/sections/BottomCTA";
import {
  getStats,
  getServices,
  getShowcases,
  getTestimonials,
  getPartners,
  getFAQ,
} from "@/lib/data";

export default async function Home() {
  const [stats, services, showcases, testimonials, partners, faq] = await Promise.all([
    getStats(),
    getServices(),
    getShowcases(),
    getTestimonials(),
    getPartners(),
    getFAQ(),
  ]);

  return (
    <>
      <Hero />
      <Stats stats={stats} />
      <ServiceOverview services={services} />
      <GettingStartedSteps />
      <ShowcasePreview showcases={showcases} />
      <Testimonials testimonials={testimonials} />
      <Partners partners={partners} />
      <FAQPreview faq={faq} />
      <BottomCTA />
    </>
  );
}
