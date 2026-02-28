"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

/* =========================================================
   UTILS
========================================================= */

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* =========================================================
   COUNTER
========================================================= */

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* =========================================================
   SHARED UI
========================================================= */

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.06),transparent_42%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SectionLabel({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.22em] text-cyan-200/85">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white mobile:text-2xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-white/60 tablet:text-[15px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TwoColRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-5 laptop:grid-cols-2 laptop:gap-6">
      {children}
    </div>
  );
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-white/90">{value}</div>
    </div>
  );
}

/* =========================================================
   HEADER / FOOTER
========================================================= */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 mobile:px-5 tablet:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L6 14h5l-1 8 8-13h-5l0-7z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Battery Intelligence Platform
            </div>
            <div className="text-[10px] tracking-[0.22em] text-white/40">
              MODE-AWARE EV ANALYTICS
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 laptop:flex">
          <a href="#overview" className="text-sm text-white/70 hover:text-white">
            Overview
          </a>
          <a href="#calibration" className="text-sm text-white/70 hover:text-white">
            Calibration
          </a>
          <a href="#stats" className="text-sm text-white/70 hover:text-white">
            Stats
          </a>
          <a href="#about" className="text-sm text-white/70 hover:text-white">
            About Us
          </a>
          <a
            href="#testimonials"
            className="text-sm text-white/70 hover:text-white"
          >
            Testimonials
          </a>
        </nav>

        <div className="hidden items-center gap-2 laptop:flex">
          <SignedIn>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-xs text-white/60">Signed in</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 laptop:hidden"
          aria-label="Open menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04060a] px-4 py-10 mobile:px-5 tablet:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 tablet:grid-cols-4">
        <div className="tablet:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-cyan-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L6 14h5l-1 8 8-13h-5l0-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Battery Intelligence Platform
              </div>
              <div className="text-[10px] tracking-[0.22em] text-white/40">
                REAL-TIME MONITORING • DAILY FORECASTS
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            We build mode-aware EV battery analytics products for startups, fleet
            operators, and digital twin teams who need trustworthy SOH and RUL
            forecasting with polished product UX.
          </p>
        </div>

        <div>
          <div className="text-xs tracking-[0.18em] text-white/45">Product</div>
          <div className="mt-3 space-y-2">
            <a href="#overview" className="block text-sm text-white/70 hover:text-white">
              Overview
            </a>
            <a href="#calibration" className="block text-sm text-white/70 hover:text-white">
              TISAC Calibration
            </a>
            <a href="#stats" className="block text-sm text-white/70 hover:text-white">
              Metrics
            </a>
            <a href="#about" className="block text-sm text-white/70 hover:text-white">
              About Us
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[0.18em] text-white/45">Company</div>
          <div className="mt-3 space-y-2">
            <a href="#" className="block text-sm text-white/70 hover:text-white">
              Privacy
            </a>
            <a href="#" className="block text-sm text-white/70 hover:text-white">
              Terms
            </a>
            <a href="#" className="block text-sm text-white/70 hover:text-white">
              Contact
            </a>
            <a href="#" className="block text-sm text-white/70 hover:text-white">
              Careers
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 tablet:flex-row tablet:items-center tablet:justify-between">
        <p>
          © {new Date().getFullYear()} Battery Intelligence Platform. All rights
          reserved.
        </p>
        <p>Built for EV battery monitoring • Bayesian calibration • Forecasting</p>
      </div>
    </footer>
  );
}

/* =========================================================
   HERO VISUAL (MOVING CAR + ROAD)
========================================================= */

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r="22"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        fill="rgba(255,255,255,0.02)"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="11"
        stroke="rgba(34,211,238,0.8)"
        strokeWidth="2"
        fill="transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </g>
  );
}

