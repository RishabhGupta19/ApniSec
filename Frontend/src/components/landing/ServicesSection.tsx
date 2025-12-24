import { Cloud, Target, Search, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Cloud,
    title: "Cloud Security",
    description:
      "Secure your cloud infrastructure with comprehensive security assessments, configuration reviews, and continuous monitoring.",
    features: ["AWS/Azure/GCP Security", "IAM Reviews", "Compliance Audits"],
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Target,
    title: "Red Team Assessment",
    description:
      "Simulate real-world attacks to identify vulnerabilities in your defenses before malicious actors can exploit them.",
    features: ["Social Engineering", "Physical Security", "APT Simulation"],
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Search,
    title: "VAPT",
    description:
      "Vulnerability Assessment and Penetration Testing to identify, classify, and remediate security weaknesses.",
    features: ["Network Testing", "Web App Security", "Mobile Security"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Security Consulting",
    description:
      "Expert guidance on security strategy, policies, and best practices tailored to your organization's needs.",
    features: ["Risk Assessment", "Security Training", "Incident Response"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Our <span className="text-gradient">Security Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions designed to protect your organization 
            from evolving threats and ensure regulatory compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 lg:p-8 rounded-2xl glass-card hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${service.bgColor} mb-6`}>
                <service.icon className={`h-6 w-6 ${service.color}`} />
              </div>

              <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${service.bgColor.replace("/10", "")}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="group/btn p-0 h-auto font-medium">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" asChild className="gradient-primary glow-primary">
            <Link to="/register">
              Start Your Security Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
