export type ToolItem = { name: string; letter: string; color: string; desc: string; bestFor: string }
export type ResourceItem = { title: string; kind: string; source: string; url?: string }
export type ListItem = { bold?: string; text: string }
export type ContentProvenance = 'ai' | 'hybrid' | 'human'

export type Block =
  | { type: 'p';         text: string }
  | { type: 'h';         text: string }
  | { type: 'list';      items: ListItem[] }
  | { type: 'tools';     items: ToolItem[] }
  | { type: 'callout';   tone: 'info' | 'warn' | 'danger' | 'success'; title: string; text: string; iconName?: 'sparkle' | 'warn' | 'check' | 'book' }
  | { type: 'promptPair'; weak: string; strong: string }
  | { type: 'story';     who: string; text: string }
  | { type: 'resources'; items: ResourceItem[] }

export type Section = {
  question: string
  intro: string
  blocks: Block[]
  provenance?: ContentProvenance
  provenanceNote?: string
}
export type SectionMeta = { id: string; label: string }

export type PersonaContent = Record<string, Section>

function applyContentDefaultProvenance(
  content: PersonaContent,
  provenance: ContentProvenance,
  note?: string
): PersonaContent {
  return Object.fromEntries(
    Object.entries(content).map(([id, section]) => [
      id,
      {
        ...section,
        provenance: section.provenance ?? provenance,
        provenanceNote: section.provenanceNote ?? note,
      },
    ])
  )
}

