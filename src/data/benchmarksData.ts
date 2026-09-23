// Verified 135-model leaderboards for OSWorld, WebArena, SWE-bench, and Cyber-Eval (September 2026)
export interface LeaderboardEntry {
  rank: number;
  modelName: string;
  developer: string;
  score: number;
  date: string;
  verifiedByNextVector: boolean;
  costPerRun?: string;
}

export const OSWORLD_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 68.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 2,
    "modelName": "Grok 4.7",
    "developer": "xAI",
    "score": 58.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 3,
    "modelName": "Claude Opus 5.5",
    "developer": "Anthropic",
    "score": 57.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$4.00"
  },
  {
    "rank": 4,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 57.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 5,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 57.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 6,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 57.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 7,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 57.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 8,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 56.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 9,
    "modelName": "Gemini 3 Deep Think",
    "developer": "Google DeepMind",
    "score": 56.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 10,
    "modelName": "Claude Mythos 5.1",
    "developer": "Anthropic",
    "score": 55.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.05"
  },
  {
    "rank": 11,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 55.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 12,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 55.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 13,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 54.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 14,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 54.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 15,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 54.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 16,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 54.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 17,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 53.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 18,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 53.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 19,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 20,
    "modelName": "DeepSeek-V4.1-Flash",
    "developer": "DeepSeek",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 21,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 53.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.08"
  },
  {
    "rank": 22,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 52.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 23,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 24,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 25,
    "modelName": "Mistral Large 3",
    "developer": "Mistral AI",
    "score": 52.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 26,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 52.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 27,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 50.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 28,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 29,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 49.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 30,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 31,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 48.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 32,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 33,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 48.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 34,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 35,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 48.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 36,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 47.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 37,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 47.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 38,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 39,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 47.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 40,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 46.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 41,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 42,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 45.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 43,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 45.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 44,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 45.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 45,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 45.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 46,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 47,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 44.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 48,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 44.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 49,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 50,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 43.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 51,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 52,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 43.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 53,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 42.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 54,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 41.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 55,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 56,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 57,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 40.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 58,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 40.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 59,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 39.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 60,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 39.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 61,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 62,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 39.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 63,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 39.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 64,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 38.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 65,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 66,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 38.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 67,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 68,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 37.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 69,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 37.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 70,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 71,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 36.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 72,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 73,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 74,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 35.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 75,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 35.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 76,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 77,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 34.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 34.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 79,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 34.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 80,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 34.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 81,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 82,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 33.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 83,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 33.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 84,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 32.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 85,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 86,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 31.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 87,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 31.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 88,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 89,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 30.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 90,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 30.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 91,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 30.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 92,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 29.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 93,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 29.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 94,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 29.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 95,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 28.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 96,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 28.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 97,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 28.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 98,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 27.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 99,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 27.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 100,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 27.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 101,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 26.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 102,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 26.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 103,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 26.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 104,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 26.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 105,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 25.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 106,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 25.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 107,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 25.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 108,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 25.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 109,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 25.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 110,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 25.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 111,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 24.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 112,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 24.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 113,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 23.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 114,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 23.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 115,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 23.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 116,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 23.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 117,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 22.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 118,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 22.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 119,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 22.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 120,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 21.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 121,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 21.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 122,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 20.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 123,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 20.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 124,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 20.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 125,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 20.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 126,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 20.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 127,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 19.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 128,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 19.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 129,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 19.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 130,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 19.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 131,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 18.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 132,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 18.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 133,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 17.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 134,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 17.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 135,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 17.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 136,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 16.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 137,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 16.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 138,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 15.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 139,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 15.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 140,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 15.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  }
];

