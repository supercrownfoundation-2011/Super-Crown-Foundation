"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactData";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";
import CounsellingModal from "./CounsellingModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll safely when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // PHASE 2: INSPECT THE REAL HAMBURGER BUTTON (Hit-testing & DOM metrics)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const btn = document.getElementById("hamburger-btn");
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const centerX = Math.round(rect.left + rect.width / 2);
      const centerY = Math.round(rect.top + rect.height / 2);
      const hit = document.elementFromPoint(centerX, centerY);
      const allHits = document.elementsFromPoint ? document.elementsFromPoint(centerX, centerY) : [];
      const style = window.getComputedStyle(btn);

      console.log("[REAL-HAMBURGER-INSPECT]", {
        boundingRect: {
          top: Math.round(rect.top),
          right: Math.round(rect.right),
          bottom: Math.round(rect.bottom),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        centerCoordinates: { x: centerX, y: centerY },
        hitElementAtCenter: hit ? `${hit.tagName.toLowerCase()}${hit.id ? "#" + hit.id : ""}` : null,
        isHitSelfOrChild: hit === btn || btn.contains(hit),
        allElementsAtCenter: allHits.map((el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}`),
        computedPointerEvents: style.pointerEvents,
        computedVisibility: style.visibility,
        computedDisplay: style.display,
        computedPosition: style.position,
        computedZIndex: style.zIndex,
      });
    }
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // ─────────────────────────────────────────────────────────────
  // SINGLE REACT ONCLICK HANDLERS (No debouncing, no custom refs)
  // ─────────────────────────────────────────────────────────────
  const handleHamburgerClick = () => {
    console.log("[NAVBAR] >>> Physical Hamburger onClick executed! <<<");
    setMobileMenuOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    console.log("[NAVBAR] >>> Drawer Close button clicked <<<");
    setMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Fixed Header Bar */}
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-2.5 sm:py-3 border-b border-[#E6E0E8]/70 supports-[backdrop-filter]:bg-white/75"
            : "bg-white border-b border-[#E6E0E8] py-3 sm:py-4"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center relative z-[101]">
          
          {/* Institutional Brand Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 sm:gap-3 text-[#3C2350] font-heading font-bold tracking-tight group shrink-0"
          >
            <img
              src="/logo.png"
              alt="Super Crown Foundation Logo"
              className="h-10 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-extrabold tracking-tight text-[#3C2350] text-xs sm:text-base md:text-xl">
                SUPER CROWN
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-[11px] font-sans font-extrabold tracking-[0.18em] text-[#C9A227] uppercase">
                FOUNDATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on lg+ screens) */}
          <nav className="hidden lg:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#3C2350] font-extrabold"
                      : "text-[#665D69] hover:text-[#3C2350]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A227] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Mobile Toggle Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop CTA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:inline-flex items-center justify-center bg-[#3C2350] text-white px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] transition-all border border-[#3C2350] shadow-xs cursor-pointer active:scale-95"
            >
              BOOK COUNSELLING
            </button>

            {/* Real Mobile Hamburger Button */}
            <button
              id="hamburger-btn"
              type="button"
              onClick={handleHamburgerClick}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              className="lg:hidden text-[#C9A227] bg-[#3C2350] p-2.5 rounded-xl hover:bg-[#291735] active:scale-95 transition-all cursor-pointer border border-[#3C2350] shadow-md flex items-center justify-center min-w-[44px] min-h-[44px] shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#C9A227] pointer-events-none" />
              ) : (
                <Menu className="w-6 h-6 text-[#C9A227] pointer-events-none" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 100% Viewport Guaranteed Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-0 z-[9999] bg-[#FAF8F5] flex flex-col justify-between overflow-y-auto h-[100dvh] max-h-[100dvh] w-full"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Mobile Drawer Top Header Bar */}
          <div className="px-4 py-3 sm:py-4 bg-white border-b border-[#E6E0E8] flex items-center justify-between shadow-xs sticky top-0 z-[201]">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5"
            >
              <img
                src="/logo.png"
                alt="Super Crown Foundation Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-extrabold text-[#3C2350] text-xs sm:text-base">
                  SUPER CROWN
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans font-extrabold tracking-[0.18em] text-[#C9A227] uppercase">
                  FOUNDATION
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={handleCloseClick}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              className="text-[#C9A227] bg-[#3C2350] p-2.5 rounded-xl hover:bg-[#291735] active:scale-95 transition-all cursor-pointer border border-[#3C2350] shadow-md flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 text-[#C9A227] pointer-events-none" />
            </button>
          </div>

          {/* Mobile Drawer Navigation Links & Primary CTA */}
          <div className="px-6 py-8 flex flex-col justify-between flex-grow bg-[#FAF8F5]">
            <div>
              <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-wider block mb-4 pb-2 border-b border-[#E6E0E8]">
                NAVIGATION MENU
              </span>

              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`flex items-center justify-between text-base font-extrabold py-3.5 px-4 rounded-2xl min-h-[44px] transition-all ${
                          isActive
                            ? "bg-white text-[#3C2350] border-l-4 border-[#C9A227] shadow-sm"
                            : "text-[#3C2350] bg-white border border-[#E6E0E8] hover:border-[#3C2350]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-[#665D69]/40" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Divider Line & Mobile Primary CTA */}
            <div className="pt-6 mt-8 border-t border-[#E6E0E8] flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full bg-[#3C2350] text-white py-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-extrabold hover:bg-[#291735] transition-all flex items-center justify-center gap-2 shadow-lg min-h-[44px] cursor-pointer active:scale-98"
              >
                <span>BOOK COUNSELLING</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#665D69] pt-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                <span>Call: </span>
                <a href="tel:+919600151377" className="text-[#3C2350] hover:text-[#C9A227] font-bold">
                  96001 51377
                </a>
                <span>/</span>
                <a href="tel:+918667043942" className="text-[#3C2350] hover:text-[#C9A227] font-bold">
                  086670 43942
                </a>
              </div>

              {/* Mobile Drawer Social Links */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <a
                  href={CONTACT_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E6E0E8] flex items-center justify-center text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A227] transition-all shadow-2xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E6E0E8] flex items-center justify-center text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A227] transition-all shadow-2xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E6E0E8] flex items-center justify-center text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A227] transition-all shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E6E0E8] flex items-center justify-center text-[#3C2350] hover:bg-[#3C2350] hover:text-[#C9A227] transition-all shadow-2xs"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Counselling Modal */}
      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
