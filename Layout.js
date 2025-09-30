import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
    LayoutDashboard,
    Wind,
    User,
    FileText,
    Settings,
    Menu,
    X,
    Sun,
    Moon,
    ShieldCheck,
    Search,
    Map,
    Users,
    BookOpen,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import NotificationPanel from "./components/common/NotificationPanel";

const navigationItems = [
    { title: "Dashboard", urlKey: "Dashboard", icon: LayoutDashboard },
    { title: "Forecast", urlKey: "Forecast", icon: Wind },
    { title: "Live Map", urlKey: "LiveMap", icon: Map },
    { title: "My Health", urlKey: "MyHealth", icon: User },
    { title: "Policy Hub", urlKey: "PolicyHub", icon: ShieldCheck },
    { title: "Community", urlKey: "Community", icon: Users },
    { title: "Education", urlKey: "Education", icon: BookOpen },
    { title: "Rewards", urlKey: "Rewards", icon: Award },
];

function NavLink({ item, location, isMobile, onClick }) {
    const isActive = location.pathname === createPageUrl(item.urlKey);
    return (
        <Link
            to={createPageUrl(item.urlKey)}
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium
            ${isMobile ? 'justify-center flex-col text-xs gap-1 h-14' : ''}
            ${isActive
                ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 shadow-lg border border-emerald-500/30"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105"
            }`}
        >
            <item.icon className={`${isMobile ? "w-5 h-5" : "w-4 h-4"} ${isActive ? 'text-emerald-400' : ''}`} />
            <span className={isActive ? 'font-semibold' : ''}>{item.title}</span>
        </Link>
    );
}

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);
    
    const pageTitle = currentPageName.replace(/([A-Z])/g, ' $1').trim();

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
             <style jsx global>{`
                :root { /* Dark Mode Variables */
                    --background: 222 84% 4.9%;
                    --foreground: 210 40% 98%;
                    --card: 224 71% 10%;
                    --card-foreground: 210 40% 98%;
                    --popover: 222 84% 4.9%;
                    --popover-foreground: 210 40% 98%;
                    --primary: 142 71% 45%;
                    --primary-foreground: 210 40% 98%;
                    --secondary: 217 32% 17.5%;
                    --secondary-foreground: 210 40% 98%;
                    --muted: 217 32% 21%;
                    --muted-foreground: 215 20.2% 65.1%;
                    --accent: 217 32% 25%;
                    --accent-foreground: 210 40% 98%;
                    --destructive: 0 62.8% 30.6%;
                    --destructive-foreground: 210 40% 98%;
                    --border: 217 32% 17.5%;
                    --input: 217 32% 17.5%;
                    --ring: 142 71% 45%;
                    --radius: 0.75rem;
                }

                html:not(.dark) { /* Light Mode Variables */
                    --background: 0 0% 98%;
                    --foreground: 222 84% 4.9%;
                    --card: 0 0% 100%;
                    --card-foreground: 222 84% 4.9%;
                    --popover: 0 0% 100%;
                    --popover-foreground: 222 84% 4.9%;
                    --primary: 142 71% 45%;
                    --primary-foreground: 210 40% 98%;
                    --secondary: 210 40% 96.1%;
                    --secondary-foreground: 222 84% 4.9%;
                    --muted: 210 40% 96.1%;
                    --muted-foreground: 215.4 16.3% 46.9%;
                    --accent: 210 40% 94.1%;
                    --accent-foreground: 222 84% 4.9%;
                    --destructive: 0 84.2% 60.2%;
                    --destructive-foreground: 210 40% 98%;
                    --border: 214.3 31.8% 91.4%;
                    --input: 214.3 31.8% 91.4%;
                    --ring: 142 71% 45%;
                }

                .bg-background { background-color: hsl(var(--background)); }
                .text-foreground { color: hsl(var(--foreground)); }
                .bg-card { background-color: hsl(var(--card)); }
                .text-card-foreground { color: hsl(var(--card-foreground)); }
                .border-border { border-color: hsl(var(--border)); }
                .bg-muted { background-color: hsl(var(--muted)); }
                .text-muted-foreground { color: hsl(var(--muted-foreground)); }
                .bg-accent { background-color: hsl(var(--accent)); }
                .text-accent-foreground { color: hsl(var(--accent-foreground)); }
                
                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .text-xl { font-size: 1.125rem; line-height: 1.75rem; }
                    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
                    .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                    .p-4 { padding: 0.75rem; }
                    .p-6 { padding: 1rem; }
                    .gap-4 { gap: 0.75rem; }
                    .gap-6 { gap: 1rem; }
                }
            `}</style>
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-card/80 backdrop-blur-xl border-r border-border p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Wind className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl text-foreground">Jeevan Vayu</h1>
                        <p className="text-xs text-muted-foreground">Clean Air, Healthy Life</p>
                    </div>
                </div>
                
                <nav className="flex-1 flex flex-col gap-2">
                    {navigationItems.map(item => <NavLink key={item.title} item={item} location={location} />)}
                </nav>
                
                <div className="mt-auto space-y-2">
                     <Button variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)} className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-xl h-11">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </Button>
                    <Link to={createPageUrl("Settings")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <motion.aside 
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-80 bg-card border-r border-border p-6 z-50 flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                                        <Wind className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-2xl text-foreground">Jeevan Vayu</h1>
                                        <p className="text-xs text-muted-foreground">Clean Air, Healthy Life</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="hover:bg-accent rounded-xl">
                                    <X className="w-6 h-6 text-muted-foreground" />
                                </Button>
                            </div>
                            
                            <nav className="flex-1 flex flex-col gap-2">
                                {navigationItems.map(item => <NavLink key={item.title} item={item} location={location} onClick={() => setIsSidebarOpen(false)} />)}
                            </nav>
                            
                            <div className="mt-auto space-y-2">
                                <Button variant="ghost" onClick={() => {setIsDarkMode(!isDarkMode); setIsSidebarOpen(false);}} className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-xl h-11">
                                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                                </Button>
                                <Link to={createPageUrl("Settings")} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 flex flex-col bg-background text-foreground">
                {/* Enhanced Mobile Header */}
                <header className="flex items-center justify-between h-16 px-4 border-b border-border bg-card/80 backdrop-blur-xl lg:hidden shadow-lg">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsSidebarOpen(true)}
                        className="hover:bg-accent rounded-xl"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                        {pageTitle}
                    </h1>
                    <Button variant="ghost" size="icon" className="hover:bg-accent rounded-xl">
                        <Search className="w-5 h-5" />
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                
                {/* Enhanced Mobile Bottom Navigation */}
                <nav className="lg:hidden grid grid-cols-5 items-center bg-card/90 backdrop-blur-xl border-t border-border px-2 py-1 shadow-2xl">
                    {navigationItems.slice(0,5).map(item => <NavLink key={item.title} item={item} location={location} isMobile={true} />)}
                </nav>
            </main>

            {/* Notification Panel */}
            <NotificationPanel />
        </div>
    );
}