function HeroVisualCard() {
  const laneMarkers = Array.from({ length: 20 });

  return (
    <GlassCard className="h-full">
      <div className="border-b border-white/10 px-4 py-4 mobile:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            <span className="text-[10px] tracking-[0.22em] text-white/65 mobile:text-xs">
              EV BATTERY ANALYTICS
            </span>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] tracking-[0.16em] text-emerald-300">
            LIVE PRODUCT PREVIEW
          </div>
        </div>

        <h1 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-white mobile:text-2xl tablet:text-3xl">
          Predict Battery Health Before It Becomes a Problem
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 tablet:text-[15px]">
          A mode-aware EV battery intelligence platform for SOH tracking, resistance
          estimation, and daily lifespan forecasting — built with time-input Bayesian
          calibration and physics-constrained outputs.
        </p>
      </div>

      <div className="relative h-[340px] mobile:h-[380px] tablet:h-[430px]">
        <motion.div
          className="absolute left-0 top-16 h-20 w-44 bg-cyan-400/10 blur-2xl"
          animate={{ x: [0, 260, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-8 top-24 h-16 w-36 bg-blue-400/10 blur-2xl"
          animate={{ x: [0, -140, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Road */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-11 h-[3px] bg-white/10" />
        <div className="absolute inset-x-0 bottom-15 h-[2px] bg-cyan-300/20" />

        {/* Moving lane markers */}
        <div className="absolute inset-x-0 bottom-[52px] h-4 overflow-hidden">
          <div className="relative h-full w-full">
            {laneMarkers.map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 h-[3px] w-12 -translate-y-1/2 rounded-full bg-amber-200/80"
                style={{ left: `${i * 90}px` }}
                animate={{ x: [0, -1900] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.02,
                }}
              />
            ))}
          </div>
        </div>

        {/* Car */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -3, 0], x: [-18, 10, -18] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 scale-110 rounded-full bg-cyan-400/10 blur-3xl" />

            <svg
              width="560"
              height="240"
              viewBox="0 0 560 240"
              className="w-[96%] max-w-[560px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="280" cy="190" rx="165" ry="16" fill="rgba(34,211,238,0.15)" />

              <motion.path
                d="M96 159
                   C118 136,150 120,193 113
                   L238 102
                   C264 96,305 96,333 104
                   L373 116
                   C401 124,422 137,442 159
                   L470 159
                   C479 159,486 166,486 175
                   L486 179
                   C486 188,479 195,470 195
                   L460 195
                   C456 209,441 220,424 220
                   C407 220,392 209,388 195
                   L164 195
                   C160 209,145 220,128 220
                   C111 220,96 209,92 195
                   L80 195
                   C71 195,64 188,64 179
                   L64 175
                   C64 166,71 159,80 159
                   L96 159Z"
                stroke="rgba(125,211,252,0.95)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.02)"
                initial={{ pathLength: 0.15, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8 }}
              />

              <path
                d="M176 118 L246 106 C269 101 302 101 324 108 L372 119"
                stroke="rgba(34,211,238,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path d="M258 108 L248 160" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

              <motion.path
                d="M439 156 L465 156"
                stroke="rgba(34,211,238,1)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />

              <motion.path
                d="M82 160 L98 160"
                stroke="rgba(59,130,246,0.95)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ opacity: [0.25, 0.9, 0.25] }}
                transition={{ duration: 2.0, repeat: Infinity }}
              />

              <Wheel cx={128} cy={195} />
              <Wheel cx={424} cy={195} />
            </svg>
          </motion.div>
        </motion.div>

        {/* Bottom preview cards */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 gap-3 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between text-xs text-white/60">
              <span>Battery Health</span>
              <span className="font-medium text-white/85">92%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.4 }}
              />
            </div>
            <p className="mt-2 text-[11px] text-white/50">
              Physics-enforced SOH estimate (no nonphysical rebound)
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
            <div className="mb-2 text-xs text-white/60">Mode-Aware Forecast</div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              Driving / Rest model switching active
            </div>
            <p className="mt-2 text-[11px] text-white/50">
              Hourly monitoring • Daily RUL and total lifespan forecasting
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   CLERK AUTH BLOCK (REAL CLERK, NOT FAKE FORM)
========================================================= */

function ClerkAuthCard() {
  return (
    <GlassCard className="h-full">
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-cyan-400/20 via-blue-500/10 to-emerald-400/10 blur-sm" />
      <div className="relative z-10 h-full p-5 mobile:p-6 tablet:p-8">
        <p className="text-xs tracking-[0.22em] text-cyan-300/80">WELCOME</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white tablet:text-3xl">
          Access your battery intelligence workspace
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60 tablet:text-[15px]">
          Sign in with Clerk to open dashboards, monitor battery health, and manage
          mode-aware forecasting pipelines securely.
        </p>

        <div className="mt-6">
          <SignedOut>
            {/* This preserves Clerk auth (no fake form). Modal keeps homepage layout clean. */}
            <div className="space-y-3">
              <SignInButton mode="modal">
                <button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] transition hover:brightness-110">
                  Sign In with Clerk
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10">
                  Create Account
                </button>
              </SignUpButton>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 mobile:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] tracking-[0.14em] text-white/45">SECURITY</div>
                <div className="mt-1 text-sm text-white/85">Clerk-managed auth</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] tracking-[0.14em] text-white/45">ACCESS</div>
                <div className="mt-1 text-sm text-white/85">Role-ready dashboards</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs tracking-[0.18em] text-white/45">
                FOR YOUR EXISTING CLERK UI
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                If you want the full embedded Clerk sign-in widget here (instead of modal),
                replace this button block with your existing Clerk component container.
              </p>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs tracking-[0.16em] text-white/45">SESSION</div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    You’re signed in
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Open the monitoring dashboard or continue to your forecasting tools.
                  </p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 mobile:grid-cols-2">
                <a
                  href="/dashboard"
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_10px_30px_rgba(34,211,238,0.2)] transition hover:brightness-110"
                >
                  Open Dashboard
                </a>
                <a
                  href="/models"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  Manage Models
                </a>
              </div>
            </div>
          </SignedIn>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/45">
          Protected access • Session management • Production-ready authentication
        </div>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   STATS + FEATURES
========================================================= */

function StatsCard() {
  const stats = [
    { label: "Vehicles Monitored", value: 1280, suffix: "+" },
    { label: "Forecast Accuracy", value: 96.4, suffix: "%", decimals: 1 },
    { label: "Mode Detection Precision", value: 98.7, suffix: "%", decimals: 1 },
    { label: "Battery Events Logged", value: 18420, suffix: "+" },
  ] as const;

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Performance Metrics"
        title="Built for high-confidence battery monitoring"
        subtitle="Track health, detect driving vs rest, and forecast battery lifespan with stable daily outputs."
      />

      <div id="stats" className="mt-6 grid grid-cols-1 gap-4 mobile:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              {s.label}
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white mobile:text-3xl">
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function FeaturesCard() {
  const features = [
    {
      title: "Mode-Aware Dual Models",
      text: "Separate driving and rest models improve stability and reduce misestimation across different operating conditions.",
    },
    {
      title: "Physics-Enforced Battery Health",
      text: "SOH trends are constrained to remain physically plausible, preventing impossible rebounds during monitoring and forecasting.",
    },
    {
      title: "Hourly Monitoring • Daily Forecasting",
      text: "Ingest hourly battery state updates while summarizing decision-ready forecasts on a daily basis for operations and maintenance.",
    },
    {
      title: "Frontend + Backend Ready",
      text: "Saved model artifacts can be connected to APIs and Next.js dashboards for product-grade battery intelligence workflows.",
    },
  ];

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <div id="features">
        <SectionLabel
          eyebrow="Core Capabilities"
          title="Mode-aware battery intelligence features"
          subtitle="Built for EV monitoring platforms, fleet analytics products, and digital twin applications."
        />
      </div>

      <div className="mt-6 space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex gap-3">
              <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{f.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

/* =========================================================
   TISAC / BAYESIAN CALIBRATION SECTION (NEW)
========================================================= */

function TISACCalibrationCard() {
  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <div id="calibration">
        <SectionLabel
          eyebrow="Methodology"
          title="Time-Input Bayesian Calibration (TISAC) for EV battery health calibration & forecasting"
          subtitle="This section explains the core approach used in your project: mode-aware inference, time-input calibration, uncertainty-aware estimation, and physics-constrained forecasting."
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">
            1) Time-input calibration for battery degradation dynamics
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            The model treats time (hourly progression / cycle progression) as a primary
            input along with operational conditions (e.g., driving vs rest, load/C-rate,
            observed signals). This allows the calibration process to learn how latent
            health states evolve over time rather than fitting a static mapping.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">
            2) Bayesian-style uncertainty-aware estimation
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            The inference pipeline produces not only point estimates (capacity fade,
            resistance growth, SOH, RUL), but also uncertainty-aware outputs that are
            useful for operational decisions. This helps distinguish stable forecasts
            from low-confidence regions during extrapolation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">
            3) Dual-mode calibration: driving and rest states
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            A smart mode detector identifies whether the vehicle is in driving or rest
            mode, then routes inference to the respective calibrated model. This avoids
            mixing fundamentally different behaviors and improves estimation stability.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">
            4) Physics-constrained forecasting for credible SOH / RUL
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Forecast outputs are constrained to respect battery physics (for example,
            capacity should not increase and internal resistance should not decrease in
            the long-term health trend). This prevents dashboard artifacts and keeps the
            forecasting behavior product-ready.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function MethodFlowCard() {
  const stages = [
    {
      title: "Telemetry Ingestion",
      desc: "Hourly inputs (voltage, temperature, energy/use patterns, mode indicators) enter the monitoring pipeline.",
    },
    {
      title: "Mode Detection",
      desc: "The system detects driving vs rest and selects the corresponding calibrated model path.",
    },
    {
      title: "Bayesian Calibration Inference",
      desc: "Time-input calibration estimates latent battery health states with uncertainty-aware outputs.",
    },
    {
      title: "Forecast Engine",
      desc: "Daily battery health, remaining useful life (RUL), and total lifespan projections are generated.",
    },
    {
      title: "Physics Enforcement Layer",
      desc: "SOH and resistance trends are stabilized to maintain physically plausible monitoring and forecast trajectories.",
    },
    {
      title: "Dashboard Delivery",
      desc: "Results are surfaced in a clean UI for operations, diagnostics, and product decision-making.",
    },
  ];

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Pipeline"
        title="Calibration-to-dashboard workflow"
        subtitle="How the TISAC battery calibration and forecasting logic is presented in a production-facing product experience."
      />

      <div className="mt-6 space-y-3">
        {stages.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-xs font-semibold text-cyan-200">
                {i + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {s.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

/* =========================================================
   PARALLAX BATTERY + FORECAST PREVIEW
========================================================= */

function BatteryParallaxCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 10]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -35]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.97]);
  const fillScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.35, 0.58, 0.82, 0.92]
  );
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.35]);

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Interactive Showcase"
        title="3D parallax battery scroller animation"
        subtitle="A premium visual module for product storytelling and dashboard previews."
      />

      <div ref={ref} className="mt-6 [perspective:1200px]">
        <motion.div
          style={{ rotateX, rotateY, y, scale }}
          className="relative rounded-3xl border border-white/10 bg-black/20 p-4 mobile:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_42%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.12),transparent_45%)]"
            style={{ opacity: glowOpacity }}
          />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs tracking-[0.2em] text-white/45">
                BATTERY DIGITAL TWIN
              </div>
              <h3 className="mt-1 text-base font-semibold text-white mobile:text-lg">
                Live Health & Lifespan Forecast
              </h3>
            </div>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              REAL-TIME
            </div>
          </div>

          <div className="relative mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-white/70">
              <span>Battery State of Health</span>
              <span className="font-semibold text-white">93%</span>
            </div>

            <div className="relative h-14 rounded-xl border border-white/10 bg-white/5 p-2">
              <div className="absolute -right-2 top-1/2 h-6 w-2 -translate-y-1/2 rounded-r-md bg-white/20" />
              <div className="relative h-full overflow-hidden rounded-lg bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                  style={{ scaleX: fillScale, transformOrigin: "left center" }}
                />
                <div className="absolute inset-0 grid grid-cols-10 gap-1 p-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-[4px] border border-white/10 bg-white/5"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 tablet:grid-cols-4">
              <MetricChip label="Mode" value="Driving" />
              <MetricChip label="Forecast" value="Daily RUL" />
              <MetricChip label="Q Est." value="46.5 Ah" />
              <MetricChip label="R Est." value="7.3 mΩ" />
            </div>
          </div>

          <div className="pointer-events-none absolute -z-10 left-4 top-6 h-[88%] w-[92%] rounded-3xl border border-white/5 bg-white/[0.02]" />
          <div className="pointer-events-none absolute -z-20 left-8 top-10 h-[80%] w-[84%] rounded-3xl border border-white/5 bg-white/[0.01]" />
        </motion.div>
      </div>
    </GlassCard>
  );
}

