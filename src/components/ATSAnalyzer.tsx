import React, { useState } from "react";
import { ResumeData } from "../types";
import { Sparkles, Brain, Loader2, AlertCircle, CheckCircle2, ListFilter, ArrowUpRight, HelpCircle } from "lucide-react";

interface ATSAnalyzerProps {
  resumeData: ResumeData;
  isPro: boolean;
  onShowPayment: () => void;
}

export const ATSAnalyzer: React.FC<ATSAnalyzerProps> = ({ resumeData, isPro, onShowPayment }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    score: number;
    matchSummary: string;
    missingSkills: string[];
    recommendations: string[];
    matchedKeywords: string[];
  } | null>(null);

  const analyzeATS = async () => {
    if (!jobDescription.trim()) {
      alert("الرجاء إدخال وصف الوظيفة المطلوبة أولاً للتحليل!");
      return;
    }

    // Limit check for non-pro users
    if (!isPro) {
      setError("أداة تحليل السير الذاتية ATS ومقارنتها بالوظائف متاحة فقط للمشتركين في الباقة الاحترافية (PRO).");
      onShowPayment();
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/resume/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          jobDescription,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء الاتصال بالخادم لتحليل السيرة الذاتية.");
      }

      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء إجراء التحليل الذكي.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 stroke-emerald-500 bg-emerald-950/20";
    if (score >= 50) return "text-amber-400 stroke-amber-500 bg-amber-950/20";
    return "text-red-400 stroke-red-500 bg-red-950/20";
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 text-[#121212] shadow-sm flex flex-col gap-6 text-right" dir="rtl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain className="text-[#2D5A27] w-6 h-6 shrink-0" />
          <h2 className="text-xl font-bold font-serif italic text-[#121212]">مُحلل التوافق مع أنظمة فرز السير الذاتية (ATS)</h2>
        </div>
        <p className="text-xs text-slate-500 font-serif italic">
          ألصق وصف الوظيفة المستهدفة أدناه ليقوم الذكاء الاصطناعي بمقارنة سيرتك الذاتية معها وحساب نسبة توافقك وتقديم نصائح دقيقة للتعديل.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">وصف الوظيفة (Job Description)</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            placeholder="ألصق المسمى الوظيفي والمتطلبات والمهارات المطلوبة للوظيفة هنا (مثال: مطلوب Frontend Developer ملم بـ React و TypeScript و Tailwind...)"
            className="bg-[#F8F6F2] border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2D5A27] leading-relaxed font-sans text-black"
          />
        </div>

        <button
          onClick={analyzeATS}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-bold py-3 px-5 rounded-xl cursor-pointer transition disabled:opacity-50 shadow-sm uppercase tracking-wider text-xs"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>جاري التحليل ومقارنة المتطلبات...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>تحليل السيرة الذاتية بالذكاء الاصطناعي</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl text-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold font-serif italic">
            <AlertCircle size={14} />
            <span>تنبيه</span>
          </div>
          <p>{error}</p>
        </div>
      )}

      {/* Results output */}
      {results && (
        <div className="border-t border-black/5 pt-6 flex flex-col gap-8 animate-fade-in">
          {/* Radial/Circular match score panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="col-span-1 flex flex-col items-center justify-center p-6 bg-[#F8F6F2] rounded-xl border border-black/5">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-black/5 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="fill-none transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * results.score) / 100}
                    strokeLinecap="round"
                    stroke={
                      results.score >= 80 ? "#2D5A27" : results.score >= 50 ? "#d97706" : "#dc2626"
                    }
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold tracking-tight font-mono text-[#121212]">
                    {results.score}%
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">ATS Score</span>
                </div>
              </div>
              <div className="text-center mt-3">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${getScoreColor(
                    results.score
                  )}`}
                >
                  {results.score >= 80 ? "توافق ممتاز" : results.score >= 50 ? "توافق متوسط" : "تحتاج لتطوير"}
                </span>
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-3">
              <h3 className="text-base font-bold text-[#121212] flex items-center gap-1.5 font-serif italic">
                <CheckCircle2 size={16} className="text-[#2D5A27]" />
                <span>ملخص التوافق الوظيفي</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-[#F8F6F2] p-4 rounded-xl border border-black/5">
                {results.matchSummary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Missing Skills */}
            <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
              <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-1.5 font-serif italic">
                <AlertCircle size={16} className="shrink-0" />
                <span>مهارات وكلمات مفتاحية مفقودة:</span>
              </h4>
              {results.missingSkills.length === 0 ? (
                <p className="text-xs text-slate-500 italic">سيرتك الذاتية تغطي كافة المهارات الأساسية المطلوبة!</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {results.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Matched Keywords */}
            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-1.5 font-serif italic">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>المهارات المتوافقة بنجاح:</span>
              </h4>
              {results.matchedKeywords.length === 0 ? (
                <p className="text-xs text-slate-500 italic">لا يوجد توافق قوي بعد.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {results.matchedKeywords.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-[#2D5A27]/10 text-[#2D5A27] border border-[#2D5A27]/20 px-2.5 py-1 rounded text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actionable recommendations */}
          <div className="bg-[#F8F6F2] p-5 rounded-xl border border-black/5">
            <h4 className="text-sm font-bold text-[#2D5A27] mb-4 flex items-center gap-1.5 font-serif italic">
              <ListFilter size={16} className="shrink-0" />
              <span>خطوات عملية لتحسين سيرتك لهذه الوظيفة:</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-700 leading-relaxed pr-2">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-[#2D5A27] font-bold font-mono mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
