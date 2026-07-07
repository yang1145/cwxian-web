import { Hero } from "@/components/sections/Hero";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { Stats } from "@/components/sections/Stats";
import { ShowcasePreview } from "@/components/sections/ShowcasePreview";
import { GettingStartedSteps } from "@/components/sections/GettingStartedSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
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
      <ScrollReveal as="section">
        <Stats stats={stats} />
      </ScrollReveal>
      <ScrollReveal as="section">
        <ServiceOverview services={services} />
      </ScrollReveal>
      <ScrollReveal as="section" stagger={0.15}>
        <GettingStartedSteps />
      </ScrollReveal>
      <ScrollReveal as="section" stagger={0.1}>
        <ShowcasePreview showcases={showcases} />
      </ScrollReveal>
      <ScrollReveal as="section" stagger={0.1}>
        <Testimonials testimonials={testimonials} />
      </ScrollReveal>
      <ScrollReveal as="section" delay={0.1}>
        <Partners partners={partners} />
      </ScrollReveal>
      <ScrollReveal as="section" stagger={0.1}>
        <FAQPreview faq={faq} />
      </ScrollReveal>
      <ScrollReveal as="section" direction="none">
        <BottomCTA />
      </ScrollReveal>
    </>
  );
}
