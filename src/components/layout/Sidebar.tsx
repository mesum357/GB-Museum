import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X, Home, Users, MapPin, History, BookOpen, FileText, Glasses, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/img/logo.png";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);

  const mainItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "GB Heroes", url: "/heroes", icon: Users },
    { title: "District Gilgit", url: "/district-gilgit", icon: MapPin },
    { title: "Library", url: "/library", icon: BookOpen },
    { title: "Gallery", url: "/gallery", icon: Images },
    { title: "Blogs", url: "/blogs", icon: FileText },
    { title: "Virtual Experience", url: "/virtual-experience", icon: Glasses },
  ];

  const historyItems = [
    { title: "Polo Heritage", url: "/history/polo" },
    { title: "Silk Route", url: "/history/silk-route" },
    { title: "Modern Era", url: "/history/modern" },
    { title: "Liberation War", url: "/history/liberation-war" },
    { title: "Prehistoric", url: "/history/prehistoric" },
  ];

  const cultureItems = [
    { title: "District Gilgit", url: "/culture/district-gilgit" },
    { title: "District Astore", url: "/district-astore" },
    { title: "District Nagar", url: "/culture/district-nagar" },
    { title: "District Ghizer", url: "/culture/district-ghizer" },
    { title: "District Diamer", url: "/district-diamer" },
    { title: "District Shigar", url: "/district-shigar" },
    { title: "District Hunza", url: "/culture/district-hunza" },
    { title: "District Skardu", url: "/culture/district-skardu" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      className="fixed left-0 top-0 h-screen border-r border-border bg-sidebar z-50 flex flex-col"
    >
      {/* Header */}
      <div className={cn(
        "border-b border-sidebar-border flex items-center",
        collapsed ? "p-2 flex-col gap-2" : "p-4 justify-between"
      )}>
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="GB Museum Logo" 
              className="h-10 w-auto object-contain"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <img 
              src={logo} 
              alt="GB Museum Logo" 
              className="h-8 w-auto object-contain"
            />
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2" aria-label="Main navigation">
        <ul className="space-y-1">
          {mainItems.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground font-medium",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}

          {/* History Dropdown */}
          <li>
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              aria-expanded={historyOpen}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <History className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">History</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      historyOpen && "rotate-180"
                    )}
                  />
                </>
              )}
            </button>

            {!collapsed && (
              <AnimatePresence>
                {historyOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-8 mt-1 space-y-1 overflow-hidden"
                  >
                    {historyItems.map((item) => (
                      <li key={item.url}>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            )
                          }
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </li>

          {/* Culture & Tradition Dropdown */}
          <li>
            <button
              onClick={() => setCultureOpen(!cultureOpen)}
              aria-expanded={cultureOpen}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <MapPin className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Culture & Tradition</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      cultureOpen && "rotate-180"
                    )}
                  />
                </>
              )}
            </button>

            {!collapsed && (
              <AnimatePresence>
                {cultureOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-8 mt-1 space-y-1 overflow-hidden"
                  >
                    {cultureItems.map((item) => (
                      <li key={item.url}>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            )
                          }
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