/* ---- Student ---- */
const STUDENT_CONTENT_RAW: PersonaContent = {
  overview: {
    question: "What's this page actually for?",
    intro: "Hey! Great question to start with.",
    blocks: [
      { type: 'p', text: "This space is designed for you — someone who's either studying, about to study, or curious what all the AI fuss is about in your education. Think of me less as a tool and more as a slightly-too-enthusiastic study buddy who's read the research." },
      { type: 'p', text: "Across the sections on the left, we'll cover the AI tools that are genuinely useful for learning, how to use them so you actually get smarter (not lazier), the real risks to watch out for, and how to stay on the right side of your school's integrity rules." },
      { type: 'callout', tone: 'info', title: "One data point to start", text: "86% of college students report using AI tools for their studies (Ellucian Survey, 2025). The question isn't whether you'll encounter AI in your education — it's whether you'll use it in a way that actually builds your skills.", iconName: 'sparkle' },
      { type: 'h', text: "Where we're headed" },
      { type: 'list', items: [
        { bold: "Tools that help", text: "the short list that's actually worth using" },
        { bold: "How to prompt", text: "the difference between a great answer and a useless one" },
        { bold: "What can go wrong", text: "hallucinations, over-reliance, and other pitfalls" },
        { bold: "Ethics & integrity", text: "the line between help and cheating" },
        { bold: "Examples", text: "students who used AI well (and badly)" },
      ]},
    ],
  },
  tools: {
    question: "Which AI tools should I actually use as a student?",
    intro: "There are dozens, but you only need a few. Here's the shortlist grounded in student and faculty research — ranked by practical value.",
    blocks: [
      { type: 'h', text: "For writing & thinking" },
      { type: 'tools', items: [
        { name: 'Microsoft Copilot', letter: 'Co', color: '#0078D4', desc: 'Free at most universities through your institutional email. Data-protected (your prompts don\'t train Microsoft\'s models). Works inside Word, Excel, and PDFs — paste a reading, get a summary.', bestFor: 'Free via NetID' },
        { name: 'ChatGPT', letter: 'C', color: '#10A37F', desc: 'General-purpose reasoning. Strong for brainstorming, explaining concepts, and editing drafts. The free tier includes Study Mode; paid tier adds ChatGPT Agent for multi-step research tasks.', bestFor: 'Essays, study guides' },
        { name: 'Claude', letter: 'Cl', color: '#D97757', desc: 'Long-context specialist. Paste a 40-page reading and ask it to explain the hard parts or generate discussion questions. Particularly strong at nuanced analysis.', bestFor: 'Long readings, nuance' },
      ]},
      { type: 'h', text: "For research & sources" },
      { type: 'tools', items: [
        { name: 'Perplexity AI', letter: 'P', color: '#20808D', desc: 'Answers with real-time citations from the open web and academic sources. The best tool for "I need 3 credible sources on X" — it shows where every claim comes from so you can verify it yourself.', bestFor: 'Cited research' },
        { name: 'Elicit', letter: 'E', color: '#6E59F2', desc: 'Searches actual academic papers and summarizes findings. A lifesaver for literature reviews — pulls from peer-reviewed sources, not just whatever ranks on Google.', bestFor: 'Academic papers' },
        { name: 'NotebookLM', letter: 'N', color: '#1A73E8', desc: 'Upload your own PDFs and lecture notes, then chat with them. Perfect for exam prep — it only answers from what you uploaded, so hallucinations are minimal.', bestFor: 'Studying from notes' },
      ]},
      { type: 'h', text: "For specific subjects" },
      { type: 'tools', items: [
        { name: 'Wolfram Alpha', letter: 'W', color: '#DC291E', desc: 'Mathematical reasoning without hallucinations. Shows step-by-step work and produces verifiable answers. Use this instead of asking ChatGPT to do your math.', bestFor: 'Math, stats, physics' },
        { name: 'GitHub Copilot', letter: '<>', color: '#6E6E6E', desc: 'Code completion and explanation built into your editor. Free for students via GitHub Education. Use it to understand code — not just copy it.', bestFor: 'CS classes' },
      ]},
      { type: 'callout', tone: 'warn', title: "Start with what your school already provides", text: "Many universities license Microsoft Copilot at no cost to students through your institutional NetID. Check with your IT office before paying for ChatGPT Plus — you may already have an equivalent tool for free.", iconName: 'warn' },
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "2025 AI in Higher Education Survey", kind: 'Survey', source: 'Ellucian' },
        { title: "AI Tools for Students", kind: 'Guide', source: 'UW-Madison IT Services', url: 'https://it.wisc.edu/' },
        { title: "Comparing AI Writing Assistants", kind: 'Report', source: 'NC State Office for Faculty Excellence' },
      ]},
    ],
  },
  how: {
    question: "How do I actually use AI so I learn, not just copy?",
    intro: "This is the difference between getting an A and getting an education. Researchers at MIT, Georgia Tech, and OpenAI have mapped out what effective student use actually looks like.",
    blocks: [
      { type: 'h', text: "A 7-step research workflow that works" },
      { type: 'list', items: [
        { bold: "Start with what you already know", text: "write down your own understanding before opening any AI tool" },
        { bold: "Map the landscape", text: "ask AI to outline the major debates, frameworks, or figures in the topic" },
        { bold: "Go to real databases", text: "use Google Scholar, JSTOR, or your library catalog — not AI — for actual sources" },
        { bold: "Use Perplexity for citations", text: "when you need web sources, Perplexity shows its citations so you can verify them" },
        { bold: "Read the actual sources", text: "AI summaries miss nuance and introduce errors — read at least the abstract and conclusion yourself" },
        { bold: "Use AI for draft feedback", text: "paste your own draft and ask for critique — don't ask it to write your draft" },
        { bold: "Disclose what you used", text: "note which tools you used and for what — most professors respect transparency" },
      ]},
      { type: 'h', text: "The 6 prompt techniques that get better answers" },
      { type: 'p', text: "MIT Sloan researchers identified six techniques that consistently improve AI output quality. Master these and you'll outperform peers who just type questions." },
      { type: 'list', items: [
        { bold: "Be specific", text: "add constraints (word count, audience, format) rather than open-ended requests" },
        { bold: "Provide context", text: "tell it your level, your course, and what you already understand" },
        { bold: "Role assignment", text: "\"Act as a tough but fair professor reviewing this draft\"" },
        { bold: "Iterate", text: "treat the first response as a draft, not a final answer — push back and refine" },
        { bold: "Use examples", text: "show it a sample of the style or format you want before asking" },
        { bold: "Chain-of-thought", text: "ask it to reason step by step before giving a conclusion — catches more errors" },
      ]},
      { type: 'h', text: "Put it into practice" },
      { type: 'promptPair', weak: "Write me a 500-word essay on the French Revolution.", strong: "I'm a first-year history student writing 500 words on the French Revolution for a class that emphasizes social history over political history. Help me brainstorm 5 angles, then ask me 3 questions to figure out which one I actually have something original to say about." },
      { type: 'promptPair', weak: "Is this good?", strong: "Critique this draft like a tough but fair professor. Identify: (1) the weakest argument, (2) any claims I haven't backed with evidence, (3) one paragraph I should cut entirely. Be blunt." },
      { type: 'callout', tone: 'success', title: "The test that matters", text: "If you could explain your finished work to a classmate without the AI open, you used it right. If you couldn't, you outsourced your brain.", iconName: 'check' },
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "Prompt Engineering for Educators and Students", kind: 'Guide', source: 'MIT Sloan EdTech', url: 'https://mitsloan.mit.edu/ideas-made-to-matter/teaching-learning' },
        { title: "Prompt Engineering Best Practices", kind: 'Guide', source: 'OpenAI', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { title: "AI for Academic Integrity: Student Guide", kind: 'Guide', source: 'Georgia Tech Institute for Academic Integrity' },
      ]},
    ],
  },
  downsides: {
    question: "What can actually go wrong if I lean on AI too much?",
    intro: "Glad you asked — this section is the most important one. A few real risks:",
    blocks: [
      { type: 'h', text: "Hallucinations (it makes things up)" },
      { type: 'p', text: "AI confidently invents facts, fake citations, made-up quotes, and nonexistent studies. It sounds authoritative. It is not. Always verify anything factual against a real source — especially citations." },
      { type: 'story', who: 'Law student, 2023', text: "A lawyer filed a brief citing six cases ChatGPT invented. None were real. The judge was not amused. Assume the same could happen to your term paper." },
      { type: 'h', text: "Skill atrophy" },
      { type: 'p', text: "If you use AI for every first draft, you will get worse at first drafts. The discomfort of staring at a blank page is part of how you learn to write. Don't skip it entirely." },
      { type: 'h', text: "Fake understanding" },
      { type: 'p', text: "Reading an AI explanation feels like learning. It isn't. You only know something if you can explain it without the tab open. Test yourself before you submit anything." },
      { type: 'h', text: "Privacy leaks" },
      { type: 'p', text: "Don't paste personal info, unpublished research, or anything confidential into a free chatbot. Assume everything you type could be used to train the next version — unless you're using an institutionally-licensed tool with a data-protection agreement." },
      { type: 'callout', tone: 'danger', title: "The biggest risk nobody warns you about", text: "Submitting AI-written work you don't actually understand — and then getting asked about it in class, in a viva, or in an interview. That moment of blanking in front of a professor is worse than any grade you were trying to rescue.", iconName: 'warn' },
    ],
  },
  ethics: {
    question: "Where's the line between using AI and cheating with AI?",
    intro: "Research from Wiley and EDUCAUSE in 2024 shows 96% of instructors believe students have cheated with AI, while 59% of students report AI has increased cheating. Here's a clear framework to keep yourself on the right side of the line.",
    blocks: [
      { type: 'h', text: "DO — almost always acceptable" },
      { type: 'list', items: [
        { text: "Use AI to understand a concept you're struggling with" },
        { text: "Ask it to generate practice questions for exam prep" },
        { text: "Use it to get feedback on a draft you wrote yourself" },
        { text: "Summarize a dense reading to orient yourself before reading the original" },
        { text: "Check your grammar or rephrase sentences you wrote" },
        { text: "Brainstorm angles or counterarguments — then choose and defend your own" },
      ]},
      { type: 'h', text: "DON'T — almost always a violation" },
      { type: 'list', items: [
        { text: "Submit AI-generated text as your own writing without disclosure" },
        { text: "Have AI solve graded problem sets, lab reports, or take-home exams" },
        { text: "Use it during closed-book assessments unless explicitly permitted" },
        { text: "Let AI fabricate citations or sources — always verify before citing" },
        { text: "Ask it to write your thesis statement and argue for a position you didn't reach yourself" },
      ]},
      { type: 'h', text: "The gray zone — check your syllabus" },
      { type: 'list', items: [
        { text: "Using AI to outline or plan an essay structure" },
        { text: "Generating code snippets and modifying them for an assignment" },
        { text: "Translating your own draft into more polished prose" },
      ]},
      { type: 'callout', tone: 'danger', title: "AI detectors are not your problem to solve — but they could be yours", text: "Universities including UW-Madison explicitly advise against relying on AI detection tools because they produce false positives and are statistically biased against non-native English speakers (Cornell, 2024). If you write your own work, you should not face a detection problem — but if you are flagged unfairly, know this research exists and bring it to your academic integrity office.", iconName: 'warn' },
      { type: 'callout', tone: 'info', title: "When in doubt, disclose", text: "Most professors respect: \"I used Perplexity to find initial sources and ChatGPT to brainstorm angles, but all writing and research is my own.\" Very few respect being caught pretending you didn't.", iconName: 'sparkle' },
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "Academic Integrity in the Age of AI", kind: 'Report', source: 'Wiley, 2024', url: 'https://www.wiley.com/' },
        { title: "AI Policy for Students", kind: 'Policy', source: 'UW-Madison Office of Student Conduct', url: 'https://conduct.students.wisc.edu/' },
        { title: "Generative AI and Academic Integrity", kind: 'Guide', source: 'Cornell Center for Teaching Innovation', url: 'https://teaching.cornell.edu/generative-artificial-intelligence' },
        { title: "EDUCAUSE AI Literacy Framework", kind: 'Framework', source: 'EDUCAUSE, 2024', url: 'https://www.educause.edu/' },
      ]},
    ],
  },
  examples: {
    question: "Give me some real examples of students using AI — good and bad.",
    intro: "These are documented real-world cases — not composites. They show how the same tools produce completely different outcomes depending on how students engage with them.",
    blocks: [
      { type: 'story', who: 'Business student · University of Iowa, 2024', text: "Developed a structured prompt formula for her marketing case analyses: role assignment + specific constraints + request for multiple options. Presented her methodology to the class at semester's end. Professors noted her critical evaluation of AI outputs made the work distinctly her own. (Inside Higher Ed / Ohio University, 2024)" },
      { type: 'story', who: 'Journalism student · CSU Northridge, 2024', text: "Used AI to draft a profile piece on a local community figure. Discovered the AI had misread the tone of her interviews, missed cultural nuance specific to the community, and hallucinated a quote from a source who hadn't said it. Rewrote entirely from her own notes. The experience sharpened her verification instincts more than any class had. (Inside Higher Ed, 2024)" },
      { type: 'story', who: 'Graduate student · UW-Madison, 2024', text: "Used Microsoft Copilot (free through the university's institutional license) to generate a literature review framework — a map of the major research threads in her field. Used that map to identify which journals to actually read, then read them. The AI gave her scaffolding; the intellectual work was hers. (UW-Madison IT Services, 2024)" },
      { type: 'story', who: 'Students nationwide · Stanford AI Quests, 2025', text: "Stanford's Accelerator for Learning launched AI Quests — free interactive games where students apply AI to real engineering challenges like flood forecasting and blindness prevention. Students reported the structured, goal-oriented AI use built intuition for where AI helps and where it falls short faster than open-ended experimentation. (Stanford Accelerator for Learning, 2025)" },
      { type: 'callout', tone: 'success', title: "The pattern across all four", text: "The students who came out ahead treated AI as a starting scaffold — something to interrogate, verify, and build on. The ones who struggled handed over the cognitive work entirely. Same tool. Completely different outcomes.", iconName: 'check' },
    ],
  },
  resources: {
    question: "Where can I keep learning?",
    intro: "Here's a curated shortlist grounded in research from leading institutions. All free or low-cost, all worth your time.",
    blocks: [
      { type: 'h', text: "Free courses & interactive tools" },
      { type: 'resources', items: [
        { title: "Elements of AI", kind: 'Course', source: 'University of Helsinki', url: 'https://www.elementsofai.com/' },
        { title: "Generative AI for Everyone", kind: 'Course', source: 'Coursera · DeepLearning.AI', url: 'https://www.coursera.org/learn/generative-ai-for-everyone' },
        { title: "Stanford AI Quests", kind: 'Interactive', source: 'Stanford Accelerator for Learning', url: 'https://acceleratelearning.stanford.edu/' },
        { title: "MIT OpenCourseWare — AI topics", kind: 'Course', source: 'MIT', url: 'https://ocw.mit.edu/' },
      ]},
      { type: 'h', text: "Prompting & practical skills" },
      { type: 'resources', items: [
        { title: "Prompt Engineering Guide", kind: 'Guide', source: 'promptingguide.ai', url: 'https://www.promptingguide.ai/' },
        { title: "UW-Madison AI Tools for Students", kind: 'Guide', source: 'UW-Madison IT Services', url: 'https://it.wisc.edu/' },
        { title: "EDUCAUSE AI Literacy Framework", kind: 'Framework', source: 'EDUCAUSE', url: 'https://www.educause.edu/' },
      ]},
      { type: 'h', text: "Good ongoing reading" },
      { type: 'resources', items: [
        { title: "One Useful Thing", kind: 'Newsletter', source: 'Prof. Ethan Mollick · Wharton', url: 'https://www.oneusefulthing.org/' },
        { title: "AI Snake Oil", kind: 'Blog', source: 'Princeton researchers', url: 'https://www.aisnakeoil.com/' },
      ]},
      { type: 'h', text: "For integrity questions" },
      { type: 'resources', items: [
        { title: "Your university's AI policy", kind: 'Policy', source: 'Check your syllabus first' },
        { title: "MLA Guidance on Citing AI", kind: 'Guide', source: 'Modern Language Association', url: 'https://style.mla.org/citing-generative-ai/' },
      ]},
      { type: 'callout', tone: 'info', title: "One more thing", text: "The best learning you'll do on AI won't come from a course. It'll come from trying things, getting burned once or twice, and adjusting. Start small. Stay skeptical.", iconName: 'sparkle' },
    ],
  },
}

