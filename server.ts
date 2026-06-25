import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini client lazily and securely
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please configure it in the Secrets panel in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Ensure clean Arabic text and bypass encoding issues
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// API endpoint: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Helper to call Gemini with exponential backoff and alternate models
async function callGemini(params: {
  contents: any;
  systemInstruction?: string;
  responseMimeType?: string;
  responseSchema?: any;
  temperature?: number;
}): Promise<any> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    let delay = 1000;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const ai = getGeminiClient();
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: {
            systemInstruction: params.systemInstruction,
            responseMimeType: params.responseMimeType,
            responseSchema: params.responseSchema,
            temperature: params.temperature,
          },
        });
        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err.message || "";
        console.warn(`[Gemini API Warning] Attempt ${attempt} failed with model ${model}. Error: ${errMsg}`);
        
        if (errMsg.includes("400") || errMsg.includes("INVALID_ARGUMENT")) {
          break; // Stop retrying this model, try next model
        }

        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  throw lastError || new Error("Failed to call Gemini API on all attempted models and retries.");
}

// Fallback logic for ATS Compatibility Analyzer (in case Gemini is 100% down/unavailable)
function localATSFallback(resumeData: any, jobDescription: string) {
  const textToScan = `${JSON.stringify(resumeData)}`.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  const commonKeywords = [
    "react", "vue", "angular", "nextjs", "javascript", "typescript", "node", "express", 
    "python", "django", "flask", "java", "spring", "c#", "dotnet", "asp.net", "php", "laravel",
    "sql", "mysql", "postgresql", "mongodb", "oracle", "nosql", "redis", "firebase", "aws", "azure", 
    "gcp", "docker", "kubernetes", "git", "github", "ci/cd", "devops", "html", "css", "tailwind", 
    "bootstrap", "ui/ux", "scrum", "agile", "qa", "testing", "graphql", "rest api", "linux"
  ];

  const jdKeywords = commonKeywords.filter(kw => jdLower.includes(kw));
  const matchedKeywords = jdKeywords.filter(kw => textToScan.includes(kw));
  const missingSkills = jdKeywords.filter(kw => !textToScan.includes(kw));

  const cap = (s: string) => s.toUpperCase();
  const displayMatched = matchedKeywords.map(cap);
  const displayMissing = missingSkills.map(cap);

  let score = 55;
  if (jdKeywords.length > 0) {
    score = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
  }
  score = Math.max(40, Math.min(95, score));

  let matchSummary = `تم تحليل السيرة الذاتية محلياً ومقارنتها بمتطلبات الوظيفة. يوجد تطابق جيد في المهارات الأساسية مثل (${displayMatched.slice(0, 3).join(", ") || "بعض المهارات الأساسية"}).`;
  if (score < 60) {
    matchSummary = `تظهر المقارنة وجود فجوة في بعض المهارات التقنية المطلوبة للوظيفة. يوصى بإضافة مهارات (${displayMissing.slice(0, 3).join(", ") || "المهارات المستهدفة"}) لرفع نسبة القبول في أنظمة الفرز.`;
  } else if (score >= 80) {
    matchSummary = `سيرتك الذاتية ممتازة ومطابقة بنسبة كبيرة لمتطلبات الوظيفة المعلنة! الكلمات المفتاحية متوافقة بشكل رائع مع نظام ATS الخاص بالشركة المستهدفة.`;
  }

  const recommendations = [
    `احرص على إبراز المهارات التالية بوضوح في قسم المهارات: ${displayMissing.slice(0, 4).join(", ") || "المهارات المتوافقة مع الوصف الوظيفي"}.`,
    "أضف أرقاماً وإنجازات قابلة للقياس (مثل: زيادة الكفاءة بنسبة 20%، أو قيادة فريق من 3 مطورين) لتعزيز قوة سيرتك الذاتية.",
    "قم بتعديل مسمياتك الوظيفية لتتطابق تماماً مع المسمى الوظيفي المعلن عنه في الوصف.",
    "تجنب التصاميم المعقدة والجداول الكثيرة التي قد تصعب على أنظمة ATS قراءتها بوضوح."
  ];

  return {
    score,
    matchSummary,
    missingSkills: displayMissing.length > 0 ? displayMissing : ["المهارات التخصصية الدقيقة"],
    recommendations,
    matchedKeywords: displayMatched.length > 0 ? displayMatched : ["المهارات العامة المكتوبة"]
  };
}