export const WEBARENA_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 74.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 2,
    "modelName": "Gemini 3 Deep Think",
    "developer": "Google DeepMind",
    "score": 66.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 3,
    "modelName": "Claude Opus 5.5",
    "developer": "Anthropic",
    "score": 65.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$4.00"
  },
  {
    "rank": 4,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 65.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 5,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 6,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 7,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 65.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 8,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 65.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 9,
    "modelName": "Grok 4.7",
    "developer": "xAI",
    "score": 64.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 10,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 64.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 11,
    "modelName": "Mistral Large 3",
    "developer": "Mistral AI",
    "score": 63.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 12,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 63.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 13,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 63.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 14,
    "modelName": "Claude Mythos 5.1",
    "developer": "Anthropic",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.99"
  },
  {
    "rank": 15,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 63.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 16,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 62.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 17,
    "modelName": "DeepSeek-V4.1-Flash",
    "developer": "DeepSeek",
    "score": 62.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 18,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 62.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 19,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 61.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 20,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 60.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 21,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 60.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 22,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 59.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.08"
  },
  {
    "rank": 23,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 59.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 24,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 59.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 25,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 58.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 26,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 58.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 27,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 58.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 28,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 58.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 29,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 57.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 30,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 57.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 31,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 57.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 32,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 56.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 33,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 56.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 34,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 56.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 35,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 56.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 36,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 56.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 37,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 56.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 38,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 55.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 39,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 55.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 40,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 54.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 41,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 42,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 53.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 43,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 44,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 45,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 52.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 46,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 51.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 47,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 51.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 48,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 51.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 49,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 50.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 50,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 50.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 51,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 52,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 50.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 53,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 50.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 54,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 50.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 55,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 56,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 49.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 57,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 58,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 48.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 59,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 47.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 60,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 47.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 61,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 47.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 62,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 46.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 63,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 46.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 64,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 46.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 65,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 45.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 66,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 45.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 67,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 44.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 68,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 44.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 69,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 44.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 70,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 43.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 71,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 72,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 73,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 43.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 74,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 42.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 75,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 42.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 76,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 42.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 77,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 42.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 41.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 79,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 80,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 41.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 81,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 40.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 82,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 40.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 83,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 40.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 84,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 39.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 85,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 39.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 86,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 38.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 87,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 38.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 88,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 38.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 89,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 37.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 90,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 91,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 37.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 92,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 93,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 94,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 36.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 95,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 36.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 96,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 35.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 97,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 98,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 35.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 99,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 35.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 100,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 34.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 101,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 34.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 102,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 103,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 33.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 104,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 105,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 33.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 106,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 32.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 107,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 32.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 108,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 109,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 31.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 110,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 31.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 111,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 30.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 112,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 113,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 30.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 114,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 30.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 115,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 29.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 116,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 29.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 117,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 29.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 118,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 29.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 119,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 28.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 120,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 28.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 121,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 27.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 122,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 27.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 123,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 27.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 124,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 26.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 125,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 26.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 126,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 26.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 127,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 26.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 128,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 26.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 129,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 25.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 130,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 25.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 131,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 25.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 132,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 24.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 133,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 24.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 134,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 23.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 135,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 23.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 136,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 23.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 137,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 23.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 138,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 22.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 139,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 22.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 140,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 22.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  }
];

export const SWE_BENCH_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "Gemini 3 Deep Think",
    "developer": "Google DeepMind",
    "score": 92.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 2,
    "modelName": "Claude Sonnet 5.1 (Swarm Mode)",
    "developer": "Anthropic",
    "score": 89.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 3,
    "modelName": "Mistral Large 3",
    "developer": "Mistral AI",
    "score": 84.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 4,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 75.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 5,
    "modelName": "Claude Opus 5.5",
    "developer": "Anthropic",
    "score": 73.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$4.00"
  },
  {
    "rank": 6,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 73.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 7,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 73.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 8,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 73.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 9,
    "modelName": "Claude Mythos 5.1",
    "developer": "Anthropic",
    "score": 73.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.46"
  },
  {
    "rank": 10,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 72.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 11,
    "modelName": "DeepSeek-V4.1-Flash",
    "developer": "DeepSeek",
    "score": 72.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 12,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 72.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 13,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 72.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 14,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 71.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 15,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 71.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 16,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 69.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 17,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 69.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 18,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 68.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 19,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 68.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 20,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 68.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 21,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 68.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 22,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 67.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 23,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 67.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 24,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 67.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 25,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 67.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.08"
  },
  {
    "rank": 26,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 67.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 27,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 66.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 28,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 66.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 29,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 30,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 31,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 65.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 32,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 64.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 33,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 64.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 34,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 64.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 35,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 63.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 36,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 63.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 37,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 38,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 63.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 39,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 63.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 40,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 62.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 41,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 62.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 42,
    "modelName": "Grok 4.7",
    "developer": "xAI",
    "score": 62.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 43,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 61.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 44,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 61.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 45,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 60.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 46,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 60.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 47,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 59.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 48,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 59.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 49,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 58.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 50,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 58.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 51,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 57.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 52,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 57.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 53,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 57.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 54,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 56.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 55,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 56.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 56,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 56.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 57,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 55.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 58,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 55.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 59,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 55.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 60,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 55.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 61,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 55.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 62,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 54.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 63,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 54.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 64,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 54.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 65,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 66,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 53.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 67,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 68,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 69,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 52.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 70,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 52.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 71,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 51.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 72,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 73,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 49.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 74,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 49.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 75,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 76,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 49.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 77,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 49.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 48.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 79,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 48.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 80,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 81,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 48.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 82,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 47.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 83,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 84,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 47.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 85,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 47.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 86,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 46.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 87,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 88,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 45.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 89,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 44.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 90,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 91,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 44.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 92,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 43.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 93,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 43.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 94,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 43.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 95,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 96,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 97,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 42.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 98,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 41.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 99,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 100,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 101,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 41.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 102,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 40.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 103,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 40.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 104,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 105,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 106,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 38.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 107,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 38.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 108,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 109,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 37.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 110,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 37.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 111,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 37.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 112,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 37.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 113,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 36.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 114,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 36.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 115,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 116,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 35.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 117,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 118,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 35.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 119,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 120,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 35.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 121,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 34.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 122,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 34.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 123,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 34.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 124,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 34.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 125,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 126,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 127,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 32.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 128,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 32.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 129,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 130,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 31.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 131,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 31.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 132,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 31.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 133,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 30.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 134,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 30.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 135,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 30.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 136,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 29.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 137,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 28.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 138,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 27.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 139,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 27.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 140,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 26.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 141,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 26.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  }
];

