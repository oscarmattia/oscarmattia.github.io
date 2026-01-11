import { Github, Linkedin, MessageSquare, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/oscarmattia", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/oscar-mattia-7170b834/", label: "LinkedIn" },
  { icon: MessageSquare, href: "https://www.threads.com/@oscarmattia", label: "Threads" },
  { icon: Mail, href: "mailto:oscar.mattia@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} Oscar Mattia. All rights reserved.
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Built with React & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