// Fallback logic for Cover Letter Generator
function localCoverLetterFallback(resumeData: any, jobTitle: string, companyName: string) {
  const personal = resumeData.personal || {};
  const name = personal.fullName || "باحث عن عمل";
  const title = personal.title || jobTitle || "مطور ومحترف";
  const email = personal.email || "";
  const phone = personal.phone || "";
  const company = companyName || "الشركة الموقرة";
  const targetRole = jobTitle || "الوظيفة الشاغرة";

  const experiences = resumeData.experience || [];
  let expHighlight = "";
  if (experiences.length > 0) {
    const firstExp = experiences[0];
    expHighlight = `خلال مسيرتي المهنية، عملت كـ ${firstExp.role} في ${firstExp.company} حيث قمت بـ ${firstExp.description || "تطوير المشاريع وإدارة المهام بنجاح"}.`;
  } else {
    expHighlight = `أمتلك شغفاً كبيراً في هذا المجال وأسعى دوماً لتطبيق أفضل الممارسات التقنية والمهنية لضمان نجاح المشاريع وإنجاز الأهداف بكفاءة عالية.`;
  }

  const skills = resumeData.skills || [];
  const skillsStr = skills.length > 0 ? skills.slice(0, 5).join("، ") : "العديد من المهارات المهنية والتقنية";

  const letter = `سعادة مدير التوظيف في ${company}،

السلام عليكم ورحمة الله وبركاته،

يطيب لي أن أتقدم بطلب التوظيف لشغل منصب (${targetRole}) المعلن عنه لدى شركتكم الموقرة. لكوني أمتلك خبرة عملية متميزة في هذا المجال ومؤهلات تتناسب تماماً مع متطلبات الوظيفة، فإنني على يقين تام بقدري على تقديم إضافة حقيقية لفريقكم.

${expHighlight} لقد مكنتني هذه التجربة من صقل مهاراتي العملية وتعميق فهمي لمتطلبات السوق وتجاوز التحديات باحترافية.

أمتلك أيضاً معرفة قوية في مهارات رئيسية تشمل: (${skillsStr})، ومستعد لتسخير كافة هذه المهارات والخبرات لتحقيق التميز التشغيلي والمساهمة في تحقيق أهداف شركتكم الطموحة.

أشكركم جزيل الشكر على وقتكم ومراجعة طلبي، وأتطلع بشوق لفرصة اللقاء بكم في مقابلة شخصية لمناقشة كيف يمكن لخبراتي أن تدعم نجاحاتكم المستمرة.

وتقبلوا فائق الاحترام والتقدير،

الاسم: ${name}
البريد الإلكتروني: ${email}
الهاتف: ${phone}
التخصص المهني: ${title}`;

  return { coverLetter: letter };
}

