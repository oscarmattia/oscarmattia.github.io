import { useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import ThemeToggle from "@/components/ThemeToggle";
import { handleSectionNavClick, navigateToSection } from "@/lib/sectionScroll";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Code", href: "#code" },
  { label: "Gallery", href: "#gallery" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    if (!navigateToSection("#home")) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-narrow">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 font-semibold text-lg tracking-tight"
          >
            <LogoMark />
            OM<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSectionNavClick(event, item.href)}
                className="text-sm text-text-secondary hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  handleSectionNavClick(event, item.href);
                  setIsOpen(false);
                }}
                className="block py-2 text-sm text-text-secondary hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
