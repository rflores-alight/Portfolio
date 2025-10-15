import React, { useEffect, useRef, forwardRef } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Glow from "@/components/ui/glow";
import { Mail, Download, Layers, Linkedin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_META as PROFILE } from "./site-shared.jsx";
import { Section } from "@/components/ui/section.jsx";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useState } from "react"; // if not already

function scrollToSection(id, behavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;

  const headerH =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;

  const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 4;
  window.scrollTo({ top: y, behavior });
  return true;
}

/**
 * useScrollSpy (JSX/JS)
 * Watches the given section IDs and returns:
 *  - "#case-studies" | "#experience" when one is visible
 *  - "" (empty string) when neither is visible
 */
function useScrollSpy(ids = ["case-studies", "experience"]) {
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (targets.length === 0) return;

    // Account for sticky header so a section counts as visible a bit earlier
    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h")
      ) || 0;

    // See slightly sooner as we reach a section; feel free to tweak
    const rootMarginTop = -(headerH + 8); // px
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) {
          // Neither section visible -> reset
          setActive("");
          return;
        }
        // Pick the most visible section
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        const id = top.target && top.target.id;
        setActive(id ? `#${id}` : "");
      },
      {
        root: null,
        rootMargin: `${rootMarginTop}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/**
 * useActiveNav (JSX/JS)
 * Route-aware + scroll-aware matcher for your two nav links.
 * - On /case-studies/* : keeps CASE STUDIES active
 * - On / (home)       : uses scrollspy; if neither section visible => no active link
 * - Falls back to the URL hash if present
 */
function useActiveNav() {
  const { pathname } = useLocation();          // ← no hash fallback
  const spy = useScrollSpy(["case-studies", "experience"]); // "", "#case-studies", "#experience"

  return function isActive(label) {
    const wanted = label === "CASE STUDIES" ? "#case-studies" : "#experience";

    // On any case-study detail route, keep CASE STUDIES active
    if (label === "CASE STUDIES" && pathname.startsWith("/case-studies")) return true;

    // On home, the scrollspy is the *only* source of truth.
    if (pathname === "/") {
      if (!spy) return false;          // neither section visible → reset
      return spy === wanted;           // active only if visible
    }

    return false;
  };
}


const NAV_LINKS = [
  { label: "CASE STUDIES", href: "#case-studies" },
  { label: "EXPERIENCE", href: "#experience" },
];


const SiteHeader = forwardRef(function SiteHeader(_, ref) {
  const baseLink =
  "relative text-[16px] leading-6 font-medium px-1 py-1 rounded-md transition-colors " +
  "text-muted-foreground hover:!text-indigo-700 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
  const activeLink =
  "!text-indigo-700 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full " +
  "after:bg-indigo-600 after:rounded-full";
  
  const isActive = useActiveNav();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();

  const onBrandClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      // Close mobile menu if you're controlling it
      if (typeof setMenuOpen === "function") setMenuOpen(false);

      // Remove any hash so future same-link clicks work the same
      if (location.hash) window.history.replaceState(null, "", "/");

      // Smooth scroll to top (respects sticky header)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // else: let Link navigate to "/" normally
  };
  const onHashNav = (e, id) => {
    // Only hijack on the homepage. Anywhere else, let Link navigate normally.
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToSection(id); // don't change history/hash here
      setMenuOpen(false);
    }
  };
  
  return (
    <header 
      ref={ref} 
      className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-[env(safe-area-inset-top)] z-40 overflow-x-clip"
      >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between pl-[calc(env(safe-area-inset-left)+1rem)] pr-[calc(env(safe-area-inset-right)+1rem)]">
        {/* Left cluster: Hamburger (mobile-only) + Brand */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile hamburger on far left */}
          <div className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                  className="group text-muted-foreground transition-colors cursor-pointer"
                >
                  
                  <Menu className="h-5 w-5 transition-colors group-hover:text-indigo-700" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72">
                <nav className="mt-4 grid gap-2" aria-label="Mobile">
                  {NAV_LINKS.map(({ label, href }) => (
                    <SheetClose asChild key={href}>
                      <Link
                        key={href}
                        to={`/${href}`}                                  // e.g. "/#case-studies"
                        onClick={(e) => onHashNav(e, href.slice(1))}     // "case-studies" | "experience"
                        className={
                          "w-full text-base font-semibold px-3 py-2 rounded-xl transition-colors hover:!text-indigo-700 " +
                          (isActive(label) ? "text-indigo-700" : "text-muted-foreground")
                        }
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Brand */}
          <Link
            to="/"
            onClick={onBrandClick}
            className="group inline-flex items-center gap-3 px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Go to home"
          >
            <div className="hidden md:inline-flex">
              <Glow>
                <Layers className="text-zinc-900 transition-colors group-hover:text-indigo-600" />
              </Glow>
            </div>
            <span className="font-semibold transition-colors group-hover:text-indigo-700 whitespace-nowrap">
              {PROFILE.name}
            </span>
          </Link>
        </div>

        {/* Desktop nav (md+) */}
        <nav className="hidden md:flex items-center gap-6 ml-auto" aria-label="Primary">
          <Link
            to="/#case-studies"
            onClick={(e) => onHashNav(e, "case-studies")}
            className={`${baseLink} ${isActive("CASE STUDIES") ? activeLink : ""}`}
          >
            CASE STUDIES
          </Link>
          <Link
            to="/#experience"
            onClick={(e) => onHashNav(e, "experience")}
            className={`${baseLink} ${isActive("EXPERIENCE") ? activeLink : ""}`}
          >
            EXPERIENCE
          </Link>
        </nav>

        {/* Actions (right) */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Email */}
          <Button variant="ghost" asChild>
            <a href={`mailto:${PROFILE.email}`} 
                aria-label="Email"
                className="group text-muted-foreground transition-colors group-hover:text-indigo-700"
                >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline text-[16px] leading-6 font-medium">Contact</span>
            </a>
          </Button>

          {/* Resume: icon + text horizontal */}
          <Button variant="secondary" asChild>
            <a
              href="/RafaelFlores-Resume.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Download resume (PDF)"
              className="inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline text-[16px] leading-6 font-semibold">Resume</span>
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
      <Section
        id="contact"
        title="Get in touch"
        icon={
          <Glow>
            <Mail className="h-6 w-6 text-zinc-900" aria-hidden="true" />
          </Glow>
        }
      >
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Let’s build simple, trustworthy products and experiences.</div>
              <p className="text-sm text-muted-foreground">Open to IC, Manager, or Director roles. • Remote (Americas/ET)</p>
            </div>
            <div className="flex gap-2">
              {/* Footer LinkedIn button (shows on all viewports) */}
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener me"
                  aria-label="LinkedIn (opens in a new tab)"
                >
                  <Linkedin className="h-6 w-6 text-[#0A66C2]" aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/RafaelFlores-Resume.pdf" target="_blank" rel="noopener" aria-label="View resume (PDF)" className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> <span>Resume</span>
                </a>
              </Button>
              <Button asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Email Rafael
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
        className="flex-1 outline-none pt-[calc(var(--header-h,0px)+env(safe-area-inset-top))]"
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