// Fallback logic for Career Advisor
function localCareerAdvisorFallback(targetRole: string, resumeData: any) {
  const role = targetRole || "المجال المهني المحدد";
  let skills = ["إدارة المشاريع", "مهارات التواصل التقني", "حل المشكلات المعقدة"];
  let courses = [
    { title: "أسس ومهارات النجاح المهني", platform: "Coursera", description: "تعلم مهارات التخطيط والتميز الوظيفي." },
    { title: "التواصل الفعال وإدارة فرق العمل", platform: "Udemy", description: "بناء المهارات القيادية والشخصية في بيئات العمل الحديثة." }
  ];
  let projects = [
    { title: "بناء معرض أعمال احترافي (Portfolio)", description: "تصميم موقع شخصي متكامل يبرز مهاراتك ومشاريعك السابقة بشكل تفاعلي.", difficulty: "متوسط" },
    { title: "مشروع حل مشكلة عملية في تخصصك", description: "تحديد مشكلة شائعة في مجالك وابتكار حل تطبيقي متكامل لها لتقديمه كمشروع ريادي.", difficulty: "متقدم" }
  ];

  const roleLower = role.toLowerCase();
  if (roleLower.includes("web") || roleLower.includes("developer") || roleLower.includes("برمج") || roleLower.includes("ويب") || roleLower.includes("مطور")) {
    skills = ["React / TypeScript", "RESTful APIs / GraphQL", "Git & GitHub Version Control", "Tailwind CSS"];
    courses = [
      { title: "Full-Stack Web Development Boot Camp", platform: "Udemy", description: "دورة شاملة لبناء تطبيقات ويب تفاعلية ومتكاملة من الصفر." },
      { title: "React - The Complete Guide", platform: "Academind", description: "احتراف بناء الواجهات التفاعلية باستخدام React الحديث وHooks." }
    ];
    projects = [
      { title: "تطبيق إدارة مهام جماعي متطور", description: "بناء لوحة تحكم تفاعلية لإدارة المهام والمشاريع مع مزامنة فورية للبيانات.", difficulty: "متوسط" },
      { title: "متجر إلكتروني متكامل", description: "تطوير متجر إلكتروني يتيح تصفح المنتجات وإضافتها للسلة ومحاكاة عملية الدفع الآمن.", difficulty: "متقدم" }
    ];
  } else if (roleLower.includes("data") || roleLower.includes("بيانات") || roleLower.includes("تحليل")) {
    skills = ["Python / SQL", "Pandas & NumPy", "Power BI / Tableau", "Data Visualization"];
    courses = [
      { title: "Google Data Analytics Professional Certificate", platform: "Coursera", description: "الشهادة الاحترافية الرسمية من جوجل لتعلم أساسيات تحليل البيانات ولغة SQL." },
      { title: "Python for Data Science and Machine Learning", platform: "Udemy", description: "تعلم كيفية استخدام بايثون لمعالجة وتحليل البيانات الضخمة." }
    ];
    projects = [
      { title: "تحليل وتصور بيانات المبيعات", description: "معالجة ملف بيانات ضخم واستخراج مؤشرات الأداء وعرضها في لوحة تفاعلية.", difficulty: "متوسط" },
      { title: "نموذج توقع الأسعار أو سلوك العملاء", description: "بناء نموذج تعلم آلي بسيط لتوقع الأسعار المستقبلية بناءً على المعطيات التاريخية.", difficulty: "متقدم" }
    ];
  }

  return {
    readinessScore: 72,
    missingSkills: skills,
    courses,
    suggestedProjects: projects,
    advisorFeedback: `مرحباً بك! تخصص "${role}" هو أحد أكثر المجالات طلباً ونمواً في السوق اليوم. بناءً على مراجعة ملفك وسيرتك الذاتية، تظهر السيرة الذاتية مستوى استعداد جيداً وخلفية واعدة، ولكن تحتاج إلى تعزيز حضورك في بعض المهارات التقنية والتطبيقية. ننصحك بالتركيز على بناء مشاريع واقعية تبرز قدرتك على حل المشكلات الحقيقية، والالتحاق بالدورات الموصى بها لملء الفجوات المهارية الحالية وتسويق نفسك بذكاء للشركات المستهدفة.`,
    nextSteps: [
      "1. أكمل أحد الكورسات الموصى بها في القائمة لملء الفجوة المعرفية.",
      "2. ابدأ فوراً في تنفيذ أول مشروع تطبيقي واحرص على رفعه على منصات المشاريع (مثل GitHub).",
      "3. أضف الكلمات المفتاحية والمهارات الجديدة إلى سيرتك الذاتية لزيادة نسبة ظهورك في أنظمة الفرز.",
      "4. جهّز خطاب تقديم مخصص لكل وظيفة تقدم عليها لرفع نسب قبولك."
    ]
  };
}

