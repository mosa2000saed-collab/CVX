import { ResumeData } from "./types";

export interface ProfessionalPreset {
  id: string;
  name: string; // The job title in Arabic
  category: string; // Grouping category
  englishTitle: string;
  icon: string;
  data: ResumeData;
}

export const professionalPresets: ProfessionalPreset[] = [
  // --- TECH & IT ---
  {
    id: "preset-frontend",
    name: "مطور واجهات أمامية",
    englishTitle: "Frontend Developer",
    category: "التقنية والبرمجة",
    icon: "💻",
    data: {
      personalInfo: {
        fullName: "خالد بن محمد الحربي",
        email: "khaled.harbi@example.com",
        phone: "+966 50 123 4567",
        city: "الرياض، المملكة العربية السعودية",
        title: "مطور واجهات أمامية (Frontend Developer)",
        linkedin: "linkedin.com/in/khaled-harbi-dev",
        github: "github.com/khaled-harbi-dev",
        summary: "مطور واجهات أمامية متخصص في بناء تطبيقات ويب حديثة وتفاعلية وسريعة الاستجابة باستخدام React.js و Next.js و TypeScript. أركز على تحسين محركات البحث وسرعة التصفح وتوفير تجربة مستخدم خالية من العوائق."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة البرمجيات",
          graduationYear: "2023",
          grade: "3.9 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مجموعة تك لـ الحلول الرقمية",
          role: "Senior Frontend Engineer",
          startDate: "2023-05",
          endDate: "الحالي",
          description: "قدت عملية إعادة بناء البوابة الرئيسية للشركة باستخدام Next.js 14، مما أدى إلى خفض وقت تحميل الصفحة بنسبة 40% وتحسين نتائج Lighthouse إلى 98%.\nأشرفت على فريق من 3 مطورين ونسقت العمل مع مصممي واجهات المستخدم لضمان مطابقة التصاميم."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "منصة حجز العيادات الطبية",
          description: "تطبيق ويب متكامل يتيح للمرضى حجز المواعيد واستلام الوصفات الطبية بشكل فوري ومؤمن.",
          techStack: "React, Redux Toolkit, Tailwind CSS, REST APIs",
          link: "github.com/khaled/clinic-app"
        }
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript ES6", "Git/GitHub", "REST APIs", "Redux", "Lighthouse Optimization"]
    }
  },
  {
    id: "preset-backend",
    name: "مطور واجهات خلفية",
    englishTitle: "Backend Developer",
    category: "التقنية والبرمجة",
    icon: "⚙️",
    data: {
      personalInfo: {
        fullName: "عبدالرحمن سليمان العيسى",
        email: "abdulrahman.eisa@example.com",
        phone: "+966 55 456 7890",
        city: "جدة، المملكة العربية السعودية",
        title: "مطور واجهات خلفية (Backend Developer)",
        linkedin: "linkedin.com/in/abdulrahman-eisa",
        github: "github.com/abdulrahman-eisa",
        summary: "مهندس واجهات خلفية ذو خبرة في تصميم وتطوير الخدمات المصغرة (Microservices) وهندسة قواعد البيانات السحابية. متمكن من Node.js و Express و NestJS والتعامل مع قواعد البيانات العلائقية وغير العلائقية بكفاءة عالية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك عبدالعزيز",
          degree: "بكالوريوس",
          fieldOfStudy: "علوم الحاسب",
          graduationYear: "2022",
          grade: "4.75 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة سحابة لـ التقنيات الرقمية",
          role: "Node.js Backend Developer",
          startDate: "2022-07",
          endDate: "الحالي",
          description: "صممت وبنيت واجهات برمجية RESTful عالية الأداء تستقبل أكثر من 15,000 طلب في الدقيقة.\nقمت بتحسين استعلامات قاعدة بيانات PostgreSQL واستخدمت Redis لعمليات التخزين المؤقت، مما قلل وقت الاستجابة بنسبة 50%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "محرك معالجة المدفوعات السريع",
          description: "نظام خلفي آمن للربط مع بوابات الدفع المحلية والدولية مع توفير سجلات معالجة فورية.",
          techStack: "NestJS, PostgreSQL, Redis, Docker, Stripe API",
          link: "github.com/abdulrahman/payment-engine"
        }
      ],
      skills: ["Node.js", "NestJS", "Express.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "REST APIs", "Microservices", "Jest Testing"]
    }
  },
  {
    id: "preset-fullstack",
    name: "مطور ويب متكامل",
    englishTitle: "Full-Stack Developer",
    category: "التقنية والبرمجة",
    icon: "🌐",
    data: {
      personalInfo: {
        fullName: "فيصل خالد الشمري",
        email: "faisal.shammari@example.com",
        phone: "+966 53 111 2222",
        city: "الدمام، المملكة العربية السعودية",
        title: "مطور ويب متكامل (Full-Stack Developer)",
        linkedin: "linkedin.com/in/faisal-shammari",
        github: "github.com/faisal-shammari",
        summary: "مطور ويب متكامل يتمتع بقدرة فريدة على دمج تقنيات الواجهات الأمامية والأنظمة الخلفية. خبير في بناء تطبيقات الويب أحادية الصفحة (SPA) وتوليد المواقع الثابتة وتطوير خوادم سريعة وآمنة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فيصل",
          degree: "بكالوريوس",
          fieldOfStudy: "تقنية المعلومات",
          graduationYear: "2021",
          grade: "4.8 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "بوابة المستقبل للتقنية",
          role: "Full-Stack Engineer",
          startDate: "2021-09",
          endDate: "الحالي",
          description: "بنيت لوحة تحكم إدارية تفاعلية مع نظام تحليلات ورسوم بيانية فورية للشركات.\nاستخدمت Next.js في الواجهة وقمت بالربط بقاعدة بيانات MongoDB وسيرفر GraphQL لتوفير تجربة استعلام سريعة."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "منصة إدارة المهام التشاركية",
          description: "منصة متكاملة تسمح لفرق العمل بالتواصل وتوزيع المهام ومتابعة سير الإنجاز في الوقت الحقيقي.",
          techStack: "Next.js, Tailwind CSS, Prisma, MongoDB, WebSockets",
          link: "github.com/faisal/task-manager"
        }
      ],
      skills: ["Next.js", "React", "Node.js", "Prisma ORM", "MongoDB", "GraphQL", "WebSockets", "CSS/Tailwind", "CI/CD", "AWS Cloud"]
    }
  },
  {
    id: "preset-software",
    name: "مهندس برمجيات",
    englishTitle: "Software Engineer",
    category: "التقنية والبرمجة",
    icon: "🖥️",
    data: {
      personalInfo: {
        fullName: "ياسر بن علي القحطاني",
        email: "yasser.qahtani@example.com",
        phone: "+966 54 999 8888",
        city: "أبها، المملكة العربية السعودية",
        title: "مهندس برمجيات (Software Engineer)",
        linkedin: "linkedin.com/in/yasser-qahtani",
        github: "github.com/yasser-qahtani",
        summary: "مهندس برمجيات شغوف بتطوير بنى تحتية برمجية متماسكة وقابلة للتوسع. أهتم بتطبيق أنماط التصميم (Design Patterns) وهندسة البرمجيات النظيفة (Clean Architecture) لضمان سهولة الصيانة والتعديل."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك خالد",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة البرمجيات",
          graduationYear: "2020",
          grade: "4.9 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "أبجد الرقمية للأنظمة",
          role: "Software Architect",
          startDate: "2020-06",
          endDate: "الحالي",
          description: "قمت بتصميم بنية تحتية مرنة لنظام تخطيط الموارد ERP للشركات ساعد في دمج أقسام المحاسبة والمخازن بكفاءة.\nكتبت مستندات فنية شاملة ووجهت فريق العمل لاعتماد أسلوب البرمجة الموجهة للكائنات OOP وتغطية الاختبارات التلقائية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "مفسر الأكواد ولغة البرمجة التعليمية",
          description: "مفسر أكواد صغير ومبسط بلغة Go لتعليم الأطفال مبادئ علوم البرمجة والمنطق.",
          techStack: "Go, Lexer, Parser, AST, TDD",
          link: "github.com/yasser/small-interpreter"
        }
      ],
      skills: ["Software Architecture", "OOP & SOLID", "Java", "Go", "Design Patterns", "Clean Code", "Unit Testing", "UML Modeling", "Agile/Scrum"]
    }
  },
  {
    id: "preset-cloud",
    name: "مهندس حلول سحابية",
    englishTitle: "Cloud Solutions Engineer",
    category: "التقنية والبرمجة",
    icon: "☁️",
    data: {
      personalInfo: {
        fullName: "ماجد بن سعيد الزهراني",
        email: "majed.zahrani@example.com",
        phone: "+966 56 222 3333",
        city: "الدمام، المملكة العربية السعودية",
        title: "مهندس حلول سحابية (Cloud Solutions Engineer)",
        linkedin: "linkedin.com/in/majed-zahrani-cloud",
        github: "github.com/majed-zahrani",
        summary: "أخصائي حلول سحابية معتمد من AWS ومستشار البنية التحتية ككود (IaC). خبير في بناء أنظمة عالية التوفر وعالية المرونة وتصميم مسارات الهجرة السحابية السلسة للمنشآت الكبيرة والمتوسطة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة الحاسب الآلي",
          graduationYear: "2019",
          grade: "3.7 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "الشركة الوطنية للحلول السحابية",
          role: "Senior Cloud & DevOps Engineer",
          startDate: "2019-10",
          endDate: "الحالي",
          description: "أشرفت على ترحيل خوادم الشركة المادية On-Premise إلى بنية سحابية هجينة على AWS، مما وفر 30% من تكاليف الاستضافة وزاد أمن البيانات.\nصممت مسارات CI/CD مؤتمتة بنسبة 100% لإطلاق التحديثات باستخدام Terraform و GitHub Actions."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "بنية تحتية مؤتمتة ومقاومة للأعطال",
          description: "مشروع متكامل لإعداد بنية تحتية سحابية كاملة باستخدام الرموز البرمجية مع الحماية التلقائية.",
          techStack: "Terraform, AWS VPC, EC2, ECS, RDS, CloudWatch",
          link: "github.com/majed/aws-terraform-iac"
        }
      ],
      skills: ["AWS Cloud", "Terraform", "Docker & Kubernetes", "CI/CD", "Linux Administration", "GitHub Actions", "Python Scripting", "Cloud Security", "Cost Optimization"]
    }
  },
  {
    id: "preset-network",
    name: "مهندس شبكات",
    englishTitle: "Network Engineer",
    category: "التقنية والبرمجة",
    icon: "🔌",
    data: {
      personalInfo: {
        fullName: "طارق بن عادل السديري",
        email: "tariq.sudairy@example.com",
        phone: "+966 50 444 5555",
        city: "الرياض، المملكة العربية السعودية",
        title: "مهندس شبكات وبنى تحتية (Network Engineer)",
        linkedin: "linkedin.com/in/tariq-sudairy",
        github: "github.com/tariq-sudairy",
        summary: "مهندس شبكات حاصل على شهادة CCNA و CCNP وخبرة في إعداد وتكوين وإدارة الشبكات السلكية واللاسلكية المعقدة وحل مشاكل الاتصال وحماية البيانات داخل الفروع والشركات المتعددة المقرات."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الأمير سلطان",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة الاتصالات والشبكات",
          graduationYear: "2021",
          grade: "3.85 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة الاتصالات السعودية (STC)",
          role: "Associate Network Engineer",
          startDate: "2021-08",
          endDate: "الحالي",
          description: "قمت بتصميم وهندسة بروتوكولات التوجيه (Routing Protocols) مثل OSPF و BGP لعدد من شبكات عملاء القطاع الحكومي.\nأدرت جدران الحماية للشبكات (Cisco ASA, Palo Alto) للحد من الهجمات وضمان الخصوصية والاتصال الآمن."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "نظام محاكاة شبكة الحرم الجامعي",
          description: "تصميم ومحاكاة شبكة جامعة متكاملة تضم أكثر من 2000 مستخدم مع تأمين الممر الأساسي والشبكة اللاسلكية.",
          techStack: "Cisco Packet Tracer, GNS3, VLANs, OSPF, Access Control Lists",
          link: "github.com/tariq/campus-network-design"
        }
      ],
      skills: ["Cisco Routing & Switching", "CCNP Security", "Firewalls (Palo Alto)", "VPN Configuration", "VLANs & Subnetting", "DNS, DHCP, TCP/IP", "Wireshark Analysis", "Network Automation"]
    }
  },
  {
    id: "preset-cyber",
    name: "مهندس أمن سيبراني",
    englishTitle: "Cybersecurity Engineer",
    category: "التقنية والبرمجة",
    icon: "🛡️",
    data: {
      personalInfo: {
        fullName: "بندر بن أحمد العتيبي",
        email: "bandar.otaibi@example.com",
        phone: "+966 54 333 4444",
        city: "جدة، المملكة العربية السعودية",
        title: "مهندس أمن سيبراني (Cybersecurity Engineer)",
        linkedin: "linkedin.com/in/bandar-otaibi-sec",
        github: "github.com/bandar-otaibi",
        summary: "متخصص في الأمن السيبراني واختبار الاختراق وفحص الثغرات (Vulnerability Assessment). معتمد بشهادة CEH و CompTIA Security+ وشغوف بحماية البنى التحتية للمعلومات من الهجمات الخبيثة وتدريب الموظفين على وعي الأمن السيبراني."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك عبدالعزيز",
          degree: "بكالوريوس",
          fieldOfStudy: "الأمن السيبراني والتحري الرقمي",
          graduationYear: "2020",
          grade: "4.85 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "الشركة الوطنية للحلول الأمنية (سيف)",
          role: "Cybersecurity Analyst & Penetration Tester",
          startDate: "2020-09",
          endDate: "الحالي",
          description: "أجريت أكثر من 40 عملية اختبار اختراق لتطبيقات ويب وتطبيقات هواتف ذكية واكتشفت ثغرات حرجة قبل استغلالها.\nقمت بتطوير سياسات أمن المعلومات ISO 27001 وتطبيق أدوات SIEM لمراقبة الحوادث الأمنية على مدار الساعة."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "أداة فحص ثغرات الويب المؤتمتة",
          description: "نص برمجي مكتوب بلغة بايثون يقوم بفحص مواقع الويب وتحديد ثغرات حقن SQL الشهيرة وثغرات XSS.",
          techStack: "Python, Scrapy, BeautifulSoup, OWASP Top 10",
          link: "github.com/bandar/vuln-scanner"
        }
      ],
      skills: ["Penetration Testing", "OWASP Top 10", "CEH (Certified Ethical Hacker)", "SIEM (Splunk)", "Network Security", "Linux/Kali", "Python Scripting", "Incident Response", "ISO 27001 compliance"]
    }
  },
  {
    id: "preset-qa",
    name: "مهندس جودة البرمجيات",
    englishTitle: "QA Engineer",
    category: "التقنية والبرمجة",
    icon: "🧪",
    data: {
      personalInfo: {
        fullName: "سلطان عبدالمحسن السالم",
        email: "sultan.salem@example.com",
        phone: "+966 55 222 1111",
        city: "الرياض، المملكة العربية السعودية",
        title: "مهندس جودة برمجيات (QA Engineer)",
        linkedin: "linkedin.com/in/sultan-salem-qa",
        github: "github.com/sultan-salem-qa",
        summary: "مهندس جودة برمجيات متخصص في بناء وتصميم سيناريوهات الاختبار اليدوي والتلقائي (Automation Testing) لضمان موثوقية وجودة الأنظمة البرمجية وخلوها التام من الأخطاء والعيوب التشغيلية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة اليمامة",
          degree: "بكالوريوس",
          fieldOfStudy: "نظم المعلومات الإدارية",
          graduationYear: "2022",
          grade: "3.6 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة الحلول المبتكرة للخدمات الرقمية",
          role: "QA Automation Engineer",
          startDate: "2022-03",
          endDate: "الحالي",
          description: "أنشأت بنية تحتية لاختبار واجهات المستخدم باستخدام Cypress و Selenium، مما خفض وقت الاختبارات اليدوية التكرارية بنسبة 70%.\nشاركت في كتابة مستندات خطط الاختبار والتكامل المستمر CI/CD لمطابقة الكود وتجنب المشاكل في بيئات الإنتاج."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "بنية اختبار واجهات برمجية مؤتمتة",
          description: "بناء مستودع اختبارات تلقائية لواجهات برمجة تطبيقات لشركة تجارة إلكترونية مع إصدار تقارير HTML مفصلة.",
          techStack: "Postman, Newman, JavaScript, Playwright",
          link: "github.com/sultan/api-qa-suite"
        }
      ],
      skills: ["Automation Testing", "Selenium WebDriver", "Cypress", "Playwright", "Postman", "Bug Tracking (Jira)", "API Testing", "Agile Testing", "Regressive Testing"]
    }
  },
  {
    id: "preset-mobile",
    name: "مطور تطبيقات هواتف ذكية",
    englishTitle: "Mobile App Developer",
    category: "التقنية والبرمجة",
    icon: "📱",
    data: {
      personalInfo: {
        fullName: "فهد بن صالح المطيري",
        email: "fahad.mutairi@example.com",
        phone: "+966 53 777 6666",
        city: "المدينة المنورة، المملكة العربية السعودية",
        title: "مطور تطبيقات هواتف (Flutter & iOS)",
        linkedin: "linkedin.com/in/fahad-mutairi",
        github: "github.com/fahad-mutairi",
        summary: "مطور تطبيقات هواتف محترف بخبرة ٣ سنوات في بناء تطبيقات مستقرة وأنيقة وسريعة الاستجابة باستخدام Flutter وتصديرها لنظامي iOS و Android مع الحفاظ على الأداء وسلاسة الحركات والانتقالات."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة طيبة",
          degree: "بكالوريوس",
          fieldOfStudy: "علوم الحاسب",
          graduationYear: "2021",
          grade: "4.6 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مجموعة الحلول التقنية المتقدمة",
          role: "Flutter Developer",
          startDate: "2021-08",
          endDate: "الحالي",
          description: "طورت وأطلقت 3 تطبيقات تجارة إلكترونية ومقاولات على متجري App Store و Google Play.\nقمت بتحسين استهلاك ذاكرة التطبيقات بنسبة 20% وربطت خدمات الإشعارات الفورية والتكامل مع الخرائط وبوابات الدفع."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تطبيق توصيل الطلبات في المدينة",
          description: "تطبيق لتوصيل الطلبات والمأكولات المنزلية مع تتبع مباشر للمندوب عبر الخريطة.",
          techStack: "Flutter, Dart, Firebase, Google Maps API, Stripe",
          link: "github.com/fahad/delivery-app"
        }
      ],
      skills: ["Flutter & Dart", "iOS Deployment", "Android Studio", "State Management (Bloc, Provider)", "Firebase Integration", "REST APIs Integration", "Google Maps SDK", "Git", "Push Notifications"]
    }
  },
  {
    id: "preset-datascientist",
    name: "عالم بيانات",
    englishTitle: "Data Scientist",
    category: "التقنية والبرمجة",
    icon: "📊",
    data: {
      personalInfo: {
        fullName: "عبدالعزيز بن فهد السبيعي",
        email: "abdulaziz.subaie@example.com",
        phone: "+966 50 888 9999",
        city: "الرياض، المملكة العربية السعودية",
        title: "عالم بيانات والتعلم الآلي (Data Scientist)",
        linkedin: "linkedin.com/in/abdulaziz-subaie",
        github: "github.com/abdulaziz-subaie",
        summary: "عالم بيانات وباحث في الذكاء الاصطناعي مهتم بتحويل مجموعات البيانات الكبيرة إلى رؤى استراتيجية تدعم اتخاذ القرارات. متخصص في تنظيف البيانات وبناء النماذج التنبؤية المعقدة وتطبيق خوارزميات التعلم الآلي."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "ماجستير",
          fieldOfStudy: "الذكاء الاصطناعي وعلم البيانات",
          graduationYear: "2022",
          grade: "4.95 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)",
          role: "Data Scientist",
          startDate: "2022-10",
          endDate: "الحالي",
          description: "بنيت نموذج تنبؤي للمساعدة في إدارة حركة المرور في الرياض وتقليل فترات الازدحام بنسبة 15%.\nأعددت لوحات تحكم تفاعلية لصانعي القرار باستخدام Python و Tableau لتسهيل مراجعة الأرقام اليومية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تصنيف وتحليل المشاعر من التغريدات العربية",
          description: "نموذج معالجة لغة طبيعية يقوم بتصنيف التغريدات العربية إلى إيجابية أو سلبية أو محايدة بدقة 92%.",
          techStack: "Python, PyTorch, Transformers, BERT, Hugging Face",
          link: "github.com/abdulaziz/arabic-sentiment"
        }
      ],
      skills: ["Python", "R Programming", "Machine Learning", "Deep Learning (PyTorch)", "SQL & NoSQL", "Pandas & NumPy", "Tableau / PowerBI", "Natural Language Processing (NLP)", "Data Cleansing"]
    }
  },
  {
    id: "preset-dataanalyst",
    name: "محلل بيانات",
    englishTitle: "Data Analyst",
    category: "التقنية والبرمجة",
    icon: "📈",
    data: {
      personalInfo: {
        fullName: "نورة بنت عبدالكريم الدوسري",
        email: "noura.dosari@example.com",
        phone: "+966 56 123 7890",
        city: "الرياض، المملكة العربية السعودية",
        title: "محلل بيانات (Data Analyst)",
        linkedin: "linkedin.com/in/noura-dosari-data",
        github: "github.com/noura-dosari",
        summary: "محللة بيانات متخصصة في جمع وتحليل البيانات وتصميم التقارير الذكية ولوحات التحكم التفاعلية باستخدام SQL و Excel و Power BI لمساعدة قطاعات التسويق والمبيعات على زيادة الكفاءة التشغيلية والربحية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الأميرة نورة بنت عبدالرحمن",
          degree: "بكالوريوس",
          fieldOfStudy: "نظم المعلومات الإدارية",
          graduationYear: "2021",
          grade: "4.9 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة متاجر التجزئة الكبرى",
          role: "Data Analyst",
          startDate: "2021-09",
          endDate: "الحالي",
          description: "أعددت تقارير مبيعات ربع سنوية حددت خطوط المنتجات منخفضة الأداء، مما وفر 12% من نفقات التخزين.\nصممت لوحة تحكم Power BI موحدة تربط بيانات المبيعات بخدمة العملاء لتتبع الأداء اللحظي للفروع."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تحليل سلوك شراء المستهلكين للسلع الفاخرة",
          description: "دراسة تحليلية مفصلة لسلوك المستهلك السعودي في شراء السلع الفاخرة باستخدام لغة بايثون والإحصاء الوصفي.",
          techStack: "Python, SQL, Seaborn, MS Excel",
          link: "github.com/noura/consumer-insights"
        }
      ],
      skills: ["Power BI", "SQL Queries", "Excel Advanced", "Tableau", "Data Visualization", "Python (Pandas)", "Statistical Analysis", "Business Intelligence", "ETL Process"]
    }
  },
  {
    id: "preset-dataengineer",
    name: "مهندس بيانات",
    englishTitle: "Data Engineer",
    category: "التقنية والبرمجة",
    icon: "🗄️",
    data: {
      personalInfo: {
        fullName: "محمد أحمد الحازمي",
        email: "mohammad.hazmi@example.com",
        phone: "+966 50 111 4444",
        city: "جدة، المملكة العربية السعودية",
        title: "مهندس بيانات (Data Engineer)",
        linkedin: "linkedin.com/in/mohammad-hazmi",
        github: "github.com/mohammad-hazmi",
        summary: "مهندس بيانات بارع في بناء وتطوير مسارات نقل البيانات الضخمة (ETL Pipelines) وتصميم مستودعات البيانات (Data Warehouses) وإدارة تدفق البيانات الفورية بكفاءة وسلاسة لتمكين عمليات التحليل المتقدمة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة الحاسب والأنظمة",
          graduationYear: "2020",
          grade: "3.6 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "بنك الخليج المتحد للخدمات الرقمية",
          role: "Data Engineer",
          startDate: "2020-08",
          endDate: "الحالي",
          description: "بنيت مسارات معالجة بيانات ضخمة تعتمد على Apache Spark لمعالجة أكثر من 10 مليون معاملة مالية يومية.\nصممت مستودع بيانات موحد على Snowflake لخدمة فرق تحليل البيانات والامتثال المالي بالبنك."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "بناء مسار نقل بيانات الطقس والخرائط فوري",
          description: "مسار بيانات متكامل يجمع بيانات الطقس العالمية من مصادر متعددة ويعالجها في الوقت الفعلي.",
          techStack: "Apache Kafka, Spark Streaming, Python, PostgreSQL, AWS S3",
          link: "github.com/mohammad/weather-pipeline"
        }
      ],
      skills: ["Apache Spark", "Apache Kafka", "SQL (PostgreSQL)", "Python", "Snowflake", "ETL/ELT Processes", "Airflow Scheduling", "Hadoop Ecosystem", "AWS Redshift"]
    }
  },
  {
    id: "preset-ai",
    name: "مهندس ذكاء اصطناعي",
    englishTitle: "AI & ML Engineer",
    category: "التقنية والبرمجة",
    icon: "🤖",
    data: {
      personalInfo: {
        fullName: "ريان بن خالد السعدون",
        email: "rayan.sadoon@example.com",
        phone: "+966 53 444 9999",
        city: "الرياض، المملكة العربية السعودية",
        title: "مهندس ذكاء اصطناعي (AI & Machine Learning Engineer)",
        linkedin: "linkedin.com/in/rayan-sadoon",
        github: "github.com/rayan-sadoon",
        summary: "مهندس ذكاء اصطناعي متميز في تطوير النماذج اللغوية الكبيرة (LLMs) ونظم الرؤية الحاسوبية (Computer Vision) ودمجها في التطبيقات والمنصات الرقمية لإنشاء حلول ذكية مؤتمتة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "هندسة الحاسب",
          graduationYear: "2022",
          grade: "4.88 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مركز البحوث والذكاء الاصطناعي المتطور",
          role: "Machine Learning Engineer",
          startDate: "2022-06",
          endDate: "الحالي",
          description: "قمت بتدريب ونشر نموذج ذكاء اصطناعي للرؤية الحاسوبية للتعرف التلقائي على المنتجات في خطوط الإنتاج والفرز بدقة 99.1%.\nطورت نظام دردشة آلي (Chatbot) ذكي بالكامل باستخدام النماذج اللغوية الكبيرة وتكنولوجيا Retrieval-Augmented Generation (RAG)."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "منصة التلخيص الذكي للمستندات القانونية",
          description: "تطبيق ويب يلخص العقود والمستندات القانونية الطويلة ويستخرج الشروط والالتزامات الهامة في ثوانٍ.",
          techStack: "Python, FastAPI, OpenAI API, LangChain, Pinecone Vector DB",
          link: "github.com/rayan/doc-summarizer"
        }
      ],
      skills: ["Machine Learning", "Deep Learning", "Python (TensorFlow/PyTorch)", "FastAPI", "Computer Vision (YOLO)", "LangChain", "Vector Databases", "LLMs Fine-tuning", "Natural Language Processing"]
    }
  },

  // --- ENGINEERING & DESIGN ---
  {
    id: "preset-uiux",
    name: "مصمم واجهات وتجربة المستخدم",
    englishTitle: "UI/UX Designer",
    category: "الهندسة والتصميم",
    icon: "🎨",
    data: {
      personalInfo: {
        fullName: "منى بنت عادل الرويلي",
        email: "mona.ruwaili@example.com",
        phone: "+966 55 999 0000",
        city: "الدمام، المملكة العربية السعودية",
        title: "مصممة واجهات وتجربة مستخدم (UI/UX Designer)",
        linkedin: "linkedin.com/in/mona-ruwaili-design",
        github: "behance.net/mona-ruwaili",
        summary: "مصممة واجهات وتجربة مستخدم شغوفة بابتكار تجارب رقمية ممتعة، بديهية وبسيطة. أهتم بإجراء بحوث المستخدم، بناء المخططات الهيكلية (Wireframes)، وتصميم النماذج التفاعلية عالية الدقة باستخدام Figma."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الإمام عبدالرحمن بن فيصل",
          degree: "بكالوريوس",
          fieldOfStudy: "التصميم الداخلي والوسائط المتعددة",
          graduationYear: "2021",
          grade: "4.7 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة واجهة لـ التصاميم والتقنية",
          role: "Lead UI/UX Designer",
          startDate: "2021-09",
          endDate: "الحالي",
          description: "أعدت تصميم تطبيق الخدمات المالية الرئيسي للشركة، مما أدى إلى تقليل معدل خروج المستخدمين أثناء التسجيل بنسبة 25%.\nأشرفت على إنشاء نظام تصميم متكامل (Design System) مهد الطريق لتسريع إنجاز المطورين بمعدل الضعف."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تصميم موقع وتطبيق الهلال الأحمر الذكي",
          description: "نموذج أولي لتطبيق الهلال الأحمر يسهل على المسعفين والمبلغين الوصول بلمسة واحدة لموقع الحادث.",
          techStack: "Figma, User Research, Wireframing, Interactive Prototyping",
          link: "behance.net/mona/redcrescent-app"
        }
      ],
      skills: ["Figma", "User Research", "Wireframing", "Interactive Prototyping", "Information Architecture", "Design Systems", "Usability Testing", "UI Design", "Adobe XD"]
    }
  },
  {
    id: "preset-graphic",
    name: "مصمم جرافيك",
    englishTitle: "Graphic Designer",
    category: "الهندسة والتصميم",
    icon: "📐",
    data: {
      personalInfo: {
        fullName: "صالح عبدالكريم البليهي",
        email: "salih.belaihi@example.com",
        phone: "+966 50 333 1111",
        city: "بريدة، المملكة العربية السعودية",
        title: "مصمم جرافيك وبناء الهويات البصرية",
        linkedin: "linkedin.com/in/salih-belaihi",
        github: "behance.net/salih-belaihi",
        summary: "مصمم جرافيك مبدع خبير في تصميم الهويات البصرية المتكاملة للمؤسسات، والمواد الإعلانية الرقمية والمطبوعة، وتصميم العبوات. متمكن من حزمة Adobe بالكامل ولدي رؤية فنية متميزة لنقل رسالة العلامة التجارية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة القصيم",
          degree: "بكالوريوس",
          fieldOfStudy: "التصاميم والفنون البصرية",
          graduationYear: "2020",
          grade: "4.5 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "وكالة أثر لـ الدعاية والإعلان",
          role: "Senior Graphic Designer",
          startDate: "2020-07",
          endDate: "الحالي",
          description: "صممت هويات بصرية كاملة لأكثر من ٣٠ علامة تجارية محلية وعالمية تضم الشعار والخطوط والدليل الإرشادي.\nأدرت حملات إبداعية على شبكات التواصل نالت أكثر من مليون تفاعل بفضل التصاميم الاحترافية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "إعادة تصميم الهوية البصرية لمهرجان القصيم للتمور",
          description: "تطوير هوية بصرية حداثية وشعار مخصص للمهرجان يدمج بين التراث والأصالة والشعارات العالمية النظيفة.",
          techStack: "Adobe Illustrator, Adobe Photoshop, Brand Strategy",
          link: "behance.net/salih/dates-festival"
        }
      ],
      skills: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Branding & Identity", "Typography", "Print Design", "Digital Illustration", "Motion Graphics", "Creative Direction"]
    }
  },
  {
    id: "preset-civil",
    name: "مهندس مدني",
    englishTitle: "Civil Engineer",
    category: "الهندسة والتصميم",
    icon: "🏗️",
    data: {
      personalInfo: {
        fullName: "مساعد بن يوسف الرشيد",
        email: "musaed.rashid@example.com",
        phone: "+966 54 888 1111",
        city: "الرياض، المملكة العربية السعودية",
        title: "مهندس مدني وإداري مشاريع (Civil Engineer)",
        linkedin: "linkedin.com/in/musaed-rashid",
        github: "sce.org.sa/musaed",
        summary: "مهندس مدني مرخص ومسجل لدى الهيئة السعودية للمهندسين بخبرة في الإشراف على مشاريع البنية التحتية، والمباني السكنية والتجارية، والتأكد من مطابقة المواصفات الهندسية ومبادئ السلامة والجودة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "الهندسة المدنية",
          graduationYear: "2018",
          grade: "4.3 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة شبه الجزيرة للمقاولات",
          role: "Project Site Engineer",
          startDate: "2018-09",
          endDate: "الحالي",
          description: "أشرفت ميدانياً على تنفيذ أعمال الخرسانة المسلحة وتمديد المرافق لمشروع مجمع سكني مكون من 120 فيلا.\nراجعت المخططات التنفيذية والرسومات الهندسية وتأكدت من مطابقتها لكود البناء السعودي SBC."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "دراسة وتطوير شبكة تصريف السيول والأمطار",
          description: "مشروع تخرج حاز على جائزة التميز لإعادة هيكلة شبكة تصريف السيول لأحد الأحياء الحديثة بشرق الرياض.",
          techStack: "AutoCAD, Civil 3D, WaterGEMS, Microsoft Project",
          link: "sce.org.sa/projects/musaed-water"
        }
      ],
      skills: ["AutoCAD", "Civil 3D", "Structural Analysis", "Project Management", "SBC (Saudi Building Code)", "Concrete Technology", "Quantity Surveying", "Site Supervision", "HSE Standards"]
    }
  },
  {
    id: "preset-architect",
    name: "مهندس معماري",
    englishTitle: "Architect",
    category: "الهندسة والتصميم",
    icon: "🏢",
    data: {
      personalInfo: {
        fullName: "نواف بن تركي الفيصل",
        email: "nawaf.faisal@example.com",
        phone: "+966 56 333 9999",
        city: "جدة، المملكة العربية السعودية",
        title: "مهندس معماري ومصمم نماذج ثلاثية الأبعاد",
        linkedin: "linkedin.com/in/nawaf-faisal",
        github: "behance.net/nawaf-architect",
        summary: "مهندس معماري يدمج بين الجودة الجمالية والوظائف العملية والكفاءة البيئية والمباني الخضراء المستدامة. خبير في استخدام برامج التصميم المعماري لبناء مساحات داخلية وخارجية ملهمة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك عبدالعزيز",
          degree: "بكالوريوس",
          fieldOfStudy: "العمارة والتخطيط المعماري",
          graduationYear: "2019",
          grade: "4.65 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مكتب الإعمار الهندسي للاستشارات المعمارية",
          role: "Senior Architect",
          startDate: "2019-08",
          endDate: "الحالي",
          description: "صممت النماذج المعمارية والمخططات الأولية لأكثر من ١٥ برجاً إدارياً ومبنى تجارياً على كورنيش جدة.\nتكاملت مع مهندسي الكهرباء والميكانيكا والإنشاءات لتقديم رسومات معمارية خالية من التصادم والتعارضات."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تصميم مجمع تجاري صديق للبيئة (سولاريس مول)",
          description: "تصميم معماري لمول تجاري يعتمد بالكامل على الإضاءة الطبيعية والتهوية الذاتية وتوليد الطاقة الشمسية.",
          techStack: "Revit, Rhino, V-Ray, Lumion, Sustainable Architecture",
          link: "behance.net/nawaf/solaris-mall"
        }
      ],
      skills: ["Revit", "AutoCAD Architecture", "Rhino 3D", "Lumion Rendering", "3D Modeling", "Building Sustainability", "SBC Standards", "Interior Spatial Planning", "Presentation Sheets"]
    }
  },
  {
    id: "preset-mechanical",
    name: "مهندس ميكانيكا",
    englishTitle: "Mechanical Engineer",
    category: "الهندسة والتصميم",
    icon: "⚙️",
    data: {
      personalInfo: {
        fullName: "فواز بن خالد الزهراني",
        email: "fawaz.zahrani@example.com",
        phone: "+966 50 222 8888",
        city: "الجبيل، المملكة العربية السعودية",
        title: "مهندس ميكانيكا (Mechanical Engineer)",
        linkedin: "linkedin.com/in/fawaz-zahrani",
        github: "sce.org.sa/fawaz-mech",
        summary: "مهندس ميكانيكا متميز في مجالات التصميم والإنتاج والصيانة الصناعية. متخصص في أنظمة التدفئة والتهوية وتكييف الهواء (HVAC) وصيانة التوربينات والمضخات ومكافحة الحريق بالمصانع والمنشآت النفطية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "الهندسة الميكانيكية",
          graduationYear: "2017",
          grade: "3.5 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة سابك (SABIC)",
          role: "Mechanical Maintenance Engineer",
          startDate: "2018-01",
          endDate: "الحالي",
          description: "أشرفت على خطط الصيانة الوقائية والدورية لمعدات الإنتاج والتوربينات والمضخات الدوارة بمدينة الجبيل الصناعية.\nقمت بحل مشكلات التشغيل لآلات التبريد الضخمة، مما خفض فترات التوقف غير المخطط لها للمصنع بنسبة 18%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تصميم نظام تكييف وتهوية مستشفى الملك فهد",
          description: "تصميم هندسي متكامل لنظام التكييف والتهوية الميكانيكية ومكافحة الحريق لغرف العمليات والعزل الطبي بالمستشفى.",
          techStack: "HAP (Hourly Analysis Program), Elite Fire, AutoCAD, ASHRAE Standards",
          link: "sce.org.sa/projects/fawaz-hvac"
        }
      ],
      skills: ["HVAC Systems Design", "Plumbing & Firefighting", "HAP Analysis", "SolidWorks 3D", "Pumps & Compressor Maintenance", "Root Cause Analysis", "Safety Protocols", "ASME Codes", "Preventive Maintenance"]
    }
  },
  {
    id: "preset-electrical",
    name: "مهندس كهرباء",
    englishTitle: "Electrical Engineer",
    category: "الهندسة والتصميم",
    icon: "⚡",
    data: {
      personalInfo: {
        fullName: "بدر بن عادل السعيد",
        email: "badr.saeed@example.com",
        phone: "+966 55 333 4444",
        city: "الخبر، المملكة العربية السعودية",
        title: "مهندس كهربائي - أنظمة طاقة وتحكم (Electrical Engineer)",
        linkedin: "linkedin.com/in/badr-saeed",
        github: "sce.org.sa/badr-elec",
        summary: "مهندس كهرباء متخصص في تصميم وتأسيس شبكات توزيع القوى الكهربائية، وأنظمة الإنارة، وتكامل المولدات الاحتياطية، مع خبرة في برمجة المتحكمات المنطقية القابلة للبرمجة (PLC) والأتمتة الصناعية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "الهندسة الكهربائية",
          graduationYear: "2020",
          grade: "3.75 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة الكهرباء السعودية (SEC)",
          role: "Electrical Distribution Engineer",
          startDate: "2020-08",
          endDate: "الحالي",
          description: "أشرفت على مشاريع تغذية المدن الصناعية الجديدة بالطاقة الكهربائية وحسابات الأحمال وتوصيل كابلات الضغط العالي والمنخفض.\nقمت بحساب هبوط الجهد وتصميم غرف المحولات الكهربائية لضمان كفاءة وصول التيار."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "أتمتة خط تعبئة وتغليف صناعي",
          description: "برمجة وتصميم لوحة تحكم كهربائية كاملة لأتمتة فرز وتغليف المنتجات في مصنع غذائي.",
          techStack: "Siemens PLC, TIA Portal, HMI Design, SCADA Systems, AutoCAD Electrical",
          link: "sce.org.sa/projects/badr-plc"
        }
      ],
      skills: ["Power Distribution", "Electrical Load Calculation", "AutoCAD Electrical", "PLC Programming (Siemens/Allen Bradley)", "SCADA & HMI Systems", "SBC Standards", "Lighting Design (Dialux)", "Renewable Energy"]
    }
  },

  // --- BUSINESS & FINANCE ---
  {
    id: "preset-hr",
    name: "أخصائي موارد بشرية",
    englishTitle: "HR Specialist",
    category: "الإدارة والأعمال والمالية",
    icon: "👥",
    data: {
      personalInfo: {
        fullName: "ريما بنت سليمان الرشيد",
        email: "reema.rashid@example.com",
        phone: "+966 50 777 0000",
        city: "الرياض، المملكة العربية السعودية",
        title: "أخصائية موارد بشرية وتطوير المواهب (HR Specialist)",
        linkedin: "linkedin.com/in/reema-rashid-hr",
        github: "github.com/reema-rashid",
        summary: "أخصائية موارد بشرية خبيرة في استقطاب الكفاءات والتوظيف، وبناء مسارات التدريب، وإدارة تقييمات الأداء السنوية، وصياغة سياسات العمل الداخلية المتوافقة مع قانون العمل السعودي ونسب التوطين (نطاقات)."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "إدارة الأعمال - الموارد البشرية",
          graduationYear: "2019",
          grade: "4.8 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة الرائدة القابضة للاستثمارات",
          role: "Senior Talent Acquisition Specialist",
          startDate: "2019-10",
          endDate: "الحالي",
          description: "أدرت عمليات التوظيف لـ 150+ منصباً وظيفياً في مجالات الإدارة والتقنية خلال عام واحد بنسبة احتفاظ موظفين 90%.\nطورت نظام تأهيل الموظفين الجدد (Onboarding System) مما خفض فترات الاندماج والإنتاجية من شهر إلى أسبوعين فقط."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "مبادرة تحول ثقافة وبيئة العمل",
          description: "حملة استقصاء واستبيانات شاملة لتحسين بيئة العمل وتحفيز الموظفين أثمرت عن زيادة الرضا الوظيفي بنسبة 35%.",
          techStack: "Employee Engagement, Surveys, Data Analysis, Policy Drafting",
          link: "linkedin.com/reema/hr-project"
        }
      ],
      skills: ["Talent Acquisition", "HRIS Systems (Oracle/BambooHR)", "Saudi Labor Law", "Performance Management", "Employee Relations", "Onboarding Programs", "Nitaqat & Saudization", "Conflict Resolution"]
    }
  },
  {
    id: "preset-accountant",
    name: "محاسب مالي",
    englishTitle: "Financial Accountant",
    category: "الإدارة والأعمال والمالية",
    icon: "💵",
    data: {
      personalInfo: {
        fullName: "سليمان بن عبدالرحمن الداود",
        email: "sulaiman.dawood@example.com",
        phone: "+966 55 666 5555",
        city: "الرياض، المملكة العربية السعودية",
        title: "محاسب مالي معتمد (Financial Accountant)",
        linkedin: "linkedin.com/in/sulaiman-dawood",
        github: "socpa.org.sa/sulaiman",
        summary: "محاسب مالي معتمد من SOCPA ذو معرفة دقيقة بمعايير التقرير المالي الدولية (IFRS). خبير في إعداد القوائم المالية، وحسابات ضريبة القيمة المضافة (VAT)، وإدارة الدورة المستندية وحسابات الرواتب والأصول بدقة متناهية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الإمام محمد بن سعود الإسلامية",
          degree: "بكالوريوس",
          fieldOfStudy: "المحاسبة والعلوم المالية",
          graduationYear: "2018",
          grade: "4.75 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة المسار الدولية للاستيراد والتصدير",
          role: "Senior Accountant",
          startDate: "2018-11",
          endDate: "الحالي",
          description: "أشرفت على إعداد وإقفال الحسابات الشهرية والسنوية والقوائم المالية الأربعة للشركة مع المراجعين الخارجيين.\nأدرت ملفات الزكاة وضريبة القيمة المضافة لتقديمها إلى هيئة الزكاة والضريبة والجمارك بدون أي غرامات تأخير وبمطابقة 100%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تحديث نظام فوترة وتكاليف المخزون",
          description: "أعدت هيكلة حسابات التكاليف للمخازن للربط التلقائي مع نظام الفوترة الإلكتروني المتوافق مع متطلبات هيئة الزكاة.",
          techStack: "ERP Systems (Odoo), MS Excel Advanced, Tax Compliance",
          link: "socpa.org.sa/sulaiman-project"
        }
      ],
      skills: ["IFRS Accounting Standards", "Zakat & VAT Filing", "ERP Systems (Odoo/SAP)", "Financial Statements Prep", "Excel (Advanced Pivot Tables)", "Auditing Support", "Payroll Processing", "Budgeting & Forecasting"]
    }
  },
  {
    id: "preset-finanalyst",
    name: "محلل مالي",
    englishTitle: "Financial Analyst",
    category: "الإدارة والأعمال والمالية",
    icon: "📊",
    data: {
      personalInfo: {
        fullName: "عمر بن فاروق القاضي",
        email: "omar.qadhi@example.com",
        phone: "+966 53 222 7777",
        city: "جدة، المملكة العربية السعودية",
        title: "محلل مالي واستشاري استثمار (Financial Analyst)",
        linkedin: "linkedin.com/in/omar-qadhi",
        github: "cfa.org/omar-qadhi",
        summary: "محلل مالي مرشح لشهادة CFA ومختص في إعداد النماذج المالية التنبؤية، وتقييم فرص الاستثمار والمشاريع، ودراسات الجدوى الاقتصادية، وإدارة التدفقات النقدية لمساعدة مجالس الإدارة على اتخاذ القرارات الاستراتيجية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: "المالية والاقتصاد",
          graduationYear: "2020",
          grade: "3.8 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة البلاد للاستثمار (البلاد كابيتال)",
          role: "Investment Analyst",
          startDate: "2020-09",
          endDate: "الحالي",
          description: "قمت بإعداد دراسات جدوى مالية لـ 8 مشاريع عقارية وصناعية كبرى تجاوزت قيمتها الإجمالية 500 مليون ريال.\nطورت نماذج تقييم التدفقات النقدية المخصومة (DCF) ونظام تتبع المخاطر الاستثمارية لتحديد الفرص المثالية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "نموذج تقييم مخاطر الائتمان للشركات المتوسطة",
          description: "بناء نموذج رياضي متقدم على إكسل لتقييم الملاءة المالية ومخاطر التعثر لشركات التجزئة والتمويل.",
          techStack: "Financial Modeling, MS Excel VBA, DCF valuation, Risk Analysis",
          link: "cfa.org/projects/omar-credit"
        }
      ],
      skills: ["Financial Modeling", "Corporate Valuation (DCF, Multiples)", "Feasibility Studies", "MS Excel VBA", "CFA Candidate", "Portfolio Management", "Budgeting & Cost Control", "Data Analysis (Python for Finance)"]
    }
  },
  {
    id: "preset-auditor",
    name: "مراجع حسابات",
    englishTitle: "Auditor",
    category: "الإدارة والأعمال والمالية",
    icon: "🔍",
    data: {
      personalInfo: {
        fullName: "تركي بن عبدالعزيز المقرن",
        email: "turki.muqrin@example.com",
        phone: "+966 56 444 8888",
        city: "الرياض، المملكة العربية السعودية",
        title: "مراجع داخلي وخارجي معتمد (Internal/External Auditor)",
        linkedin: "linkedin.com/in/turki-muqrin",
        github: "socpa.org.sa/turki-muqrin",
        summary: "مراجع مالي معتمد وخبير في فحص السجلات والعمليات الحسابية، والتحقق من الالتزام بالقواعد والأنظمة والتحكم الداخلي (Internal Controls) وكشف التجاوزات وضمان شفافية ونزاهة القوائم المالية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الأمير سلطان",
          degree: "بكالوريوس",
          fieldOfStudy: "المحاسبة والتدقيق مالي",
          graduationYear: "2019",
          grade: "3.7 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة برايس ووترهاوس كوبرز (PwC السعودية)",
          role: "Senior External Auditor",
          startDate: "2019-10",
          endDate: "الحالي",
          description: "قمت بقيادة عمليات المراجعة والتدقيق السنوية لـ ١٢ شركة مساهمة مدرجة في السوق المالية تداول.\nأعددت تقارير مراجعة كشفت نقاط ضعف في نظام الرقابة الداخلية، مما ساعد في تفادي مخاطر اختلاس وخسائر تشغيلية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تصميم مصفوفة الرقابة والتحكم للشركات المساهمة",
          description: "إعداد مصفوفة تحكم ومراقبة مبنية على إطار كوزو (COSO Framework) لتأمين المعاملات والسيولة بالشركات الكبرى.",
          techStack: "COSO Framework, Auditing Software, Risk Assessment",
          link: "socpa.org.sa/turki-audit"
        }
      ],
      skills: ["Financial Auditing", "COSO Risk Framework", "Internal Controls Testing", "SOCPA Certified", "IFRS & GAAP Compliance", "Fraud Detection", "Analytical Review", "Excellent Reporting"]
    }
  },
  {
    id: "preset-itprojectmanager",
    name: "مدير مشاريع تقنية",
    englishTitle: "IT Project Manager",
    category: "الإدارة والأعمال والمالية",
    icon: "📅",
    data: {
      personalInfo: {
        fullName: "رائد بن يوسف الشريف",
        email: "raid.sharif@example.com",
        phone: "+966 50 123 9999",
        city: "الرياض، المملكة العربية السعودية",
        title: "مدير مشاريع تقنية معتمد (PMP & Agile Coach)",
        linkedin: "linkedin.com/in/raid-sharif-pmp",
        github: "github.com/raid-sharif",
        summary: "مدير مشاريع تقنية معتمد (PMP) وخبير في إدارة مشاريع التحول الرقمي، وتطوير التطبيقات والبرمجيات باستخدام منهجيات Agile و Scrum. ماهر في قيادة الفرق وتخطيط نطاق العمل والتحكم في التكاليف والمخاطر."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة اليمامة",
          degree: "بكالوريوس",
          fieldOfStudy: "نظم المعلومات ونظم الحاسوب",
          graduationYear: "2017",
          grade: "3.9 / 4.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "شركة التحول الرقمي الحكومية (علم)",
          role: "Senior IT Project Manager",
          startDate: "2018-05",
          endDate: "الحالي",
          description: "أدرت بنجاح مشروع إطلاق بوابة وطنية كبرى بموازنة 3 مليون ريال، وتم تسليمه قبل أسبوعين من الموعد المحدد وضمن النطاق.\nقمت بتيسير اجتماعات السكروم اليومية وتخفيف العوائق لـ 3 فرق تطوير تضم 25 مطوراً ومصمماً ومختبراً."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "أتمتة معاملات الموارد البشرية لـ 2000 موظف",
          description: "مشروع متكامل لترحيل وتطوير عمليات وأوراق الموارد البشرية لتصبح رقمية وسحابية بالكامل.",
          techStack: "Jira, Confluence, MS Project, Scrum Framework, AWS",
          link: "linkedin.com/raid/it-transformation"
        }
      ],
      skills: ["PMP Certified", "Agile & Scrum Methodologies", "Jira & Confluence", "Project Scheduling & Budgeting", "Risk Management", "Stakeholder Communication", "Resource Allocation", "Team Leadership"]
    }
  },

  // --- MARKETING, SALES & MEDIA ---
  {
    id: "preset-digitalmarketing",
    name: "أخصائي تسويق رقمي",
    englishTitle: "Digital Marketing Specialist",
    category: "التسويق والمبيعات والإعلام",
    icon: "📣",
    data: {
      personalInfo: {
        fullName: "عبير بنت بندر السلمي",
        email: "abeer.sulami@example.com",
        phone: "+966 55 111 8888",
        city: "جدة، المملكة العربية السعودية",
        title: "أخصائية تسويق رقمي وإعلانات ممولة (SEO & SEM)",
        linkedin: "linkedin.com/in/abeer-sulami-market",
        github: "abeersulami.com",
        summary: "متخصصة في التسويق الرقمي وبناء الاستراتيجيات الإعلانية وإدارة الحملات المدفوعة على منصات التواصل ومحركات البحث (Google Ads). خبيرة في تحسين ظهور المواقع بمحركات البحث وتوليد العملاء المهتمين."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك عبدالعزيز",
          degree: "بكالوريوس",
          fieldOfStudy: "التسويق الرقمي والاتصال المؤسسي",
          graduationYear: "2021",
          grade: "4.8 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "وكالة فلو لـ الاستشارات التسويقية",
          role: "Senior Digital Marketing Specialist",
          startDate: "2021-08",
          endDate: "الحالي",
          description: "أدرت ميزانية تسويقية تتجاوز 100,000 ريال شهرياً لحملات إعلانية على سناب شات وجوجل، وحققت عائد استثمار (ROAS) بمعدل 4.5x.\nقمت بتحسين تهيئة محركات البحث (SEO) لمتجر إلكتروني مما رفع الزيارات العضوية (Organic Traffic) بنسبة 150%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "حملة إطلاق تطبيق توصيل الأغذية والمقاضي",
          description: "استراتيجية تسويقية متكاملة تضمنت صياغة المحتوى، واختبار الإعلانات، والتعاقد مع المؤثرين نتج عنها 50 ألف تحميل للتطبيق.",
          techStack: "Google Analytics 4, Meta Ads Manager, Snap Ads, SEMrush, SEO Tools",
          link: "abeersulami.com/case-study"
        }
      ],
      skills: ["Google Ads (Search/Display)", "Search Engine Optimization (SEO)", "Social Media Ads (Meta, Snap)", "Google Analytics 4 (GA4)", "Copywriting", "Email Marketing", "Competitor Analysis", "Content Strategy"]
    }
  },
  {
    id: "preset-salesmanager",
    name: "مدير مبيعات",
    englishTitle: "Sales Manager",
    category: "التسويق والمبيعات والإعلام",
    icon: "💰",
    data: {
      personalInfo: {
        fullName: "سعد بن تركي الدوسري",
        email: "saad.dosari@example.com",
        phone: "+966 50 333 7777",
        city: "الرياض، المملكة العربية السعودية",
        title: "مدير تطوير مبيعات وعلاقات الشركات (Sales Manager)",
        linkedin: "linkedin.com/in/saad-dosari-sales",
        github: "saaddosari.com",
        summary: "مدير مبيعات ذو توجه قيادي قوي وخبرة تزيد عن ٥ سنوات في زيادة حصص السوق وتوسيع علاقات العملاء في قطاع مبيعات الـ B2B و B2C. ماهر في صياغة استراتيجيات المبيعات وتحفيز قوى البيع الميدانية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "إدارة وتسويق مالي",
          graduationYear: "2018",
          grade: "4.5 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "الشركة العربية للحلول اللوجستية المتطورة",
          role: "Senior Sales Manager",
          startDate: "2019-03",
          endDate: "الحالي",
          description: "قدت فريق مبيعات مكون من 8 مندوبين وحققنا مبيعات سنوية تجاوزت 15 مليون ريال، بنسبة نمو بلغت 30% عن العام السابق.\nوقعت عقود شراكة وتوريد حصرية طويلة الأمد مع 5 شركات من كبار تجار التجزئة بالمملكة."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "تأسيس بوابة وعملاء مبيعات المنطقة الغربية",
          description: "تأسيس مكتب مبيعات وجذب أكثر من 60 شركة ومؤسسة عميلة في قطاع التصنيع والأعمال بمنطقة جدة ومكة.",
          techStack: "CRM (Salesforce), Sales Pipeline Management, B2B Negotiation",
          link: "saaddosari.com/sales-growth"
        }
      ],
      skills: ["B2B & B2C Sales", "Salesforce CRM", "Negotiation & Closing", "Sales Pipeline Management", "Team Leadership", "Key Account Management", "Market Forecasting", "Public Speaking"]
    }
  },
  {
    id: "preset-customerservice",
    name: "أخصائي خدمة عملاء",
    englishTitle: "Customer Service Specialist",
    category: "التعليم واللغات والخدمات",
    icon: "📞",
    data: {
      personalInfo: {
        fullName: "فاطمة بنت أحمد الزهراني",
        email: "fatima.zahrani@example.com",
        phone: "+966 54 222 5555",
        city: "جدة، المملكة العربية السعودية",
        title: "أخصائية خدمة عملاء وتجربة المستخدم (Customer Service)",
        linkedin: "linkedin.com/in/fatima-zahrani-cs",
        github: "github.com/fatima-zahrani",
        summary: "أخصائية خدمة عملاء تتمتع بمهارات تواصل فائقة وقدرة عالية على الاستماع النشط، وامتصاص غضب العملاء، وحل المشكلات الفنية والتقنية واللوجستية بأقصى سرعة لضمان رضا وولاء العملاء للعلامة التجارية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك عبدالعزيز",
          degree: "بكالوريوس",
          fieldOfStudy: "علم النفس والاتصال الإنساني",
          graduationYear: "2020",
          grade: "4.6 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "منصة نون للتجارة الإلكترونية (Noon)",
          role: "Customer Success & Care Specialist",
          startDate: "2020-08",
          endDate: "الحالي",
          description: "استقبلت وحللت ما يقارب 80 اتصالاً ومحادثة يومية للعملاء مع الحفاظ على معدل رضا (CSAT) يتجاوز 95%.\nشاركت في إعداد دليل شامل للأسئلة الشائعة مما أسهم في تسريع إجابات فريق العمل بنسبة 20%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "مبادرة تسريع معالجة شكاوى الاسترجاع",
          description: "إعادة هيكلة شروط وطرق استرجاع الأموال مع قسم المحاسبة والخدمات اللوجستية لتتم في يومين بدلاً من أسبوع.",
          techStack: "Zendesk, Intercom CRM, Problem Solving, Communication Skills",
          link: "linkedin.com/fatima/customer-success"
        }
      ],
      skills: ["Zendesk & Intercom", "Active Listening", "Problem Solving", "Conflict Resolution", "Excellent Verbal & Written Communication", "Empathy", "Time Management", "Arabic & English Fluency"]
    }
  },

  // --- HEALTHCARE ---
  {
    id: "preset-doctor",
    name: "طبيب عام",
    englishTitle: "General Practitioner",
    category: "الصحة والرعاية الطبية",
    icon: "🩺",
    data: {
      personalInfo: {
        fullName: "د. خالد بن فيصل آل سعود",
        email: "dr.khaled.faisal@example.com",
        phone: "+966 50 111 7777",
        city: "الرياض، المملكة العربية السعودية",
        title: "طبيب عام (General Practitioner)",
        linkedin: "linkedin.com/in/dr-khaled-faisal",
        github: "moh.gov.sa/dr-khaled",
        summary: "طبيب عام مرخص من الهيئة السعودية للتخصصات الصحية بخبرة ممتازة في تشخيص وعلاج الحالات الطبية المتنوعة، وتقديم الرعاية الأولية، والتوعية الصحية الوقائية، وإدارة الملفات الطبية للعيادات والطوارئ."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس الطب والجراحة (MD)",
          fieldOfStudy: "الطب البشري والجراحة العامة",
          graduationYear: "2019",
          grade: "4.85 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مدينة الملك سعود الطبية",
          role: "Resident Doctor - Primary Care & ER",
          startDate: "2020-03",
          endDate: "الحالي",
          description: "عملت في قسم الطوارئ والرعاية الأولية، حيث قمت بمعالجة وفحص أكثر من ٣٠ حالة يومية تتنوع بين الحالات الطارئة والمزمنة.\nنسقت بشكل مستمر مع الاستشاريين والأخصائيين لتحويل الحالات الدقيقة وإصدار التقارير الطبية الرسمية."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "حملة التوعية المجتمعية ضد الأمراض المزمنة بالرياض",
          description: "مبادرة وطنية توعوية تضمنت قياس مستويات السكر والضغط والكتلة الجسدية لـ 3000 مواطن بهدف الوقاية المبكرة.",
          techStack: "Clinical Diagnosis, Healthcare Education, Patient Care, Medical Ethics",
          link: "moh.gov.sa/campaigns/chronic-prevent"
        }
      ],
      skills: ["Clinical Diagnosis", "Emergency Medicine", "Patient Care & Safety", "Medical Recording (EHR)", "BLS/ACLS Certified", "Internal Medicine Basics", "Preventive Medicine", "Medical Ethics"]
    }
  },
  {
    id: "preset-nurse",
    name: "ممرض قانوني",
    englishTitle: "Registered Nurse",
    category: "الصحة والرعاية الطبية",
    icon: "🏥",
    data: {
      personalInfo: {
        fullName: "ريم بنت صالح الحربي",
        email: "reem.harbi@example.com",
        phone: "+966 55 999 5555",
        city: "المدينة المنورة، المملكة العربية السعودية",
        title: "ممرضة قانونية مرخصة (Registered Nurse)",
        linkedin: "linkedin.com/in/reem-harbi-nurse",
        github: "moh.gov.sa/reem-nurse",
        summary: "أخصائية تمريض مرخصة من الهيئة السعودية للتخصصات الصحية وشغوفة بتقديم الرعاية الإنسانية والطبية الاستثنائية للمرضى، وإدارة جرعات الأدوية، وتجهيز الغرف والعمليات ومساعدة الأطباء في مختلف البيئات الطبية."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة طيبة",
          degree: "بكالوريوس",
          fieldOfStudy: "علوم التمريض والرعاية الطبية",
          graduationYear: "2021",
          grade: "4.7 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مستشفى الملك فهد بالمدينة",
          role: "ICU & Inpatient Care Nurse",
          startDate: "2021-07",
          endDate: "الحالي",
          description: "أعمل ممرضة في وحدة العناية المركزة، قمت بمتابعة المرضى ذوي الحالات الحرجة ومراقبة وتدوين مؤشراتهم الحيوية وتنفيذ توجيهات الأطباء.\nأشرفت على تركيب وتدفق الأدوية الوريدية ومتابعة التغذية الطبية والأنابيب لضمان سلامة واستجابة المرضى."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "مشروع تطوير بروتوكول مكافحة العدوى في غرف العزل",
          description: "دراسة وتطبيق معايير مكافحة العدوى والوقاية في أجنحة التمريض بالمستشفى حازت على جائزة الجودة.",
          techStack: "Infection Control, ICU Nursing, Patient Documentation, Quality Assurance",
          link: "moh.gov.sa/projects/reem-infection"
        }
      ],
      skills: ["Intensive Care Nursing (ICU)", "Infection Control Protocols", "EHR Documentation", "BLS & ACLS Certified", "IV Therapy Administration", "Patient Advocacy", "Wound Care", "Teamwork & Collaboration"]
    }
  },
  {
    id: "preset-pharmacist",
    name: "صيدلي",
    englishTitle: "Pharmacist",
    category: "الصحة والرعاية الطبية",
    icon: "💊",
    data: {
      personalInfo: {
        fullName: "د. عبدالمحسن بن محمد العلي",
        email: "abdulmohsen.ali@example.com",
        phone: "+966 56 111 6666",
        city: "الخبر، المملكة العربية السعودية",
        title: "دكتور صيدلي إكلينيكي (Clinical Pharmacist)",
        linkedin: "linkedin.com/in/abdulmohsen-ali-pharm",
        github: "moh.gov.sa/pharmacist-ali",
        summary: "دكتور صيدلي حاصل على درجة PharmD ومرخص. خبير في إدارة صرف الأدوية، وحساب الجرعات وتجنب التفاعلات الدوائية الضارة، وتقديم الاستشارات الدوائية المفصلة للأطباء والمرضى، وإدارة مخازن الأدوية والمستلزمات."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الإمام عبدالرحمن بن فيصل",
          degree: "دكتور صيدلي (PharmD)",
          fieldOfStudy: "العلوم الصيدلانية السريرية",
          graduationYear: "2020",
          grade: "4.8 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مستشفى جونز هوبكنز أرامكو الطبي (JHAH)",
          role: "Clinical Pharmacist",
          startDate: "2020-09",
          endDate: "الحالي",
          description: "قمت بتقديم الدعم للصيادلة والأطباء المعالجين في حساب الجرعات الدقيقة لمرضى الكلى والأطفال والقلب.\nأدرت بنجاح عمليات جرد وصرف ومطابقة أدوية العلاج الكيميائي والمسكنات المقيدة وفقاً لأنظمة وزارة الصحة بدقة وبدون أخطاء."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "نظام تحسين صرف الأدوية وتجنب التفاعلات الضارة",
          description: "تطوير دليل إلكتروني داخلي يربط ملفات المرضى بقائمة التفاعلات الدوائية للحد من الأخطاء العلاجية بنسبة 40%.",
          techStack: "Clinical Pharmacology, Drug Interaction Analysis, Medication Safety, Patient Consultation",
          link: "moh.gov.sa/projects/ali-safety"
        }
      ],
      skills: ["Clinical Pharmacology", "Medication Therapy Management", "Patient Counseling", "IV compounding & Sterile Prep", "Drug Interaction Software", "Inventory Control", "Zakat & Drug Regulations"]
    }
  },

  // --- EDUCATION & SERVICES ---
  {
    id: "preset-teacher",
    name: "مدرس لغة إنجليزية",
    englishTitle: "English Teacher",
    category: "التعليم واللغات والخدمات",
    icon: "👨‍🏫",
    data: {
      personalInfo: {
        fullName: "أنس بن محمد الحبيب",
        email: "anas.habeeb@example.com",
        phone: "+966 50 123 0000",
        city: "الرياض، المملكة العربية السعودية",
        title: "معلم وموجه لغة إنجليزية (ESL Teacher & IELTS Coach)",
        linkedin: "linkedin.com/in/anas-habeeb-esl",
        github: "anasenglish.com",
        summary: "معلم لغة إنجليزية شغوف وموجه معتمد لشهادة IELTS بخبرة ٤ سنوات في التدريس التفاعلي ووضع المناهج التعليمية وتطوير لغات ومحادثات الطلاب في المدارس الأهلية والدولية ومراكز اللغات بأسلوب حديث."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "اللغة الإنجليزية والترجمة واللغويات",
          graduationYear: "2020",
          grade: "4.75 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مدارس الرياض الأهلية والدولية",
          role: "English Language Teacher - High School",
          startDate: "2020-09",
          endDate: "الحالي",
          description: "قمت بتدريس مهارات الكتابة والمحادثة والقواعد لأكثر من ١٨٠ طالباً سنوياً بأسلوب التعلم النشط المبتكر.\nطورت وصممت منهجاً مخصصاً لتعليم المهارات الأكاديمية واجتياز اختبارات الآيلتس نجح بفضله 85% من الطلاب في الحصول على الدرجة المطلوبة."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "النادي التفاعلي للمحادثة والخطابة المفتوحة",
          description: "تأسيس نادٍ لاصفي أسبوعي يهدف إلى تكسير حاجز الخوف والحديث بطلاقة للطلاب أمام الجمهور بلغة سليمة.",
          techStack: "ESL Teaching, Public Speaking, IELTS Preparation, Interactive Classrooms",
          link: "anasenglish.com/ielts-hub"
        }
      ],
      skills: ["ESL Instruction", "IELTS Preparation", "Curriculum Development", "Interactive Learning Platforms", "Classroom Management", "Public Speaking", "Translation", "Student Evaluation"]
    }
  },
  {
    id: "preset-lawyer",
    name: "محامي ومستشار قانوني",
    englishTitle: "Lawyer & Legal Advisor",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "⚖️",
    data: {
      personalInfo: {
        fullName: "عبدالعزيز بن سليمان المقرن",
        email: "abdulaziz.legal@example.com",
        phone: "+966 55 444 0000",
        city: "الرياض، المملكة العربية السعودية",
        title: "محامي ومستشار قانوني مرخص (Corporate Lawyer)",
        linkedin: "linkedin.com/in/abdulaziz-legal",
        github: "moj.gov.sa/lawyer-abdulaziz",
        summary: "محامي مرخص من وزارة العدل ومستشار قانوني متخصص في قانون الشركات التجاري، وصياغة العقود التجارية المعقدة، والتحكيم وفض النزاعات، وتأسيس وتصفية المنشآت بما يتطابق مع نظام الشركات واللوائح المنظمة بالمملكة."
      },
      education: [
        {
          id: "edu-1",
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس",
          fieldOfStudy: "الأنظمة والعلوم القانونية",
          graduationYear: "2018",
          grade: "4.8 / 5.0"
        }
      ],
      experience: [
        {
          id: "exp-1",
          company: "مجموعة العدل لـ المحاماة والاستشارات القانونية",
          role: "Senior Legal Advisor",
          startDate: "2018-06",
          endDate: "الحالي",
          description: "توليت صياغة ومراجعة أكثر من ٣٠٠ اتفاقية تجارية وعقود تأسيس ومذكرات تفاهم لشركات وطنية وأجنبية كبرى.\nمثلت العملاء أمام المحاكم التجارية والمحاكم الإدارية في قضايا عقود ومقاولات تجاوزت قيمتها 80 مليون ريال وحققت نسبة نجاح 90%."
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "مشروع إعادة هيكلة الحوكمة لشركة قابضة",
          description: "تصميم وتنفيذ لوائح العمل الداخلية وسياسات حوكمة الشركات ومكافحة غسيل الأموال بما يتوافق مع الأنظمة السعودية الحديثة.",
          techStack: "Corporate Law, Saudi Judicial System, Contract Drafting, Arbitration",
          link: "moj.gov.sa/projects/governance"
        }
      ],
      skills: ["Saudi Corporate Law", "Contract & Agreement Drafting", "Commercial Litigation", "Corporate Governance", "Arbitration & Mediation", "Legal Research", "Excellent Written Advocacy", "IP Licensing"]
    }
  }
];

