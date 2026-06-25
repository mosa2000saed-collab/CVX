import React, { useState } from "react";
import { ResumeData, Experience, Education, Project } from "../types";
import { Sparkles, Plus, Trash2, Edit2, Check, ArrowRight, ArrowLeft, Loader2, RefreshCw } from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  isPro: boolean;
  onShowPayment: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, isPro, onShowPayment }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [aiLoadingField, setAiLoadingField] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // Local state for adding items
  const [newSkill, setNewSkill] = useState("");

  const steps = [
    { label: "المعلومات الشخصية", desc: "الاسم، التواصل، والمسمى الوظيفي" },
    { label: "الخبرات العملية", desc: "الوظائف والمسؤوليات السابقة" },
    { label: "التعليم والشهادات", desc: "الشهادات الجامعية والدورات" },
    { label: "المشاريع المهنية", desc: "أبرز أعمالك ومساهماتك" },
    { label: "المهارات والقدرات", desc: "المهارات التقنية والناعمة" }
  ];

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  // AI Improvement trigger
  const improveWithAI = async (field: string, currentValue: string, index?: number, listType?: 'experience' | 'projects') => {
    if (!currentValue || currentValue.trim().length < 5) {
      alert("الرجاء كتابة وصف بسيط أولاً (على الأقل 5 أحرف) ليقوم الذكاء الاصطناعي بتحسينه!");
      return;
    }

    // Free tier AI usage limits check
    if (!isPro && field !== "summary") {
      // Allow only summary in free tier, or restrict to prompt upgrade
      setAiError("تحسين الخبرات والمهام التفصيلية باستخدام الذكاء الاصطناعي متاح فقط للمشتركين في الباقة الاحترافية (PRO).");
      onShowPayment();
      return;
    }

    const fieldKey = index !== undefined ? `${listType}-${index}-${field}` : field;
    setAiLoadingField(fieldKey);
    setAiError(null);

    try {
      const response = await fetch("/api/resume/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: currentValue,
          context: data.personalInfo.title,
          language: "ar"
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "فشل تحسين النص بالذكاء الاصطناعي.");
      }

      const improvedText = resData.improvedText;

      if (index !== undefined && listType) {
        if (listType === 'experience') {
          const updatedExp = [...data.experience];
          updatedExp[index] = { ...updatedExp[index], [field]: improvedText };
          onChange({ ...data, experience: updatedExp });
        } else if (listType === 'projects') {
          const updatedProj = [...data.projects];
          updatedProj[index] = { ...updatedProj[index], [field]: improvedText };
          onChange({ ...data, projects: updatedProj });
        }
      } else {
        updatePersonalInfo(field, improvedText);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "فشل الاتصال بالخادم لتحسين النص.");
    } finally {
      setAiLoadingField(null);
    }
  };

  // Experience Actions
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      role: "",
      startDate: "",
      endDate: "الحالي",
      description: ""
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  // Education Actions
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      graduationYear: ""
    };
    onChange({
      ...data,
      education: [newEdu, ...data.education]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  // Projects Actions
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "",
      description: "",
      techStack: ""
    };
    onChange({
      ...data,
      projects: [newProj, ...data.projects]
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Skills Actions
  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      onChange({
        ...data,
        skills: [...data.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="bg-white border border-black/5 text-[#121212] rounded-2xl p-6 shadow-sm flex flex-col gap-6" dir="rtl">
      {/* Steps indicator */}
      <div className="grid grid-cols-5 gap-2 border-b border-black/5 pb-4 overflow-x-auto">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex flex-col gap-1 text-right py-2 px-3 rounded-lg border transition ${
              activeStep === idx
                ? "bg-[#2D5A27]/10 border-[#2D5A27]/30 text-[#2D5A27] font-bold"
                : "border-transparent text-slate-400 hover:bg-[#F8F6F2] hover:text-[#121212]"
            }`}
          >
            <span className="text-xs font-bold font-mono">0{idx + 1}</span>
            <span className="text-xs font-semibold whitespace-nowrap">{step.label}</span>
          </button>
        ))}
      </div>

      {aiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2">
          <span>{aiError}</span>
        </div>
      )}

      {/* Step Contents */}
      <div className="min-h-[400px]">
        {/* STEP 0: PERSONAL INFO */}
        {activeStep === 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold font-serif italic text-[#121212] mb-2">المعلومات الشخصية والاتصال</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">الاسم الكامل</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                  placeholder="مثال: أحمد العتيبي"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">المسمى الوظيفي المستهدف</label>
                <input
                  type="text"
                  value={data.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                  placeholder="مثال: مطور واجهات أمامية"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder="name@domain.com"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">رقم الجوال</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder="055XXXXXXX"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">المدينة والدولة</label>
                <input
                  type="text"
                  value={data.personalInfo.city}
                  onChange={(e) => updatePersonalInfo("city", e.target.value)}
                  placeholder="مثال: الرياض، السعودية"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">رابط LinkedIn (اختياري)</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs text-slate-500">رابط GitHub أو محفظة الأعمال (اختياري)</label>
                <input
                  type="text"
                  value={data.personalInfo.github}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                  placeholder="github.com/username"
                  className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-500">الخلاصة والنبذة الشخصية (الملخص المهني)</label>
                <button
                  onClick={() => improveWithAI("summary", data.personalInfo.summary)}
                  className="flex items-center gap-1 text-[10px] text-[#2D5A27] font-bold uppercase tracking-wider bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  {aiLoadingField === "summary" ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Sparkles size={12} />
                  )}
                  <span>تحسين بالذكاء الاصطناعي</span>
                </button>
              </div>
              <textarea
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                rows={4}
                placeholder="اكتب نبذة مختصرة عن شغفك، خبراتك، وأهدافك المهنية..."
                className="bg-[#F8F6F2] border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2D5A27] text-black leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* STEP 1: EXPERIENCE */}
        {activeStep === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-serif italic text-[#121212]">الخبرات والمسار المهني</h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs bg-[#2D5A27] hover:bg-[#1D3B19] text-white px-3.5 py-2 rounded-lg cursor-pointer transition font-bold uppercase tracking-wider shadow-sm"
              >
                <Plus size={14} />
                <span>إضافة خبرة</span>
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/10 rounded-xl text-slate-400 text-xs">
                لم تقم بإضافة خبرات مهنية بعد. اضغط على الزر أعلاه لإضافة خبرة جديدة.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {data.experience.map((exp, index) => (
                  <div key={exp.id} className="relative bg-[#F8F6F2] border border-black/5 rounded-xl p-5 flex flex-col gap-4">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-4 left-4 text-slate-400 hover:text-red-600 transition cursor-pointer"
                      title="حذف هذه الخبرة"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="text-xs font-bold text-[#2D5A27] uppercase tracking-wider">الخبرة المهنية #{data.experience.length - index}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">اسم الشركة / المؤسسة</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="مثال: شركة الحلول الرقمية"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">المسمى الوظيفي</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(index, "role", e.target.value)}
                          placeholder="مثال: Frontend Developer"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">تاريخ البدء</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                          placeholder="YYYY-MM (مثال: 2023-01)"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                          placeholder="YYYY-MM أو 'الحالي'"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-black"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-500">المهام والإنجازات الأساسية</label>
                        <button
                          onClick={() => improveWithAI("description", exp.description, index, 'experience')}
                          className="flex items-center gap-1 text-[10px] text-[#2D5A27] font-bold uppercase tracking-wider bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 px-3 py-1.5 rounded-lg cursor-pointer transition"
                        >
                          {aiLoadingField === `experience-${index}-description` ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Sparkles size={12} />
                          )}
                          <span>تحسين بالذكاء الاصطناعي</span>
                          {!isPro && <span className="text-[9px] bg-[#2D5A27] text-white px-1.5 py-0.5 rounded-full font-bold ml-1 uppercase">PRO</span>}
                        </button>
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                        rows={3}
                        placeholder="مثال: قمت بتطوير موقع الشركة وتحسين سرعة الاستجابة..."
                        className="bg-white border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2D5A27] text-black leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: EDUCATION */}
        {activeStep === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-serif italic text-[#121212]">التعليم والشهادات الأكاديمية</h3>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 text-xs bg-[#2D5A27] hover:bg-[#1D3B19] text-white px-3.5 py-2 rounded-lg cursor-pointer transition font-bold uppercase tracking-wider shadow-sm"
              >
                <Plus size={14} />
                <span>إضافة مؤهل</span>
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/10 rounded-xl text-slate-400 text-xs">
                لم تقم بإضافة مؤهلات تعليمية بعد. اضغط على الزر أعلاه لإضافة مؤهل جديد.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {data.education.map((edu, index) => (
                  <div key={edu.id} className="relative bg-[#F8F6F2] border border-black/5 rounded-xl p-5 flex flex-col gap-4">
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="absolute top-4 left-4 text-slate-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-505">الجامعة / الجهة التعليمية</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="مثال: جامعة الملك سعود"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-505">الدرجة العلمية</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="مثال: بكالوريوس، دبلوم، ماجستير"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-550">التخصص / مجال الدراسة</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                          placeholder="مثال: علوم الحاسب"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-550">سنة التخرج</label>
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                          placeholder="مثال: 2024"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs text-slate-550">المعدل أو التقدير (اختياري)</label>
                        <input
                          type="text"
                          value={edu.grade || ""}
                          onChange={(e) => updateEducation(index, "grade", e.target.value)}
                          placeholder="مثال: 4.8 / 5.0"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-black"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: PROJECTS */}
        {activeStep === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-serif italic text-[#121212]">المشاريع الشخصية أو المهنية</h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-xs bg-[#2D5A27] hover:bg-[#1D3B19] text-white px-3.5 py-2 rounded-lg cursor-pointer transition font-bold uppercase tracking-wider shadow-sm"
              >
                <Plus size={14} />
                <span>إضافة مشروع</span>
              </button>
            </div>

            {data.projects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/10 rounded-xl text-slate-400 text-xs">
                لم تقم بإضافة أي مشاريع بعد. اضغط على الزر أعلاه لإضافة أول مشروع متميز.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {data.projects.map((proj, index) => (
                  <div key={proj.id} className="relative bg-[#F8F6F2] border border-black/5 rounded-xl p-5 flex flex-col gap-4">
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-4 left-4 text-slate-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">عنوان المشروع</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(index, "title", e.target.value)}
                          placeholder="مثال: متجر نبتة الإلكتروني"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">رابط المشروع أو الكود (اختياري)</label>
                        <input
                          type="text"
                          value={proj.link || ""}
                          onChange={(e) => updateProject(index, "link", e.target.value)}
                          placeholder="github.com/your-username/repo"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-left text-black"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs text-slate-500">التقنيات المستخدمة (Tech Stack)</label>
                        <input
                          type="text"
                          value={proj.techStack}
                          onChange={(e) => updateProject(index, "techStack", e.target.value)}
                          placeholder="مثال: React, Node.js, MongoDB"
                          className="bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] font-mono text-black"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-500">وصف بسيط للمشروع وأهم أهدافه</label>
                        <button
                          onClick={() => improveWithAI("description", proj.description, index, 'projects')}
                          className="flex items-center gap-1 text-[10px] text-[#2D5A27] font-bold uppercase tracking-wider bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 px-3 py-1.5 rounded-lg cursor-pointer transition"
                        >
                          {aiLoadingField === `projects-${index}-description` ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Sparkles size={12} />
                          )}
                          <span>تحسين بالذكاء الاصطناعي</span>
                          {!isPro && <span className="text-[9px] bg-[#2D5A27] text-white px-1.5 py-0.5 rounded-full font-bold ml-1 uppercase">PRO</span>}
                        </button>
                      </div>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        rows={3}
                        placeholder="اشرح المشكلة التي يحلها المشروع، والمهام التي أنجزتها فيه..."
                        className="bg-white border border-black/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2D5A27] text-black leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: SKILLS */}
        {activeStep === 4 && (
          <div className="flex flex-col gap-6">
            <h3 className="text-base font-bold font-serif italic text-[#121212]">المهارات والخبرات العملية</h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="أضف مهارة جديدة (مثال: React.js, UI/UX, Git)..."
                className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D5A27] text-black flex-1"
              />
              <button
                onClick={addSkill}
                className="bg-[#2D5A27] hover:bg-[#1D3B19] text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
              >
                إضافة
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-500 font-serif italic">المهارات الحالية (اضغط على X لحذف أي مهارة):</span>
              <div className="flex flex-wrap gap-2 p-4 bg-[#F8F6F2] border border-black/5 rounded-xl min-h-[100px]">
                {data.skills.length === 0 ? (
                  <span className="text-slate-400 text-xs italic">لم تقم بإضافة أي مهارات بعد.</span>
                ) : (
                  data.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 text-[#2D5A27] border border-[#2D5A27]/10 px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-red-600 text-[10px] font-bold cursor-pointer hover:scale-110 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Quick Skills Suggester */}
            <div className="bg-[#F8F6F2] border border-black/5 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#2D5A27]" />
                <span className="text-xs font-bold text-[#121212] font-serif italic">اقترحات مهارات شائعة:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["REST APIs", "TypeScript", "Docker", "Agile Methodologies", "Jest & Testing", "Node.js", "GraphQL", "Figma", "Redux Toolkit", "Next.js"].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!data.skills.includes(s)) {
                        onChange({ ...data, skills: [...data.skills, s] });
                      }
                    }}
                    disabled={data.skills.includes(s)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition cursor-pointer ${
                      data.skills.includes(s)
                        ? "border-transparent bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "border-black/10 bg-white hover:bg-black/5 text-[#121212]/80"
                    }`}
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nav Controls */}
      <div className="flex justify-between items-center border-t border-black/5 pt-4 mt-2">
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className="flex items-center gap-1.5 px-4 py-2 border border-black/10 text-slate-600 hover:bg-black/5 rounded-xl text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition"
        >
          <ArrowRight size={14} />
          <span>السابق</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">الخطوة {activeStep + 1} من {steps.length}</span>

        <button
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-black/90 text-white rounded-xl text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition font-bold uppercase tracking-wider shadow-sm"
        >
          <span>التالي</span>
          <ArrowLeft size={14} />
        </button>
      </div>
    </div>
  );
};
