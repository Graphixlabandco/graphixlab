"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, User, Menu, X, Compass, Calendar, Phone, Info, ArrowRight } from "lucide-react";

interface NavbarProps {
  onNavigate: (section: string) => void;
  onOpenAuth: () => void;
  currentUser: any;
  onLogout: () => void;
}

export default function Navbar({ onNavigate, onOpenAuth, currentUser, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4"
    >
      <div 
        id="navbar-container"
        className="max-w-7xl mx-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_0_rgba(147,51,234,0.07)]"
      >
        {/* Left Hand Menu Trigger for Mobile */}
        <button
          id="nav-menu-toggle-left"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 transition-colors cursor-pointer mr-2"
          aria-label="Open menu drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Title Section */}
        <button 
          id="nav-logo"
          onClick={() => handleNavClick("hero")} 
          className="flex items-center gap-2.5 text-white font-bold text-xl tracking-wider cursor-pointer group"
        >
          <img
            src="/logo.svg"
            alt="GraphixLab Logo"
            className="w-8 h-8 rounded-full object-cover border border-purple-500/30 group-hover:border-purple-400 transition-colors"
          />
          <span className="bg-gradient-to-r from-purple-100 via-purple-300 to-indigo-200 bg-clip-text text-transparent font-extrabold uppercase text-lg tracking-wider">
            Graphix Lab
          </span>
        </button>

        {/* Center Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button
            id="nav-link-portfolio"
            onClick={() => handleNavClick("portfolio")}
            className="text-purple-200/80 hover:text-white transition-all duration-300 font-medium cursor-pointer"
          >
            Services
          </button>
          <button
            id="nav-link-booking"
            onClick={() => handleNavClick("booking")}
            className="text-purple-200/80 hover:text-white transition-all duration-300 font-medium cursor-pointer"
          >
            Book Design
          </button>
          <button
            id="nav-link-inquire"
            onClick={() => handleNavClick("inquire")}
            className="text-purple-200/80 hover:text-white transition-all duration-300 font-medium cursor-pointer"
          >
            Reviews
          </button>
          <button
            id="nav-link-plan"
            onClick={() => handleNavClick("hosting-plan")}
            className="text-purple-200/80 hover:text-white transition-all duration-300 font-medium cursor-pointer"
          >
            Launch Guide
          </button>
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-btn-dashboard"
                onClick={() => handleNavClick("portal")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>My Hub</span>
              </button>
              <button
                id="nav-btn-logout"
                onClick={onLogout}
                className="hidden md:block px-3 py-1.5 text-xs text-red-300/80 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              id="nav-btn-auth"
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_4px_16px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_24px_rgba(168,85,247,0.5)] transition-all duration-300 border border-purple-400/30 cursor-pointer shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login/Signup</span>
            </button>
          )}
        </div>
      </div>

      {/* Left-Sliding Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Quick-closing touch dismisser backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm md:hidden"
            />

            {/* Glassmorphic Sliding Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[300px] max-w-[85vw] h-full bg-[#0a0815]/95 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl z-50 md:hidden"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-100 via-purple-300 to-indigo-200 bg-clip-text text-transparent font-extrabold uppercase text-sm tracking-wider">
                      Graphix Lab
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 transition-colors cursor-pointer"
                    aria-label="Close drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Complete Set of Navigation Options */}
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick("portfolio")}
                    className="flex items-center gap-3 w-full text-left text-purple-200 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
                  >
                    <Compass className="w-4 h-4 text-purple-400" />
                    <span>Services</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("booking")}
                    className="flex items-center gap-3 w-full text-left text-purple-200 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
                  >
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Book Design</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("inquire")}
                    className="flex items-center gap-3 w-full text-left text-purple-200 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span>Reviews</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("hosting-plan")}
                    className="flex items-center gap-3 w-full text-left text-purple-200 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
                  >
                    <Info className="w-4 h-4 text-purple-400" />
                    <span>Launch Guide</span>
                  </button>
                </nav>
              </div>

              {/* Bottom Drawer Footer with Live User Profile Details */}
              <div className="border-t border-white/10 pt-5 space-y-4">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-purple-500/5 border border-purple-400/20">
                      <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 font-bold text-sm">
                        {currentUser.displayName ? currentUser.displayName.slice(0, 2).toUpperCase() : "U"}
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-white truncate">
                          {currentUser.displayName || "User"}
                        </p>
                        <p className="text-[10px] text-purple-300/60 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick("portal")}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-200 border border-purple-400/20 hover:bg-purple-500/20 transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>My Hub</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-center py-2 rounded-xl text-xs font-semibold text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-500/20"
                  >
                    <span>Login / Signup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <p className="text-[10px] text-purple-400/30 text-center select-none">
                  Graphix Lab Secure Portal v1.2
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