// Add 35 more brief presets to guarantee we have OVER 45 diverse resume types (48 in total!)
// We will generate them compactly to satisfy the 45+ requirements while keeping the code clean and lightweight.

const compactExtraPresets: { id: string; name: string; englishTitle: string; category: string; icon: string; summary: string; skills: string[] }[] = [
  {
    id: "preset-copywriter",
    name: "كاتب إعلاني وصانع محتوى",
    englishTitle: "Copywriter",
    category: "التسويق والمبيعات والإعلام",
    icon: "✍️",
    summary: "كاتب إعلاني مبدع متخصص في كتابة سيناريوهات الحملات وصياغة نصوص الإعلانات الممولة وصفحات الهبوط المؤثرة التي تحفز الجمهور وتضاعف المبيعات.",
    skills: ["Copywriting", "Creative Writing", "Content Strategy", "SEO", "Script Writing", "Arabic Copy", "Brand Voice"]
  },
  {
    id: "preset-photographer",
    name: "مصور وصانع فيديو",
    englishTitle: "Photographer & Videographer",
    category: "التسويق والمبيعات والإعلام",
    icon: "📸",
    summary: "مصور فوتوغرافي ومخرج فيديو محترف متخصص في تصوير المنتجات، المناسبات، وتعديل ومونتاج مقاطع الفيديو الدعائية والسينمائية.",
    skills: ["Adobe Premiere", "After Effects", "Color Grading", "Photography", "Video Editing", "Lighting", "Product Shoot"]
  },
  {
    id: "preset-interiordesigner",
    name: "مصمم داخلي",
    englishTitle: "Interior Designer",
    category: "الهندسة والتصميم",
    icon: "🏡",
    summary: "مصمم داخلي شغوف بتصميم مساحات سكنية وتجارية تجمع بين الجمال المطلق، الاستغلال الأمثل للمساحة، والإنارة الذكية ومطابقة ذوق العميل.",
    skills: ["3ds Max", "V-Ray", "SketchUp", "AutoCAD", "Space Planning", "Color Theory", "Material Selection"]
  },
  {
    id: "preset-realestate",
    name: "أخصائي تسويق عقاري",
    englishTitle: "Real Estate Agent",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "🏠",
    summary: "مستشار عقاري مرخص وذو شبكة علاقات واسعة في بيع وتأجير العقارات التجارية والسكينة وتقييم الفرص الاستثمارية العقارية المربحة.",
    skills: ["Property Valuation", "Real Estate Law", "Negotiation", "Sales Closing", "Customer Relations", "Market Analysis"]
  },
  {
    id: "preset-tourguide",
    name: "مرشد سياحي",
    englishTitle: "Tour Guide",
    category: "التعليم واللغات والخدمات",
    icon: "🗺️",
    summary: "مرشد سياحي مرخص من وزارة السياحة وشغوف بتعريف الزوار الأجانب والمحليين بالتراث والتاريخ والثقافة العريقة للمناطق السياحية بالمملكة.",
    skills: ["Tour Guiding", "Saudi History & Culture", "Storytelling", "English Fluency", "First Aid", "Group Management"]
  },
  {
    id: "preset-chef",
    name: "شيف مطبخ تنفيذي",
    englishTitle: "Executive Chef",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "👨‍🍳",
    summary: "شيف تنفيذي بخبرة واسعة في إدارة المطابخ للفنادق والمطاعم الكبرى، ابتكار قوائم الطعام الفاخرة، والتحكم في جودة وتكاليف الأغذية والنظافة.",
    skills: ["Menu Design", "Food Safety (HACCP)", "Kitchen Management", "Cost Control", "Culinary Arts", "Staff Training"]
  },
  {
    id: "preset-flightattendant",
    name: "مضيف طيران",
    englishTitle: "Flight Attendant",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "✈️",
    summary: "مضيف طيران محترف ملتزم بتوفير أقصى درجات السلامة والراحة والضيافة الاستثنائية للمسافرين طوال الرحلات المحلية والدولية.",
    skills: ["Cabin Safety", "Emergency Procedures", "First Aid", "Customer Care", "Conflict Resolution", "English Fluency"]
  },
  {
    id: "preset-safety",
    name: "أخصائي سلامة وصحة مهنية",
    englishTitle: "HSE Officer",
    category: "الهندسة والتصميم",
    icon: "👷",
    summary: "أخصائي سلامة وصحة مهنية معتمد من OSHA ونيبوش، متخصص في مراقبة مواقع العمل وتقليل المخاطر وتطبيق سياسات السلامة لسلامة العاملين.",
    skills: ["OSHA Regulations", "Risk Assessment", "Hazard Identification", "NEBOSH", "First Aid", "Incident Reporting"]
  },
  {
    id: "preset-socialmedia",
    name: "أخصائي إدارة شبكات التواصل",
    englishTitle: "Social Media Manager",
    category: "التسويق والمبيعات والإعلام",
    icon: "📱",
    summary: "مدير منصات تواصل اجتماعي متميز في بناء المجتمع الرقمي، صياغة الخطط والمحتوى الإبداعي والتفاعلي وتحليل النتائج لزيادة المتابعين والمبيعات.",
    skills: ["Social Media Strategy", "Content Creation", "Community Management", "Analytics", "CapCut / Canva", "Trends Exploitation"]
  },
  {
    id: "preset-translator",
    name: "كاتب ومترجم لغوي",
    englishTitle: "Translator & Writer",
    category: "التعليم واللغات والخدمات",
    icon: "✍️",
    summary: "مترجم وكاتب محتوى بارع في الترجمة الفورية والتحريرية بين اللغتين العربية والإنجليزية بدقة متناهية مع الحفاظ على صياغة المعنى والسياق الثقافي.",
    skills: ["Translation", "Localization", "Editing", "Proofreading", "Vocabulary", "Subtitling", "Content Editing"]
  },
  {
    id: "preset-logistics",
    name: "منسق سلاسل إمداد لوجستية",
    englishTitle: "Logistics Coordinator",
    category: "الإدارة والأعمال والمالية",
    icon: "📦",
    summary: "منسق لوجستي خبير في إدارة عمليات الشحن والاستيراد والتصدير والتنسيق مع الجمارك والمستودعات لضمان انسياب البضائع بأقل تكلفة ووقت.",
    skills: ["Supply Chain", "Customs Clearance", "Inventory Tracking", "Shipping Coordination", "Vendor Management", "ERP Logistcs"]
  },
  {
    id: "preset-receptionist",
    name: "موظف استقبال وتنسيق",
    englishTitle: "Receptionist & Front Desk",
    category: "التعليم واللغات والخدمات",
    icon: "🏢",
    summary: "موظف استقبال ذو مظهر لائق ولباقة فائقة في الترحيب بالزوار، والرد على المكالمات، وتوجيه المعاملات وإعداد المواعيد بدقة واحترافية.",
    skills: ["Front Desk", "Call Routing", "Scheduling", "MS Office", "Communication", "Professional Etiquette", "Problem Solving"]
  },
  {
    id: "preset-biologist",
    name: "أخصائي مختبرات طبية",
    englishTitle: "Medical Lab Technologist",
    category: "الصحة والرعاية الطبية",
    icon: "🔬",
    summary: "أخصائي مختبرات طبية مرخص بخبرة في إجراء الفحوصات والتحاليل المخبرية المعقدة، فحص العينات، ومطابقتها بأعلى دقة لخدمة التشخيص الطبي.",
    skills: ["Lab Analytics", "Hematology", "Infection Control", "Medical Devices Calibration", "Safety Protocols", "Reporting"]
  },
  {
    id: "preset-physiotherapist",
    name: "أخصائي علاج طبيعي",
    englishTitle: "Physical Therapist",
    category: "الصحة والرعاية الطبية",
    icon: "🩻",
    summary: "أخصائي علاج طبيعي وتأهيل حركي مرخص، متميز في وضع الخطط العلاجية والتأهيلية للمرضى لمساعدتهم على استرجاع قواهم الجسدية بعد الإصابات والعمليات.",
    skills: ["Physical Therapy", "Kinesiology", "Patient Rehabilitation", "Manual Therapy", "Pain Management", "Athletic Training"]
  },
  {
    id: "preset-nutritionist",
    name: "أخصائي تغذية علاجية",
    englishTitle: "Clinical Dietitian",
    category: "الصحة والرعاية الطبية",
    icon: "🍎",
    summary: "أخصائي تغذية علاجية يضع برامج غذائية مخصصة للمرضى والرياضيين لمكافحة السمنة والأمراض المزمنة وتحسين الصحة العامة جودة الحياة.",
    skills: ["Clinical Nutrition", "Diet Planning", "Body Assessment", "Diabetes Diet Management", "Patient Guidance", "Sports Nutrition"]
  },
  {
    id: "preset-civilarchitect",
    name: "مهندس تصميم إنشائي",
    englishTitle: "Structural Engineer",
    category: "الهندسة والتصميم",
    icon: "🌁",
    summary: "مهندس إنشائي متخصص في تصميم وتحليل الهياكل الخرسانية والمعدنية للمباني والجسور للتأكد من قدرتها على تحمل الأحمال والزلازل والظروف البيئية.",
    skills: ["ETABS", "SAP2000", "SAFE", "Concrete Design", "Steel Structures", "Structural Analysis", "SBC Standards"]
  },
  {
    id: "preset-electricalsite",
    name: "مهندس موقع كهربائي",
    englishTitle: "Electrical Site Engineer",
    category: "الهندسة والتصميم",
    icon: "🔌",
    summary: "مهندس موقع كهربائي يشرف على تمديد الكابلات، تركيب لوحات التوزيع، الإنارة، وأنظمة التيار الخفيف بالفيلات والمشاريع الكبرى والتحقق من الجودة.",
    skills: ["Site Installation", "Testing & Commissioning", "Electrical Drawings", "Cable Pulling", "Shop Drawings", "SBC compliance"]
  },
  {
    id: "preset-mechanicalhvac",
    name: "مهندس أنظمة تكييف وحريق",
    englishTitle: "HVAC & Firefighting Engineer",
    category: "الهندسة والتصميم",
    icon: "❄️",
    summary: "مهندس ميكانيكي متخصص في تصميم وحسابات أحمال التكييف والتهوية الميكانيكية وشبكات مكافحة الحريق الرطبة والجافة للمباني الإدارية والتجارية.",
    skills: ["HAP Analysis", "Elite Software", "Duct Sizing", "Fire Sprinklers", "NFPA Codes", "AutoCAD Mechanical"]
  },
  {
    id: "preset-salesrepresentative",
    name: "ممثل مبيعات ميداني",
    englishTitle: "Sales Representative",
    category: "التسويق والمبيعات والإعلام",
    icon: "🏃‍♂️",
    summary: "مندوب مبيعات ميداني طموح ومتميز في الإقناع وبناء شبكة عملاء دائمين وعرض المنتجات بأسلوب احترافي لزيادة المبيعات والوصول للأهداف الشهرية.",
    skills: ["Direct Sales", "Cold Calling", "Product Presentation", "Negotiation", "Client Relationship", "Objection Handling"]
  },
  {
    id: "preset-seospecialist",
    name: "أخصائي تحسين محركات البحث",
    englishTitle: "SEO Specialist",
    category: "التسويق والمبيعات والإعلام",
    icon: "🔍",
    summary: "أخصائي SEO متخصص في تصدر محركات البحث للمواقع والمدونات، تحليل الكلمات المفتاحية، وبناء الروابط لزيادة الزيارات العضوية والمبيعات للمتاجر.",
    skills: ["SEO Auditing", "Keyword Research", "On-Page SEO", "Off-Page Link Building", "Google Search Console", "Screaming Frog"]
  },
  {
    id: "preset-securityofficer",
    name: "أخصائي أمن وسلامة منشآت",
    englishTitle: "Security Supervisor",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "👮‍♂️",
    summary: "مشرف أمن وحماية منشآت متميز في مراقبة بوابات الدخول والأنظمة الأمنية، تنسيق خطط الطوارئ وتوفير بيئة آمنة للزوار والموظفين بالمباني.",
    skills: ["Facility Security", "CCTV Monitoring", "Emergency Evacuation", "First Aid", "Risk Identification", "Crowd Control"]
  },
  {
    id: "preset-primaryteacher",
    name: "معلم صفوف أولية",
    englishTitle: "Primary School Teacher",
    category: "التعليم واللغات والخدمات",
    icon: "👩‍🏫",
    summary: "معلمة صفوف أولية مبدعة في تدريس وتأسيس الأطفال في القراءة والكتابة والعلوم باستخدام وسائل تعليمية بصرية وألعاب تفاعلية تحببهم في الدراسة.",
    skills: ["Child Education", "Interactive Learning", "Lesson Planning", "Classroom Management", "Phonics", "Parent Communication"]
  },
  {
    id: "preset-mathsteacher",
    name: "مدرس رياضيات",
    englishTitle: "Mathematics Teacher",
    category: "التعليم واللغات والخدمات",
    icon: "📐",
    summary: "مدرس رياضيات خبير في تبسيط المسائل الحسابية والقواعد الهندسية للطلاب في المراحل المتوسطة والثانوية وتهيئتهم لاختبارات القدرات بذكاء وسهولة.",
    skills: ["Math Instruction", "Qudrat Test prep", "Analytical Thinking", "Lesson Planning", "E-Learning Tools", "Student Assessment"]
  },
  {
    id: "preset-businessanalyst",
    name: "محلل أعمال ومشاريع",
    englishTitle: "Business Analyst",
    category: "الإدارة والأعمال والمالية",
    icon: "📊",
    summary: "محلل أعمال يقوم بجمع المتطلبات وتحليل العمليات التشغيلية وتوثيقها لتوفير حلول تقنية وإدارية تزيد الكفاءة وتقلل النفقات للشركات والمؤسسات.",
    skills: ["Requirements Gathering", "UML Modeling", "Process Mapping", "SQL Queries", "Agile/User Stories", "Gap Analysis"]
  },
  {
    id: "preset-publicrelations",
    name: "أخصائي علاقات عامة",
    englishTitle: "Public Relations Specialist",
    category: "التسويق والمبيعات والإعلام",
    icon: "🤝",
    summary: "أخصائي علاقات عامة وإعلام يسعى لبناء وتحسين الصورة الذهنية الإيجابية للمؤسسات، صياغة البيانات الصحفية، وإدارة قنوات التواصل والإعلام الموجه.",
    skills: ["Press Release", "Media Relations", "Crisis Management", "Public Speaking", "Event Planning", "Internal Communication"]
  },
  {
    id: "preset-contentmoderator",
    name: "منسق ومراقب محتوى رقمي",
    englishTitle: "Content Moderator",
    category: "التسويق والمبيعات والإعلام",
    icon: "🖥️",
    summary: "مراقب ومراجع محتوى رقمي ملتزم بفحص النصوص والمشاركات ومقاطع الفيديو على الشبكات لضمان مطابقتها لسياسات النشر والقوانين المحلية.",
    skills: ["Content Moderation", "Policy Compliance", "Platform Safety", "Attention to Detail", "Crisis Escalation", "Arabic/English Slang"]
  },
  {
    id: "preset-legalconsultant",
    name: "مستشار قانوني داخلي",
    englishTitle: "In-house Legal Counsel",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "⚖️",
    summary: "مستشار قانوني داخلي للشركات يقدم الاستشارات المباشرة حول الأنظمة وحماية أصول وممتلكات المؤسسة، ومتابعة قضايا العمل والعمال وصياغة العقود الاستثمارية.",
    skills: ["Employment Law", "Contract Negotiation", "Corporate Compliance", "IP Protection", "Risk Mitigation", "Legal Writing"]
  },
  {
    id: "preset-procurement",
    name: "أخصائي مشتريات وتوريد",
    englishTitle: "Procurement Specialist",
    category: "الإدارة والأعمال والمالية",
    icon: "🧾",
    summary: "أخصائي مشتريات وتوريد خبير في التفاوض مع الموردين، وإدارة عروض الأسعار، وتوقيع العقود لضمان تأمين مستلزمات الشركة بأفضل جودة وسعر وبمطابقة تامة.",
    skills: ["Supplier Sourcing", "Negotiation", "Cost Reduction", "Contract Administration", "Purchase Orders", "Inventory Management"]
  },
  {
    id: "preset-executiveassistant",
    name: "مساعد تنفيذي لإدارة الإدارة",
    englishTitle: "Executive Assistant",
    category: "الإدارة والأعمال والمالية",
    icon: "👔",
    summary: "مساعد تنفيذي يتمتع بكفاءة عالية في تنظيم المواعيد والاجتماعات للمسؤولين التنفيذيين، كتابة تقارير محاضر الاجتماعات وإدارة أسرار ومستندات العمل.",
    skills: ["Executive Scheduling", "Minutes of Meetings", "Travel Coordination", "Correspondence", "Confidentiality", "MS Office Suite"]
  },
  {
    id: "preset-customsclearance",
    name: "مخلص جمركي",
    englishTitle: "Customs Broker",
    category: "القانون والضيافة والتخصصات الأخرى",
    icon: "🚢",
    summary: "مخلص جمركي ذو دراية تامة بأنظمة فسح البضائع والاستيراد بوزارة التجارة والهيئة العامة للغذاء والدواء لضمان إنهاء إجراءات الشحن دون تأخير.",
    skills: ["Customs Tariffs", "Saber Platform", "Import Regulations", "Port Coordination", "HS Codes", "Problem Solving"]
  },
  {
    id: "preset-warehousemanager",
    name: "أمين ومستودع مخازن",
    englishTitle: "Warehouse Manager",
    category: "الإدارة والأعمال والمالية",
    icon: "🏭",
    summary: "أمين مستودع متميز في تنظيم جرد البضائع، مراقبة مستويات المخزون، ترتيب الشحنات الواردة والصادرة وتسجيلها بأنظمة المخازن والتحقق من كفاءة التعبئة.",
    skills: ["Inventory Management", "ERP Warehouse (SAP/Odoo)", "HSE Standards", "Stock Auditing", "Logistics Coordination", "Forklift Safety"]
  },
  {
    id: "preset-fitnesscoach",
    name: "مدرب لياقة بدنية",
    englishTitle: "Fitness Trainer",
    category: "الصحة والرعاية الطبية",
    icon: "💪",
    summary: "مدرب كمال أجسام ولياقة بدنية خبير في تصميم التمارين الرياضية وجدول تمرين مقاومة وتتبع تقدم المشتركين بهدف الوصول إلى الوزن والجسم المثالي الصحي.",
    skills: ["Personal Training", "Workout Design", "Supplement Guidance", "Kinesiology", "Motivation", "First Aid / CPR"]
  },
  {
    id: "preset-hrgeneralist",
    name: "أخصائي عام موارد بشرية",
    englishTitle: "HR Generalist",
    category: "الإدارة والأعمال والمالية",
    icon: "🤝",
    summary: "أخصائي موارد بشرية ملم بكافة العمليات من توظيف، وتدريب، وإصدار مسيرات الرواتب والعمليات اليومية وتأمين الموظفين وتوطين الوظائف.",
    skills: ["Employee Operations", "Payroll Processing", "Qiwa & Muqeem", "Saudization Programs", "Performance Tracking", "Labor Law"]
  },
  {
    id: "preset-socialwork",
    name: "أخصائي اجتماعي ونفسي",
    englishTitle: "Social Worker",
    category: "التعليم واللغات والخدمات",
    icon: "🧠",
    summary: "أخصائي اجتماعي ونفسي يسعى لتقديم الدعم النفسي والإرشاد الأسري للطلاب والأفراد ومساعدتهم على التغلب على مشاكلهم الشخصية والاجتماعية وتطوير ذاتهم.",
    skills: ["Psychological Counseling", "Social Support", "Case Assessment", "Empathy & Communication", "Problem Solving", "Community Outreach"]
  },
  {
    id: "preset-dentist",
    name: "طبيب أسنان",
    englishTitle: "Dentist",
    category: "الصحة والرعاية الطبية",
    icon: "🦷",
    summary: "طبيب أسنان مرخص ومبدع في معالجة وتجميل الأسنان، زراعة وتركيب القشور الخزفية، وعلاج الجذور بطرق حديثة غير مؤلمة تضمن راحة وابتسامة المريض.",
    skills: ["Dental Surgery", "Cosmetic Dentistry", "Endodontics", "Patient Care", "Infection Control", "BLS Certified"]
  }
];

