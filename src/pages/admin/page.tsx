import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Users, ClipboardList, CheckCircle, Ban, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const { t } = useTranslation();

  const stats = [
    { label: 'إجمالي المستخدمين', value: '450', icon: Users, color: 'text-blue-600' },
    { label: 'طلبات مفتوحة', value: '120', icon: ClipboardList, color: 'text-emerald-600' },
    { label: 'طلبات مكتملة', value: '890', icon: CheckCircle, color: 'text-primary' },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center space-x-2 rtl:space-x-reverse">
        <TrendingUp className="h-6 w-6 text-primary" />
        <span>لوحة التحكم (الإحصائيات)</span>
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="p-4 flex items-center justify-between rounded-2xl border-slate-100 shadow-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
               <div className={`h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800">{stat.value}</p>
               </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">إدارة الخدمات</h3>
        <Card className="p-4 rounded-2xl border-slate-100 bg-slate-50 flex items-center justify-between">
           <span className="text-sm">هنا يمكن للمسؤول إلغاء أو تعديل الطلبات النشطة</span>
           <Ban className="h-5 w-5 text-red-400" />
        </Card>
      </div>
    </div>
  );
}
