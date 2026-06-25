import React, { useState } from "react";
import { ResumeData } from "../types";
import { Globe, Shield, RefreshCw, Check, Copy, ExternalLink, Eye, Settings, Sparkles, Layout } from "lucide-react";

interface PortfolioProps {
  resumeData: ResumeData;
  isPro: boolean;
  onShowPayment: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ resumeData, isPro, onShowPayment }) => {
  const [username, setUsername] = useState("ahmed");
  const [theme, setTheme] = useState("gradient-blue");
  const [isPublished, setIsPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPortfolioUrl = () => {
    return `cvx.app/${username || "username"}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${getPortfolioUrl()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themes = [
    { id: "gradient-blue", label: "تدرج كوني أزرق", bg: "from-slate-900 to-blue-900", accent: "text-cyan-400" },
    { id: "minimal-light", label: "أبيض ناصع هادئ", bg: "from-stone-50 to-stone-100 text-stone-900", accent: "text-stone-800" },
    { id: "dark-emerald", label: "زمردي فاخر", bg: "from-neutral-950 to-emerald-950", accent: "text-emerald-400" },
    { id: "neon-brutalist", label: "مستقبلي تقني", bg: "from-zinc-950 to-black", accent: "text-lime-400 border border-lime-500/30" }
  ];

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 text-[#121212] shadow-sm flex flex-col gap-6 text-right" dir="rtl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Globe className="text-[#2D5A27] w-6 h-6 shrink-0" />
          <h2 className="text-xl font-bold font-serif italic text-[#121212]">مُنشئ الموقع الشخصي (Personal Portfolio)</h2>
        </div>
        <p className="text-xs text-slate-500 font-serif italic">
          حوّل سيرتك الذاتية بضغطة واحدة إلى صفحة إنترنت شخصية سريعة الاستجابة وجميلة لتشاركها مع الشركات ومدراء التوظيف.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-1 bg-[#F8F6F2] border border-black/5 p-5 rounded-2xl flex flex-col gap-5 text-[#121212]">
          <h3 className="text-sm font-bold font-serif italic text-[#121212] border-b border-black/5 pb-2 flex items-center gap-1.5">
            <Settings size={14} className="text-[#2D5A27]" />
            <span>إعدادات الموقع</span>
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-600">رابط موقعك الفريد (Username)</label>
            <div className="flex border border-black/10 rounded-lg overflow-hidden bg-white text-sm">
              <span className="bg-black/5 px-3 py-2 text-slate-500 border-l border-black/10 font-mono text-left">cvx.app/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                placeholder="ahmed"
                className="bg-transparent px-3 py-2 text-black focus:outline-none flex-1 font-mono text-left"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-600">نمط وتصميم الصفحة</label>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition text-center cursor-pointer ${
                    theme === t.id
                      ? "bg-[#2D5A27]/10 border-[#2D5A27]/30 text-[#2D5A27]"
                      : "bg-white border-black/10 text-slate-500 hover:text-[#121212] hover:bg-black/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-black/5 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-600">حالة النشر على الإنترنت</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${isPublished ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                {isPublished ? "مباشر ومتاح" : "مسودة"}
              </span>
            </div>

            <button
              onClick={() => {
                if (!isPro) {
                  onShowPayment();
                  return;
                }
                setIsPublished(!isPublished);
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                isPublished
                  ? "bg-black hover:bg-black/90 text-white"
                  : "bg-[#2D5A27] hover:bg-[#1D3B19] text-white"
              }`}
            >
              {isPublished ? "إلغاء النشر" : "نشر الموقع الشخصي المباشر 🚀"}
            </button>
          </div>
        </div>

        {/* Live Website Preview Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-[#F8F6F2] px-4 py-3 rounded-xl border border-black/5 text-[#121212]">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-serif italic">
              <Eye size={14} className="text-[#2D5A27]" />
              <span>معاينة حية للموقع الشخصي المنشور:</span>
            </div>
            
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-500">{getPortfolioUrl()}</span>
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-[#2D5A27] transition cursor-pointer"
                title="نسخ الرابط"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Rendered Portfolio Simulation */}
          <div className={`p-8 rounded-xl border border-slate-850 bg-gradient-to-br ${
            theme === "gradient-blue" ? "from-slate-950 via-slate-900 to-blue-950 text-slate-200" :
            theme === "minimal-light" ? "from-stone-50 via-stone-100 to-stone-50 text-stone-800" :
            theme === "dark-emerald" ? "from-neutral-950 via-neutral-900 to-emerald-950 text-emerald-100" :
            "from-zinc-950 via-black to-zinc-950 text-lime-400 border-lime-500/20"
          } min-h-[500px] flex flex-col justify-between shadow-inner`}>
            
            {/* Top Navigation Bar Simulation */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <div className="font-bold tracking-tight text-sm font-sans uppercase">
                {resumeData.personalInfo.fullName ? resumeData.personalInfo.fullName.split(" ")[0] : "PORTFOLIO"}
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <span>نبذة</span>
                <span>الخبرات</span>
                <span>المشاريع</span>
              </div>
            </div>

            {/* Profile Intro */}
            <div className="flex flex-col gap-4 max-w-xl my-auto">
              <div className="inline-flex max-w-fit items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 border border-white/15">
                <Sparkles size={10} className="text-yellow-400 animate-pulse" />
                <span>متاح للفرص الجديدة</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                مرحباً بك، أنا <span className={`${
                  theme === "gradient-blue" ? "text-cyan-400" :
                  theme === "minimal-light" ? "text-stone-900" :
                  theme === "dark-emerald" ? "text-emerald-400" :
                  "text-lime-400"
                }`}>{resumeData.personalInfo.fullName || "اسمك الكامل"}</span>
              </h1>
              <p className="text-sm opacity-80 leading-relaxed font-sans font-medium">
                {resumeData.personalInfo.title || "المسمى الوظيفي الخاص بك"}
              </p>
              <p className="text-xs opacity-75 leading-relaxed font-sans">
                {resumeData.personalInfo.summary || "نبذة مختصرة عن شغفك، مهاراتك وأهدافك المهنية."}
              </p>
            </div>

            {/* Footer Contact Simulation */}
            <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-xs opacity-60">
              <div className="flex gap-4">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              </div>
              <div>© ٢٠٢٦ CVX PORTFOLIO SYSTEM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
