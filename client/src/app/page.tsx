import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FeaturedProductsSection />
        <CategoriesSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <HowItWorksSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