function ForecastPreviewCard() {
  const points = useMemo(() => {
    const n = 48;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const x = i;
      const q = 100 - i * 0.35 - Math.sin(i * 0.28) * 0.45;
      const rul = Math.max(0, 320 - i * 2.8);
      arr.push({ x, q, rul });
    }
    return arr;
  }, []);

  const pathQ = useMemo(() => {
    const w = 520;
    const h = 180;
    const xScale = (x: number) => (x / (points.length - 1)) * (w - 20) + 10;
    const yScale = (y: number) => h - ((y - 80) / 22) * (h - 20) - 10;
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.x)} ${yScale(p.q)}`)
      .join(" ");
  }, [points]);

  const pathRUL = useMemo(() => {
    const w = 520;
    const h = 110;
    const xScale = (x: number) => (x / (points.length - 1)) * (w - 20) + 10;
    const yScale = (y: number) => h - (y / 340) * (h - 20) - 10;
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.x)} ${yScale(p.rul)}`)
      .join(" ");
  }, [points]);

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Dashboard Preview"
        title="SOH + RUL monitoring experience"
        subtitle="Hourly monitoring, daily forecasting, and mode-aware battery estimation in a clean operator-facing UI."
      />

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
          <StatusMini label="Battery Health" value="81.5%" accent="emerald" />
          <StatusMini label="Mode" value="Driving" accent="cyan" />
          <StatusMini label="Pred. Life" value="315 days" accent="blue" />
          <StatusMini label="RUL" value="0 days" accent="amber" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-medium text-white/85">
              Battery Health & Capacity Tracking
            </div>
            <div className="text-xs text-white/45">Daily basis</div>
          </div>

          <svg viewBox="0 0 520 180" className="w-full">
            <defs>
              <linearGradient id="qStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(16 185 129)" />
                <stop offset="50%" stopColor="rgb(34 211 238)" />
                <stop offset="100%" stopColor="rgb(59 130 246)" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((g) => (
              <line
                key={g}
                x1="10"
                x2="510"
                y1={20 + g * 40}
                y2={20 + g * 40}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
            ))}

            <path
              d={pathQ}
              fill="none"
              stroke="url(#qStroke)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="10"
              x2="510"
              y1="132"
              y2="132"
              stroke="rgba(217,70,239,0.7)"
              strokeDasharray="6 6"
            />
            <text x="14" y="126" fill="rgba(255,255,255,0.65)" fontSize="11">
              EOL threshold
            </text>
          </svg>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-medium text-white/85">
              Remaining Useful Life Forecast
            </div>
            <div className="text-xs text-white/45">Projected daily trend</div>
          </div>

          <svg viewBox="0 0 520 110" className="w-full">
            {[0, 1, 2].map((g) => (
              <line
                key={g}
                x1="10"
                x2="510"
                y1={18 + g * 32}
                y2={18 + g * 32}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
            ))}
            <path
              d={pathRUL}
              fill="none"
              stroke="rgba(34,211,238,0.95)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
}

