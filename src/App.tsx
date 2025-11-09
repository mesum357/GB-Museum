import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import DistrictGilgit from "./pages/DistrictGilgit";
import DistrictGilgitCulture from "./pages/culture/DistrictGilgitCulture";
import DistrictAstore from "./pages/DistrictAstore";
import DistrictNagar from "./pages/DistrictNagar";
import DistrictNagarCulture from "./pages/culture/DistrictNagarCulture";
import DistrictGhizer from "./pages/DistrictGhizer";
import DistrictGhizerCulture from "./pages/culture/DistrictGhizerCulture";
import DistrictDiamer from "./pages/DistrictDiamer";
import DistrictShigar from "./pages/DistrictShigar";
import DistrictHunza from "./pages/DistrictHunza";
import DistrictHunzaCulture from "./pages/culture/DistrictHunzaCulture";
import DistrictSkardu from "./pages/DistrictSkardu";
import DistrictSkarduCulture from "./pages/culture/DistrictSkarduCulture";
import SilkRoute from "./pages/SilkRoute";
import Library from "./pages/Library";
import Blogs from "./pages/Blogs";
import VirtualExperience from "./pages/VirtualExperience";
import Gallery from "./pages/Gallery";
import Polo from "./pages/history/Polo";
import SilkRouteHistory from "./pages/history/SilkRouteHistory";
import Modern from "./pages/history/Modern";
import LiberationWar from "./pages/history/LiberationWar";
import Prehistoric from "./pages/history/Prehistoric";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { hideSidebar } = useSidebar();

  return (
    <div className="min-h-screen flex w-full">
      {!hideSidebar && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}
      <main
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: hideSidebar ? "0" : sidebarCollapsed ? "64px" : "256px",
        }}
      >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/heroes" element={<Heroes />} />
                <Route path="/district-gilgit" element={<DistrictGilgit />} />
                <Route path="/culture/district-gilgit" element={<DistrictGilgitCulture />} />
                <Route path="/district-astore" element={<DistrictAstore />} />
                <Route path="/district-nagar" element={<DistrictNagar />} />
                <Route path="/culture/district-nagar" element={<DistrictNagarCulture />} />
                <Route path="/district-ghizer" element={<DistrictGhizer />} />
                <Route path="/culture/district-ghizer" element={<DistrictGhizerCulture />} />
                <Route path="/district-diamer" element={<DistrictDiamer />} />
                <Route path="/district-shigar" element={<DistrictShigar />} />
                <Route path="/district-hunza" element={<DistrictHunza />} />
                <Route path="/culture/district-hunza" element={<DistrictHunzaCulture />} />
                <Route path="/district-skardu" element={<DistrictSkardu />} />
                <Route path="/culture/district-skardu" element={<DistrictSkarduCulture />} />
                <Route path="/silk-route" element={<SilkRoute />} />
                <Route path="/library" element={<Library />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/virtual-experience" element={<VirtualExperience />} />
                <Route path="/gallery" element={<Gallery />} />
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
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppContent />
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
