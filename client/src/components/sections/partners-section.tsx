import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const partners = [
  { name: "TechCorp", logo: "TC", description: "Technology Solutions" },
  { name: "GlobalShip", logo: "GS", description: "Shipping Partner" },
  { name: "SecurePay", logo: "SP", description: "Payment Gateway" },
  { name: "EcoGreen", logo: "EG", description: "Sustainable Products" },
  { name: "DataFlow", logo: "DF", description: "Analytics Partner" },
  { name: "CloudNet", logo: "CN", description: "Cloud Services" },
];

export function PartnersSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with the best companies to bring you exceptional products
            and services
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {partner.logo}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Join over 100+ companies that trust Cherry Mart
          </p>
        </div>
      </div>
    </section>
  );
}
