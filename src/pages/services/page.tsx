import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MapPin, BookOpen, Wrench, Laptop, Truck, MoreHorizontal, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ServicesPage() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const services = [
    { 
      id: '1', title: 'دروس لغة عربية', location: 'صنعاء', points: 50, category: 'education', status: 'open', 
      user: 'محمد يحيى', time: 'ساعة مضت', tagColor: 'bg-emerald-50 text-emerald-600'
    },
    { 
      id: '2', title: 'إصلاح مكيف هواء', location: 'عدن', points: 120, category: 'maintenance', status: 'in_progress', 
      user: 'سعيد صالح', time: '3 ساعات مضت', tagColor: 'bg-orange-50 text-orange-600'
    },
    { 
      id: '3', title: 'برمجة موقع تعريفي', location: 'المكلا', points: 250, category: 'tech', status: 'open', 
      user: 'خالد عمر', time: 'يوم مضى', tagColor: 'bg-blue-50 text-blue-600'
    },
    { 
      id: '4', title: 'توصيل طلبات تموين', location: 'تعز', points: 40, category: 'transport', status: 'completed', 
      user: 'علي حسن', time: 'منذ يومين', tagColor: 'bg-slate-50 text-slate-600'
    },
    { 
      id: '5', title: 'تصميم هوية بصرية', location: 'صنعاء', points: 180, category: 'design', status: 'open', 
      user: 'هدى محمد', time: '4 ساعات مضت', tagColor: 'bg-purple-50 text-purple-600'
    },
  ];

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'education', label: t('common:education') },
    { id: 'maintenance', label: t('common:maintenance') },
    { id: 'tech', label: t('common:tech') },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">تصفح الخدمات</h1>
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Input 
            placeholder="ابحث عن خدمة..." 
            className="pr-10 rounded-full border-border h-11 bg-card shadow-sm focus:ring-primary/20"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="bg-transparent space-x-2 rtl:space-x-reverse overflow-x-auto no-scrollbar justify-start h-auto p-0 pb-1">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat.id} 
              value={cat.id}
              className="rounded-full px-6 py-2 border border-border data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all text-xs font-medium"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.filter(s => filter === 'all' || s.category === filter).map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="h-full group hover:border-primary/30 transition-all cursor-pointer p-6 rounded-2xl border border-border shadow-sm hover:shadow-md flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className={`${service.tagColor} border-0 rounded-lg px-2 py-1 text-[10px] font-black uppercase`}>
                  {service.category}
                </Badge>
                <div className="flex flex-col items-end">
                   <span className="text-primary font-bold text-lg">+{service.points}</span>
                   <span className="text-[10px] text-muted-foreground uppercase font-bold">{t('common:points')}</span>
                </div>
              </div>

              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{service.title}</h3>
              
              <div className="flex items-center text-muted-foreground text-xs mb-6 font-medium">
                <MapPin className="h-3.5 w-3.5 ml-1 rtl:mr-1 opacity-70" />
                <span>{service.location} • {service.time}</span>
              </div>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xs">
                    {service.user[0]}
                  </div>
                  <span className="text-xs font-bold text-foreground">{service.user}</span>
                </div>
                <div className="flex items-center gap-0.5 text-orange-400">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
