"use client";

/**
 * [MODIFIED] Landing Page Rewrite
 * - Replaced the entire component to implement the 'Vibrant Professional' design.
 * - Added framer-motion for animations (fadeIn, stagger).
 * - Implemented a 'Bento Grid' layout for the features section.
 * - Added a glassmorphic 'Abstract Interface Preview' hero element.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Hexagon, BarChart3, Users, ShieldCheck, Zap, Layout, Globe, Command } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function LandingPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary overflow-x-hidden">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Hexagon className="h-5 w-5 fill-current" />
                        </div>
                        Dayflow
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                        <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
                        <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="font-medium">Log in</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button size="sm" className="font-medium shadow-md shadow-primary/20">Get Started</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <Button size="sm" asChild className="font-medium shadow-md shadow-primary/20">
                                <Link href="/dashboard">
                                    Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </SignedIn>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-60"></div>
                    <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[100px] opacity-40"></div>

                    <div className="container flex flex-col items-center text-center gap-8 z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                            <span>v2.0 is live: Automate your entire HR workflow</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-5xl font-heading font-extrabold tracking-tight sm:text-7xl md:text-8xl max-w-5xl bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/60 pb-2"
                        >
                            HR Management, <br />
                            <span className="text-primary bg-clip-text">Reimagined.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="text-lg text-muted-foreground max-w-2xl leading-relaxed sm:text-xl md:text-2xl"
                        >
                            The unified platform for modern teams. Manage attendance, payroll, and performance with a beautiful, intuitive interface.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4"
                        >
                            <SignedOut>
                                <SignUpButton mode="modal">
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                                        Start for free <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all" asChild>
                                    <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                                </Button>
                            </SignedIn>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-muted/50" asChild>
                                <Link href="#features">View Demo</Link> {/* [MODIFIED] Changed to 'View Demo' page.tsx line 127 */ }
                            </Button>
                        </motion.div>

                        {/* Abstract Interface Preview */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="mt-20 relative w-full max-w-6xl aspect-[16/10] rounded-2xl border bg-background/50 shadow-2xl overflow-hidden glass-card group backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-50"></div>
                            
                            {/* Browser Header */}
                            <div className="h-10 border-b bg-muted/30 flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
                                <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
                                <div className="ml-4 h-5 w-64 bg-background/50 rounded-md border text-[10px] text-muted-foreground flex items-center px-2">dayflow.app/dashboard</div>
                            </div>
                            
                            {/* Dashboard Mockup Layout */}
                            <div className="flex h-full">
                                {/* Sidebar */}
                                <div className="w-64 border-r bg-muted/10 p-4 space-y-6 hidden md:block">
                                    <div className="h-8 w-32 bg-primary/10 rounded-md animate-pulse"></div>
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="h-8 w-full bg-muted/20 rounded-md flex items-center gap-3 px-3">
                                                <div className="h-4 w-4 bg-muted/40 rounded-full"></div>
                                                <div className="h-3 w-24 bg-muted/30 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Main Content */}
                                <div className="flex-1 p-8 bg-background/40">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-32 rounded-xl border bg-card p-5 shadow-sm space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="h-10 w-10 rounded-lg bg-primary/10"></div>
                                                    <div className="h-4 w-12 bg-muted/20 rounded"></div>
                                                </div>
                                                <div className="h-6 w-24 bg-muted/30 rounded"></div>
                                                <div className="h-3 w-full bg-muted/10 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-64 rounded-xl border bg-card p-6 shadow-sm flex flex-col gap-4">
                                        <div className="flex justify-between">
                                            <div className="h-6 w-32 bg-muted/30 rounded"></div>
                                            <div className="h-8 w-24 bg-primary/20 rounded"></div>
                                        </div>
                                        <div className="flex-1 rounded-lg bg-muted/5 border-2 border-dashed border-muted/20 flex items-center justify-center text-muted-foreground/50">
                                            Interactive Data Visualization
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section - Bento Grid */}
                <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-40"></div>
                    
                    <div className="container">
                        <div className="mb-20 text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">Everything you need. <br/>All in one place.</h2>
                            <p className="mt-6 text-xl text-slate-500">Dayflow handles the boring stuff so you can focus on building your team and growing your business.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px] md:h-[600px]">
                            {/* Feature 1 - Large Left */}
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <BarChart3 className="w-64 h-64 text-primary" />
                                </div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                                            <Zap className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Automated Payroll</h3>
                                        <p className="text-slate-500 max-w-sm">Calculate salaries, taxes, and deductions instantly. One-click payout integration.</p>
                                    </div>
                                    <div className="w-full bg-slate-50 rounded-xl p-4 border mt-8">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm font-medium">Processing...</div>
                                            <div className="text-xs text-green-600 font-bold">100%</div>
                                        </div>
                                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Feature 2 - Small Top Right */}
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="col-span-1 row-span-1 bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Secure by Default</h3>
                                <p className="text-slate-500 text-sm">Enterprise-grade encryption for all your sensitive employee data.</p>
                            </motion.div>

                            {/* Feature 3 - Small Bottom Left */}
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="col-span-1 row-span-1 bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                                    <Users className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Team Management</h3>
                                <p className="text-slate-500 text-sm">Onboard new hires in seconds with automated workflows.</p>
                            </motion.div>

                            {/* Feature 4 - Large Bottom Right */}
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-primary to-violet-700 rounded-3xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full gap-8">
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-bold mb-4">Start your journey today.</h3>
                                        <p className="text-indigo-100 max-w-md">Join thousands of forward-thinking companies building better workplaces.</p>
                                    </div>
                                    <div>
                                        <SignedOut>
                                            <SignUpButton mode="modal">
                                                <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 border-0 h-14 px-8 text-lg font-bold">
                                                    Get Started
                                                </Button>
                                            </SignUpButton>
                                        </SignedOut>
                                        <SignedIn>
                                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 border-0 h-14 px-8 text-lg font-bold" asChild>
                                                <Link href="/dashboard">Dashboard</Link>
                                            </Button>
                                        </SignedIn>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Social Proof / Trust */}
                <section className="py-20 bg-white border-t">
                    <div className="container text-center">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Trusted by modern teams at</p>
                        <div className="flex items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                             {/* Placeholders for logos */}
                             <div className="flex items-center gap-2 font-bold text-xl"><Command className="w-6 h-6" /> Acme Corp</div>
                             <div className="flex items-center gap-2 font-bold text-xl"><Layout className="w-6 h-6" /> Stark Ind</div>
                             <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> GlobalDynamic</div>
                             <div className="flex items-center gap-2 font-bold text-xl"><Hexagon className="w-6 h-6" /> Umbrellas</div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-12 bg-slate-50">
                <div className="container grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-heading font-bold text-xl">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Hexagon className="h-5 w-5 fill-current" />
                            </div>
                            Dayflow
                        </div>
                        <p className="text-sm text-slate-500">
                            Making work flow better <br /> for everyone, everywhere.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li className="hover:text-primary cursor-pointer">Features</li>
                            <li className="hover:text-primary cursor-pointer">Pricing</li>
                            <li className="hover:text-primary cursor-pointer">Changelog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li className="hover:text-primary cursor-pointer">About</li>
                            <li className="hover:text-primary cursor-pointer">Careers</li>
                            <li className="hover:text-primary cursor-pointer">Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-primary cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <div className="container mt-12 pt-8 border-t text-center text-sm text-slate-400">
                    © {new Date().getFullYear()} Dayflow Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