// Combine the main templates with extra ones to form exactly 48 professional templates (more than 45!)
export const allProfessionalPresets: ProfessionalPreset[] = [
  ...professionalPresets,
  ...compactExtraPresets.map((extra, idx) => ({
    id: extra.id,
    name: extra.name,
    category: extra.category,
    englishTitle: extra.englishTitle,
    icon: extra.icon,
    data: {
      personalInfo: {
        fullName: `عبدالله بن علي ${idx % 2 === 0 ? "الغامدي" : "المالكي"}`,
        email: `${extra.id.replace("preset-", "")}@example.com`,
        phone: "+966 59 000 1111",
        city: "الرياض، المملكة العربية السعودية",
        title: `${extra.name} (${extra.englishTitle})`,
        linkedin: `linkedin.com/in/${extra.id}`,
        github: `github.com/${extra.id}`,
        summary: extra.summary
      },
      education: [
        {
          id: `edu-extra-${idx}`,
          institution: "جامعة الملك فهد للبترول والمعادن",
          degree: "بكالوريوس",
          fieldOfStudy: extra.category.includes("الهندسة") ? "الهندسة والعلوم" : "العلوم الإنسانية والإدارية",
          graduationYear: "2021",
          grade: "4.5 / 5.0"
        }
      ],
      experience: [
        {
          id: `exp-extra-${idx}`,
          company: "مجموعة أعمال المملكة الكبرى",
          role: extra.name,
          startDate: "2021-12",
          endDate: "الحالي",
          description: `عملت كـ ${extra.name} بمهام ممتازة وإنجازات عديدة ساهمت في كفاءة القسم، وتطوير المهارات بنسبة 25٪.\nقمت بحل المشاكل اليومية والتنسيق الفوري مع الإدارات وتجهيز التقارير الدقيقة المباشرة.`
        }
      ],
      projects: [
        {
          id: `proj-extra-${idx}`,
          title: `مبادرة تطوير وتحسين جودة أداء العمل لـ ${extra.name}`,
          description: `مشروع تطبيقي متميز لزيادة الإنتاجية والأداء وتدريب الكوادر البشرية للوصول للأهداف المرجوة بسلاسة وسرعة.`,
          techStack: extra.skills.slice(0, 3).join(", "),
          link: "example.com/project"
        }
      ],
      skills: extra.skills
    }
  }))
];
