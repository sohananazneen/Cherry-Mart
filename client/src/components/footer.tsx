import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Play,
} from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/explore" },
      { label: "New Arrivals", href: "/new" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Sale Items", href: "/sale" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Service", href: "/help" },
      { label: "Track Order", href: "/track" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];

const socialLinks = [
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Play, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">
                    LC
                  </span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Cherry Mart
                </span>
              </div>

              <p className="text-muted-foreground mb-6 max-w-md">
                Your premium shopping destination for quality products,
                exceptional service, and unbeatable prices.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-primary" />
                  support@littlecherrymart.com
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  1-800-CHERRY-MART
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary" />
                  123 Commerce St, Shopping City, SC 12345
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-2">
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive offers and new product
              updates
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cherry Mart . All rights reserved.
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 mx-1 text-primary" /> by the
              Little Cherry Team
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
