export type ArticleCategory = 'ai' | 'technology' | 'science' | 'research';

export type ArticleType = 
  | 'breaking'
  | 'analysis'
  | 'deep-dive'
  | 'model-report'
  | 'benchmark-report'
  | 'research-explained'
  | 'discovery'
  | 'industry-watch';

export interface ThreeQuestions {
  whatHappened: string;
  whyItMatters: string;
  whatsNext: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  articleType: ArticleType;
  signalRating: number; // 1-100 score indicating technical/scientific significance over hype
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
    website?: string;
    github?: string;
    substack?: string;
    bio?: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  coverImage: string;
  coverImageAlt?: string;
  tags: string[];
  threeQuestions: ThreeQuestions;
  keyTakeaways: string[];
  content: string[]; // paragraph blocks / markdown
  technicalSpecs?: Record<string, string>;
  relatedModelId?: string;
  relatedBenchmarkId?: string;
  relatedPaperId?: string;
  audioDuration?: string; // e.g. "3m 40s"
  citations?: { title: string; url: string; source: string }[];
  isHero?: boolean;
  isFeatured?: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  developer: string;
  releaseDate: string;
  modelType: 'Reasoning' | 'Multimodal Foundation' | 'Code & Agent' | 'Open Weights' | 'Compact / Edge';
  modalities: string[];
  contextWindow: string; // e.g. "200k tokens", "1M tokens"
  parameters: string; // e.g. "671B (37B active MoE)", "Unknown"
  pricing: {
    inputPer1M: number;
    outputPer1M: number;
    cachedInputPer1M?: number;
  };
  openSourceStatus: 'Open Weights' | 'Fully Open Source (Apache 2.0)' | 'Proprietary API' | 'Research Weights';
  license: string;
  hardwareRequirements: string;
  benchmarks: {
    benchmarkName: string;
    score: number | string;
    unit?: string;
    vsPreviousGen: string;
  }[];
  keyImprovements: string[];
  knownLimitations: string[];
  realWorldApplications: string[];
  architectureNotes: string;
  link?: string;
  arenaRank?: number;
  arenaElo?: number;
}

export interface Benchmark {
  id: string;
  name: string;
  shortName?: string;
  category: 'Coding & Agents' | 'Reasoning & Logic' | 'General Knowledge' | 'Mathematics' | 'Safety & Alignment' | 'Overall Arena Elo' | 'Cost-Efficiency & Pareto';
  description: string;
  whatItMeasures: string;
  whyItMatters: string;
  potentialLimitations: string; // caveats, contamination risks, synthetic gap
  scoreUnit?: string;
  scoreMetricName?: string;
  leaderboard: {
    rank: number;
    modelName: string;
    developer: string;
    score: number;
    date: string;
    verifiedByNextVector: boolean;
    costPerRun?: string;
  }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  publishedDate: string;
  arxivId?: string;
  field: 'Artificial Intelligence' | 'Quantum Science' | 'Biotechnology' | 'Materials Science' | 'Physics & Space';
  stage: 'Paper' | 'Prototype' | 'Product / Scale';
  abstract: string;
  plainEnglishBreakdown: string;
  technicalDepth: string;
  commercialTimeline: string;
  paperUrl: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month: string;
  title: string;
  category: 'AI Breakthrough' | 'Semiconductors' | 'Computing Architecture' | 'Fundamental Science' | 'Space & Quantum';
  summary: string;
  impactScore: number; // 1-100
  keyShift: string;
  articleSlug?: string;
}

export interface DailyBriefingItem {
  id: string;
  headline: string;
  category: ArticleCategory;
  urgency: 'Critical Signal' | 'High Impact' | 'Notable Shift';
  summary: string;
  whyItMatters: string;
  articleSlug?: string;
}
