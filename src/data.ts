import { ResumeData } from "./types";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "أحمد العتيبي",
    email: "ahmed.otaibi@example.com",
    phone: "0551234567",
    city: "الرياض، المملكة العربية السعودية",
    title: "مطور واجهات أمامية (Frontend Developer)",
    linkedin: "linkedin.com/in/ahmed-otaibi",
    github: "github.com/ahmed-otaibi",
    summary: "مطور واجهات أمامية شغوف وخبرة سنتين في بناء تطبيقات الويب التفاعلية وسريعة الاستجابة باستخدام React وTypeScript وTailwind CSS. أهتم بتحسين الأداء وتوفير تجربة مستخدم استثنائية وسلسة.",
  },
  education: [
    {
      id: "edu-1",
      institution: "جامعة الملك سعود",
      degree: "بكالوريوس",
      fieldOfStudy: "علوم الحاسب",
      graduationYear: "2024",
      grade: "4.8 / 5.0",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "شركة الحلول الرقمية الذكية",
      role: "Frontend Developer",
      startDate: "2024-03",
      endDate: "الحالي",
      description: "قمت بتطوير وإطلاق بوابة العملاء الجديدة باستخدام React وTailwind CSS مما ساهم في تحسين سرعة التحميل بنسبة 35% وزيادة رضا المستخدمين. عملت بشكل وثيق مع فريق UI/UX لتحويل النماذج والمخططات إلى تصاميم حية وبجودة عالية.",
    },
    {
      id: "exp-2",
      company: "منصة إبداع للتدريب",
      role: "متدرب مطور ويب",
      startDate: "2023-06",
      endDate: "2023-09",
      description: "شاركت في تطوير لوحات التحكم وإدارة المحتوى والتحقق من صحة المدخلات. قمت بكتابة اختبارات وحدة لضمان كفاءة وخلو الأكواد من الأخطاء.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "متجر نبتة الإلكتروني",
      description: "تطبيق ويب متكامل لشراء النباتات المنزلية مع نظام سلة تسوق وإتمام دفع محاكى. مدمج مع لوحة تحكم لإدارة المنتجات والمخزون.",
      techStack: "React, Context API, Tailwind, LocalStorage",
      link: "github.com/ahmed/nabta-store",
    },
  ],
  skills: [
    "HTML5 & CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Tailwind CSS",
    "Git & GitHub",
    "Responsive Design",
    "RESTful APIs",
  ],
};
