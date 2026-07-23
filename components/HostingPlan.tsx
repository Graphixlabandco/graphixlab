"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  CloudLightning, 
  ShieldCheck, 
  Database, 
  Mail, 
  Globe, 
  FolderLock, 
  ChevronRight, 
  CheckSquare, 
  Flame,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface StepPlan {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  badge: string;
  cost: string;
  description: string;
  checklist: string[];
  recommendation: string;
}

const steps: StepPlan[] = [
  {
    id: "hosting",
    icon: CloudLightning,
    title: "1. Production Hosting & Servers",
    subtitle: "Serverless global edge networks",
    badge: "Enterprise",
    cost: "₹0 / Free Tier",
    description: "Deploy the Graphix Lab React & Next.js codebase to enterprise edge environments that instantly scale from zero. Every commit pushes automated live previews securely.",
    checklist: [
      "Vercel (Free tier): Auto-deploys Next.js projects with global CDN edge routes.",
      "Netlify (Free tier): High-performance serverless deployment, analytics, and instant build rollbacks.",
      "Cloud Run (Free tier): GCP container environments with generous free CPU cycles (already hosting this environment!)."
    ],
    recommendation: "Link your GitHub repository directly to Vercel. It automatically configures and compiles your Next.js application on every Git push with zero developer fees."
  },
  {
    id: "database",
    icon: Database,
    title: "2. Backend & Real-time Database",
    subtitle: "Serverless NoSQL Storage",
    badge: "Configured",
    cost: "₹0 / Free Tier",
    description: "A resilient, global database powering dynamic collections. Your client bookings, portfolios, and inquiries are securely stored and synced.",
    checklist: [
      "Firebase Firestore (Free tier): 50,000 reads and 20,000 writes per day. Perfect for up to 10,000 active bookings (Already active!).",
      "Automatic failover: Real-time synchronization keeps your client listings up to date instantly."
    ],
    recommendation: "We have fully configured and deployed Firebase Firestore inside this workspace. Your client forms are already integrated with no physical database maintenance required."
  },
  {
    id: "auth",
    icon: FolderLock,
    title: "3. User Authentication & Security",
    subtitle: "Identity management & roles",
    badge: "Configured",
    cost: "₹0 / Free Tier",
    description: "Secure cryptographic client profile generation. Validates accounts and prevents malicious booking injections using robust Attribute-Based rules.",
    checklist: [
      "Firebase Authentication (Free tier): Up to 50,000 active user authentications per month.",
      "Provides login/signup, password encryption, and administrative sessions.",
      "Attribute-Based Security Rules: Guards Firestore data strictly so clients only view their own projects."
    ],
    recommendation: "We have built user authentication into your application. Clients can sign up, and we've set up specialized code to auto-promote rvprasad24d@gmail.com to founder status."
  },
  {
    id: "email",
    icon: Mail,
    title: "4. Transactional Booking Emails",
    subtitle: "Automated verification & confirmation letters",
    badge: "Essential",
    cost: "₹0 / Free Tier",
    description: "Transmit custom branded emails whenever a booking is created or confirmed by the founder. Keeps clients updated directly in their standard mail app.",
    checklist: [
      "Resend (Free tier): 3,000 free transactional emails per month. Includes high-fidelity React email templates.",
      "Brevo (Free tier): Send up to 300 automated emails per day using simple SMTP routes.",
      "Mailgun (Free tier): Flexible developer sandbox routes."
    ],
    recommendation: "Connect a free Resend.com account, obtain their free API Key, and write a simple server route inside Next.js `/api/email` to dispatch templates whenever status changes."
  },
  {
    id: "domain",
    icon: Globe,
    title: "5. Domains & Hosting",
    subtitle: "Global addressing & DNS",
    badge: "Global",
    cost: "₹0 / Free Tier",
    description: "Map your custom Graphix Lab agency URL. Direct clients to your interactive glassmorphic portfolio seamlessly.",
    checklist: [
      "Freenom or similar registries: Register free subdomains.",
      "DuckDNS: Generates dynamic domains with SSL support.",
      "Custom Domains (Optional): Grab cheap .com/ .in domains for less than ₹500/year and map them to Vercel DNS free of charge."
    ],
    recommendation: "Deploying on Vercel gives you a free secure `graphixlab.vercel.app` subdomain automatically, including pre-installed SSL Certificates (https://)."
  }
];

export default function HostingPlan() {
  const [activeStep, setActiveStep] = useState<string>("hosting");

  return (
    <section 
      id="hosting-plan-section"
      className="relative w-full py-24 bg-transparent overflow-hidden border-t border-purple-500/10"
    >
      <div className="absolute top-1/4 left-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-400/20">
            STRATEGY LEDGER
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4">
            ZERO-COST PRODUCTION <span className="bg-gradient-to-r from-purple-300 via-purple-100 to-indigo-300 bg-clip-text text-transparent">BLUEPRINT</span>
          </h2>
          <p className="text-purple-200/60 text-sm md:text-base max-w-2xl mx-auto mt-4">
            An interactive executive guide detailing how we run Graphix Lab on world-class serverless cloud infrastructure spending exactly zero rupees.
          </p>
        </div>

        {/* Dynamic interactive Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Steps List (Left Col) */}
          <div className="md:col-span-5 space-y-3.5">
            {steps.map((step) => {
              const IconComp = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                    isActive 
                      ? "bg-purple-500/15 border-purple-400/40 shadow-[0_4px_20px_rgba(168,85,247,0.1)]"
                      : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-purple-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive ? "bg-purple-500/20 border-purple-400/40 text-purple-300" : "bg-white/5 border-white/10 text-purple-400/60"
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-purple-200/60"}`}>
                        {step.title.split(".")[1].trim()}
                      </h4>
                      <span className="text-[10px] text-purple-400/40 block mt-0.5">{step.subtitle}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-purple-400 transition-transform ${isActive ? "rotate-90" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Details Panel (Right Col) with liquid glass layout */}
          <div className="md:col-span-7">
            {steps.map((step) => {
              if (activeStep !== step.id) return null;
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 text-left shadow-2xl"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-400/30 text-purple-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                        <p className="text-xs text-purple-300 font-medium mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded block">
                        {step.badge}
                      </span>
                      <span className="text-xs font-extrabold text-white block mt-1">{step.cost}</span>
                    </div>
                  </div>

                  {/* Body description */}
                  <p className="text-purple-200/70 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Checklists */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest block">
                      Zero-Cost Cloud Options
                    </span>
                    <div className="space-y-2.5">
                      {step.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-purple-200/80">
                          <CheckCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Recommendation */}
                  <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Lead Architect Recommendation</span>
                    </span>
                    <p className="text-[11px] text-purple-200/60 leading-relaxed">
                      {step.recommendation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
