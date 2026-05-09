import React from "react";
import {
  Shield,
  Truck,
  Headphones,
  RefreshCw,
  Award,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Secure Payment",
    description:
      "Your payment information is safe and encrypted with industry-standard security measures.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your orders delivered within 2-3 business days with our express shipping service.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our customer support team is always here to help you with any questions or concerns.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description:
      "Not satisfied? Return your items within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "All our products are carefully selected and tested to ensure the highest quality standards.",
  },
  {
    icon: Clock,
    title: "Order Tracking",
    description:
      "Track your orders in real-time from checkout to delivery with our advanced tracking system.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Cherry Mart ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to providing you with the best shopping
            experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
