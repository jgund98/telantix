"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lockup, Mark, Wordmark } from "./brand";

const NAV = [
  { href: "/network", label: "Network", index: "01" },
  { href: "/termination", label: "Calling", index: "02" },
  { href: "/quality", label: "Quality", index: "03" },
  { href: "/company", label: "Company", index: "04" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Utility rail — carrier status line, always mono */}
      <div className="hidden md:block bg-ink text-paper">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2">
          <div className="flex items-center gap-6 mono-label text-[0.6875rem] text-paper/70">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              SUPPORT ONLINE — 24 / 7 / 365
            </span>
            <span className="text-hair-ink">/</span>
            <span>U.S. VOICE NETWORK</span>
          </div>
          <div className="flex items-center gap-6 mono-label text-[0.6875rem] text-paper/70">
            <span>OPEN TO CONNECT</span>
            <a
              href="mailto:hello@telantix.com"
              className="text-paper hover:text-signal transition-colors"
            >
              hello@telantix.com
            </a>
          </div>
        </div>
      </div>

      {/* Primary bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/92 backdrop-blur-md border-b border-hair"
            : "bg-paper border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-8 h-[76px]">
          <Link href="/" aria-label="Telantix home" className="group">
            <Lockup
              markClass="h-8 w-auto transition-transform duration-500 group-hover:rotate-[-6deg]"
              textClass="text-[1.7rem]"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2"
                >
                  <span
                    className={`text-[0.95rem] font-medium transition-colors ${
                      active ? "text-ink" : "text-mute hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px origin-left bg-signal transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/connect"
              className="hidden sm:inline-flex items-center gap-2 bg-signal px-5 py-2.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-signal-deep"
            >
              Request Routes
              <span aria-hidden>→</span>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex h-11 w-11 items-center justify-center -mr-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <div className="flex flex-col items-end gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                  className="block h-[2px] bg-ink"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1, width: 16 }}
                  className="block h-[2px] w-4 bg-ink"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                  className="block h-[2px] w-5 bg-ink"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-28 pb-10">
              <nav className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between border-b border-hair-ink py-5"
                    >
                      <span className="display text-paper text-[2.4rem] leading-none group-active:text-signal">
                        {item.label}
                      </span>
                      <span className="eyebrow text-stone">{item.index}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-auto"
              >
                <Link
                  href="/connect"
                  className="flex items-center justify-between bg-signal px-6 py-5 text-white"
                >
                  <span className="text-[1.35rem] font-bold">Request Routes</span>
                  <span aria-hidden className="text-2xl">→</span>
                </Link>
                <div className="mt-8 flex items-center justify-between">
                  <Mark variant="paper" className="h-7 w-auto" />
                  <a href="mailto:hello@telantix.com" className="mono-label text-[0.7rem] text-stone">
                    hello@telantix.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
