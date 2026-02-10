"use client";

import { useRef, useState, useCallback, MouseEvent as ReactMouseEvent } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Mic,
  MapPin,
  Users,
  Smartphone,
  Hand,
  AudioLines,
  BadgeCheck,
  Ticket,
  Wifi,
  QrCode,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reusable 3D Tilt Card                                              */
/* ------------------------------------------------------------------ */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 20;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 20;
    setStyle({ rotateX, rotateY });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="tilt-card-inner h-full"
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function Hero() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = ticketRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      rotateY: ((x - rect.width / 2) / rect.width) * 25,
      rotateX: ((rect.height / 2 - y) / rect.height) * 25,
    });
  }, []);

  const handleLeave = useCallback(() => setTilt({ rotateX: 0, rotateY: 0 }), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-16">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/15 text-primary border border-primary/20 mb-6">
            Next-Gen Events
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Craft
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Unforgettable{" "}
            </span>
            Events
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-8 leading-relaxed">
            The all-in-one platform for planning, managing, and experiencing world-class events with cutting-edge technology.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
          >
            Register Now
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Floating Ticket */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div
            ref={ticketRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="floating-ticket cursor-pointer"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: tilt.rotateX === 0 ? "transform 0.6s ease-out" : "transform 0.1s ease-out",
            }}
          >
            <div className="relative w-72 md:w-80 rounded-2xl overflow-hidden glass-card p-8 bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Dashed cut-line */}
              <div className="absolute right-0 top-[60%] w-full border-t-2 border-dashed border-primary/20" />
              <div className="absolute -right-4 top-[60%] -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
              <div className="absolute -left-4 top-[60%] -translate-y-1/2 w-8 h-8 rounded-full bg-background" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center parallax-icon">
                  <Ticket className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">EventX Pass</p>
                  <p className="text-muted-foreground text-xs">Premium Access</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground mb-8">
                <p>🗓 March 15-17, 2026</p>
                <p>📍 Grand Convention Center</p>
                <p>🎫 VIP All-Access</p>
              </div>
              <div className="flex items-center justify-between pt-4">
                <QrCode className="text-primary/60" size={48} />
                <p className="text-xs text-muted-foreground">ADMIT ONE</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Card Data                                                  */
