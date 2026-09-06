import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import AboutSnippet from "@/components/sections/AboutSnippet";
import Services from "@/components/sections/Services";
import CommercialProjects from "@/components/sections/CommercialProjects";
import Calculator from "@/components/sections/Calculator";
import Projects from "@/components/sections/Projects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Subsidy from "@/components/sections/Subsidy";
import Testimonials from "@/components/sections/Testimonials";
import BlogTeaser from "@/components/sections/BlogTeaser";
import CTASection from "@/components/sections/CTASection";
import Contact from "@/components/sections/Contact";
import LoadCalculator from "@/components/sections/Calculator/LoadCalculator";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutSnippet />
      <Services />
      <CommercialProjects />
      {/* <Calculator /> */}
      <LoadCalculator/>
      <Projects />
      <WhyChooseUs />
      <Process />
      <Subsidy />
      <Testimonials />
      <BlogTeaser />
      <CTASection />
      <Contact />
    </>
  );
}
