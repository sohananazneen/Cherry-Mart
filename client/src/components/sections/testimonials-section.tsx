"use client";

import React, { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Absolutely love shopping at Cherry Mart ! The quality of products is exceptional and the customer service is outstanding. I've been a loyal customer for over a year now.",
    product: "Premium Headphones",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Fast delivery and great packaging. The products were exactly as described and the prices are very competitive. Will definitely order again!",
    product: "Smart Watch",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "ER",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Cherry Mart  has become my go-to online store. The variety of products is amazing and the return process is hassle-free. Highly recommend!",
    product: "Yoga Mat Set",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "DK",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Excellent shopping experience from start to finish. The website is easy to navigate and the checkout process is smooth. Products arrived in perfect condition.",
    product: "Laptop Stand",
  },
  {
    id: 5,
    name: "Jessica Brown",
    avatar: "JB",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "I'm impressed with the quality and fast shipping. The customer support team helped me choose the right product. Best online shopping experience!",
    product: "Kitchen Appliance",
  },
  {
    id: 6,
    name: "Robert Taylor",
    avatar: "RT",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Great prices and amazing quality. I've recommended Cherry Mart  to all my friends and family. Keep up the excellent work!",
    product: "Fitness Tracker",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            customers
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                            {testimonial.avatar}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {testimonial.name}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                            <p className="text-muted-foreground leading-relaxed pl-6">
                              {testimonial.comment}
                            </p>
                          </div>
                          <div className="mt-4">
                            <span className="text-sm font-medium text-primary">
                              Product: {testimonial.product}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <div className="text-2xl font-bold text-foreground">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Product Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