export const STUDENT_CONTENT = applyContentDefaultProvenance(
  STUDENT_CONTENT_RAW,
  'hybrid',
  'Content grounded in research from MIT, Harvard, Stanford, Cornell, UW-Madison, EDUCAUSE, and Wiley (May 2026).'
)

export const STUDENT_SECTIONS: SectionMeta[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'tools',     label: 'Recommended AI Tools' },
  { id: 'how',       label: 'Using AI Effectively' },
  { id: 'downsides', label: 'Downsides & Pitfalls' },
  { id: 'ethics',    label: 'Ethics & Integrity' },
  { id: 'examples',  label: 'Real-World Examples' },
  { id: 'resources', label: 'Further Resources' },
]

/* ---- Teacher ---- */
const TEACHER_CONTENT_RAW: PersonaContent = {
  overview: {
    question: "What's this page for? I don't have time to read another 20-page guide.",
    intro: "Totally fair. Here's the two-minute version.",
    blocks: [
      { type: 'p', text: "This space is built for educators — K-12 teachers, college instructors, TAs, anyone who stands in front of a classroom and is wondering what to do now that every student has a writing-capable AI in their pocket." },
      { type: 'p', text: "You'll find practical tools that save you prep time, strategies that actually work for assessment in an AI-saturated world, the real downsides you should know about, and sample classroom policies grounded in what peer institutions have implemented." },
      { type: 'callout', tone: 'info', title: "The readiness gap", text: "Only 42% of students feel their faculty are well-equipped to guide responsible AI use (Ellucian Survey, 2025). And only 39% of institutions have a formal AI policy — up from 23% in 2024 (EDUCAUSE). You're ahead just by thinking about this.", iconName: 'sparkle' },
      { type: 'h', text: "The sections ahead" },
      { type: 'list', items: [
        { bold: "Tools that save you hours", text: "the actual useful ones, ranked by what they save" },
        { bold: "How to use AI effectively", text: "lesson planning, feedback, AI-resistant assignments" },
        { bold: "Downsides & pitfalls", text: "what to watch for in yourself and your students" },
        { bold: "Classroom policy", text: "setting expectations that actually hold up" },
        { bold: "Real examples", text: "named case studies from peer institutions" },
      ]},
    ],
  },
  tools: {
    question: "Which AI tools are actually worth adopting as a teacher?",
    intro: "Ranked roughly by how much time they save vs. how much setup they need. Grounded in reviews from NC State, UW-Madison, and MIT Sloan EdTech (2024-2025).",
    blocks: [
      { type: 'h', text: "For planning & prep" },
      { type: 'tools', items: [
        { name: 'Microsoft Copilot', letter: 'Co', color: '#0078D4', desc: 'Free via institutional NetID at most universities. Drafts lesson plans in Word, builds rubrics, summarizes student feedback, creates PowerPoints, and analyzes grade data in Excel. Data-protected — your content doesn\'t train Microsoft\'s models.', bestFor: 'Free via institution' },
        { name: 'Claude', letter: 'Cl', color: '#D97757', desc: 'Best-in-class for long documents. Upload a textbook chapter and get three lesson plans in different styles, or a reading comprehension guide differentiated by level.', bestFor: 'Lesson planning' },
        { name: 'ChatGPT', letter: 'C', color: '#10A37F', desc: 'Workhorse for rubrics, discussion questions, differentiated worksheets, and parent emails. Start here if you only pick one — broad capability with a large community of educator examples.', bestFor: 'Materials & rubrics' },
      ]},
      { type: 'h', text: "For research & staying current" },
      { type: 'tools', items: [
        { name: 'Perplexity AI', letter: 'P', color: '#20808D', desc: 'Find current, cited research on pedagogical topics. Useful for verifying student-submitted sources and staying current on your field without a full literature review.', bestFor: 'Cited research' },
        { name: 'MIT Sloan Deep Research', letter: 'DR', color: '#A31F34', desc: 'Generates research-backed readings and case studies at scale. Tested by MIT Sloan faculty for creating course materials grounded in real academic literature. (MIT Sloan EdTech, March 2025)', bestFor: 'Course materials' },
      ]},
      { type: 'h', text: "For students in your class" },
      { type: 'tools', items: [
        { name: 'Khanmigo', letter: 'K', color: '#1865F2', desc: "Khan Academy's tutor — designed to guide students toward the answer through questions rather than giving it directly. Teaches the habit of reasoning, not answer-retrieval.", bestFor: 'Socratic tutoring' },
        { name: 'NotebookLM', letter: 'N', color: '#1A73E8', desc: 'Students upload your course materials and chat with them. Answers are grounded in the documents you provided — which limits hallucination and keeps responses on-topic for your class.', bestFor: 'Supervised study' },
        { name: 'Diffit', letter: 'D', color: '#FF6B6B', desc: 'Takes any article and instantly makes leveled versions for different reading abilities. Fast, practical differentiation without custom rewriting.', bestFor: 'Differentiation' },
      ]},
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "AI Tools for Educators", kind: 'Guide', source: 'UW-Madison IT Services', url: 'https://it.wisc.edu/' },
        { title: "Deep Research for Teaching", kind: 'Article', source: 'MIT Sloan EdTech, March 2025', url: 'https://mitsloan.mit.edu/ideas-made-to-matter/teaching-learning' },
        { title: "Comparing AI Writing Assistants", kind: 'Report', source: 'Ann Michaelsen, 2024', url: 'https://annmichaelsen.com/' },
      ]},
    ],
  },
  how: {
    question: "How do I use AI effectively without letting it take over my teaching?",
    intro: "The teachers who get the most out of AI use it to remove drudgery, not to replace judgment. Research from Stanford, CSUSB, and eSchoolNews points to a key distinction: AI-resistant vs. AI-augmented assignment design.",
    blocks: [
      { type: 'h', text: "1. Let it do the boring 80%" },
      { type: 'p', text: "AI is genuinely good at producing passable first drafts of rubrics, quiz questions, discussion prompts, and parent emails. Your job is the 20% that makes it actually yours — tightening language, adding local context, reading the room." },
      { type: 'promptPair', weak: "Write me a lesson plan on photosynthesis.", strong: "I have a mixed-ability 8th grade class of 24 students, 45 minutes, labs available. Draft a lesson on photosynthesis that opens with a common misconception students have and builds toward a hands-on activity. Then ask me 3 questions about my context before you finalize." },
      { type: 'h', text: "2. Design AI-resistant assessments" },
      { type: 'p', text: "If AI can easily complete the assignment, the assignment was probably testing the wrong thing. Authentic assessment design significantly reduces both the ability and the motivation to cheat (eSchoolNews / APA, 2025)." },
      { type: 'list', items: [
        { bold: "In-class writing", text: "timed, handwritten, or typed in a controlled environment" },
        { bold: "Personal reflection essays", text: "require specific reference to your own experiences, class discussions, or local context" },
        { bold: "Process-based grading", text: "submit brainstorm → outline → draft → revision notes alongside the final piece" },
        { bold: "Oral defenses", text: "students explain and extend their written work in real time" },
      ]},
      { type: 'h', text: "3. Design AI-augmented assessments" },
      { type: 'p', text: "Instead of banning AI, build the critical evaluation of AI outputs into the assignment itself. Stanford's AIMES framework and CSUSB research show these designs actually build stronger disciplinary thinking." },
      { type: 'list', items: [
        { bold: "Critique the AI draft", text: "students receive an AI-generated response to their prompt and must identify errors, missing nuance, and unsubstantiated claims" },
        { bold: "Compare 5 AI responses", text: "run the same prompt through multiple tools; students write a memo explaining which output they'd use and why" },
        { bold: "AI as first reader", text: "students submit to AI for initial feedback, then write a response memo accepting or rejecting each suggestion with reasoning" },
        { bold: "Generate counterarguments", text: "students use AI to steelman the opposing position, then argue against it" },
      ]},
      { type: 'h', text: "4. Use AI as a pedagogical sparring partner" },
      { type: 'p', text: "\"Here's my assignment. Predict three ways students might misunderstand it.\" Or: \"Act as a struggling student — what questions would you ask me?\" Surprisingly effective at surfacing blind spots in your own instruction." },
      { type: 'callout', tone: 'success', title: "The bar to clear", text: "Use AI anywhere it saves time without reducing what students actually learn. Don't use it anywhere it reduces what students learn — no matter how much time it saves.", iconName: 'check' },
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "ChatGPT-Resistant Assignments", kind: 'PDF Guide', source: 'CSUSB Faculty Development Center', url: 'https://www.csusb.edu/' },
        { title: "AIMES: AI in Meaningful Education Settings", kind: 'Framework', source: 'Stanford Center for Teaching & Learning', url: 'https://ctl.stanford.edu/' },
        { title: "Authentic Assessment and AI Integrity", kind: 'Article', source: 'eSchoolNews / APA, 2025', url: 'https://www.eschoolnews.com/' },
        { title: "Teaching with AI: Assignment Design", kind: 'Guide', source: 'Ohio University, 2024', url: 'https://www.ohio.edu/' },
      ]},
    ],
  },
  downsides: {
    question: "What should I be genuinely worried about?",
    intro: "Four things, in rough order of how often they trip people up:",
    blocks: [
      { type: 'h', text: "Student skill erosion — especially in writing" },
      { type: 'p', text: "If students offload the \"stuck in front of a blank page\" experience, they don't develop the cognitive muscles writing is supposed to build. This is the hardest thing to detect and the most costly long-term." },
      { type: 'h', text: "Your own over-reliance" },
      { type: 'p', text: "It is very easy to let AI write your feedback comments. Students notice. Generic, upbeat, lightly-specific comments in an AI voice feel hollow, and they erode the relationship trust you've built." },
      { type: 'h', text: "Equity gaps widen invisibly" },
      { type: 'p', text: "Students with paid ChatGPT subscriptions and tech-savvy parents pull further ahead. Students whose schools ban AI outright fall further behind the kids who'll enter a workforce that uses it daily. Both extremes hurt — middle path is hard." },
      { type: 'story', who: 'High school English teacher, 2024', text: "\"I was grading essays faster using AI-generated comments. Then a student cried in my office because she could tell the feedback wasn't really mine. I haven't used it for personalized comments since.\"" },
      { type: 'h', text: "Policy whiplash" },
      { type: 'p', text: "Only 39% of institutions have a formal AI policy (EDUCAUSE, 2024 — up from 23% the year before). Expect rules to keep changing. Build flexibility into your syllabus language now so a midyear policy update doesn't invalidate your entire course design." },
      { type: 'callout', tone: 'danger', title: "The thing nobody talks about", text: "AI-generated teaching materials tend to be plausibly-good but subtly bland. If every teacher uses the same tool for lesson planning, every lesson starts to sound the same. Your voice and your weirdness are not drawbacks — they're the reason students remember your class.", iconName: 'warn' },
    ],
  },
  policy: {
    question: "Help me write a classroom AI policy I won't regret.",
    intro: "Stanford's Center for Teaching & Learning developed a three-tier syllabus framework now adopted by dozens of universities. Here's how it works, with exact sample language you can use.",
    blocks: [
      { type: 'h', text: "Tier 1 — AI Prohibited" },
      { type: 'callout', tone: 'danger', title: "Sample syllabus language", text: "\"This assignment must reflect your own independent work. The use of generative AI tools (ChatGPT, Claude, Copilot, Gemini, or similar) is not permitted. Submissions will be evaluated on the quality of your own analysis and expression. Using AI-generated content in this assignment constitutes an academic integrity violation.\"", iconName: 'book' },
      { type: 'h', text: "Tier 2 — AI Permitted with Attribution" },
      { type: 'callout', tone: 'info', title: "Sample syllabus language", text: "\"You may use generative AI tools to assist with brainstorming, outlining, grammar checking, and source discovery. You may not use AI to write paragraphs or sections that you submit as your own. Attach a brief disclosure appendix (1-2 paragraphs) describing: which tools you used, for what specific tasks, and how your final submission differs from any AI output you received.\"", iconName: 'book' },
      { type: 'h', text: "Tier 3 — AI Encouraged" },
      { type: 'callout', tone: 'success', title: "Sample syllabus language", text: "\"For this assignment, you are encouraged to use AI tools as a thinking partner. Your work will be evaluated on how critically you engaged with AI outputs — what you accepted, what you pushed back on, and what original thinking you brought that the AI couldn't. Include a brief reflection on your AI use as part of your submission.\"", iconName: 'check' },
      { type: 'h', text: "A critical warning: do not rely on AI detectors" },
      { type: 'callout', tone: 'danger', title: "UW-Madison, Cornell, and EDUCAUSE all advise against AI detection tools", text: "Detection tools produce significant false positives. They are statistically biased against non-native English speakers, students with certain writing styles, and students who write in a clear, direct style that happens to resemble AI output. Using a detector as enforcement creates more injustice than it prevents. Design assessments that reduce cheating motivation instead.", iconName: 'warn' },
      { type: 'h', text: "What to avoid in any tier" },
      { type: 'list', items: [
        { bold: "Vague policies", text: "\"Use AI responsibly\" means nothing enforceable. Students need specifics per assignment." },
        { bold: "Blanket bans", text: "Unenforceable, creates an adversarial dynamic, and doesn't prepare students for a workforce that uses AI daily." },
        { bold: "Detector-only enforcement", text: "A false positive can cost a student their academic record and cost you their trust — permanently." },
      ]},
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "Syllabus Language Template for AI", kind: 'Template', source: 'Stanford Center for Teaching & Learning', url: 'https://ctl.stanford.edu/' },
        { title: "AI Policy Guidance for Instructors", kind: 'Policy', source: 'UW-Madison Office of the Provost', url: 'https://provost.wisc.edu/' },
        { title: "EDUCAUSE 2024 AI Action Plan", kind: 'Report', source: 'EDUCAUSE', url: 'https://www.educause.edu/' },
        { title: "Generative AI and Academic Integrity", kind: 'Guide', source: 'Cornell Center for Teaching Innovation', url: 'https://teaching.cornell.edu/generative-artificial-intelligence' },
        { title: "New Directions in Academic Integrity", kind: 'Report', source: 'Wiley, 2025', url: 'https://www.wiley.com/' },
      ]},
    ],
  },
  examples: {
    question: "What have other teachers actually tried that worked?",
    intro: "Four named real cases from peer institutions — documented in published sources, not composites.",
    blocks: [
      { type: 'story', who: 'Prof. Pamela Orel · University of Maryland, Dec 2025', text: "Rebuilt her course around iterative process documentation: every assignment required a brainstorm submission, then an outline, then peer feedback notes, then revision notes alongside the final piece. The scaffolding made AI ghostwriting both technically difficult and logistically pointless. \"Students found it freeing — there was no single high-stakes submission where cheating paid off.\" (UMD School of Behavioral Sciences Blog, Dec 2025)" },
      { type: 'story', who: 'Prof. Jared Curhan · MIT Sloan, Dec 2023', text: "Built an AI-powered negotiation training tool that allowed students to practice against a realistic AI counterpart before live role-plays with classmates. Students arrived at peer negotiations with sharper strategies and more confidence. \"The AI opponent didn't replace the human negotiation — it made the human negotiation matter more.\" (MIT Sloan EdTech, Dec 2023)" },
      { type: 'story', who: 'Sarah Craycraft & Lauren Kaminsky · Harvard Bok Center, 2024-2025', text: "Implemented oral follow-up assessments at scale: after major written assignments, students were called to a 10-minute conversation where they explained their argument, extended it to a new case, and answered a challenge. Students who'd done the intellectual work thrived. Students who'd outsourced it couldn't recover in real time. Published implementation guides are available through the Bok Center. (Harvard Bok Center Teaching + AI, 2024-2025)" },
      { type: 'story', who: 'Data Science course · Stanford AIMES, 2025', text: "Replaced peer review with structured AI review: students submitted drafts to an AI tool, then wrote a response memo to the AI feedback — explicitly noting which suggestions they accepted with reasoning, and which they rejected with reasoning. Faculty reported the memos revealed deeper disciplinary thinking than the drafts themselves. (Stanford CTL AIMES, 2025)" },
      { type: 'callout', tone: 'success', title: "The common thread", text: "None of them banned AI. None of them ignored it. All of them redesigned one specific thing in their practice to make AI irrelevant to the part of learning that mattered — and more useful for everything else.", iconName: 'check' },
      { type: 'h', text: "Sources" },
      { type: 'resources', items: [
        { title: "Rebuilding Courses for the AI Age", kind: 'Article', source: 'UMD School of Behavioral Sciences Blog, Dec 2025', url: 'https://bsos.umd.edu/' },
        { title: "AI Negotiation Training at MIT Sloan", kind: 'Article', source: 'MIT Sloan EdTech, Dec 2023', url: 'https://mitsloan.mit.edu/ideas-made-to-matter/teaching-learning' },
        { title: "Teaching + AI: Oral Assessment Guides", kind: 'Guide', source: 'Harvard Bok Center, 2024-2025', url: 'https://bokcenter.harvard.edu/' },
        { title: "AIMES: Structured AI Peer Review", kind: 'Framework', source: 'Stanford CTL, 2025', url: 'https://ctl.stanford.edu/' },
      ]},
    ],
  },
  resources: {
    question: "Where can I learn more without going down a rabbit hole?",
    intro: "Grounded in the same research institutions behind the content on this site. All free, all worth 30 minutes.",
    blocks: [
      { type: 'h', text: "Institutional frameworks (the ones other faculty are actually using)" },
      { type: 'resources', items: [
        { title: "AIMES: AI in Meaningful Education Settings", kind: 'Framework', source: 'Stanford CTL', url: 'https://ctl.stanford.edu/' },
        { title: "EDUCAUSE AI Literacy & Action Plan", kind: 'Report', source: 'EDUCAUSE', url: 'https://www.educause.edu/' },
        { title: "Teaching + AI Resource Hub", kind: 'Hub', source: 'Harvard Bok Center', url: 'https://bokcenter.harvard.edu/' },
        { title: "Generative AI for Instructors", kind: 'Guide', source: 'Cornell Center for Teaching Innovation', url: 'https://teaching.cornell.edu/generative-artificial-intelligence' },
      ]},
      { type: 'h', text: "Newsletters (short, opinionated, actually useful)" },
      { type: 'resources', items: [
        { title: "One Useful Thing", kind: 'Newsletter', source: 'Prof. Ethan Mollick · Wharton', url: 'https://www.oneusefulthing.org/' },
        { title: "MIT Sloan EdTech Teaching Articles", kind: 'Articles', source: 'MIT Sloan', url: 'https://mitsloan.mit.edu/ideas-made-to-matter/teaching-learning' },
      ]},
      { type: 'h', text: "Policy & integrity" },
      { type: 'resources', items: [
        { title: "Stanford CTL Syllabus Language Template", kind: 'Template', source: 'Stanford CTL', url: 'https://ctl.stanford.edu/' },
        { title: "Academic Integrity in the Age of AI", kind: 'Report', source: 'Wiley, 2025', url: 'https://www.wiley.com/' },
        { title: "UNESCO AI Competency Framework for Teachers", kind: 'Framework', source: 'UNESCO', url: 'https://www.unesco.org/' },
      ]},
      { type: 'h', text: "For your students" },
      { type: 'resources', items: [
        { title: "Student guide on this site", kind: 'Page', source: 'Switch to the Student tab above' },
        { title: "Elements of AI (free course)", kind: 'Course', source: 'University of Helsinki', url: 'https://www.elementsofai.com/' },
        { title: "Stanford AI Quests", kind: 'Interactive', source: 'Stanford Accelerator for Learning', url: 'https://acceleratelearning.stanford.edu/' },
      ]},
      { type: 'callout', tone: 'info', title: "Small homework for you", text: "Pick one tool this week. Use it for one specific task — a rubric, a parent email, a set of differentiated worksheets. Notice what it saved and what felt hollow. That single experiment will teach you more than any guide.", iconName: 'sparkle' },
    ],
  },
}

export const TEACHER_CONTENT = applyContentDefaultProvenance(
  TEACHER_CONTENT_RAW,
  'hybrid',
  'Content grounded in research from MIT, Harvard, Stanford, Cornell, UW-Madison, EDUCAUSE, and Wiley (May 2026).'
)

export const TEACHER_SECTIONS: SectionMeta[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'tools',     label: 'Recommended AI Tools' },
  { id: 'how',       label: 'Using AI Effectively' },
  { id: 'downsides', label: 'Downsides & Pitfalls' },
  { id: 'policy',    label: 'Classroom Policy' },
  { id: 'examples',  label: 'Real-World Examples' },
  { id: 'resources', label: 'Further Resources' },
]
