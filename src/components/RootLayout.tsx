import { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Home, ClipboardList, Bell, User as UserIcon, Plus, Search, MessageSquare, Trophy, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/hooks/use-auth';

export default function RootLayout() {
  const { lng } = useParams();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
    // Set direction
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng || 'ar';
  }, [lng, i18n]);

  const navItems = [
    { icon: Home, label: t('common:home'), path: `/${lng}/` },
    { icon: Search, label: t('common:browse_markdown') || 'تصفح الخدمات', path: `/${lng}/services` },
    { icon: MessageSquare, label: t('common:chat') || 'المحادثات', path: `/${lng}/chat` },
    { icon: ClipboardList, label: t('common:my_requests'), path: `/${lng}/services` },
    { icon: Wallet, label: t('common:wallet') || 'المحفظة', path: `/${lng}/profile` },
  ];

  const bottomNavItems = [
    { icon: Home, label: t('common:home'), path: `/${lng}/` },
    { icon: ClipboardList, label: t('common:my_requests'), path: `/${lng}/services` },
    { icon: Bell, label: t('common:notifications'), path: `/${lng}/notifications` },
    { icon: UserIcon, label: t('common:profile'), path: `/${lng}/profile` },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex text-foreground">
      <Toaster position="top-center" />
      
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-card border-l border-border flex-col p-6 shadow-sm shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">ي</div>
          <h1 className="text-2xl font-bold text-foreground">يا معين</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === `/${lng}/` && location.pathname === `/${lng}`);
            return (
              <button
                key={`${item.path}-${index}`}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 bg-muted rounded-2xl">
          <p className="text-xs text-muted-foreground mb-1">رصيد النقاط الحالي</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{user?.points || 0}</span>
            <span className="text-xs font-medium text-muted-foreground uppercase">{t('common:points')}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pb-20 md:pb-0 overflow-x-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex justify-between items-center p-8 bg-background/80 backdrop-blur sticky top-0 z-40">
          <div className="relative w-96">
            <input 
              type="text" 
              placeholder="عن ماذا تبحث اليوم؟" 
              className="w-full bg-card border border-border rounded-full py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
            <span className="absolute right-3 top-2.5 opacity-40">
              <Search className="h-4 w-4" />
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-card border border-border shadow-sm">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3 bg-card p-1.5 pl-4 border border-border rounded-full shadow-sm">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold border border-border">
                {user?.name?.[0] || 'ي'}
              </div>
              <div className="text-right">
                <p className="text-xs font-bold">{user?.name || 'مستخدم'}</p>
                <p className="text-[10px] text-muted-foreground">صنعاء، اليمن</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FAB - Mobile Only */}
        <div className="md:hidden fixed bottom-24 right-4 z-50">
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-2xl bg-primary shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate(`/${lng}/post`)}
          >
            <Plus className="h-8 w-8 text-white" />
          </Button>
        </div>

        {/* Bottom Nav - Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border flex items-center justify-around px-2 z-40">
          {bottomNavItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === `/${lng}/` && location.pathname === `/${lng}`);
            return (
              <button
                key={`${item.path}-${index}`}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className={`h-6 w-6 ${isActive ? 'fill-primary/10' : ''}`} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