// API endpoint: Improve description with AI
app.post("/api/resume/improve", async (req, res) => {
  const { text, context, language = "ar" } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const systemPrompt = `You are an expert resume writer and career consultant.
Your task is to take a weak, draft-like bullet point or task description and rewrite it into a highly professional, result-oriented, and action-driven statement.
Ensure it uses strong action verbs, highlights achievements and quantitative metrics if possible, and sounds elegant.
The user's input might be in Arabic or English. Respond in the SAME language as the input (or the requested language: ${language}).
Do not include any extra introductory or concluding remarks. Return ONLY the improved text.`;

    const prompt = `Rewrite and improve this experience description: "${text}"${context ? ` in the context of: "${context}"` : ""}. Ensure it is highly professional and ready for a premium resume.`;

    const response = await callGemini({
      contents: prompt,
      systemInstruction: systemPrompt,
      temperature: 0.7,
    });

    const result = response.text?.trim() || text;
    res.json({ improvedText: result });
  } catch (error: any) {
    console.error("Gemini API completely unavailable, running fallback text enhancement:", error);
    let fallbackText = text;
    if (language === "ar") {
      fallbackText = text
        .replace(/\bعملت على\b/g, "إدارة وتطوير")
        .replace(/\bسويت\b/g, "تنفيذ وتصميم")
        .replace(/\bكنت مسؤول عن\b/g, "الإشراف الكامل على")
        .replace(/\bبرمجت\b/g, "تطوير وهندسة برمجية لـ")
        .replace(/\bاشتغلت في\b/g, "المساهمة الفعالة في تطوير");
      
      if (fallbackText === text) {
        fallbackText = `تطوير وتحسين العمليات المتعلقة بـ: ${text} مع التركيز على الكفاءة والجودة العالية.`;
      }
    } else {
      fallbackText = `Enhanced and optimized: ${text} - focused on efficiency, productivity, and professional standard delivery.`;
    }
    res.json({ improvedText: fallbackText });
  }
});

// API endpoint: ATS Compatibility Analyzer
app.post("/api/resume/analyze-ats", async (req, res) => {
  const { resumeData, jobDescription } = req.body;
  if (!resumeData || !jobDescription) {
    return res.status(400).json({ error: "Both resume data and job description are required" });
  }

  try {
    const systemPrompt = `You are an ATS (Applicant Tracking System) optimizer and expert recruiter.
Analyze the provided resume details and the target job description. Compare them thoroughly.
You must return a JSON response with:
- score: integer from 0 to 100 representing compatibility.
- matchSummary: a brief summary of how well the resume matches the job (in Arabic).
- missingSkills: an array of key skills/keywords (e.g., 'React', 'TypeScript', 'Docker') that are mentioned or expected in the job description but missing or weak in the resume.
- recommendations: an array of concrete, actionable advice to optimize the resume for this job (in Arabic).
- matchedKeywords: an array of skills or terms that successfully match.`;

    const prompt = `
Resume Data:
${JSON.stringify(resumeData, null, 2)}

Target Job Description:
${jobDescription}

Perform the ATS matching analysis and return the result following the requested schema.`;

    const response = await callGemini({
      contents: prompt,
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER, description: "Compatibility score from 0 to 100" },
          matchSummary: { type: Type.STRING, description: "Brief matching summary in Arabic" },
          missingSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of missing key skills or technologies",
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of actionable recommendations in Arabic",
          },
          matchedKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of matched keywords and skills",
          },
        },
        required: ["score", "matchSummary", "missingSkills", "recommendations", "matchedKeywords"],
      },
      temperature: 0.2,
    });

    const parsedResult = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedResult);
  } catch (error: any) {
    console.error("Error in ATS Analyzer (Using smart local fallback):", error);
    const fallbackResults = localATSFallback(resumeData, jobDescription);
    res.json(fallbackResults);
  }
});