export const CYBER_EVAL_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "Claude Mythos 5.1",
    "developer": "Anthropic",
    "score": 94.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$8.00"
  },
  {
    "rank": 2,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 79.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 3,
    "modelName": "Gemini 3 Deep Think",
    "developer": "Google DeepMind",
    "score": 78.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 4,
    "modelName": "Claude Opus 5.5",
    "developer": "Anthropic",
    "score": 76.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$4.00"
  },
  {
    "rank": 5,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 76.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 6,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 75.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 7,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 75.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 8,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 74.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 9,
    "modelName": "Grok 4.7",
    "developer": "xAI",
    "score": 74.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 10,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 74.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 11,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 73.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 12,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 73.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 13,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 72.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 14,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 72.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 15,
    "modelName": "DeepSeek-V4.1-Flash",
    "developer": "DeepSeek",
    "score": 72.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 16,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 71.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 17,
    "modelName": "Mistral Large 3",
    "developer": "Mistral AI",
    "score": 71.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 18,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 71.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 19,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 70.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 20,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 70.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 21,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 69.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.08"
  },
  {
    "rank": 22,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 69.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 23,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 69.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 24,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 68.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 25,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 68.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 26,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 68.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 27,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 67.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 28,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 67.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 29,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 67.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 30,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 67.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 31,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 66.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 32,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 66.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 33,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 65.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 34,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 35,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 36,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 64.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 37,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 64.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 38,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 64.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 39,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 63.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 40,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 41,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 62.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 42,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 62.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 43,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 61.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 44,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 61.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 45,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 60.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 46,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 60.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 47,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 60.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 48,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 59.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 49,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 59.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 50,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 58.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 51,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 58.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 52,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 58.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 53,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 57.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 54,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 57.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 55,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 57.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 56,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 56.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 57,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 56.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 58,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 55.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 59,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 55.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 60,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 54.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 61,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 54.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 62,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 54.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 63,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 53.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 64,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 53.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 65,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 53.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 66,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 52.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 67,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 52.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 68,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 51.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 69,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 50.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 70,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 71,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 50.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 72,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 73,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 49.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 74,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 49.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 75,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 76,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 48.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 77,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 79,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 47.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 80,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 81,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 46.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 82,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 46.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 83,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 84,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 45.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 85,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 45.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 86,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 45.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 87,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 44.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 88,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 89,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 43.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 90,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 91,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 92,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 93,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 42.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 94,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 42.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 95,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 42.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 96,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 42.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 97,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 41.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 98,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 99,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 40.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 100,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 40.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 101,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 102,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 39.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 103,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 104,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 38.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 105,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 38.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 106,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 38.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 107,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 37.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 108,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 109,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 36.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 110,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 36.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 111,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 35.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 112,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 113,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 35.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 114,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 115,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 35.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 116,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 34.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 117,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 118,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 119,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 33.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 120,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 32.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 121,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 31.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 122,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 31.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 123,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 31.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 124,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 31.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 125,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 126,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 30.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 127,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 30.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 128,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 29.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 129,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 29.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 130,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 29.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 131,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 28.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 132,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 28.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 133,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 27.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 134,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 27.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 135,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 27.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 136,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 26.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 137,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 25.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 138,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 25.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 139,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 25.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 140,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 25.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  }
];


