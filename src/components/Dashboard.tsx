import React from "react";
import { ResumeData, RoleType } from "../types";
import { Sparkles, Award, Target, FileCheck, Shield, ChevronLeft, ArrowLeft, Trophy, Users, Globe } from "lucide-react";

interface DashboardProps {
  resumeData: ResumeData;
  roleType: RoleType;
  setRoleType: (role: RoleType) => void;
  onNavigate: (tab: string) => void;
  isPro: boolean;
  onShowPayment: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  resumeData,
  roleType,
  setRoleType,
  onNavigate,
  isPro,
  onShowPayment
}) => {
  const roleLabels = {
    student: "طالب",
    grad: "حديث تخرج",
    employee: "موظف ذو خبرة",
    developer: "مطور برمجيات",
    designer: "مصمم واجهات / تجربة"
  };

  const getProfileCompleteness = () => {
    let score = 20; // base score for name
    if (resumeData.personalInfo.email) score += 10;
    if (resumeData.personalInfo.phone) score += 10;
    if (resumeData.personalInfo.summary) score += 15;
    if (resumeData.education.length > 0) score += 15;
    if (resumeData.experience.length > 0) score += 15;
    if (resumeData.projects.length > 0) score += 15;
    return Math.min(score, 100);
  };

  const completeness = getProfileCompleteness();

  return (
    <div className="flex flex-col gap-8 text-right" dir="rtl">
      {/* Welcome Hero Card */}
      <div className="relative overflow-hidden bg-white border border-black/5 rounded-2xl p-8 text-[#121212] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-[#2D5A27]/5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col gap-2 relative z-10">
          <div className="inline-flex max-w-fit items-center gap-1 bg-[#2D5A27]/10 text-[#2D5A27] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={10} />
            <span>مدعوم بالذكاء الاصطناعي بالكامل</span>
          </div>
          <h1 className="text-2xl font-bold font-serif italic text-[#121212]">أهلاً بك في منصة CV<span className="text-[#2D5A27] font-sans font-black">X</span> المهنية الذكية 👋</h1>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed mt-1">
            مساعدك المالي والمهني المتكامل. صممنا لك بيئة متكاملة لكتابة سيرتك الذاتية، تحسين خبراتك لغوياً وتقنياً، واختبار مدى مطابقتك مع الوظائف مجاناً بالكامل.
          </p>
        </div>

        <div className="shrink-0 bg-[#2D5A27]/10 text-[#2D5A27] font-bold px-4 py-2.5 rounded-xl text-xs border border-[#2D5A27]/20 flex items-center gap-1.5 uppercase tracking-widest">
          <Award size={14} />
          <span>عضوية احترافية مجانية بالكامل ✨</span>
        </div>
      </div>

      {/* Stats and Profile type selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completeness Gauge */}
        <div className="bg-white border border-black/5 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold opacity-60">جاهزية السيرة الذاتية</span>
            <span className="font-mono text-[#2D5A27] font-bold">{completeness}%</span>
          </div>
          
          <div className="w-full bg-black/5 h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#2D5A27] h-full rounded-full transition-all duration-1000" style={{ width: `${completeness}%` }}></div>
          </div>

          <p className="text-[11px] text-slate-500 leading-normal">
            {completeness === 100
              ? "تهانينا! سيرتك الذاتية متكاملة وجاهزة للتقديم!"
              : "أكمل إضافة الخبرات والمشاريع للحصول على ملف كامل ونسبة قبول أعلى."}
          </p>

          <button
            onClick={() => onNavigate("builder")}
            className="mt-2 text-xs font-semibold text-[#2D5A27] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>استكمل بناء السيرة الذاتية</span>
            <ArrowLeft size={12} />
          </button>
        </div>

        {/* User Role selection */}
        <div className="bg-white border border-black/5 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <span className="text-xs font-bold opacity-60">مسارك المهني الحالي:</span>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            {Object.entries(roleLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setRoleType(key as RoleType)}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border text-center transition cursor-pointer ${
                  roleType === key
                    ? "bg-[#2D5A27]/10 border-[#2D5A27] text-[#2D5A27] font-bold"
                    : "bg-black/5 border-transparent text-slate-600 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-400">نستخدم مسارك المهني لتخصيص نصائح وإرشادات الذكاء الاصطناعي.</span>
        </div>

        {/* Quick Tips */}
        <div className="bg-white border border-black/5 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
          <span className="text-xs font-bold opacity-60">💡 نصيحة مهنية سريعة:</span>
          <div className="bg-[#2D5A27]/5 p-4 rounded-xl border border-[#2D5A27]/10 flex flex-col gap-1 text-[11px] text-slate-600 leading-relaxed">
            <span className="font-bold text-[#2D5A27] text-xs">اجتياز نظام ATS</span>
            <p>السير الذاتية التي تستخدم قوالب كلاسيكية وبسيطة وجداول مرتبة تجتاز برامج تصفية التوظيف بمعدل ٨٠٪ أكثر من القوالب التي تحوي رسوميات معقدة.</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grid Actions */}
      <div>
        <h3 className="text-sm font-bold opacity-60 mb-4 uppercase tracking-widest">الأدوات المهنية المتكاملة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "builder",
              title: "صانع السيرة الذاتية",
              desc: "أنشئ سيرتك الذاتية خطوة بخطوة مع تحسين فوري عبر الذكاء الاصطناعي.",
              icon: <FileCheck className="text-[#2D5A27] w-5 h-5" />,
              badge: "سهل"
            },
            {
              id: "templates",
              title: "قوالب وتخصصات جاهزة",
              desc: "اختر من بين 9 قوالب متميزة و48 مساراً مهنياً معبأ بالكامل وجاهز للتعديل.",
              icon: <Globe className="text-[#2D5A27] w-5 h-5" />,
              badge: "٩ تصاميم + ٤٨ تخصص"
            },
            {
              id: "ats",
              title: "محلل التوافق ATS",
              desc: "قارن سيرتك الذاتية مع متطلبات الوظائف لتصحيح النقص واجتياز الفرز تلقائياً.",
              icon: <Target className="text-[#2D5A27] w-5 h-5" />,
              badge: "مفتوح مجاناً"
            },
            {
              id: "cover-letter",
              title: "خطابات التقديم",
              desc: "صغ خطاب تقديم (Cover Letter) مخصص للوظيفة التي تستهدفها في ثوانٍ معدودة.",
              icon: <Award className="text-[#2D5A27] w-5 h-5" />,
              badge: "مفتوح مجاناً"
            },
            {
              id: "portfolio",
              title: "موقع شخصي لـ محفظة أعمالك",
              desc: "حوّل سيرتك الذاتية بنقرة زر إلى رابط شخصي cvx.app لتشاركه عبر الإنترنت.",
              icon: <Globe className="text-[#2D5A27] w-5 h-5" />,
              badge: "مفتوح مجاناً"
            },
            {
              id: "advisor",
              title: "المستشار المهني الذكي",
              desc: "تحدث مع الذكاء الاصطناعي ليرسم لك خارطة طريق لدخول تخصصك واقتراح دورات ومشاريع.",
              icon: <Users className="text-[#2D5A27] w-5 h-5" />,
              badge: "ذكي"
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-white border border-black/5 rounded-2xl p-6 hover:border-[#2D5A27] hover:bg-white/90 cursor-pointer transition flex flex-col justify-between h-44 group relative shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-[#F8F6F2] rounded-xl group-hover:bg-[#2D5A27]/10 transition">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      item.badge.includes("مفتوح") ? "bg-[#2D5A27]/10 text-[#2D5A27]" : "bg-black/5 text-[#121212]/60"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-[#121212] text-sm group-hover:text-[#2D5A27] transition mt-2">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>

              <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition translate-x-1 group-hover:translate-x-0">
                <ChevronLeft size={16} className="text-[#2D5A27]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
