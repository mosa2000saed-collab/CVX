import React, { useState } from "react";
import { ResumeData } from "../types";
import { Shield, Key, Download, Upload, CreditCard, Check, Sparkles, User, Info } from "lucide-react";

interface SettingsProps {
  resumeData: ResumeData;
  onImport: (data: ResumeData) => void;
  isPro: boolean;
  onUpgrade: () => void;
  onDowngrade: () => void;
  userEmail?: string;
}

export const Settings: React.FC<SettingsProps> = ({
  resumeData,
  onImport,
  isPro,
  onUpgrade,
  onDowngrade,
  userEmail = "sa22ed44@gmail.com"
}) => {
  const [importText, setImportText] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cvx-resume-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed && typeof parsed === "object" && parsed.personalInfo) {
        onImport(parsed);
        setSuccessMsg("تم استيراد البيانات بنجاح وتحديث سيرتك الذاتية!");
        setImportText("");
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        alert("تنسيق الملف غير صالح. الرجاء إدخال ملف JSON صالح تم تصديره من CVX.");
      }
    } catch (e) {
      alert("الرجاء إدخال كود JSON صحيح.");
    }
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 text-[#121212] shadow-sm flex flex-col gap-6 text-right" dir="rtl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="text-[#2D5A27] w-6 h-6 shrink-0" />
          <h2 className="text-xl font-bold font-serif italic text-[#121212]">الإعدادات وإدارة الحساب</h2>
        </div>
        <p className="text-xs text-slate-500 font-serif italic">
          إدارة حسابك المهني، تصدير واستيراد البيانات الاحتياطية، وإدارة اشتراكك في باقات CVX.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Account & Subscription Status */}
        <div className="bg-[#F8F6F2] border border-black/5 p-5 rounded-2xl flex flex-col gap-4 text-[#121212]">
          <h3 className="text-sm font-bold font-serif italic text-[#121212] border-b border-black/5 pb-2 flex items-center gap-1.5">
            <User size={14} className="text-[#2D5A27]" />
            <span>معلومات الحساب</span>
          </h3>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-600">البريد الإلكتروني المربوط</span>
            <span className="text-sm font-mono text-[#121212] font-bold">{userEmail}</span>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs text-slate-600">باقة الاشتراك الحالية</span>
            <div className="flex items-center justify-between bg-white border border-black/10 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isPro ? "bg-amber-400 animate-pulse" : "bg-[#2D5A27]"}`}></div>
                <span className="text-xs font-bold text-[#121212]">{isPro ? "الباقة الاحترافية PRO" : "الباقة المجانية FREE"}</span>
              </div>
              
              <button
                onClick={isPro ? onDowngrade : onUpgrade}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isPro
                    ? "bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 text-[#2D5A27]"
                    : "bg-amber-100 text-amber-900 hover:bg-amber-200 shadow-sm"
                }`}
              >
                {isPro ? "إلغاء الاشتراك" : "ترقية الآن"}
              </button>
            </div>
          </div>
        </div>

        {/* Secrets & API Key Panel */}
        <div className="bg-[#F8F6F2] border border-black/5 p-5 rounded-2xl flex flex-col gap-4 text-[#121212]">
          <h3 className="text-sm font-bold font-serif italic text-[#121212] border-b border-black/5 pb-2 flex items-center gap-1.5">
            <Key size={14} className="text-[#2D5A27]" />
            <span>أمان البيانات والذكاء الاصطناعي</span>
          </h3>
          <div className="flex gap-3 text-xs leading-relaxed text-slate-600">
            <Info size={20} className="text-[#2D5A27] shrink-0" />
            <p>
              يتم تشغيل كافة ميزات تحسين السير الذاتية والمستشار المهني في CVX عبر نماذج <strong>Gemini 3.5</strong> فائقة الذكاء.
              مفاتيح الربط والبيانات مؤمنة بالكامل على خوادم Google Cloud الصديقة للبيئة.
            </p>
          </div>
        </div>

        {/* Import / Export JSON */}
        <div className="bg-[#F8F6F2] border border-black/5 p-5 rounded-2xl flex flex-col gap-4 md:col-span-2 text-[#121212]">
          <h3 className="text-sm font-bold font-serif italic text-[#121212] border-b border-black/5 pb-2">إدارة وحفظ البيانات</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-600 font-bold">تصدير وحفظ نسخة احتياطية</span>
              <p className="text-xs text-slate-500 leading-normal font-serif italic">
                قم بتصدير وتحميل سيرتك الذاتية في ملف بصيغة JSON على جهازك لتستطيع استيرادها والتعديل عليها لاحقاً في أي وقت.
              </p>
              <button
                onClick={handleExport}
                className="mt-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-black/10 hover:bg-black/5 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition"
              >
                <Download size={14} />
                <span>تحميل نسخة السيرة الاحتياطية (.json)</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs text-slate-600 font-bold">استيراد نسخة سيرة احتياطية</span>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="ألصق كود الـ JSON هنا للاستيراد..."
                rows={3}
                className="bg-white border border-black/10 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
              />
              <button
                onClick={handleImport}
                disabled={!importText}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#2D5A27] hover:bg-[#1D3B19] text-white rounded-xl text-xs font-semibold cursor-pointer transition disabled:opacity-50"
              >
                <Upload size={14} />
                <span>استيراد وتحديث البيانات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
