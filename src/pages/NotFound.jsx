import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { RevealGroup } from "@/components/Reveal";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist or has moved." noindex />
      <section className="relative pt-44 pb-28 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/20 blur-[120px]" />
        <RevealGroup className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">404</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            This page <span className="gradient-text">doesn't exist.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            The link may be old or mistyped. Head back to the homepage to find what you need.
          </p>
          <Link to="/" className="inline-block mt-8">
            <Button className="group hover:-translate-y-0.5 hover:shadow-xl rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white px-7 py-6 text-base font-semibold">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to homepage
            </Button>
          </Link>
        </RevealGroup>
      </section>
    </>
  );
}
