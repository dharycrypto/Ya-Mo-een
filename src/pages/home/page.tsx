import { useTranslation } from 'react-i18next';
import { Search, Bell, User as UserIcon, BookOpen, Wrench, Laptop, Truck, MoreHorizontal, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export default function HomePage() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const { user } = useAuth();

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'tech', label: 'برمجة وتقنية' },
    { id: 'education', label: 'تعليم ولغات' },
    { id: 'maintenance', label: 'صيانة منزلية' },
    { id: 'design', label: 'تصميم وجرافيك' },
  ];

  const services = [
    {
      id: '1',
      title: 'تصميم واجهة تطبيق توصيل',
      description: 'أبحث عن مصمم محترف لتصميم واجهات تطبيق أندرويد لخدمة توصيل في عدن.',
      location: 'عدن',
      points: 150,
      status: 'open',
      category: 'برمجة',
      tagColor: 'bg-blue-50 text-blue-600',
      user: 'أحمد عمر',
      time: 'منذ 2س',
    },
    {
      id: '2',
      title: 'دروس تقوية لغة إنجليزية',
      description: 'مطلوب معلم للتحضير لاختبار التوفل لمدة أسبوعين، ساعتين يومياً.',
      location: 'صنعاء',
      points: 80,
      status: 'in_progress',
      category: 'تعليم',
      tagColor: 'bg-orange-50 text-orange-600',
      user: 'سارة خالد',
      time: 'منذ 5س',
    },
    {
      id: '3',
      title: 'هوية بصرية لمحل حلويات',
      description: 'تصميم شعار وبطاقات عمل وقوائم لمحل حلويات تقليدية جديد في تعز.',
      location: 'تعز',
      points: 200,
      status: 'open',
      category: 'تصميم',
      tagColor: 'bg-purple-50 text-purple-600',
      user: 'فؤاد علي',
      time: 'منذ 10د',
      featured: true,
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Mobile Top Bar (Hidden on Desktop) */}
      <div className="flex md:hidden items-center justify-between mb-4">
        <button className="p-2 text-muted-foreground">
          <Search className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">ي</div>
            <span className="text-[10px] font-bold text-primary mt-0.5">يا معين</span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button className="p-2 text-muted-foreground">
            <UserIcon className="h-6 w-6" />
          </button>
          <button className="p-2 text-muted-foreground relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>
      </div>

      {/* Grid Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Banner */}
        <div className="bg-primary rounded-2xl p-6 md:p-8 text-white md:col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold mb-2">ساعد غيرك، واكسب النقاط!</h2>
            <p className="text-primary-foreground/80 text-sm mb-6 max-w-xs">
              تبادل الخدمات والمهارات مع مجتمعك اليمني بكل سهولة وأمان.
            </p>
            <button className="bg-white text-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-slate-50 transition-colors w-fit">
              اطلب خدمة الآن
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 top-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>

        {/* Stats Cards */}
        <div className="bg-card p-6 rounded-2xl border border-border flex flex-col justify-between shadow-sm">
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">خدمات مكتملة</p>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-foreground">12</h3>
            <div className="flex items-center gap-1 text-primary text-xs mt-1">
              <Star className="h-3 w-3 fill-primary" />
              <span>4.9</span>
              <span className="text-muted-foreground">(8 تقييمات)</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border flex flex-col justify-between shadow-sm">
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">نقاط تم كسبها</p>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-foreground">1,240</h3>
            <div className="text-xs text-primary mt-1 font-medium">+120 هذا الشهر</div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap border shrink-0 ${
              idx === 0 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-card border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Services List */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wide">أحدث الطلبات القريبة منك</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full p-5 flex flex-col rounded-2xl border border-border shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-primary/30 ${service.featured ? 'border-r-4 border-r-primary' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className={`${service.tagColor} border-0 rounded px-2 py-1 text-[10px] font-bold`}>
                    {service.category}
                  </Badge>
                  <span className="text-primary font-bold text-sm">+{service.points} {t('common:points')}</span>
                </div>

                <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    {service.user[0]}
                  </div>
                  <span className="text-xs font-medium text-foreground">{service.user}</span>
                  <span className="text-[10px] text-muted-foreground mr-auto">
                    {service.location} • {service.time}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
