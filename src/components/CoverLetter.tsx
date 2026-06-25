import React, { useState } from "react";
import { ResumeData } from "../types";
import { FileText, Sparkles, Loader2, Copy, Check, Download, AlertCircle, RefreshCw } from "lucide-react";

interface CoverLetterProps {
  resumeData: ResumeData;
  isPro: boolean;
  onShowPayment: () => void;
}

export const CoverLetter: React.FC<CoverLetterProps> = ({ resumeData, isPro, onShowPayment }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);

  const generateLetter = async () => {
    if (!jobTitle.trim()) {
      alert("الرجاء إدخال المسمى الوظيفي المستهدف أولاً!");
      return;
    }

    if (!isPro) {
      setError("أداة كتابة خطابات التقديم الاحترافية (Cover Letter) متاحة فقط لمشتركي الباقة الاحترافية (PRO).");
      onShowPayment();
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedLetter(null);
    setCopied(false);

    try {
      const response = await fetch("/api/resume/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          jobTitle,
          companyName,
          jobDescription,
          tone,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "فشل الاتصال بالخادم لإنشاء الخطاب.");
      }

      setGeneratedLetter(data.coverLetter);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "فشل في توليد خطاب تقديم بالذكاء الاصطناعي.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!generatedLetter) return;
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `خطاب_تقديم_${jobTitle || "وظيفة"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 text-[#121212] shadow-sm flex flex-col gap-6 text-right" dir="rtl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-[#2D5A27] w-6 h-6 shrink-0" />
          <h2 className="text-xl font-bold font-serif italic text-[#121212]">مُولد خطاب التقديم الاحترافي (Cover Letter)</h2>
        </div>
        <p className="text-xs text-slate-500 font-serif italic">
          اكتب تفاصيل الوظيفة التي تريد التقديم عليها، وسيقوم الذكاء الاصطناعي بصياغة خطاب تقديم مخصص بالكامل بناءً على خبراتك في السيرة الذاتية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-600">المسمى الوظيفي المستهدف *</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="مثال: ويب، واجهات، مبيعات"
            className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-600">اسم الشركة (اختياري)</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="مثال: سابك، أرامكو"
            className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
          />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs text-slate-600">نبرة الخطاب (Tone)</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "professional", label: "احترافية كلاسيكية" },
              { id: "enthusiastic", label: "حماسية ملهمة" },
              { id: "creative", label: "إبداعية متميزة" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  tone === t.id
                    ? "bg-[#2D5A27]/10 border-[#2D5A27]/30 text-[#2D5A27] font-bold"
                    : "bg-white border-black/10 text-slate-500 hover:text-[#121212] hover:bg-[#F8F6F2]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs text-slate-600">متطلبات الوظيفة الإضافية (اختياري)</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={3}
            placeholder="ألصق أي تفاصيل إضافية عن الوظيفة ليتم مراعاتها بالصياغة..."
            className="bg-[#F8F6F2] border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
          />
        </div>
      </div>

      <button
        onClick={generateLetter}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-bold py-3 px-5 rounded-xl cursor-pointer transition disabled:opacity-50 shadow-sm uppercase tracking-wider text-xs"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            <span>جاري إنشاء الخطاب وصياغته...</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>صياغة خطاب تقديم ذكي</span>
          </>
        )}
      </button>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl text-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold font-serif italic">
            <AlertCircle size={14} />
            <span>تنبيه</span>
          </div>
          <p>{error}</p>
        </div>
      )}

      {generatedLetter && (
        <div className="border-t border-black/5 pt-6 flex flex-col gap-3 animate-fade-in">
          <div className="flex justify-between items-center bg-[#F8F6F2] px-4 py-3 rounded-t-2xl border border-black/5 border-b-0">
            <div className="text-xs font-bold text-slate-600 font-serif italic">الخطاب المُنشأ</div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-[#2D5A27] hover:bg-[#2D5A27]/20 font-bold bg-[#2D5A27]/10 px-3 py-1.5 rounded-lg cursor-pointer transition border border-transparent"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? "تم النسخ" : "نسخ الخطاب"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-[11px] text-slate-700 hover:bg-black/5 font-bold bg-white px-3 py-1.5 rounded-lg border border-black/10 cursor-pointer transition"
              >
                <Download size={12} />
                <span>تحميل .txt</span>
              </button>
            </div>
          </div>
          <textarea
            value={generatedLetter}
            onChange={(e) => setGeneratedLetter(e.target.value)}
            rows={15}
            className="w-full bg-[#F8F6F2]/50 border border-black/5 rounded-b-2xl p-5 text-sm text-slate-800 leading-relaxed focus:outline-none font-serif"
          />
        </div>
      )}
    </div>
  );
};
