import React, { useState } from "react";
import { ResumeData } from "../types";
import { BrainCircuit, Sparkles, Loader2, ArrowUpRight, BookOpen, Laptop, Milestone, ClipboardCheck } from "lucide-react";

interface CareerAdvisorProps {
  resumeData: ResumeData;
  isPro: boolean;
  onShowPayment: () => void;
}

export const CareerAdvisor: React.FC<CareerAdvisorProps> = ({ resumeData, isPro, onShowPayment }) => {
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adviceData, setAdviceData] = useState<{
    readinessScore: number;
    missingSkills: string[];
    courses: { title: string; platform: string; description: string }[];
    suggestedProjects: { title: string; description: string; difficulty: string }[];
    advisorFeedback: string;
    nextSteps: string[];
  } | null>(null);

  const getAdvice = async () => {
    if (!targetRole.trim()) {
      alert("الرجاء إدخال اسم الوظيفة المطلوبة أولاً!");
      return;
    }

    setLoading(true);
    setError(null);
    setAdviceData(null);

    try {
      const response = await fetch("/api/resume/career-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          resumeData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "فشل الاتصال بمستشار الذكاء الاصطناعي المهني.");
      }

      setAdviceData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ غير متوقع أثناء تحليل مستشار الذكاء الاصطناعي.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 text-[#121212] shadow-sm flex flex-col gap-6 text-right" dir="rtl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="text-[#2D5A27] w-6 h-6 shrink-0" />
          <h2 className="text-xl font-bold font-serif italic text-[#121212]">المستشار المهني الذكي (Career Advisor AI)</h2>
        </div>
        <p className="text-xs text-slate-500 font-serif italic">
          أدخل اسم الوظيفة التي تحلم بها، وسيقوم المستشار المهني بتحليل نسبة جاهزيتك، والمهارات الناقصة، واقتراح مشاريع عملية لتنفيذها ومساقات لتعلمها.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs text-slate-600">ما الوظيفة التي تطمح إليها؟</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="مثال: Software Engineer, Product Manager, UI/UX Designer"
            className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2D5A27] text-black font-sans"
          />
        </div>
        <button
          onClick={getAdvice}
          disabled={loading}
          className="md:self-end bg-black hover:bg-black/90 text-white font-bold px-6 py-3 rounded-xl cursor-pointer transition disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              <span>جاري صياغة الخطة...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>احصل على الاستشارة المهنية</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl text-xs flex flex-col gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Advisory Output */}
      {adviceData && (
        <div className="border-t border-black/5 pt-6 flex flex-col gap-8 animate-fade-in">
          
          {/* Readiness Gauge */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-1 bg-[#F8F6F2] p-6 rounded-xl border border-black/5 text-center flex flex-col justify-center items-center gap-1">
              <span className="text-xs text-slate-500 font-bold font-serif italic">جاهزيتك المهنية</span>
              <span className="text-4xl font-extrabold text-[#2D5A27] font-mono tracking-tight">{adviceData.readinessScore}%</span>
              <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-[#2D5A27] h-full transition-all duration-1000 ease-out" style={{ width: `${adviceData.readinessScore}%` }}></div>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
              <h3 className="text-sm font-bold text-[#121212] flex items-center gap-1.5 font-serif italic">
                <BrainCircuit size={16} className="text-[#2D5A27] shrink-0" />
                <span>تقييم ونصيحة المستشار المهني:</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-[#F8F6F2] p-4 rounded-xl border border-black/5">
                {adviceData.advisorFeedback}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Suggested Courses */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#121212] flex items-center gap-2 border-b border-black/5 pb-2 font-serif italic">
                <BookOpen size={16} className="text-[#2D5A27]" />
                <span>دورات ومواضيع مقترحة للتعلّم:</span>
              </h4>
              <div className="flex flex-col gap-3">
                {adviceData.courses.map((course, idx) => (
                  <div key={idx} className="bg-[#F8F6F2]/50 border border-black/5 p-4 rounded-xl flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#2D5A27] font-serif">{course.title}</span>
                      <span className="bg-black/5 text-slate-500 px-1.5 py-0.5 rounded text-[9px] font-sans font-medium">{course.platform}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{course.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Projects */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#121212] flex items-center gap-2 border-b border-black/5 pb-2 font-serif italic">
                <Laptop size={16} className="text-[#2D5A27]" />
                <span>مشاريع عملية لبناء محفظة أعمالك:</span>
              </h4>
              <div className="flex flex-col gap-3">
                {adviceData.suggestedProjects.map((project, idx) => (
                  <div key={idx} className="bg-[#F8F6F2]/50 border border-black/5 p-4 rounded-xl flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-800 font-serif">{project.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-medium font-sans ${
                        project.difficulty.includes("سهل") ? "bg-emerald-100 text-emerald-800" :
                        project.difficulty.includes("متوسط") ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }`}>{project.difficulty}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps Road Map */}
          <div className="bg-[#F8F6F2] p-5 rounded-2xl border border-black/5">
            <h4 className="text-sm font-bold text-[#121212] mb-4 flex items-center gap-2 font-serif italic">
              <Milestone size={16} className="text-[#2D5A27]" />
              <span>خارطة طريقك والخطوات القادمة:</span>
            </h4>
            <div className="flex flex-col gap-3 relative border-r-2 border-[#2D5A27]/20 pr-4 mr-2">
              {adviceData.nextSteps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col gap-1">
                  <div className="absolute right-[-21px] top-1.5 w-2.5 h-2.5 bg-[#2D5A27] rounded-full"></div>
                  <div className="text-xs font-bold text-[#2D5A27] font-mono">الخطوة {idx + 1}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