export const PRICE_PERFORMANCE_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "Jev (System One)",
    "developer": "TypeSafe AI",
    "score": 99.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 2,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 99.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 3,
    "modelName": "DeepSeek-V4.1-Flash",
    "developer": "DeepSeek",
    "score": 99.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 4,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 99.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 5,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 98.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 6,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 97.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 7,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 97.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 8,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 96.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.08"
  },
  {
    "rank": 9,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 96.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 10,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 95.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 11,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 95.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 12,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 94.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 13,
    "modelName": "Mistral Large 3",
    "developer": "Mistral AI",
    "score": 94.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 14,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 94.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 15,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 93.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 16,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 92.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 17,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 92.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 18,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 91.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 19,
    "modelName": "Grok 4.7",
    "developer": "xAI",
    "score": 91.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 20,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 91.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 21,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 90.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 22,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 90.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 23,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 89.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 24,
    "modelName": "Gemini 3.8 Live Extended Thinking",
    "developer": "Google DeepMind",
    "score": 89.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.75 / 1M tok"
  },
  {
    "rank": 25,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 89.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 26,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 88.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.14"
  },
  {
    "rank": 27,
    "modelName": "Gemini 3.8 Live",
    "developer": "Google DeepMind",
    "score": 88.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.75 / 1M tok"
  },
  {
    "rank": 28,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 87.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 29,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 87.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 30,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 86.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.55"
  },
  {
    "rank": 31,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 86.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 32,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 85.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 33,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 85.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 34,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 84.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.10"
  },
  {
    "rank": 35,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 83.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 36,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 83.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 37,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 82.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 38,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 82.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 39,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 81.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 40,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 81.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 41,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 80.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 42,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 80.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 43,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 79.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 44,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 78.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 45,
    "modelName": "Claude Opus 5.5",
    "developer": "Anthropic",
    "score": 78.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$4.00 / 1M tok"
  },
  {
    "rank": 46,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 78.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 47,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 77.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 48,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 77.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 49,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 76.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 50,
    "modelName": "Gemini 3 Deep Think",
    "developer": "Google DeepMind",
    "score": 76.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00 / 1M tok"
  },
  {
    "rank": 51,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 76.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 52,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 75.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 53,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 74.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 54,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 74.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 55,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 73.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 56,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 73.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 57,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 72.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 58,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 72.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 59,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 71.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 60,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 71.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 61,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 70.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 62,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 69.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 63,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 69.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.40"
  },
  {
    "rank": 64,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 68.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 65,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 68.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 66,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 67.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 67,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 67.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 68,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 66.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 69,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 66.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.35"
  },
  {
    "rank": 70,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 71,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 64.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.05"
  },
  {
    "rank": 72,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 64.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 73,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 63.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 74,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 63.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 75,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 62.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 76,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 62.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 77,
    "modelName": "Claude Mythos 5.1",
    "developer": "Anthropic",
    "score": 61.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$24.00 / 1M tok"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 60.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 79,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 60.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 80,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 59.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 81,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 59.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 82,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 58.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 83,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 58.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 84,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 57.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 85,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 57.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 86,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 56.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 87,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 55.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 88,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 55.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 89,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 54.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 90,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 54.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 91,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 92,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 53.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 93,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 94,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 52.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 95,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 51.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 96,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 50.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 97,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 50.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 98,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 49.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 99,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 49.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 100,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 101,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 48.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 102,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 47.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 103,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 46.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 104,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 46.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 105,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 45.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 106,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 45.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 107,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 44.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 108,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 44.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 109,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 110,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 43.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 111,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 42.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 112,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 41.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 113,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 114,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 40.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 115,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 40.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 116,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 39.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 117,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 39.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 118,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 38.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 119,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 38.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.15"
  },
  {
    "rank": 120,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 37.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 121,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 36.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 122,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 123,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 124,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 35.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 125,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 34.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 126,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 34.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 127,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 33.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 128,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 32.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 129,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 32.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 130,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 131,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 31.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 132,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 30.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$5.00"
  },
  {
    "rank": 133,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 30.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 134,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 29.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 135,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 29.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 136,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 28.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 137,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 27.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 138,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 27.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 139,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 26.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 140,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 26.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.50"
  },
  {
    "rank": 141,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 25.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 142,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 25.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  },
  {
    "rank": 143,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 24.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$15.00"
  }
];
