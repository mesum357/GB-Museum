import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.png";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground border-t border-border mt-auto w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="GB Museum" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Preserving and showcasing the rich history, culture, and heritage of Gilgit-Baltistan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-sidebar-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm z-10 relative">
              <li><Link to="/" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Home</Link></li>
              <li><Link to="/heroes" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">GB Heroes</Link></li>
              <li><Link to="/library" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Library</Link></li>
              <li><Link to="/gallery" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Gallery</Link></li>
              <li><Link to="/blogs" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Blogs</Link></li>
            </ul>
          </div>

          {/* History & Culture */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-sidebar-foreground">Explore</h3>
            <ul className="space-y-2 text-sm z-10 relative">
              <li><Link to="/history/modern" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Modern History</Link></li>
              <li><Link to="/history/liberation-war" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Liberation War</Link></li>
              <li><Link to="/history/silk-route" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Silk Route</Link></li>
              <li><Link to="/culture/district-gilgit" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Gilgit Culture</Link></li>
              <li><Link to="/culture/district-skardu" className="text-sidebar-foreground/70 hover:text-primary hover:underline transition-colors">Skardu Culture</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-sidebar-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Gilgit Baltistan, Pakistan</span>
              </li>
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contact@gbmuseum.com" className="hover:text-primary hover:underline transition-colors z-10 relative">contact@gbmuseum.com</a>
              </li>
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+92 123 4567890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sidebar-foreground/60">
          <p>&copy; {new Date().getFullYear()} GB Museum. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a 
              href="https://mesumabbas.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors z-10 relative"
            >
              Mesum Abbas
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
