import React from "react";
import { Search, ShoppingCart, Package, Truck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Browse Products",
    description:
      "Explore our wide range of products across various categories. Use filters to find exactly what you need.",
  },
  {
    step: 2,
    icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Select your favorite items and add them to your cart. Review your selections before checkout.",
  },
  {
    step: 3,
    icon: Package,
    title: "Secure Checkout",
    description:
      "Complete your purchase using our secure payment system. Multiple payment options available.",
  },
  {
    step: 4,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Track your order in real-time and receive your items within 2-3 business days.",
  },
  {
    step: 5,
    icon: Star,
    title: "Enjoy & Review",
    description:
      "Enjoy your products and share your experience to help other customers make informed decisions.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shopping at Cherry Mart is simple, secure, and satisfying
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                  {step.step}
                </div>

                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center relative">
                      <step.icon className="w-8 h-8 text-primary" />

                      {/* Connector dots for mobile */}
                      <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-border" />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Shopping?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the
            convenience and quality of Cherry Mart .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Start Shopping
            </button>
            <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
