"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Thank You for Subscribing!
              </h3>
              <p className="text-muted-foreground">
                You&apos;re now part of our exclusive community. Check your
                email for a special welcome offer!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Stay in the Loop
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-background border-0 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="h-12 px-8 bg-background text-primary hover:bg-background/90"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-sm text-primary-foreground/60">
            <p>Join 50,000+ subscribers. No spam, unsubscribe anytime.</p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  %
                </span>
              </div>
              <h4 className="font-semibold text-primary-foreground mb-1">
                Exclusive Deals
              </h4>
              <p className="text-sm text-primary-foreground/70">
                Get access to subscriber-only discounts and promotions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  📦
                </span>
              </div>
              <h4 className="font-semibold text-primary-foreground mb-1">
                New Arrivals
              </h4>
              <p className="text-sm text-primary-foreground/70">
                Be the first to know about new product launches
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  🎁
                </span>
              </div>
              <h4 className="font-semibold text-primary-foreground mb-1">
                Birthday Gift
              </h4>
              <p className="text-sm text-primary-foreground/70">
                Receive a special gift on your birthday
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
