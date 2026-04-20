import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, LogOut, Star, History, Bell, Edit2, ChevronLeft, ChevronRight, Coins, Wallet, Shield } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const transactions = [
    { id: '1', reason: 'مكافأة تسجيل', amount: 100, date: '2026-04-10', type: 'credit' },
    { id: '2', reason: 'خدمة لغة عربية', amount: -20, date: '2026-04-15', type: 'debit' },
    { id: '3', reason: 'تقديم استشارة تقنية', amount: 150, date: '2026-04-18', type: 'credit' },
  ];

  if (!user) return <div className="p-10 text-center">Please login</div>;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border bg-card shadow-sm">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Profile Info Card */}
      <Card className="p-8 rounded-2xl border-border bg-card shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback className="bg-primary text-white text-4xl font-bold">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-right flex-1">
            <h2 className="text-2xl font-black text-foreground">{user.name}</h2>
            <p className="text-muted-foreground font-medium mb-4">{t(`common:${user.city}`)}، اليمن</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground rounded-full px-3 border-0 py-1 font-bold text-[10px] uppercase">مستخدم موثوق</Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 rounded-full px-3 border-0 py-1 font-bold text-[10px] uppercase">متطوع نشط</Badge>
            </div>
          </div>

          <Button variant="outline" className="rounded-full px-6 h-10 gap-2 border-border shadow-sm hover:bg-muted shrink-0">
             <Edit2 className="h-4 w-4" />
             <span className="text-sm font-bold">تعديل البيانات</span>
          </Button>
        </div>
        
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Column */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 rounded-2xl bg-card border-border shadow-sm flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
              <Star className="h-7 w-7 text-orange-400 fill-orange-400" />
            </div>
            <span className="text-3xl font-black text-foreground">4.8</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-1">{user.ratingCount} تقييم</span>
          </Card>

          <Card className="p-6 rounded-2xl bg-card border-border shadow-sm flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4">
              <Wallet className="h-7 w-7 text-primary" />
            </div>
            <span className="text-3xl font-black text-foreground">{user.points}</span>
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-1">{t('common:points')}</span>
          </Card>
        </div>

        {/* Transactions Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <History className="h-4 w-4" />
              آخر العمليات
            </h3>
            <Button variant="link" className="text-primary text-xs font-bold hover:no-underline">عرض السجل الكامل</Button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tx.type === 'credit' ? 'bg-accent text-primary' : 'bg-red-50 text-red-600'}`}>
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">{tx.reason}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-lg font-black ${tx.type === 'credit' ? 'text-primary' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : ''}{tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings/Account Actions Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">إعدادات الحساب</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 justify-between px-6 bg-card border-border rounded-xl hover:bg-muted group transition-all">
            <div className="flex items-center gap-4">
               <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell className="h-5 w-5" />
               </div>
               <span className="font-bold text-foreground">تنبيهات النظام</span>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 ring-4 ring-red-500/20" />
          </Button>

          <Button variant="outline" className="h-16 justify-between px-6 bg-card border-border rounded-xl hover:bg-muted group transition-all">
            <div className="flex items-center gap-4">
               <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5" />
               </div>
               <span className="font-bold text-foreground">الأمان والخصوصية</span>
            </div>
            {lng === 'ar' ? <ChevronLeft className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
          </Button>

          <Button 
            variant="outline" 
            className="md:col-span-2 h-16 justify-between px-6 bg-red-50/10 border-red-100 rounded-xl hover:bg-red-50 text-red-600 group transition-all"
            onClick={logout}
          >
            <div className="flex items-center gap-4">
               <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LogOut className="h-5 w-5" />
               </div>
               <span className="font-bold">تسجيل الخروج من الحساب</span>
            </div>
            <span className="text-[10px] uppercase font-black opacity-50 tracking-widest">Logout</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
