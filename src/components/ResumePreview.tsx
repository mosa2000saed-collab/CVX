import React, { useRef } from "react";
import { ResumeData, TemplateType } from "../types";
import { Mail, Phone, MapPin, Linkedin, Github, Printer, Download, Sparkles, AlertCircle } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const resumeWrapper = resumeRef.current;
    if (!resumeWrapper) return;

    // Get the actual resume card (first child), or fallback to the wrapper itself
    const resumeCard = resumeWrapper.firstElementChild || resumeWrapper;

    // Clone the resume node
    const clone = resumeCard.cloneNode(true) as HTMLDivElement;
    clone.classList.add("print-only-section");
    
    // Create a temporary style element to control print layout
    const style = document.createElement("style");
    style.id = "print-style-override";
    style.innerHTML = `
      @media print {
        /* Hide all direct children of body */
        body > * {
          display: none !important;
        }
        /* Show only our print-only-section */
        body > .print-only-section, body > .print-only-section * {
          display: block !important;
        }
        body > .print-only-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100% !important;
          max-width: 100% !important;
          background: white !important;
          color: black !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
          border: none !important;
          border-radius: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          direction: rtl;
        }
        /* Force layout classes during printing */
        body > .print-only-section .flex {
          display: flex !important;
        }
        body > .print-only-section .grid {
          display: grid !important;
        }
        body > .print-only-section .inline-flex {
          display: inline-flex !important;
        }
        body > .print-only-section .hidden {
          display: none !important;
        }
        /* Reset specific dimensions and margins for A4 pages */
        body > .print-only-section,
        body > .print-only-section > div {
          width: 100% !important;
          max-width: 100% !important;
          box-shadow: none !important;
          border: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        @page {
          size: A4;
          margin: 10mm 15mm 10mm 15mm;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(clone);

    // Give a small delay to ensure rendering and font styles are applied
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.error("Print dialog failed", err);
      } finally {
        // Clean up
        if (document.body.contains(clone)) {
          document.body.removeChild(clone);
        }
        const styleElement = document.getElementById("print-style-override");
        if (styleElement) {
          styleElement.remove();
        }
      }
    }, 150);
  };

  const renderTemplate = () => {
    const { personalInfo, education, experience, projects, skills } = data;

    // 1. MODERN TEMPLATE
    if (template === "modern") {
      return (
        <div className="grid grid-cols-3 min-h-[1050px] bg-white text-slate-800 rounded-xl overflow-hidden shadow-md text-right" dir="rtl">
          {/* Right Rail (Sidebar) in modern blue/slate theme */}
          <div className="col-span-1 bg-slate-900 text-slate-100 p-8 flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">{personalInfo.fullName || "الاسم الكامل"}</h2>
              <p className="text-cyan-400 text-sm mt-1 font-medium">{personalInfo.title || "المسمى الوظيفي"}</p>
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-4 text-xs">
              <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-1">اتصال</h3>
              {personalInfo.phone && (
                <div className="flex items-center gap-2 justify-start">
                  <Phone size={14} className="text-cyan-400 shrink-0" />
                  <span className="font-mono text-left w-full break-all">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2 justify-start">
                  <Mail size={14} className="text-cyan-400 shrink-0" />
                  <span className="font-mono text-left w-full break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.city && (
                <div className="flex items-center gap-2 justify-start">
                  <MapPin size={14} className="text-cyan-400 shrink-0" />
                  <span className="break-all">{personalInfo.city}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 justify-start">
                  <Linkedin size={14} className="text-cyan-400 shrink-0" />
                  <span className="font-mono text-left w-full break-all text-[10px]">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2 justify-start">
                  <Github size={14} className="text-cyan-400 shrink-0" />
                  <span className="font-mono text-left w-full break-all text-[10px]">{personalInfo.github}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-sm border-b border-slate-700 pb-1">المهارات</h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span key={index} className="bg-slate-800 text-cyan-300 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs">لا يوجد مهارات مضافة بعد</span>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2 p-8 flex flex-col gap-6 bg-slate-50">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1">الملخص المهني</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1">الخبرة المهنية</h3>
              {experience.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 text-sm">{exp.role}</h4>
                        <span className="text-xs text-slate-500 font-mono">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-cyan-600 text-xs font-semibold">{exp.company}</p>
                      <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic">أضف خبراتك لعرضها هنا</p>
              )}
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1">المشاريع</h3>
              {projects.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 text-sm">{proj.title}</h4>
                        {proj.link && <span className="text-[10px] text-cyan-600 font-mono">{proj.link}</span>}
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{proj.description}</p>
                      {proj.techStack && (
                        <p className="text-slate-500 text-[11px] mt-1">
                          <strong className="text-slate-700">التقنيات:</strong> {proj.techStack}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic">أضف مشاريعك المهنية لعرضها هنا</p>
              )}
            </div>

            {/* Education */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-200 pb-1">التعليم</h3>
              {education.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800">{edu.institution}</h4>
                        <p className="text-slate-600">{edu.degree} في {edu.fieldOfStudy}</p>
                        {edu.grade && <p className="text-slate-500 text-[11px]">المعدل: {edu.grade}</p>}
                      </div>
                      <span className="text-slate-500 font-mono">{edu.graduationYear}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs italic">أضف بياناتك التعليمية لعرضها هنا</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 2. MINIMAL TEMPLATE
    if (template === "minimal") {
      return (
        <div className="min-h-[1050px] bg-white text-stone-900 p-12 flex flex-col gap-8 text-right" dir="rtl">
          {/* Centered Name Header */}
          <div className="text-center border-b border-stone-200 pb-6 flex flex-col items-center gap-2">
            <h2 className="text-3xl font-light tracking-wide uppercase text-stone-900">{personalInfo.fullName || "الاسم الكامل"}</h2>
            <p className="text-stone-500 text-sm tracking-wider uppercase font-medium">{personalInfo.title || "المسمى الوظيفي"}</p>
            
            {/* Horizontal Contacts */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-stone-600 mt-3 font-mono">
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
              {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
              {personalInfo.city && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.city}</span>}
              {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} /> {personalInfo.linkedin}</span>}
              {personalInfo.github && <span className="flex items-center gap-1"><Github size={12} /> {personalInfo.github}</span>}
            </div>
          </div>

          {/* Profile Summary */}
          {personalInfo.summary && (
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 text-stone-400 text-xs font-bold uppercase tracking-wider">نبذة شخصية</div>
              <div className="col-span-3 text-stone-600 text-sm leading-relaxed">{personalInfo.summary}</div>
            </div>
          )}

          {/* Experience */}
          <div className="grid grid-cols-4 gap-4 border-t border-stone-100 pt-6">
            <div className="col-span-1 text-stone-400 text-xs font-bold uppercase tracking-wider">الخبرات العملية</div>
            <div className="col-span-3 flex flex-col gap-6">
              {experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-stone-900 text-sm">{exp.role} @ <span className="text-stone-600 font-medium">{exp.company}</span></h4>
                      <span className="text-xs text-stone-400 font-mono">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic">لا توجد خبرات بعد.</p>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-4 gap-4 border-t border-stone-100 pt-6">
            <div className="col-span-1 text-stone-400 text-xs font-bold uppercase tracking-wider">أهم المشاريع</div>
            <div className="col-span-3 flex flex-col gap-6">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <div key={proj.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-stone-900 text-sm">{proj.title}</h4>
                      {proj.link && <span className="text-[10px] text-stone-500 font-mono">{proj.link}</span>}
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed mt-1">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-stone-400 text-[10px] uppercase tracking-wider mt-1">التقنيات: {proj.techStack}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic">لا توجد مشاريع مضافة.</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="grid grid-cols-4 gap-4 border-t border-stone-100 pt-6">
            <div className="col-span-1 text-stone-400 text-xs font-bold uppercase tracking-wider">التعليم والشهادات</div>
            <div className="col-span-3 flex flex-col gap-4">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs">
                    <div>
                      <h4 className="font-semibold text-stone-900">{edu.institution}</h4>
                      <p className="text-stone-600">{edu.degree} في {edu.fieldOfStudy}</p>
                      {edu.grade && <p className="text-stone-500 text-[11px]">المعدل: {edu.grade}</p>}
                    </div>
                    <span className="text-stone-400 font-mono">{edu.graduationYear}</span>
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic">لم يضف تعليم بعد.</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 gap-4 border-t border-stone-100 pt-6">
            <div className="col-span-1 text-stone-400 text-xs font-bold uppercase tracking-wider">المهارات التقنية</div>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-stone-700 text-xs">
                {skills.length > 0 ? (
                  skills.map((skill, idx) => (
                    <span key={idx} className="after:content-['•'] last:after:content-none after:margin-right-2 flex gap-1 items-center">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-stone-400 text-xs">لم تضف مهارات.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. TECH / DEVELOPER TEMPLATE
    if (template === "tech") {
      return (
        <div className="min-h-[1050px] bg-neutral-950 text-emerald-400 p-10 font-mono rounded-xl shadow-lg border border-neutral-800 text-right" dir="rtl">
          {/* Header */}
          <div className="border-b-2 border-emerald-500/30 pb-6 flex justify-between items-start">
            <div>
              <div className="text-emerald-500 font-bold tracking-tight text-2xl mb-1">&lt; {personalInfo.fullName || "NAME"} /&gt;</div>
              <p className="text-neutral-400 text-xs font-semibold uppercase">{personalInfo.title || "TITLE"}</p>
            </div>
            
            <div className="text-left font-mono text-[11px] text-neutral-400 space-y-1">
              {personalInfo.email && <div>EMAIL: <span className="text-neutral-200">{personalInfo.email}</span></div>}
              {personalInfo.phone && <div>TEL: <span className="text-neutral-200">{personalInfo.phone}</span></div>}
              {personalInfo.city && <div>LOC: <span className="text-neutral-200">{personalInfo.city}</span></div>}
              {personalInfo.github && <div>GITHUB: <span className="text-emerald-500 underline">{personalInfo.github}</span></div>}
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="my-6">
              <div className="text-emerald-500 font-bold mb-1">&gt; PROFILE_SUMMARY</div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded text-neutral-300 text-xs leading-relaxed">
                {personalInfo.summary}
              </div>
            </div>
          )}

          {/* Experience */}
          <div className="my-6">
            <div className="text-emerald-500 font-bold mb-3">&gt; WORK_EXPERIENCE</div>
            <div className="space-y-4">
              {experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-emerald-500/20 pr-4 flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-200 font-bold">{exp.role} @ {exp.company}</span>
                      <span className="text-emerald-600 text-[10px]">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed whitespace-pre-line mt-1">{exp.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-neutral-600 text-xs">No experience found.</div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="my-6">
            <div className="text-emerald-500 font-bold mb-3">&gt; REPOSITORIES_AND_PROJECTS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <div key={proj.id} className="border border-neutral-800 bg-neutral-900/50 p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-neutral-200 text-xs font-bold">{proj.title}</span>
                      {proj.link && <span className="text-[9px] text-emerald-500 underline">link</span>}
                    </div>
                    <p className="text-neutral-400 text-[10px] leading-normal">{proj.description}</p>
                    {proj.techStack && (
                      <div className="text-[10px] text-emerald-600/80 mt-2">
                        STACK: {proj.techStack}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-neutral-600 text-xs col-span-2">No projects found.</div>
              )}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="my-6">
            <div className="text-emerald-500 font-bold mb-3">&gt; CORE_COMPETENCIES</div>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                    {skill}
                  </span>
                ))
              ) : (
                <div className="text-neutral-600 text-xs">No skills found.</div>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="my-6">
            <div className="text-emerald-500 font-bold mb-3">&gt; EDUCATION_DATA</div>
            <div className="space-y-3">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>{edu.institution} - {edu.degree} في {edu.fieldOfStudy}</span>
                      <span className="text-neutral-500">{edu.graduationYear}</span>
                    </div>
                    {edu.grade && <div className="text-[11px] text-emerald-600/70">GPA: {edu.grade}</div>}
                  </div>
                ))
              ) : (
                <div className="text-neutral-600 text-xs">No education records.</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 4. ELEGANT SERIF TEMPLATE
    if (template === "elegant") {
      return (
        <div className="min-h-[1050px] bg-amber-50/20 text-stone-800 p-12 font-serif rounded-xl shadow-md border border-amber-100 text-right" dir="rtl">
          {/* Top Line */}
          <div className="text-center pb-6 border-b border-stone-300">
            <h2 className="text-4xl font-normal text-stone-900 leading-tight tracking-normal mb-1">{personalInfo.fullName || "الاسم الكامل"}</h2>
            <p className="text-stone-600 italic text-md font-sans mb-3">{personalInfo.title || "المسمى الوظيفي"}</p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-stone-500 text-xs font-sans">
              {personalInfo.city && <span>{personalInfo.city}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>• {personalInfo.github}</span>}
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="my-8 text-center max-w-2xl mx-auto">
              <p className="text-stone-600 italic text-sm leading-relaxed font-serif">
                "{personalInfo.summary}"
              </p>
            </div>
          )}

          {/* Experience */}
          <div className="my-8">
            <h3 className="text-center text-stone-900 uppercase tracking-widest text-xs font-sans font-bold border-b border-stone-200 pb-2 mb-4">الخبرات المهنية والعملية</h3>
            <div className="space-y-6">
              {experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between font-sans text-xs uppercase tracking-wider font-bold text-stone-900">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-stone-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-stone-600 text-xs font-serif leading-relaxed pr-2 border-r border-stone-300 mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic text-center">أضف خبراتك المهنية</p>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="my-8">
            <h3 className="text-center text-stone-900 uppercase tracking-widest text-xs font-sans font-bold border-b border-stone-200 pb-2 mb-4">المشاريع المتميزة</h3>
            <div className="space-y-6">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex justify-between font-sans text-xs uppercase tracking-wider font-bold text-stone-900">
                      <span>{proj.title}</span>
                      {proj.link && <span className="lowercase font-normal text-stone-500 font-mono">{proj.link}</span>}
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed font-serif">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-stone-500 text-[11px] font-sans">الأدوات المستعملة: {proj.techStack}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic text-center">أضف مشاريعك</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="my-8">
            <h3 className="text-center text-stone-900 uppercase tracking-widest text-xs font-sans font-bold border-b border-stone-200 pb-2 mb-4">التعليم والتحصيل العلمي</h3>
            <div className="space-y-4">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-xs font-serif">
                    <div>
                      <h4 className="font-bold text-stone-900">{edu.institution}</h4>
                      <p className="text-stone-600 italic">{edu.degree} في {edu.fieldOfStudy}</p>
                      {edu.grade && <p className="text-stone-500 text-[11px] font-sans">المعدل: {edu.grade}</p>}
                    </div>
                    <span className="text-stone-500 font-sans">{edu.graduationYear}</span>
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-xs italic text-center">لم يضف تعليم بعد.</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="my-8">
            <h3 className="text-center text-stone-900 uppercase tracking-widest text-xs font-sans font-bold border-b border-stone-200 pb-2 mb-4">المهارات والخبرات التقنية</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-stone-100 text-stone-800 px-3 py-1 rounded text-xs font-sans border border-stone-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 5. CREATIVE TEMPLATE (Vibrant, Modern, warm corporate with coral/indigo accents)
    if (template === "creative") {
      return (
        <div className="min-h-[1050px] bg-white text-slate-800 p-10 rounded-xl shadow-md text-right border-t-[10px] border-[#E11D48]" dir="rtl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-rose-100 pb-8">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#E11D48] tracking-widest uppercase">الملف الإبداعي</span>
              <h2 className="text-3xl font-black text-slate-900 leading-none">{personalInfo.fullName || "الاسم الكامل"}</h2>
              <p className="text-slate-500 font-medium text-sm">{personalInfo.title || "المسمى الوظيفي"}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-2.5 text-xs font-semibold text-slate-600 min-w-[240px]">
              {personalInfo.email && <div className="flex items-center gap-2 justify-start"><Mail size={13} className="text-[#E11D48]" /><span className="font-mono text-left w-full">{personalInfo.email}</span></div>}
              {personalInfo.phone && <div className="flex items-center gap-2 justify-start"><Phone size={13} className="text-[#E11D48]" /><span className="font-mono text-left w-full">{personalInfo.phone}</span></div>}
              {personalInfo.city && <div className="flex items-center gap-2 justify-start"><MapPin size={13} className="text-[#E11D48]" /><span>{personalInfo.city}</span></div>}
              {personalInfo.linkedin && <div className="flex items-center gap-2 justify-start"><Linkedin size={13} className="text-[#E11D48]" /><span className="font-mono text-left w-full text-[10px]">{personalInfo.linkedin}</span></div>}
            </div>
          </div>

          {/* Profile Summary */}
          {personalInfo.summary && (
            <div className="my-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-6 bg-[#E11D48] rounded-full"></span>
                <h3 className="text-base font-bold text-slate-900">الرؤية والنبذة المهنية</h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed bg-rose-50/20 p-4 rounded-xl border border-rose-100/30">{personalInfo.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8 mt-8">
            {/* Left Main (Experience, Projects) */}
            <div className="col-span-2 flex flex-col gap-8">
              {/* Experience */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
                  <h3 className="text-base font-bold text-slate-900">الخبرات والمسار العملي</h3>
                </div>
                {experience.length > 0 ? (
                  <div className="relative border-r-2 border-indigo-100 pr-4 space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="relative group">
                        <span className="absolute -right-[21px] top-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border border-white group-hover:scale-125 transition"></span>
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-slate-900 text-xs">{exp.role}</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-indigo-600 text-[11px] font-semibold">{exp.company}</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed mt-1.5 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">أضف خبراتك لعرضها هنا</p>
                )}
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
                  <h3 className="text-base font-bold text-slate-900">المشاريع والمساهمات</h3>
                </div>
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-4 rounded-xl transition">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                          {proj.link && <span className="text-[10px] text-indigo-600 font-mono underline">{proj.link}</span>}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{proj.description}</p>
                        {proj.techStack && (
                          <p className="text-indigo-500 text-[10px] mt-2 font-mono"><b>المهارات:</b> {proj.techStack}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">أضف مشاريعك المهنية لعرضها هنا</p>
                )}
              </div>
            </div>

            {/* Right Rail (Education, Skills) */}
            <div className="col-span-1 flex flex-col gap-8">
              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-6 bg-[#E11D48] rounded-full"></span>
                  <h3 className="text-base font-bold text-slate-900">التعليم</h3>
                </div>
                {education.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex flex-col gap-1 text-xs">
                        <span className="font-mono text-slate-400 text-[10px]">{edu.graduationYear}</span>
                        <h4 className="font-bold text-slate-900">{edu.institution}</h4>
                        <p className="text-slate-600 text-[11px]">{edu.degree} - {edu.fieldOfStudy}</p>
                        {edu.grade && <span className="text-[10px] text-[#E11D48] font-mono">معدل: {edu.grade}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">أضف بياناتك التعليمية</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-6 bg-[#E11D48] rounded-full"></span>
                  <h3 className="text-base font-bold text-slate-900">المهارات</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2.5 py-1 rounded-lg text-xs font-semibold transition">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs">لا يوجد مهارات مضافة</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 6. ACADEMIC TEMPLATE (Double horizontal divider lines, traditional high density serif)
    if (template === "academic") {
      return (
        <div className="min-h-[1050px] bg-white text-neutral-900 p-12 font-serif rounded-xl shadow-md text-right" dir="rtl">
          {/* Centered Name */}
          <div className="text-center pb-4 flex flex-col items-center gap-1.5">
            <h2 className="text-3xl font-normal text-black tracking-normal">{personalInfo.fullName || "الاسم الكامل"}</h2>
            <p className="text-neutral-500 font-sans text-xs tracking-widest uppercase">{personalInfo.title || "المسمى الأكاديمي والمهني"}</p>
            
            {/* Horizontal line details */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-neutral-600 text-xs font-sans mt-2">
              {personalInfo.city && <span>{personalInfo.city}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span className="font-mono">• {personalInfo.email}</span>}
              {personalInfo.linkedin && <span className="font-mono">• {personalInfo.linkedin}</span>}
            </div>
          </div>

          <div className="border-t-[3px] border-b border-black py-1 my-4 text-center text-xs font-sans tracking-widest font-bold">
            سيرة ذاتية أكاديمية للتقديم على الجامعات والمناصب البحثية
          </div>

          {/* Academic Summary */}
          {personalInfo.summary && (
            <div className="my-6">
              <h3 className="text-xs uppercase font-sans tracking-wider font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-2">الملخص الأكاديمي والبحثي</h3>
              <p className="text-neutral-700 text-xs leading-relaxed font-serif">{personalInfo.summary}</p>
            </div>
          )}

          {/* Education First (Critical for Academics) */}
          <div className="my-6">
            <h3 className="text-xs uppercase font-sans tracking-wider font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">التحصيل العلمي والدرجات الأكاديمية</h3>
            <div className="space-y-4">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-neutral-900">
                      <span>{edu.institution}</span>
                      <span className="font-sans font-normal text-neutral-500">{edu.graduationYear}</span>
                    </div>
                    <p className="text-neutral-700 italic mt-0.5">{edu.degree} في {edu.fieldOfStudy}</p>
                    {edu.grade && <p className="text-neutral-500 font-sans text-[11px] mt-0.5">المعدل التراكمي: {edu.grade}</p>}
                  </div>
                ))
              ) : (
                <p className="text-neutral-400 text-xs italic">لم يضف تعليم بعد.</p>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="my-6">
            <h3 className="text-xs uppercase font-sans tracking-wider font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">الخبرات التدريسية والعملية</h3>
            <div className="space-y-4">
              {experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-neutral-900">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="font-sans font-normal text-neutral-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-1 whitespace-pre-line pr-2 border-r border-neutral-200">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400 text-xs italic">أضف خبراتك لعرضها هنا</p>
              )}
            </div>
          </div>

          {/* Projects (Publications, Research) */}
          <div className="my-6">
            <h3 className="text-xs uppercase font-sans tracking-wider font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">المنشورات والأبحاث والمشاريع</h3>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-neutral-900">
                      <span>{proj.title}</span>
                      {proj.link && <span className="text-[10px] font-sans font-normal text-neutral-500 font-mono">{proj.link}</span>}
                    </div>
                    <p className="text-neutral-600 leading-normal mt-0.5">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-neutral-500 font-sans text-[10px] mt-1">المنهجية والأدوات: {proj.techStack}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-neutral-400 text-xs italic">لا يوجد مشاريع مضافة</p>
              )}
            </div>
          </div>

          {/* Skills (Academic and Tech) */}
          <div className="my-6">
            <h3 className="text-xs uppercase font-sans tracking-wider font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-2">المهارات والاهتمامات البحثية</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-700 font-sans">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-neutral-400 text-xs">لم تضف مهارات</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 7. COMPACT TEMPLATE (Highly dense single-page layout for seasoned veterans)
    if (template === "compact") {
      return (
        <div className="min-h-[1050px] bg-white text-slate-900 p-8 rounded-xl shadow-md text-right text-[11px]" dir="rtl">
          {/* Extremely dense header */}
          <div className="flex justify-between items-center border-b border-slate-300 pb-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-none">{personalInfo.fullName || "الاسم الكامل"}</h2>
              <p className="text-slate-600 text-[11px] mt-1 font-medium">{personalInfo.title || "المسمى المهني"}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5 text-[10px] font-mono text-slate-500">
              <div className="flex gap-2">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>| {personalInfo.phone}</span>}
              </div>
              <div className="flex gap-2">
                {personalInfo.city && <span>{personalInfo.city}</span>}
                {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
              </div>
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-3.5">
              <p className="text-slate-600 leading-relaxed font-sans">{personalInfo.summary}</p>
            </div>
          )}

          {/* Main content split */}
          <div className="grid grid-cols-12 gap-5 border-t border-slate-100 pt-3">
            {/* Experience & Projects (8 cols) */}
            <div className="col-span-8 flex flex-col gap-4">
              {/* Experience */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">الخبرة العملية</h3>
                {experience.length > 0 ? (
                  <div className="space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="leading-relaxed">
                        <div className="flex justify-between items-baseline font-bold">
                          <span className="text-slate-800">{exp.role} / {exp.company}</span>
                          <span className="font-mono text-slate-500 text-[9px] font-normal">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-slate-600 text-[10.5px] whitespace-pre-line mt-0.5">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لا توجد خبرات</p>
                )}
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">المشاريع البارزة</h3>
                {projects.length > 0 ? (
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="leading-relaxed">
                        <div className="flex justify-between items-baseline font-bold">
                          <span className="text-slate-800">{proj.title}</span>
                          {proj.link && <span className="font-mono text-slate-400 text-[9px] font-normal">{proj.link}</span>}
                        </div>
                        <p className="text-slate-600 text-[10.5px] mt-0.5">{proj.description}</p>
                        {proj.techStack && (
                          <p className="text-slate-500 text-[9px] font-mono mt-0.5">التقنيات: {proj.techStack}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لا توجد مشاريع</p>
                )}
              </div>
            </div>

            {/* Education & Skills (4 cols) */}
            <div className="col-span-4 flex flex-col gap-4 border-r border-slate-100 pr-4">
              {/* Education */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">التعليم</h3>
                {education.length > 0 ? (
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="leading-tight">
                        <span className="font-mono text-slate-400 text-[9px]">{edu.graduationYear}</span>
                        <h4 className="font-bold text-slate-800 mt-0.5">{edu.institution}</h4>
                        <p className="text-slate-600 text-[10px]">{edu.degree} - {edu.fieldOfStudy}</p>
                        {edu.grade && <p className="text-slate-500 text-[9px] font-mono">معدل: {edu.grade}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لا يوجد تعليم</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">المهارات</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={index} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-medium border border-slate-200/50">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">لم تضف مهارات</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 8. EXECUTIVE TEMPLATE (Prestigious dark forest green/bronze executive design)
    if (template === "executive") {
      return (
        <div className="min-h-[1050px] bg-white text-slate-800 p-10 rounded-xl shadow-md text-right border-t-[12px] border-[#0F2D1F]" dir="rtl">
          {/* Executive Header Banner */}
          <div className="bg-[#0F2D1F]/5 border border-[#0F2D1F]/10 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-[#0F2D1F]">{personalInfo.fullName || "الاسم الكامل"}</h2>
              <p className="text-[#8B7355] text-sm font-semibold uppercase tracking-widest">{personalInfo.title || "المسمى التنفيذي"}</p>
            </div>
            <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600 md:items-end font-mono">
              {personalInfo.email && <div className="flex items-center gap-2">{personalInfo.email} <Mail size={12} className="text-[#8B7355]" /></div>}
              {personalInfo.phone && <div className="flex items-center gap-2">{personalInfo.phone} <Phone size={12} className="text-[#8B7355]" /></div>}
              {personalInfo.city && <div className="flex items-center gap-2">{personalInfo.city} <MapPin size={12} className="text-[#8B7355]" /></div>}
              {personalInfo.linkedin && <div className="flex items-center gap-2 text-[10px]">{personalInfo.linkedin} <Linkedin size={11} className="text-[#8B7355]" /></div>}
            </div>
          </div>

          {/* Profile Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h3 className="text-xs uppercase font-bold text-[#0F2D1F] tracking-widest border-b-2 border-[#8B7355]/30 pb-1 mb-3">الملخص الإداري والاستراتيجي</h3>
              <p className="text-slate-700 text-xs leading-relaxed font-serif italic pr-3 border-r-2 border-[#8B7355]">{personalInfo.summary}</p>
            </div>
          )}

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Experience (2 cols) */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <div>
                <h3 className="text-xs uppercase font-bold text-[#0F2D1F] tracking-widest border-b-2 border-[#8B7355]/30 pb-1 mb-4">الخبرات والقيادة التنفيذية</h3>
                {experience.length > 0 ? (
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="relative">
                        <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                          <span>{exp.role}</span>
                          <span className="font-mono text-[#8B7355] text-[10px] font-normal">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-[#0F2D1F] text-[11px] font-semibold mt-0.5">{exp.company}</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed mt-1.5 whitespace-pre-line pr-2 border-r border-slate-200">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لا توجد خبرات</p>
                )}
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold text-[#0F2D1F] tracking-widest border-b-2 border-[#8B7355]/30 pb-1 mb-4">المبادرات والمشاريع الاستراتيجية</h3>
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                          {proj.link && <span className="text-[10px] text-[#0F2D1F] font-mono">{proj.link}</span>}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{proj.description}</p>
                        {proj.techStack && (
                          <p className="text-[#8B7355] text-[10px] mt-2"><b>المنهجيات المعتمدة:</b> {proj.techStack}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لا يوجد مبادرات</p>
                )}
              </div>
            </div>

            {/* Education & Skills (1 col) */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-xs uppercase font-bold text-[#0F2D1F] tracking-widest border-b-2 border-[#8B7355]/30 pb-1 mb-4">التحصيل العلمي</h3>
                {education.length > 0 ? (
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex flex-col text-xs">
                        <span className="font-mono text-slate-400 text-[10px]">{edu.graduationYear}</span>
                        <h4 className="font-bold text-slate-900 mt-0.5">{edu.institution}</h4>
                        <p className="text-slate-600 text-[11px]">{edu.degree} - {edu.fieldOfStudy}</p>
                        {edu.grade && <span className="text-[10px] text-[#8B7355] font-mono">معدل: {edu.grade}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">لم يضف تعليم</p>
                )}
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold text-[#0F2D1F] tracking-widest border-b-2 border-[#8B7355]/30 pb-1 mb-4">القدرات والمهارات القيادية</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={index} className="bg-[#0F2D1F] text-white px-2.5 py-1 rounded text-xs border border-[#8B7355]/20 shadow-sm font-semibold">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">لا يوجد مهارات مضافة</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 9. CLASSIC TEMPLATE (High-contrast corporate standard, guaranteed ATS compliance)
    if (template === "classic") {
      return (
        <div className="min-h-[1050px] bg-white text-[#111111] p-12 rounded-xl shadow-md text-right font-sans" dir="rtl">
          {/* Elegant top bar */}
          <div className="border-b-2 border-[#111111] pb-4 mb-6 flex flex-col items-center text-center gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-black">{personalInfo.fullName || "الاسم الكامل"}</h2>
            <p className="text-[#111111] font-semibold text-xs tracking-wider uppercase">{personalInfo.title || "المسمى الوظيفي"}</p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-700 text-xs font-mono mt-2">
              {personalInfo.email && <span>البريد: {personalInfo.email}</span>}
              {personalInfo.phone && <span>| الهاتف: {personalInfo.phone}</span>}
              {personalInfo.city && <span>| العنوان: {personalInfo.city}</span>}
            </div>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-black border-b border-black pb-1 mb-2 uppercase">الخلاصة والهدف المهني</h3>
              <p className="text-slate-800 text-xs leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-black border-b border-black pb-1 mb-3 uppercase">الخبرات والوظائف السابقة</h3>
            {experience.length > 0 ? (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-black">
                      <span>{exp.role} @ {exp.company}</span>
                      <span className="font-mono font-normal text-slate-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed mt-1 whitespace-pre-line pr-2 border-r border-[#111111]/30">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">أضف خبراتك لعرضها هنا</p>
            )}
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-black border-b border-black pb-1 mb-3 uppercase">المشاريع المهنية</h3>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-black">
                      <span>{proj.title}</span>
                      {proj.link && <span className="font-mono font-normal text-slate-500">{proj.link}</span>}
                    </div>
                    <p className="text-slate-700 leading-normal mt-0.5">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-slate-600 text-[10px] mt-1 font-mono"><b>التقنيات المستعملة:</b> {proj.techStack}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">أضف مشاريعك المهنية</p>
            )}
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-black border-b border-black pb-1 mb-3 uppercase">التعليم والشهادات</h3>
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs text-slate-800">
                    <div>
                      <h4 className="font-bold text-black">{edu.institution}</h4>
                      <p className="text-slate-700">{edu.degree} في {edu.fieldOfStudy}</p>
                      {edu.grade && <p className="text-slate-500 text-[11px]">المعدل: {edu.grade}</p>}
                    </div>
                    <span className="font-mono text-slate-500">{edu.graduationYear}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">لم يضف تعليم بعد.</p>
            )}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-black border-b border-black pb-1 mb-2 uppercase">المهارات والقدرات الفنية</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-slate-800">
              {skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-slate-400">لم تضف مهارات بعد.</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Actions toolbar */}
      <div className="no-print bg-white border border-black/5 text-[#121212] px-5 py-4 rounded-2xl flex flex-wrap justify-between items-center gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#2D5A27] w-5 h-5 shrink-0" />
          <span className="text-sm font-bold font-serif italic">معاينة السيرة الذاتية ({template.toUpperCase()})</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2D5A27] hover:bg-[#1D3B19] text-white transition rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <Printer size={14} />
            <span>طباعة / حفظ PDF</span>
          </button>
        </div>
      </div>

      {/* Dynamic print/download instructions for iframe sandbox */}
      <div className="no-print bg-amber-50/70 border border-amber-200/60 p-4 rounded-2xl text-amber-900 text-xs leading-relaxed flex items-start gap-3 shadow-sm">
        <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="font-bold">💡 تلميح هام لتحميل السيرة الذاتية (PDF):</span>
          <span>بسبب قيود المتصفح الأمنية لبيئات المعاينة (Iframe)، قد يتم حظر نافذة الطباعة التلقائية داخل شاشات المعاينة.</span>
          <span className="font-semibold mt-1">
            لتحميل السيرة الذاتية بنجاح كملف PDF: يرجى الضغط على أيقونة <span className="underline text-[#2D5A27] font-bold">"Open in new tab" (فتح في علامة تبويب جديدة)</span> المتواجدة في أعلى يمين شاشة المعاينة الحالية، ثم اضغط على زر <span className="underline font-bold">"طباعة / حفظ PDF"</span> من هناك لتنزيل الملف مباشرة وبأعلى جودة!
          </span>
        </div>
      </div>

      {/* Actual resume page container */}
      <div ref={resumeRef} className="overflow-auto bg-[#F8F6F2] p-6 rounded-2xl border border-black/5">
        <div className="w-[800px] mx-auto shadow-md border border-black/5 rounded-2xl overflow-hidden origin-top transition-transform duration-300">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
