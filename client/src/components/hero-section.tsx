"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    products: 0,
    customers: 0,
    countries: 0,
  });

  const slides = [
    {
      title: "Premium Quality Products",
      subtitle: "Discover amazing items at unbeatable prices",
      description:
        "Shop from our curated collection of premium products with fast delivery and exceptional customer service.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      badge: "New Collection",
    },
    {
      title: "Flash Sale - 50% Off",
      subtitle: "Limited time offer on selected items",
      description:
        "Don&apos;t miss out on our biggest sale of the season. Premium products at half the price!",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop",
      badge: "Hot Deal",
    },
    {
      title: "Free Worldwide Shipping",
      subtitle: "On orders over $50",
      description:
        "Get your favorite products delivered to your doorstep without any shipping charges.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      badge: "Free Shipping",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      key: keyof typeof animatedStats,
    ) => {
      let startTimestamp = 0;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setAnimatedStats((prev) => ({
          ...prev,
          [key]: Math.floor(progress * (end - start) + start),
        }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 10000, 2000, "products");
    animateValue(0, 50000, 2000, "customers");
    animateValue(0, 120, 2000, "countries");
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5" />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh] lg:min-h-[70vh]">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                {slides[currentSlide].badge}
              </Badge>

              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                {slides[currentSlide].title}
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
                {slides[currentSlide].subtitle}
              </p>

              <p className="text-base lg:text-lg text-muted-foreground max-w-lg">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/explore">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9/5 (2,847 reviews)
                </span>
              </div>

              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                  +5k
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden bg-muted">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full relative flex items-center justify-center"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border flex items-center justify-center hover:bg-background transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 lg:mt-24 pt-8 border-t">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              {animatedStats.products.toLocaleString()}+
            </div>
            <div className="text-sm lg:text-base text-muted-foreground">
              Premium Products
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              {animatedStats.customers.toLocaleString()}+
            </div>
            <div className="text-sm lg:text-base text-muted-foreground">
              Happy Customers
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              {animatedStats.countries}+
            </div>
            <div className="text-sm lg:text-base text-muted-foreground">
              Countries Served
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
