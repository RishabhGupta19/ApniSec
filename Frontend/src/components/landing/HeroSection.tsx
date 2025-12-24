import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Server, Eye } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Enterprise-Grade Security Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 animate-slide-up">
            Protect Your Digital Assets with{" "}
            <span className="text-gradient">Advanced Cybersecurity</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            From cloud security to penetration testing, we provide comprehensive 
            security solutions to safeguard your business against modern threats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild className="gradient-primary glow-primary text-base px-8">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8">
              <a href="#services">Learn More</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg glass-card">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg glass-card">
              <Server className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">24/7 Monitoring</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg glass-card">
              <Eye className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Threat Detection</span>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}