/* ------------------------------------------------------------------ */
const features = [
  {
    title: "Interactive Floor Plan",
    description: "Navigate your event space with a dynamic, zoomable SVG map. Tap booths to get exhibitor info instantly.",
    icon: MapPin,
    accent: "from-primary to-primary/60",
    svgMap: true,
  },
  {
    title: "Smart Matching",
    description: "AI connects attendees with shared interests. Watch your network grow through intelligent recommendations.",
    icon: Users,
    accent: "from-secondary to-secondary/60",
    avatars: true,
  },
  {
    title: "PWA / Offline Check-in",
    description: "Works without internet. Check in attendees with QR codes even in airplane mode.",
    icon: Smartphone,
    accent: "from-primary to-secondary",
    phone: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature Grid                                                       */
/* ------------------------------------------------------------------ */
function FeatureGrid() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Core{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Everything you need to deliver exceptional event experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl p-8 h-full flex flex-col bg-background/40 backdrop-blur-md border border-white/5">
                  {/* Parallax BG shape */}
                  <div className="parallax-bg absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-10" style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))` }} />

                  {/* Icon */}
                  <div className={`parallax-icon w-14 h-14 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-6 shadow-lg`}>
                    <f.icon className="text-primary-foreground" size={26} />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {f.description}
                  </p>

                  {/* Card-specific visuals */}
                  {f.svgMap && (
                    <div className="mt-6 rounded-xl bg-muted/50 p-4 overflow-hidden">
                      <svg viewBox="0 0 200 120" className="w-full h-20 text-primary/40">
                        <rect x="10" y="10" width="40" height="30" rx="4" fill="currentColor" opacity="0.3" />
                        <rect x="60" y="10" width="60" height="30" rx="4" fill="currentColor" opacity="0.5" />
                        <rect x="130" y="10" width="55" height="50" rx="4" fill="currentColor" opacity="0.4" />
                        <rect x="10" y="50" width="50" height="40" rx="4" fill="currentColor" opacity="0.6" />
                        <rect x="70" y="50" width="50" height="60" rx="4" fill="currentColor" opacity="0.3" />
                        <rect x="130" y="70" width="55" height="40" rx="4" fill="currentColor" opacity="0.5" />
                        <circle cx="100" cy="60" r="6" fill="hsl(265 90% 60%)" />
                      </svg>
                    </div>
                  )}

                  {f.avatars && (
                    <div className="mt-6 flex items-center justify-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold">A</div>
                      <svg width="60" height="2" className="glow-line">
                        <line x1="0" y1="1" x2="60" y2="1" stroke="hsl(265 90% 60%)" strokeWidth="2" />
                      </svg>
                      <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-xs font-bold">B</div>
                      <svg width="60" height="2" className="glow-line">
                        <line x1="0" y1="1" x2="60" y2="1" stroke="hsl(220 80% 55%)" strokeWidth="2" />
                      </svg>
                      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold">C</div>
                    </div>
                  )}

                  {f.phone && (
                    <div className="mt-6 flex justify-center">
                      <div className="relative w-20 rounded-xl border-2 border-muted p-2">
                        <div className="w-full aspect-[9/16] rounded-lg bg-muted/50 flex items-center justify-center">
                          <Wifi size={16} className="text-primary/60" />
                        </div>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 parallax-icon">
                          <QrCode size={28} className="text-primary" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Innovation Suite                                                   */
/* ------------------------------------------------------------------ */
function InnovationSuite() {
  const [micHover, setMicHover] = useState(false);

  return (
    <section id="innovation" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Innovation{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Suite
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Futuristic tools that redefine the event experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Gesture + Speech HUD card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="h-full">
              <div className="hud-card rounded-2xl p-10 h-full relative overflow-hidden bg-background/40 backdrop-blur-md border border-white/5">
                {/* HUD corners */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-md" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-md" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-md" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-md" />

                <div className="parallax-icon flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Hand className="text-primary" size={28} />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <AudioLines className="text-secondary" size={28} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">Gesture & Speech Control</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Navigate presentations with hand gestures. Control event displays with voice commands. The future of event interaction.
                </p>

                {/* Voice command simulation */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border">
                  <div
                    className="mic-pulse w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer flex-shrink-0"
                    onMouseEnter={() => setMicHover(true)}
                    onMouseLeave={() => setMicHover(false)}
                  >
                    <Mic className={`transition-colors ${micHover ? "text-primary" : "text-muted-foreground"}`} size={22} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {micHover ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-medium"
                      >
                        {`"Show me the agenda for Day 2..."`}
                      </motion.span>
                    ) : (
                      "Hover the mic to simulate a voice command"
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Badge Designer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="h-full">
              <div className="glass-card rounded-2xl p-10 h-full bg-background/40 backdrop-blur-md border border-white/5">
                <div className="parallax-icon w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg">
                  <BadgeCheck className="text-primary-foreground" size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Badge Designer</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Drag-and-drop badge builder with live 3D preview. Design professional event badges in minutes.
                </p>

                {/* Floating badge preview */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-48 rounded-xl border-2 border-primary/20 bg-muted/30 p-5 shadow-2xl shadow-primary/10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/30" />
                      <div className="space-y-1.5">
                        <div className="w-16 h-2 bg-foreground/20 rounded" />
                        <div className="w-12 h-1.5 bg-muted-foreground/20 rounded" />
                      </div>
                    </div>
                    <div className="w-full h-px bg-border mb-3" />
                    <div className="flex items-center justify-between">
                      <Sparkles size={14} className="text-primary/50" />
                      <div className="w-8 h-8">
                        <QrCode size={32} className="text-muted-foreground/40" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const Page = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <InnovationSuite />
      <Footer />
    </div>
  );
};

export default Page;