function StatusMini({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "emerald" | "cyan" | "blue" | "amber";
}) {
  const accentStyles = {
    emerald: "bg-emerald-400/10 border-emerald-300/20 text-emerald-200",
    cyan: "bg-cyan-400/10 border-cyan-300/20 text-cyan-200",
    blue: "bg-blue-400/10 border-blue-300/20 text-blue-200",
    amber: "bg-amber-300/10 border-amber-200/20 text-amber-100",
  }[accent];

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full border", accentStyles)} />
        <span className="text-sm font-medium text-white/90">{value}</span>
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT US STARTUP SECTION (NEW)
========================================================= */

function AboutUsCard() {
  const values = [
    "Physics-first battery analytics",
    "Product-grade UI for technical workflows",
    "Mode-aware forecasting for real operating conditions",
    "Fast iteration for EV and fleet startups",
  ];

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <div id="about">
        <SectionLabel
          eyebrow="About Us"
          title="We’re a startup building trustworthy battery intelligence tools"
          subtitle="Our mission is to make EV battery monitoring more actionable by combining calibration science, modern AI workflows, and operator-friendly product design."
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">What we build</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            We build mode-aware EV battery health monitoring and forecasting products
            that help teams track degradation, estimate SOH/RUL, and communicate
            battery risk clearly through a modern dashboard experience.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">Why we started</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Existing battery dashboards often look polished but behave inconsistently.
            We started this company to build systems that are not only visually strong,
            but also physically credible and calibration-aware.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mobile:grid-cols-2">
          {values.map((v) => (
            <div key={v} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <span className="text-sm text-white/80">{v}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs tracking-[0.18em] text-white/45">STARTUP FOCUS</div>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            We work at the intersection of EV analytics, calibration research, and
            product engineering — helping teams go from prototype models to deployment-ready
            battery intelligence experiences.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function StartupRoadmapCard() {
  const roadmap = [
    { q: "Now", t: "Mode-aware SOH / RUL monitoring", d: "Driving + rest model routing, physics-enforced trends, daily forecasting." },
    { q: "Next", t: "API + dashboard deployment stack", d: "Connect saved model files to backend APIs and production telemetry streams." },
    { q: "Next+", t: "Fleet analytics & alerting", d: "Portfolio-level battery health summaries, risk thresholds, and maintenance prioritization." },
    { q: "Future", t: "Adaptive online calibration", d: "Continuous updating from incoming telemetry with uncertainty-aware recalibration." },
  ];

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Startup Roadmap"
        title="From research-grade calibration to product-grade battery ops"
        subtitle="A practical path from prototype inference to deployable EV battery intelligence."
      />

      <div className="mt-6 space-y-3">
        {roadmap.map((r, i) => (
          <motion.div
            key={r.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex gap-4">
              <div className="grid h-9 w-14 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-xs font-semibold text-cyan-200">
                {r.q}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{r.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{r.d}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

/* =========================================================
   TESTIMONIALS + CTA
========================================================= */

function TestimonialsCard() {
  const testimonials = [
    {
      name: "Fleet Operations Lead",
      company: "UrbanEV Mobility",
      quote:
        "The mode-aware forecasting is the difference maker. We finally get stable battery health estimates instead of noisy, jumpy dashboard behavior.",
    },
    {
      name: "Battery Systems Engineer",
      company: "NextDrive Labs",
      quote:
        "The physics-enforced tracking gives our team much more confidence in SOH and resistance trends. It behaves like an engineering tool, not a toy chart.",
    },
  ];

  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <div id="testimonials">
        <SectionLabel
          eyebrow="Testimonials"
          title="Trusted by teams building EV intelligence products"
          subtitle="A polished front-end experience matters, but the underlying battery behavior has to look physically credible too."
        />
      </div>

      <div className="mt-6 space-y-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="mb-3 flex items-center gap-1 text-amber-200">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg key={idx} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-white/75">“{t.quote}”</p>
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="text-sm font-semibold text-white">{t.name}</div>
              <div className="text-xs tracking-[0.14em] text-white/45">{t.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

function CTACard() {
  return (
    <GlassCard className="h-full p-5 mobile:p-6 tablet:p-8">
      <SectionLabel
        eyebrow="Ready to Deploy"
        title="Turn your battery monitoring concept into a production-ready platform"
        subtitle="Connect saved driving/rest model files to a backend API and surface stable SOH / RUL forecasts through a Next.js dashboard."
      />

      <div className="mt-6 grid grid-cols-1 gap-3 mobile:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] tracking-[0.16em] text-white/45">
            MODEL FILES
          </div>
          <div className="mt-2 text-sm font-medium text-white/90">
            Driving + Rest artifacts
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            Separate calibrated models for mode-aware battery health estimation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] tracking-[0.16em] text-white/45">
            FORECASTING
          </div>
          <div className="mt-2 text-sm font-medium text-white/90">
            Hourly monitoring • Daily RUL
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            Designed for operations dashboards, lifecycle planning, and alerts.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] transition hover:brightness-110">
              Get Started
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 hover:bg-white/10">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <a
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] transition hover:brightness-110"
          >
            Open Dashboard
          </a>
          <a
            href="/models"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
          >
            View Models
          </a>
        </SignedIn>

        <a
          href="#calibration"
          className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-400/15"
        >
          See Calibration Method
        </a>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs tracking-[0.18em] text-white/45">CONTACT / STARTUP DEMO</div>
        <p className="mt-2 text-sm text-white/70">
          Want a custom battery intelligence dashboard for your EV startup or fleet platform?
          We can tailor the landing experience, auth flows, and monitoring UI to your stack.
        </p>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      {/* background layers */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.06),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.06),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.05),transparent_40%)]" />

      <div className="relative z-10">
        <Header />

        <main
          id="overview"
          className="px-4 py-5 mobile:px-5 mobile:py-6 tablet:px-8 tablet:py-8"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 laptop:gap-6">
            {/* ROW 1: HERO + CLERK AUTH */}
            <TwoColRow>
              <HeroVisualCard />
              <ClerkAuthCard />
            </TwoColRow>

            {/* ROW 2: STATS + FEATURES */}
            <TwoColRow>
              <StatsCard />
              <FeaturesCard />
            </TwoColRow>

            {/* ROW 3: TISAC / BAYESIAN CALIBRATION + PIPELINE */}
            <TwoColRow>
              <TISACCalibrationCard />
              <MethodFlowCard />
            </TwoColRow>

            {/* ROW 4: PARALLAX SHOWCASE + FORECAST PREVIEW */}
            <TwoColRow>
              <BatteryParallaxCard />
              <ForecastPreviewCard />
            </TwoColRow>

            {/* ROW 5: ABOUT US STARTUP + ROADMAP */}
            <TwoColRow>
              <AboutUsCard />
              <StartupRoadmapCard />
            </TwoColRow>

            {/* ROW 6: TESTIMONIALS + CTA */}
            <TwoColRow>
              <TestimonialsCard />
              <CTACard />
            </TwoColRow>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}