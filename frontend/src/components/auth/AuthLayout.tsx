"use client";

import { useState, useEffect } from "react";
import { Shield01Icon, ChartLineData01Icon, AnalyticsUpIcon, MouseIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ChartLineData01Icon,
    title: "A Unified Hub for Smarter Decision-Making",
    description: "Empowers you with a unified command center—delivering deep insights and a 360° view of your entire customer world.",
    color: "from-teal-600 to-emerald-900",
  },
  {
    icon: Shield01Icon,
    title: "Predict churn before it happens.",
    description: "Leverage advanced machine learning models to identify at-risk customers and take proactive action to improve your retention rates.",
    color: "from-indigo-600 to-indigo-950",
  },
  {
    icon: AnalyticsUpIcon,
    title: "Turn data into retention strategy.",
    description: "Analyze churn metrics, uncover hidden growth opportunities, and generate automated reporting for your SaaS business.",
    color: "from-blue-600 to-slate-900",
  }
];

export function AuthLayout({ children, currentType }: { children: React.ReactNode, currentType: 'login' | 'register' }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4 sm:p-8">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Left Pane - Form Container */}
        <div className="flex w-full flex-col p-8 sm:p-12 lg:w-1/2 lg:p-16">
          <div className="flex items-center gap-2 text-teal-600 mb-12">
            <ChartLineData01Icon size={28} />
            <span className="text-xl font-bold tracking-tight text-neutral-900">ChurnRate</span>
          </div>

          <div className="mx-auto w-full max-w-sm flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
                Welcome to ChurnRate
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Start your experience by signing in or signing up.
              </p>
            </div>

            <div className="mb-8 flex rounded-xl bg-neutral-100 p-1">
              <a 
                href="/login"
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-all",
                  currentType === 'login' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                )}
              >
                Sign In
              </a>
              <a 
                href="/register"
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-all",
                  currentType === 'register' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
                )}
              >
                Sign Up
              </a>
            </div>

            {children}
            
            <div className="mt-8 text-center text-xs text-neutral-400">
              Copyright © ChurnRate, All Rights Reserved. <br/>
              <a href="#" className="hover:text-teal-600 hover:underline">Terms & Conditions</a> | <a href="#" className="hover:text-teal-600 hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Right Pane - Feature Carousel */}
        <div className={cn(
          "relative hidden lg:flex lg:w-1/2 flex-col justify-end p-12 transition-colors duration-1000",
          "bg-gradient-to-br",
          features[currentSlide].color
        )}>
          {/* Decorative Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="relative z-10 w-full max-w-lg mx-auto mb-8 text-center min-h-[300px]">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 transform",
                    currentSlide === idx ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-8 absolute pointer-events-none"
                  )}
                >
                  <div className="mx-auto mb-8 relative w-64 h-48 sm:w-80 sm:h-56 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                    <Icon size={64} className="text-white/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/80">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Carousel Indicators */}
          <div className="relative z-10 flex gap-2 justify-center mt-auto">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  currentSlide === idx ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
