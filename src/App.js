import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { MotionConfig, motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ChatWidget from "@/components/ChatWidget";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetail from "@/pages/ServiceDetail";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetail from "@/pages/ProjectDetail";
import CalculatorPage from "@/pages/CalculatorPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import { DEFAULT_TRANSITION, pageTransition } from "@/lib/animations";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

// Each route fades and rises in. Keyed on the path so moving between two
// project pages also replays it. Only opacity/transform animate, and framer
// clears the transform when done, so fixed-position children aren't affected.
function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <motion.div key={pathname} initial={pageTransition.initial} animate={pageTransition.animate}>
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user" transition={DEFAULT_TRANSITION}>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <ChatWidget />
          <Toaster position="bottom-center" richColors closeButton />
        </BrowserRouter>
      </MotionConfig>
    </div>
  );
}

export default App;
