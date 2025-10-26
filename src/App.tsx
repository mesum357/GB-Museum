import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import DistrictGilgit from "./pages/DistrictGilgit";
import SilkRoute from "./pages/SilkRoute";
import Library from "./pages/Library";
import Blogs from "./pages/Blogs";
import VirtualExperience from "./pages/VirtualExperience";
import Polo from "./pages/history/Polo";
import SilkRouteHistory from "./pages/history/SilkRouteHistory";
import Modern from "./pages/history/Modern";
import LiberationWar from "./pages/history/LiberationWar";
import Prehistoric from "./pages/history/Prehistoric";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex w-full">
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <main
              className="flex-1 transition-all duration-300"
              style={{
                marginLeft: sidebarCollapsed ? "64px" : "256px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/heroes" element={<Heroes />} />
                <Route path="/district-gilgit" element={<DistrictGilgit />} />
                <Route path="/silk-route" element={<SilkRoute />} />
                <Route path="/library" element={<Library />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/virtual-experience" element={<VirtualExperience />} />
                <Route path="/history/polo" element={<Polo />} />
                <Route path="/history/silk-route" element={<SilkRouteHistory />} />
                <Route path="/history/modern" element={<Modern />} />
                <Route path="/history/liberation-war" element={<LiberationWar />} />
                <Route path="/history/prehistoric" element={<Prehistoric />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
