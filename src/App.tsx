import React, { useState, useEffect } from "react";
import { ResumeData, TemplateType, RoleType, TabType } from "./types";
import { initialResumeData } from "./data";
import { allProfessionalPresets } from "./presets";
import { Dashboard } from "./components/Dashboard";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { ATSAnalyzer } from "./components/ATSAnalyzer";
import { CoverLetter } from "./components/CoverLetter";
import { Portfolio } from "./components/Portfolio";
import { CareerAdvisor } from "./components/CareerAdvisor";
import { Settings } from "./components/Settings";

// Icons
import {
  LayoutDashboard,
  FileCheck,
  LayoutTemplate,
  Target,
  FileText,
  Globe,
  BrainCircuit,
  Settings as SettingsIcon,
  Sparkles,
  Trophy,
  X,
  CreditCard,
  CheckCircle2,
  Mail,
  User,
  Info,
  ChevronLeft,
  ArrowLeft
} from "lucide-react";

export default function App() {
  const [tab, setTab] = useState<TabType>("dashboard");
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<TemplateType>("modern");
  const [roleType, setRoleType] = useState<RoleType>("developer");
  const [isPro, setIsPro] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // Payment mock form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Career presets search and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  // Load saved state if any (for smooth persistence)
  useEffect(() => {
    const savedData = localStorage.getItem("cvx_resume_data");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading resume data from localStorage", e);
      }
    }

    const savedPro = localStorage.getItem("cvx_is_pro");
    if (savedPro) {
      setIsPro(savedPro === "true");
    }
  }, []);

  const handleResumeDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    localStorage.setItem("cvx_resume_data", JSON.stringify(newData));
  };

  const handleUpgrade = () => {
    setIsPro(true);
    localStorage.setItem("cvx_is_pro", "true");
    setShowPaymentModal(false);
  };

  const handleDowngrade = () => {
    setIsPro(false);
    localStorage.setItem("cvx_is_pro", "false");
  };

  const executeMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      handleUpgrade();
      setPaymentSuccess(false);
      // Reset form
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCvv("");
    }, 2000);
  };

  const sidebarItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: <LayoutDashboard size={18} /> },
    { id: "builder", label: "صانع السيرة", icon: <FileCheck size={18} /> },
    { id: "templates", label: "قوالب التصاميم", icon: <LayoutTemplate size={18} /> },
    { id: "ats", label: "مُحلل ATS", icon: <Target size={18} />, badge: "PRO" },
    { id: "cover-letter", label: "خطاب التقديم", icon: <FileText size={18} />, badge: "PRO" },
    { id: "portfolio", label: "موقع شخصي", icon: <Globe size={18} />, badge: "PRO" },
    { id: "advisor", label: "المستشار المهني", icon: <BrainCircuit size={18} /> },
    { id: "settings", label: "إدارة الحساب", icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#121212] flex flex-col font-sans selection:bg-[#2D5A27]/20" dir="rtl">
      {/* Dynamic Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/5 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-3xl font-black tracking-tighter leading-none text-[#121212]">
            CV<span className="text-[#2D5A27]">X</span>
          </div>
          <div className="border-r border-black/10 pr-6 hidden sm:block">
            <span className="text-xs uppercase tracking-widest font-bold opacity-80">منصة الهوية المهنية</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-wider font-bold opacity-40">متصل بالذكاء الاصطناعي</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* User state */}
          <div className="hidden sm:flex flex-col text-left items-end">
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono">sa22ed44@gmail.com</span>
            <span className="text-xs font-bold uppercase mt-0.5 tracking-wider text-[#2D5A27] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#2D5A27] animate-ping"></span>
              <span>عضوية احترافية مجانية بالكامل ✨</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Responsive Sidebar */}
        <aside className="w-full lg:w-64 bg-white/70 backdrop-blur-sm border-l border-black/5 p-6 flex flex-col gap-1 shrink-0">
          <div className="px-3 mb-4 text-[10px] uppercase tracking-widest opacity-50 font-bold">القائمة الرئيسية</div>
          
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as TabType)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                  tab === item.id
                    ? "bg-[#2D5A27]/10 text-[#2D5A27] border-r-4 border-[#2D5A27] font-bold"
                    : "text-[#121212]/60 hover:text-[#121212] hover:bg-black/5"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`mr-auto text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.badge === "PRO" ? "bg-[#2D5A27] text-white" : "bg-black/5 text-[#121212]/60"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick usage info inside sidebar */}
          <div className="hidden lg:flex flex-col mt-auto bg-[#F8F6F2] border border-black/5 p-4 rounded-xl gap-2">
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">سيرتك الحالية</span>
            <span className="text-sm font-serif italic text-[#121212] truncate">{resumeData.personalInfo.fullName || "سيرة بدون اسم"}</span>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-60 mt-1">
              <span>القالب:</span>
              <span className="font-bold text-[#2D5A27]">{template}</span>
            </div>
          </div>
        </aside>

        {/* Content View Container */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#F8F6F2]">
          <div className="max-w-7xl mx-auto animate-fade-in">
            
            {/* Tab Routing */}
            {tab === "dashboard" && (
              <Dashboard
                resumeData={resumeData}
                roleType={roleType}
                setRoleType={setRoleType}
                onNavigate={(destination) => setTab(destination as TabType)}
                isPro={isPro}
                onShowPayment={() => setShowPaymentModal(true)}
              />
            )}

            {tab === "builder" && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Split layout: Form Editor on the left, live Styled Preview on the right */}
                <div className="xl:col-span-5 flex flex-col gap-5">
                  <div className="flex justify-between items-center bg-white border border-black/5 p-4 rounded-xl shadow-sm">
                    <span className="text-xs uppercase tracking-widest font-black opacity-80">مُحرر البيانات الذكي</span>
                    <span className="text-[10px] uppercase tracking-wider font-mono opacity-40">التحديث تلقائي ومباشر</span>
                  </div>
                  <ResumeForm
                    data={resumeData}
                    onChange={handleResumeDataChange}
                    isPro={isPro}
                    onShowPayment={() => setShowPaymentModal(true)}
                  />
                </div>

                <div className="xl:col-span-7 flex flex-col gap-5">
                  <div className="bg-white border border-black/5 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm">
                    <div className="text-xs uppercase tracking-widest font-black opacity-80 shrink-0">اختر طابع التصميم (9 قوالب احترافية):</div>
                    <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
                      {[
                        { id: "modern", label: "عصري" },
                        { id: "minimal", label: "بسيط" },
                        { id: "tech", label: "تقني" },
                        { id: "elegant", label: "أنيق Serif" },
                        { id: "creative", label: "إبداعي" },
                        { id: "academic", label: "أكاديمي" },
                        { id: "compact", label: "مكثف" },
                        { id: "executive", label: "تنفيذي" },
                        { id: "classic", label: "كلاسيكي ATS" }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id as TemplateType)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shrink-0 ${
                            template === t.id
                              ? "bg-[#2D5A27]/10 border-[#2D5A27] text-[#2D5A27]"
                              : "bg-black/5 border-transparent text-[#121212]/60 hover:text-[#121212]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ResumePreview data={resumeData} template={template} />
                </div>
              </div>
            )}

            {tab === "templates" && (
              <div className="flex flex-col gap-10">
                {/* 1. Templates Selection Grid (9 Designs) */}
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D5A27] bg-[#2D5A27]/5 px-3 py-1 rounded-full">تصاميم احترافية معتمدة للشركات</span>
                      <h2 className="text-2xl font-black text-[#121212] mt-2 mb-1">تصفح قوالب السيرة الذاتية المهنية (٩ طوابع مختلفة)</h2>
                      <p className="text-xs text-slate-500">اختر قالب التصميم والخطوط الأنسب لمجالك وصناعتك لتبهر مدراء التوظيف والشركات.</p>
                    </div>
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: "modern", title: "القالب العصري (Modern)", desc: "تصميم أنيق مع عمود جانبي داكن يبرز بياناتك الشخصية والمهارات بشكل لافت وجذاب.", theme: "زبرجد وأزرق كوني" },
                      { id: "minimal", title: "القالب البسيط (Minimal)", desc: "تصميم كلاسيكي نظيف خالي من الزخارف، يركز على توازن المساحات البيضاء ومثالي للشركات الكبرى.", theme: "أبيض وأسود فاخر" },
                      { id: "tech", title: "القالب التقني المتطور (Tech)", desc: "تصميم عصري بخطوط برمجية ثابتة العرض وعلامات برمجية مثالي للمهندسين والمطورين.", theme: "أسود وزمردي مشع" },
                      { id: "elegant", title: "القالب الأنيق الكلاسيكي (Elegant)", desc: "تصميم دافئ وخطوط Serif مريحة تمنح سيرتك طابعاً أكاديمياً رصيناً.", theme: "أمبر وبيج هادئ" },
                      { id: "creative", title: "القالب الإبداعي (Creative)", desc: "تصميم واعد وألوان متباينة مبهرة تلفت انتباه مسؤولي التوظيف للمجالات الفنية والتسويق.", theme: "قرمزي ووردي ملهم" },
                      { id: "academic", title: "القالب الأكاديمي الرصين (Academic)", desc: "بنية تقليدية بصفة ثنائية الأسطر مثالية للتقديمات الجامعية، الأبحاث والمناصب الطبية.", theme: "حبر أسود وورق عاجي" },
                      { id: "compact", title: "القالب المكثف للمحترفين (Compact)", desc: "معد لتكثيف البيانات العريضة في صفحة واحدة للمهنيين والخبراء ذوي التاريخ الطويل.", theme: "رمادي كوني ناصع" },
                      { id: "executive", title: "القالب التنفيذي الفاخر (Executive)", desc: "تصميم راقي يجمع الأخضر الزمردي الداكن مع لمسة برونزية يعكس طابع القيادة والريادة.", theme: "زمردي ملكي وذهب برونزي" },
                      { id: "classic", title: "القالب القياسي للشركات (Classic ATS)", desc: "سيرة ذاتية أحادية العمود ممتازة العبور من خلال أنظمة الفرز والاتصال الفوري بمسؤولي التوظيف.", theme: "رمادي فحمي وأبيض ناصع" }
                    ].map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setTemplate(t.id as TemplateType);
                          setTab("builder");
                        }}
                        className={`bg-white border rounded-xl p-5 hover:border-[#2D5A27] hover:shadow-md cursor-pointer transition flex flex-col justify-between h-52 relative ${
                          template === t.id ? "border-[#2D5A27] ring-1 ring-[#2D5A27]" : "border-black/5"
                        }`}
                      >
                        {template === t.id && (
                          <span className="absolute top-4 left-4 bg-[#2D5A27] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">مختار حالياً</span>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-[#2D5A27] font-bold uppercase tracking-widest">{t.theme}</span>
                          <h3 className="font-serif italic text-base text-[#121212] mt-1 font-bold">{t.title}</h3>
                          <p className="text-slate-600 text-xs leading-relaxed mt-1">{t.desc}</p>
                        </div>
 
                        <div className="text-xs font-semibold text-[#2D5A27] flex items-center gap-1 mt-3">
                          <span>تطبيق هذا التصميم والمعاينة</span>
                          <ChevronLeft size={12} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Professional Career Presets Section (48 Ready-made CVs) */}
                <div className="border-t border-black/5 pt-10">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#E11D48] bg-[#E11D48]/5 px-3 py-1 rounded-full w-fit">مكتبة النماذج المعبأة بالكامل (100٪ مجاني)</span>
                    <h2 className="text-2xl font-black text-[#121212] mt-1">اختر من بين ٤٨ مساراً وتخصصاً مهنياً جاهزاً</h2>
                    <p className="text-xs text-slate-500">اختر تخصصك لتعبئة سيرتك الذاتية فوراً بمهارات، ومشاريع، وخبرات مهنية مصاغة باحترافية كاملة من قبل خبراء التوظيف.</p>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col gap-4 bg-white border border-black/5 p-6 rounded-2xl mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-3">
                      {/* Search Bar */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="ابحث عن مهنتك (مثال: مطور ويب، مهندس كهرباء، طبيب، محاسب...)"
                          className="w-full bg-[#F8F6F2] border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2D5A27] transition"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="absolute left-3 top-3.5 text-slate-400 hover:text-black text-xs font-bold"
                          >
                            مسح
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex flex-wrap gap-1.5 border-t border-black/5 pt-4">
                      {["الكل", "التقنية والبرمجة", "الهندسة والتصميم", "الإدارة والأعمال والمالية", "التسويق والمبيعات والإعلام", "التعليم واللغات والخدمات", "الصحة والرعاية الطبية", "القانون والضيافة والتخصصات الأخرى"].map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            selectedCategory === category
                              ? "bg-[#2D5A27] text-white"
                              : "bg-black/5 text-[#121212]/60 hover:bg-black/10 hover:text-black"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Presets Grid */}
                  {(() => {
                    const filteredPresets = allProfessionalPresets.filter((preset) => {
                      const matchesSearch = preset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                           preset.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                           preset.data.personalInfo.summary.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesCategory = selectedCategory === "الكل" || preset.category === selectedCategory;
                      return matchesSearch && matchesCategory;
                    });

                    if (filteredPresets.length === 0) {
                      return (
                        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-2 shadow-sm">
                          <span className="text-3xl">🔍</span>
                          <h3 className="font-bold text-slate-800 text-sm mt-2">عذراً، لم نجد نتائج تطابق بحثك</h3>
                          <p className="text-xs text-slate-400">جرب البحث بكلمات أبسط أو تصفح الأقسام والتبويبات الأخرى في الأعلى.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPresets.map((preset) => (
                          <div
                            key={preset.id}
                            className="bg-white border border-black/5 rounded-xl p-5 hover:border-[#2D5A27] hover:shadow-md transition flex flex-col justify-between h-56 shadow-sm"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="text-2xl">{preset.icon}</span>
                                <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                                  {preset.category}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-slate-900 mt-3">{preset.name}</h3>
                              <span className="text-[10px] text-slate-400 font-mono block">{preset.englishTitle}</span>
                              <p className="text-slate-500 text-xs line-clamp-3 mt-2 leading-relaxed">
                                {preset.data.personalInfo.summary}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`هل أنت متأكد من رغبتك في تحميل سيرة "${preset.name}" الجاهزة؟ سيؤدي ذلك إلى استبدال البيانات الحالية.`)) {
                                  handleResumeDataChange(preset.data);
                                  setTab("builder");
                                }
                              }}
                              className="mt-4 bg-[#2D5A27]/10 hover:bg-[#2D5A27] hover:text-white text-[#2D5A27] font-bold py-2.5 rounded-lg text-[11px] transition text-center cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <span>استخدام وتعديل هذا النموذج</span>
                              <ChevronLeft size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {tab === "ats" && (
              <ATSAnalyzer
                resumeData={resumeData}
                isPro={isPro}
                onShowPayment={() => setShowPaymentModal(true)}
              />
            )}

            {tab === "cover-letter" && (
              <CoverLetter
                resumeData={resumeData}
                isPro={isPro}
                onShowPayment={() => setShowPaymentModal(true)}
              />
            )}

            {tab === "portfolio" && (
              <Portfolio
                resumeData={resumeData}
                isPro={isPro}
                onShowPayment={() => setShowPaymentModal(true)}
              />
            )}

            {tab === "advisor" && (
              <CareerAdvisor
                resumeData={resumeData}
                isPro={isPro}
                onShowPayment={() => setShowPaymentModal(true)}
              />
            )}

            {tab === "settings" && (
              <Settings
                resumeData={resumeData}
                onImport={handleResumeDataChange}
                isPro={isPro}
                onUpgrade={() => setShowPaymentModal(true)}
                onDowngrade={handleDowngrade}
              />
            )}

          </div>
        </main>
      </div>

      {/* Interactive Mock Upgrade/Checkout Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in text-right" dir="rtl">
          <div className="bg-white border border-black/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col relative text-[#121212]">
            
            {/* Close button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-black transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="bg-[#2D5A27]/5 p-6 border-b border-black/5 flex items-center gap-3">
              <div className="bg-[#2D5A27] p-2 rounded-lg text-white shadow-md">
                <Trophy size={20} className="fill-white text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#121212]">ترقية الحساب للباقة الاحترافية (PRO)</h3>
                <span className="text-xs text-[#2D5A27] font-medium uppercase tracking-wider">افتح كافة قدرات وميزات الذكاء الاصطناعي بلا قيود</span>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
              {/* Feature comparison */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">مقارنة الميزات والقدرات الأساسية:</span>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#F8F6F2] p-4 rounded-xl border border-black/5 flex flex-col gap-2">
                    <span className="font-bold opacity-50">الباقة المجانية FREE</span>
                    <ul className="flex flex-col gap-1.5 opacity-70">
                      <li>• سيرة ذاتية واحدة</li>
                      <li>• قالب كلاسيكي واحد</li>
                      <li>• تحسين الملخص الشخصي فقط</li>
                      <li>✕ فحص ATS لفرز الوظائف</li>
                      <li>✕ كتابة Cover Letter ذكي</li>
                      <li>✕ محفظة أعمال على الويب</li>
                    </ul>
                  </div>

                  <div className="bg-[#2D5A27]/5 p-4 rounded-xl border border-[#2D5A27]/20 flex flex-col gap-2">
                    <span className="font-bold text-[#2D5A27] flex items-center gap-1">
                      <Sparkles size={12} />
                      <span>الباقة الاحترافية PRO</span>
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      <li className="text-[#2D5A27] font-medium">• سير ذاتية لا محدودة</li>
                      <li className="text-[#2D5A27] font-medium">• جميع القوالب الـ ٤ الاحترافية</li>
                      <li className="text-[#2D5A27] font-medium">• تحسين كافة المهام بالكامل</li>
                      <li className="text-[#2D5A27] font-medium">• محلل ATS ومقارنة الوظائف</li>
                      <li className="text-[#2D5A27] font-medium">• توليد Cover Letter ذكي</li>
                      <li className="text-[#2D5A27] font-medium">• موقع شخصي مباشر cvx.app</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Mock Form */}
              <form onSubmit={executeMockPayment} className="flex flex-col gap-4 border-t border-black/5 pt-5">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">معلومات الدفع التجريبي (محاكاة آمنة):</span>
                
                {paymentSuccess ? (
                  <div className="bg-[#2D5A27]/10 border border-[#2D5A27]/20 p-6 rounded-xl flex flex-col items-center justify-center gap-2 text-center animate-pulse">
                    <CheckCircle2 size={36} className="text-[#2D5A27]" />
                    <span className="text-sm font-bold text-[#2D5A27]">تمت معالجة الدفع بنجاح!</span>
                    <span className="text-xs text-slate-500">جاري ترقية حسابك لـ PRO الآن...</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-slate-500">رقم بطاقة الدفع</label>
                      <div className="flex items-center bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm font-mono text-left">
                        <CreditCard size={16} className="text-slate-400 ml-2" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          placeholder="4000 1234 5678 9010"
                          maxLength={19}
                          className="bg-transparent focus:outline-none flex-1 text-black font-mono text-left"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-500">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm font-mono text-left"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-500">الرمز السري (CVV)</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={3}
                          className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm font-mono text-left"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-slate-500">اسم صاحب البطاقة</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="AHMED ALOTAIBI"
                        className="bg-[#F8F6F2] border border-black/10 rounded-lg px-3 py-2 text-sm font-mono text-left"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 bg-[#2D5A27] hover:bg-[#1D3B19] text-white font-bold py-3 rounded-xl text-xs transition tracking-widest uppercase cursor-pointer text-center shadow-md"
                    >
                      إتمام الدفع الآمن (١٩ ريال / شهرياً)
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
