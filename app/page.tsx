"use client"

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, Clock, CreditCard, MapPin, Star, Music, Users, Coffee, Shield, Heart, Sparkles } from "lucide-react";

// Brand Colors
const BRAND = {
  gold: "#C9A24D",
  black: "#0B0B0B",
  white: "#F5F5F5",
  amber500: "#F59E0B",
};

/**
 * PRODUCTION NOTES
 * ----------------
 * Payments: Stripe Checkout (Card, Apple Pay, Google Pay)
 * Backend: Supabase (Auth, DB, Storage, Edge Functions)
 * Email: Mailchimp/ConvertKit via webhook after purchase + reminders
 * QR Tickets: Generate on backend after successful payment
 * ENV VARS (example):
 *  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *  - STRIPE_SECRET_KEY (server)
 *  - SUPABASE_URL
 *  - SUPABASE_ANON_KEY
 *  - MAILCHIMP_API_KEY / CONVERTKIT_API_KEY
 */

const EVENT_DATE = new Date("2025-12-31T20:30:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  
  useEffect(() => {
    // Set initial value on client only
    setNow(Date.now());
    
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  
  // Return null during hydration, actual values after client-side mount
  if (now === null) {
    return { d: 0, h: 0, m: 0, s: 0, diff: 0 };
  }
  
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, diff };
}

export default function GalaPage() {
  const { d, h, m, s } = useCountdown(EVENT_DATE);
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");

  const tickets = useMemo(() => ([
    { id: "vip-red", name: "VIP Red", price: 250, color: "🔴", badge: "Premium" },
    { id: "blue", name: "Blue", price: 200, color: "🔵", badge: "Popular" },
    { id: "green", name: "Green", price: 175, color: "🟢" },
    { id: "yellow", name: "Yellow", price: 150, color: "🟡" },
    { id: "purple", name: "Purple", price: 120, color: "🟣" },
    { id: "group", name: "Group (4+ People)", price: 145, color: "🟢", badge: "Best Value" },
  ]), []);

  const startCheckout = async (ticketId: string) => {
    // TODO: Call your backend endpoint to create a Stripe Checkout Session
    // POST /api/checkout { ticketId, promo }
    alert(`Redirect to Stripe Checkout for ${ticketId}`);
  };

  const subscribe = async (): Promise<void> => {
    // TODO: Send email to Mailchimp/ConvertKit
    alert(`Subscribed: ${email}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* SEO: metadata is exported via `export const metadata` for the App Router */}

      {/* HERO */}
      <section 
        className="relative h-[95vh] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gala-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full border border-amber-500/50 text-amber-400 text-sm font-semibold uppercase tracking-wider">
                Limited Seating • Premium Experience
              </span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-lg leading-tight">
              The Ultimate Black & Gold
            </motion.h1>
            
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-3xl md:text-4xl font-light text-amber-300 drop-shadow-md">
              New Year's Eve Gala 2026
            </motion.h2>
            
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-6 text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
              A luxury dinner, live orchestra, and unforgettable countdown celebration featuring world-class Arab artists
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout" className="inline-block">
                <Button size="lg" className="rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-6 text-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50">
                  🎟 Reserve Your Seat
                </Button>
              </Link>
              <a href="#experience" className="inline-block">
                <Button size="lg" variant="outline" className="rounded-lg border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 font-bold px-10 py-6 text-lg transition-all duration-300">
                  📍 View Details
                </Button>
              </a>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-12 flex items-center justify-center gap-3 text-sm">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-amber-100 font-semibold">{d}d {h}h {m}m {s}s until doors open</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Details</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Date & Time</h3>
              <p className="text-sm text-neutral-300">December 31, 2025</p>
              <p className="text-sm text-neutral-400">8:30 PM – 2:00 AM</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Venue</h3>
              <p className="text-sm text-neutral-300">Hilton Universal City</p>
              <p className="text-xs text-neutral-400">Los Angeles, CA</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Dress Code</h3>
              <p className="text-sm text-neutral-300">Black-Tie Formal</p>
              <p className="text-xs text-neutral-400">Elegant & Refined</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Entry Policy</h3>
              <p className="text-sm text-neutral-300">21+ Only</p>
              <p className="text-xs text-neutral-400">Valid ID Required</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="bg-neutral-900/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold">Evening Schedule</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { id: "door-open", time: "8:30 PM", event: "🚪 Door Open" },
              { id: "dinner-concert", time: "10:00 PM", event: "🍽️ Dinner & Concert" },
              { id: "countdown", time: "11:45 PM", event: "⏰ Midnight Countdown" },
              { id: "event-ends", time: "2:00 AM", event: "🎉 Event Ends" }
            ].map((t) => (
              <Card key={t.id} className="bg-neutral-950"><CardContent className="p-4 text-center">
                <p className="text-lg font-semibold text-amber-400">{t.time}</p>
                <p className="text-sm mt-2">{t.event}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Seating & Pricing</h2>
          <p className="text-xl text-neutral-400 mb-2">Choose your perfect vantage point</p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(t => (
            <Card key={t.id} className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 transition-all duration-300" />
              <CardContent className="p-6 relative z-10">
                {t.badge && <Badge className="absolute right-4 top-4 bg-amber-500 text-black text-xs font-bold">{t.badge}</Badge>}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{t.color}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    {t.id === "group" && <p className="text-xs text-amber-400">4+ people</p>}
                  </div>
                </div>
                <div className="border-t border-neutral-700 pt-4 mb-6">
                  <p className="text-3xl font-black text-amber-400">${t.price.toFixed(2)}</p>
                  <p className="text-xs text-neutral-500 mt-1">Per person</p>
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-neutral-700/50">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-300">Reserved seating</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-300">5-star gourmet dinner</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-300">Live orchestra & show</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-300">Midnight countdown access</span>
                  </div>
                </div>
                <Button onClick={()=>startCheckout(t.id)} className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold py-6 transition-all duration-300 hover:shadow-lg"><CreditCard className="mr-2 h-4 w-4" /> Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="bg-neutral-900/50 border border-amber-500/20">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/10 rounded-full mb-4">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Secure Payment</h4>
              <p className="text-sm text-neutral-400">Encrypted by Stripe</p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-900/50 border border-amber-500/20">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/10 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-bold text-white mb-2">All Payment Methods</h4>
              <p className="text-sm text-neutral-400">Cards • Apple Pay • Google Pay</p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-900/50 border border-amber-500/20">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/10 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-bold text-white mb-2">5-Star Venue</h4>
              <p className="text-sm text-neutral-400">Hilton Universal City</p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-900/50 border border-amber-500/20">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 bg-amber-500/10 rounded-full mb-4">
                <Check className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Instant Confirmation</h4>
              <p className="text-sm text-neutral-400">Email receipt & QR ticket</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-gradient-to-r from-amber-950/40 via-neutral-950 to-amber-950/40 py-20 border-y border-amber-500/20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-neutral-400 mb-10 text-lg">Get exclusive updates, early-bird specials, and event reminders</p>
          <div className="flex gap-3 flex-col sm:flex-row sm:items-center sm:justify-center">
            <Input 
              placeholder="Enter your email address" 
              value={email} 
              onChange={e=>setEmail(e.target.value)}
              className="bg-neutral-900/80 border border-neutral-700 text-white placeholder:text-neutral-500 rounded-lg sm:max-w-sm py-3 px-4"
            />
            <Button onClick={subscribe} className="bg-amber-500 hover:bg-amber-600 text-black font-bold min-w-fit py-3 px-8 rounded-lg transition-all duration-300">Get Updates</Button>
          </div>
          <p className="text-xs text-neutral-500 mt-6">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* PERFORMERS */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Exceptional Artists</h2>
            <p className="text-xl text-neutral-400">World-class entertainment</p>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                  <Music className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Abdelkarim Hamdan</h3>
                <p className="text-sm text-amber-500/80 font-semibold mb-4">Arab Idol • TV Shows • International Tours</p>
                <p className="text-neutral-300 mb-4 leading-relaxed">
                  One of the most beloved voices in the Arab world. With warm tone, heartfelt emotion, and remarkable stage presence, he rose to fame from the Arab Idol stage and captured the hearts of millions across the region.
                </p>
                <div className="border-t border-neutral-700 pt-4">
                  <p className="text-neutral-400 italic">
                    "His voice carries the soul of Damascus, the beauty of Syria, and the timeless spirit of Arabic music."
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="inline-block p-3 bg-amber-500/20 rounded-full mb-4">
                  <Music className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Sherine Zaza</h3>
                <p className="text-sm text-amber-500/80 font-semibold mb-4">Celebrated Vocalist • National Anthem</p>
                <p className="text-neutral-300 mb-4 leading-relaxed">
                  A celebrated vocalist known for her graceful presence and soulful voice. She opens the gala with a powerful rendition of the National Anthem, setting the perfect tone for an unforgettable evening.
                </p>
                <div className="border-t border-neutral-700 pt-4">
                  <p className="text-neutral-400">
                    Accompanied by our professional orchestra ensemble to deliver an immersive musical experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHY ATTEND */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why This Gala Is Different</h2>
          <p className="text-xl text-neutral-400">Experience luxury crafted with precision</p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎭</div>
              <h3 className="font-bold text-lg text-white mb-2">Limited Seating</h3>
              <p className="text-sm text-neutral-400">Curated guest list ensures an intimate luxury experience with vetted attendees</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎼</div>
              <h3 className="font-bold text-lg text-white mb-2">Live Orchestra</h3>
              <p className="text-sm text-neutral-400">Professional ensemble performs live music throughout the evening</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h3 className="font-bold text-lg text-white mb-2">5-Star Dining</h3>
              <p className="text-sm text-neutral-400">Michelin-trained chefs curate a gourmet menu for fine dining</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌟</div>
              <h3 className="font-bold text-lg text-white mb-2">World-Class Artists</h3>
              <p className="text-sm text-neutral-400">Renowned Arab performers with international stage experience</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">✨</div>
              <h3 className="font-bold text-lg text-white mb-2">Professional Production</h3>
              <p className="text-sm text-neutral-400">Experienced event team ensures flawless execution and timing</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="font-bold text-lg text-white mb-2">Luxury Atmosphere</h3>
              <p className="text-sm text-neutral-400">Black & gold décor, lighting design, and ambiance carefully crafted</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-gradient-to-b from-neutral-950/80 to-black backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg text-amber-400 mb-6">Gala Event</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Experience the pinnacle of luxury with the Black & Gold New Year's Eve Gala 2026. Fine dining, world-class entertainment, and unforgettable celebration.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg text-amber-400 mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link href="/" className="hover:text-amber-400 transition duration-300">Home</Link></li>
                <li><a href="#experience" className="hover:text-amber-400 transition duration-300">Event Details</a></li>
                <li><a href="#experience" className="hover:text-amber-400 transition duration-300">Performers</a></li>
                <li><Link href="/checkout" className="hover:text-amber-400 transition duration-300">Reserve Seat</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg text-amber-400 mb-6">Contact</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">📧</span>
                  <a href="mailto:vibesup.event@gmail.com" className="hover:text-amber-400 transition">vibesup.event@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">📱</span>
                  <a href="tel:+19492479309" className="hover:text-amber-400 transition">+1 (949) 247-9309</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">🌐</span>
                  <a href="https://wa.me/19492479309" className="hover:text-amber-400 transition" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg text-amber-400 mb-6">Legal</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-neutral-800 pt-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-neutral-500">© 2025 Black & Gold New Year's Eve Gala. All rights reserved.</p>
              <p className="text-sm text-neutral-500">
                Presented by <span className="text-amber-500 font-semibold">California Nights Entertainment</span>
              </p>
            </div>
          </div>
          
          {/* Refund Policy Note */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 text-center">
            <p className="text-xs text-neutral-400">
              Tickets are final to preserve the quality and exclusivity of the event experience. 
              <br className="hidden sm:block" />
              For questions, contact us at vibesup.event@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


