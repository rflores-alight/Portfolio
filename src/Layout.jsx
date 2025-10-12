import React, { useEffect, useRef, forwardRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Glow from "@/components/ui/glow";
import { Mail, Download, Layers, Linkedin} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_META as PROFILE } from "./site-shared.jsx";
import { Section } from "@/components/ui/section.jsx";
import { Separator } from "@/components/ui/separator";

const SiteHeader = forwardRef(function SiteHeader(_, ref) {
  return (
    <header ref={ref} className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Glow>
              <Layers className="text-zinc-900" />
            </Glow>
            <span className="font-semibold ">{PROFILE.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>   {/* light pill */}
              <a href={`mailto:${PROFILE.email}`}>
                <Mail className="mr-2 h-4 w-4" /> Contact
              </a>
            </Button>
            <Button asChild>                        {/* dark pill */}
              <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener" aria-label="Download resume (PDF)">
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>
  );
});

function SiteFooter() {
  return (
    
    <footer className="rf-container py-10 text-sm text-gray-600">
          {/* Contact / Footer */}
          <Separator />
          <Section id="contact" title="Get in touch" icon={<Glow><Mail className="h-6 w-6 text-zinc-900" aria-hidden="true" /></Glow> }>
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">Let’s build simple, trustworthy experiences.</div>
                  <p className="text-sm text-muted-foreground">Open to IC, Manager, or Director roles. • Remote (Americas/ET)</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <a href={`mailto:${PROFILE.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> Email Rafael
                    </a>
                  </Button>
                  {/* Footer LinkedIn button (shows on all viewports) */}
                  <Button variant="secondary" size="icon" asChild>
                    <a href={PROFILE.linkedin}
                       target="_blank"
                       rel="noopener me"
                       aria-label="LinkedIn (opens in a new tab)">
                      <Linkedin className="h-6 w-6 text-[#0A66C2]" aria-hidden="true" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener" aria-label="View resume (PDF)">
                      <Download className="mr-2 h-4 w-4" /> Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-4">© {new Date().getFullYear()} Rafael Flores. All rights reserved.</p>
          </Section>
        </footer>
  );
}

export default function Layout() {
  // Track header height and expose as CSS var --header-h
  const headerRef = useRef(null);
  useEffect(() => {
    const setVar = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setVar();
    const ro = headerRef.current ? new ResizeObserver(setVar) : null;
    if (ro && headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", setVar);
    return () => {
      window.removeEventListener("resize", setVar);
      ro?.disconnect();
    };
  }, []);

  // Scroll to top on every pathname change (and support #hash anchors)
  function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
      if (hash) {
        // if navigating to an anchor, scroll that into view
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }
      // default: jump to top
      window.scrollTo(0, 0);
      // move focus to <main> for a11y (requires tabIndex on <main>)
      const main = document.querySelector("main[data-route-main]");
      if (main) main.focus();
    }, [pathname, hash]);
    return null;
  }
  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollToTop />
      <SiteHeader ref={headerRef} />
      <main
        /* Pad by header height so content never hides underneath */
        className="flex-1 outline-none pt-[var(--header-h,0px)]"
        tabIndex={-1}
        data-route-main
        aria-label="Main content"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