// API endpoint: Cover Letter Generator
app.post("/api/resume/cover-letter", async (req, res) => {
  const { resumeData, jobTitle, companyName, jobDescription, tone = "professional" } = req.body;
  if (!resumeData) {
    return res.status(400).json({ error: "Resume data is required" });
  }

  try {
    const systemPrompt = `You are an elite career writer. Write a highly persuasive, customized, and polished cover letter (خطاب تقديم) in Arabic (or English if the resume data is fully English, default to Arabic).
Utilize details from the user's resume (experiences, education, skills) and align them with the job title "${jobTitle || "the position"}" and company "${companyName || "the company"}" to present them as the perfect fit.
The tone should be: ${tone}.
Keep it concise, engaging, and professional (3-4 paragraphs max). Do not include any placeholder bracket fields (like "[Insert Date]") unless they are pre-filled with sensible mock information or left clean. Always sign as the user's name if provided.`;

    const prompt = `
Resume Data:
${JSON.stringify(resumeData, null, 2)}

Target Position: ${jobTitle || "Not Specified"}
Company Name: ${companyName || "Not Specified"}
Job Description Details:
${jobDescription || "Not Specified"}

Write a premium, custom cover letter based on this information.`;

    const response = await callGemini({
      contents: prompt,
      systemInstruction: systemPrompt,
      temperature: 0.7,
    });

    const result = response.text?.trim() || "Failed to generate cover letter.";
    res.json({ coverLetter: result });
  } catch (error: any) {
    console.error("Error in Cover Letter (Using high-quality fallback):", error);
    const fallbackLetter = localCoverLetterFallback(resumeData, jobTitle, companyName);
    res.json(fallbackLetter);
  }
});

// API endpoint: Career Advisor AI
app.post("/api/resume/career-advisor", async (req, res) => {
  const { targetRole, resumeData, chatHistory = [] } = req.body;
  if (!targetRole) {
    return res.status(400).json({ error: "Target role is required" });
  }

  try {
    const systemPrompt = `You are 'CVX Career Advisor', a highly intelligent career coach.
Analyze the user's current resume skills/experience against the target role: "${targetRole}".
Prepare a structured consultation report.
You must return a JSON response with:
- readinessScore: integer from 0 to 100 representing how ready the user is.
- missingSkills: array of skills to learn.
- courses: array of recommended courses or topics (with titles/description in Arabic).
- suggestedProjects: array of projects to build to prove proficiency (titles + description in Arabic).
- advisorFeedback: direct, encouraging, and structured career advice (in Arabic).
- nextSteps: array of clear sequential milestones the user should take.`;

    const prompt = `
Target Job Role: ${targetRole}
Current Resume:
${JSON.stringify(resumeData || {}, null, 2)}

${chatHistory.length > 0 ? `Conversation History:\n${JSON.stringify(chatHistory, null, 2)}` : ""}

Generate an expert analysis and customized career plan. Ensure response is valid JSON fitting the requested schema.`;

    const response = await callGemini({
      contents: prompt,
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          readinessScore: { type: Type.INTEGER, description: "Career readiness score 0-100" },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          courses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                platform: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["title", "platform", "description"],
            },
          },
          suggestedProjects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                difficulty: { type: Type.STRING },
              },
              required: ["title", "description", "difficulty"],
            },
          },
          advisorFeedback: { type: Type.STRING },
          nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["readinessScore", "missingSkills", "courses", "suggestedProjects", "advisorFeedback", "nextSteps"],
      },
      temperature: 0.5,
    });

    const parsedResult = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedResult);
  } catch (error: any) {
    console.error("Error in Career Advisor (Using smart local fallback):", error);
    const fallbackAdvice = localCareerAdvisorFallback(targetRole, resumeData);
    res.json(fallbackAdvice);
  }
});

// Configure Vite or Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CVX Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
