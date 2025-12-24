import { CheckCircle, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Clients Protected" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Security Monitoring" },
  { icon: CheckCircle, value: "99.9%", label: "Uptime Guarantee" },
];

const features = [
  "Industry-leading security experts with decades of combined experience",
  "Customized security solutions tailored to your specific needs",
  "Proactive threat detection and rapid incident response",
  "Compliance support for GDPR, HIPAA, SOC 2, and more",
  "Continuous security monitoring and vulnerability management",
  "Regular security training and awareness programs",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Why Choose <span className="text-gradient">ApniSec</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              We combine cutting-edge technology with deep security expertise to deliver 
              comprehensive protection for your digital assets. Our team of certified 
              professionals works tirelessly to stay ahead of emerging threats.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl glass-card text-center hover:border-primary/50 transition-colors"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold font-display text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
