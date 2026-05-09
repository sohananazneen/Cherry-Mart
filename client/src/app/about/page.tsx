import React from "react";
import Link from "next/link";
import {
  Heart,
  Award,
  Users,
  Globe,
  Shield,
  Truck,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    avatar: "SJ",
    description:
      "Visionary leader with 15+ years in e-commerce and retail innovation.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    avatar: "MC",
    description:
      "Tech expert focused on creating seamless shopping experiences.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    avatar: "ER",
    description: "Ensuring smooth operations and exceptional customer service.",
  },
  {
    name: "David Kim",
    role: "Head of Marketing",
    avatar: "DK",
    description:
      "Creative strategist driving brand growth and customer engagement.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We prioritize our customers' needs and work tirelessly to exceed their expectations.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Every product is carefully selected and tested to ensure the highest quality standards.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously innovate to bring you the latest products and shopping technologies.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description:
      "Committed to environmentally friendly practices and sustainable business operations.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a community of satisfied customers and trusted partners worldwide.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Striving for excellence in everything we do, from product selection to customer service.",
  },
];

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "10,000+", label: "Products Available" },
  { number: "120+", label: "Countries Served" },
  { number: "4.9/5", label: "Average Rating" },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "Cherry Mart  was founded with a mission to provide quality products at affordable prices.",
  },
  {
    year: "2020",
    title: "First Milestone",
    description:
      "Reached 10,000 customers and expanded product categories to include electronics and home goods.",
  },
  {
    year: "2021",
    title: "International Expansion",
    description:
      "Started shipping internationally and opened warehouses in Europe and Asia.",
  },
  {
    year: "2022",
    title: "Technology Innovation",
    description:
      "Launched mobile app and implemented AI-powered recommendation system.",
  },
  {
    year: "2023",
    title: "Sustainability Initiative",
    description:
      "Committed to carbon-neutral operations and launched eco-friendly product lines.",
  },
  {
    year: "2024",
    title: "Market Leader",
    description:
      "Became one of the fastest-growing e-commerce platforms with 50,000+ customers.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                About Cherry Mart
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Your Premium Shopping
                <br />
                <span className="text-primary">Destination</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded in 2019, Cherry Mart has grown from a small startup to a
                trusted e-commerce platform serving thousands of customers
                worldwide. We&apos;re passionate about bringing you the best
                products at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/explore">
                    Shop Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Our Mission
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Making Quality Shopping
                  <br />
                  Accessible to Everyone
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  At Cherry Mart , we believe that everyone deserves access to
                  high-quality products without breaking the bank. Our mission
                  is to curate the best selection of products from trusted
                  brands and make them available at competitive prices.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We work directly with manufacturers and suppliers to cut out
                  middlemen, passing the savings directly to you. Our team
                  carefully vets every product to ensure it meets our strict
                  quality standards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Best Prices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Fast Delivery</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Target className="w-24 h-24 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From a small startup to a trusted e-commerce platform
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />

                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8 order-2"}`}
                      >
                        <div className="bg-card border rounded-xl p-6 shadow-sm">
                          <Badge variant="secondary" className="mb-2">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />

                      <div className="w-5/12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Cherry Mart
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.avatar}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Experience the Cherry Mart Difference?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                Join thousands of satisfied customers who have discovered
                quality products, great prices, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/explore">
                    Start Shopping
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
