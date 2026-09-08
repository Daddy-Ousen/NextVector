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
    "costPerRun": "$1.87"
  },
  {
    "rank": 2,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 57.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.11"
  },
  {
    "rank": 3,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 57.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.11"
  },
  {
    "rank": 4,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 57.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 5,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 57.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 6,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 56.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 7,
    "modelName": "Claude Mythos Preview",
    "developer": "Anthropic",
    "score": 55.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.05"
  },
  {
    "rank": 8,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 55.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.05"
  },
  {
    "rank": 9,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 55.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.05"
  },
  {
    "rank": 10,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 54.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.04"
  },
  {
    "rank": 11,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 54.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.03"
  },
  {
    "rank": 12,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 54.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.02"
  },
  {
    "rank": 13,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 54.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 14,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 53.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 15,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 53.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 16,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 17,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 53.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 18,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 52.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.97"
  },
  {
    "rank": 19,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.97"
  },
  {
    "rank": 20,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.97"
  },
  {
    "rank": 21,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 52.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.95"
  },
  {
    "rank": 22,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 50.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.90"
  },
  {
    "rank": 23,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.89"
  },
  {
    "rank": 24,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 49.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.88"
  },
  {
    "rank": 25,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.87"
  },
  {
    "rank": 26,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 48.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.86"
  },
  {
    "rank": 27,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.85"
  },
  {
    "rank": 28,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 48.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.85"
  },
  {
    "rank": 29,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.84"
  },
  {
    "rank": 30,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 48.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.84"
  },
  {
    "rank": 31,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 47.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.83"
  },
  {
    "rank": 32,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 47.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.82"
  },
  {
    "rank": 33,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.81"
  },
  {
    "rank": 34,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 47.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.80"
  },
  {
    "rank": 35,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 46.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.79"
  },
  {
    "rank": 36,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.77"
  },
  {
    "rank": 37,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 45.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.76"
  },
  {
    "rank": 38,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 45.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.75"
  },
  {
    "rank": 39,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 45.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.74"
  },
  {
    "rank": 40,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 45.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 41,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 42,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 44.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 43,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 44.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 44,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 45,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 43.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 46,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 47,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 43.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 48,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 42.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 49,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 41.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 50,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 51,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 52,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 40.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 53,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 40.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 54,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 39.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 55,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 39.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 56,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 57,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 39.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 58,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 39.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 59,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 38.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 60,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 61,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 38.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 62,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 63,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 37.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 64,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 37.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 65,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 66,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 36.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 67,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 68,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 69,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 35.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 70,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 35.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 71,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 72,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 34.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 73,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 34.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 74,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 34.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 75,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 34.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 76,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 77,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 33.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 78,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 33.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 79,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 32.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 80,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 81,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 31.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 82,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 31.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 83,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 84,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 30.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 85,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 30.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 86,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 30.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 87,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 29.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 88,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 29.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 89,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 29.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 90,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 28.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 91,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 28.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 92,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 28.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 93,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 27.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 94,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 27.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 95,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 27.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 96,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 26.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 97,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 26.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 98,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 26.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 99,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 26.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 100,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 25.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 101,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 25.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 102,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 25.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 103,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 25.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 104,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 25.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 105,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 25.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 106,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 24.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 107,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 24.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 108,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 23.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 109,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 23.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 110,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 23.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 111,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 23.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 112,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 22.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 113,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 22.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 114,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 22.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 115,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 21.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 116,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 21.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 117,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 20.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 118,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 20.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 119,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 20.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 120,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 20.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 121,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 20.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 122,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 19.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 123,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 19.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 124,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 19.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 125,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 19.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.22"
  },
  {
    "rank": 126,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 18.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.21"
  },
  {
    "rank": 127,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 18.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.21"
  },
  {
    "rank": 128,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 17.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.21"
  },
  {
    "rank": 129,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 17.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.21"
  },
  {
    "rank": 130,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 17.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.21"
  },
  {
    "rank": 131,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 16.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 132,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 16.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 133,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 15.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 134,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 15.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
  },
  {
    "rank": 135,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 15.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.20"
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
    "costPerRun": "$1.54"
  },
  {
    "rank": 2,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 65.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.02"
  },
  {
    "rank": 3,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 4,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 5,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 65.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 6,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 65.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 7,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 64.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.03"
  },
  {
    "rank": 8,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 63.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 9,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 63.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 10,
    "modelName": "Claude Mythos Preview",
    "developer": "Anthropic",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.99"
  },
  {
    "rank": 11,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 63.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.99"
  },
  {
    "rank": 12,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 62.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.97"
  },
  {
    "rank": 13,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 62.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.96"
  },
  {
    "rank": 14,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 61.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.93"
  },
  {
    "rank": 15,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 60.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.91"
  },
  {
    "rank": 16,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 60.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.90"
  },
  {
    "rank": 17,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 59.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.89"
  },
  {
    "rank": 18,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 59.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.86"
  },
  {
    "rank": 19,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 59.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.86"
  },
  {
    "rank": 20,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 58.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.85"
  },
  {
    "rank": 21,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 58.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.84"
  },
  {
    "rank": 22,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 58.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.84"
  },
  {
    "rank": 23,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 58.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.83"
  },
  {
    "rank": 24,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 57.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.82"
  },
  {
    "rank": 25,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 57.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.82"
  },
  {
    "rank": 26,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 57.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.81"
  },
  {
    "rank": 27,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 56.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.79"
  },
  {
    "rank": 28,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 56.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.79"
  },
  {
    "rank": 29,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 56.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.78"
  },
  {
    "rank": 30,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 56.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.78"
  },
  {
    "rank": 31,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 56.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.77"
  },
  {
    "rank": 32,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 56.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.77"
  },
  {
    "rank": 33,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 55.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.76"
  },
  {
    "rank": 34,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 55.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.74"
  },
  {
    "rank": 35,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 54.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.72"
  },
  {
    "rank": 36,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.70"
  },
  {
    "rank": 37,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 53.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.69"
  },
  {
    "rank": 38,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.67"
  },
  {
    "rank": 39,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.67"
  },
  {
    "rank": 40,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 52.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.66"
  },
  {
    "rank": 41,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 51.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.65"
  },
  {
    "rank": 42,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 51.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.64"
  },
  {
    "rank": 43,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 51.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.63"
  },
  {
    "rank": 44,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 50.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.61"
  },
  {
    "rank": 45,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 50.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.61"
  },
  {
    "rank": 46,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 47,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 50.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 48,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 50.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 49,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 50.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.60"
  },
  {
    "rank": 50,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.59"
  },
  {
    "rank": 51,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 49.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.56"
  },
  {
    "rank": 52,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.54"
  },
  {
    "rank": 53,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 48.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.53"
  },
  {
    "rank": 54,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 47.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.51"
  },
  {
    "rank": 55,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 47.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 56,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 47.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.50"
  },
  {
    "rank": 57,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 46.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.49"
  },
  {
    "rank": 58,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 46.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.48"
  },
  {
    "rank": 59,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 46.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.47"
  },
  {
    "rank": 60,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 45.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.46"
  },
  {
    "rank": 61,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 45.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.45"
  },
  {
    "rank": 62,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 44.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 63,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 44.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 64,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 44.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 65,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 43.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 66,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 67,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 68,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 43.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 69,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 42.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 70,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 42.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 71,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 42.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 72,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 42.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 73,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 41.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 74,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 75,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 41.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 76,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 40.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 77,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 40.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 78,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 40.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 79,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 39.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 80,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 39.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 81,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 38.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 82,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 38.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 83,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 38.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 84,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 37.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 85,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 86,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 37.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 87,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 88,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 89,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 36.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 90,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 36.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 91,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 35.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 92,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 93,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 35.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 94,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 35.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 95,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 34.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 96,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 34.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 97,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 98,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 33.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 99,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 100,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 33.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 101,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 32.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 102,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 32.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 103,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 104,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 31.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 105,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 31.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 106,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 30.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 107,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 108,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 30.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 109,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 30.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 110,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 29.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 111,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 29.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 112,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 29.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 113,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 29.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 114,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 28.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 115,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 28.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 116,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 27.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 117,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 27.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 118,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 27.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 119,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 26.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 120,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 26.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 121,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 26.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 122,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 26.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 123,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 26.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 124,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 25.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 125,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 25.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 126,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 25.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 127,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 24.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 128,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 24.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 129,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 23.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 130,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 23.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 131,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 23.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  },
  {
    "rank": 132,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 23.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 133,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 22.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 134,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 22.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  },
  {
    "rank": 135,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 22.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.23"
  }
];

export const SWE_BENCH_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 75.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.63"
  },
  {
    "rank": 2,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 73.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.48"
  },
  {
    "rank": 3,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 73.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.47"
  },
  {
    "rank": 4,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 73.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.47"
  },
  {
    "rank": 5,
    "modelName": "Claude Mythos Preview",
    "developer": "Anthropic",
    "score": 73.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.46"
  },
  {
    "rank": 6,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 72.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.45"
  },
  {
    "rank": 7,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 72.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.44"
  },
  {
    "rank": 8,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 72.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.40"
  },
  {
    "rank": 9,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 71.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.38"
  },
  {
    "rank": 10,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 71.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.37"
  },
  {
    "rank": 11,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 70.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.30"
  },
  {
    "rank": 12,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 69.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.27"
  },
  {
    "rank": 13,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 69.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.22"
  },
  {
    "rank": 14,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 68.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.21"
  },
  {
    "rank": 15,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 68.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.18"
  },
  {
    "rank": 16,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 68.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.17"
  },
  {
    "rank": 17,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 67.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.15"
  },
  {
    "rank": 18,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 67.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.14"
  },
  {
    "rank": 19,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 67.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.13"
  },
  {
    "rank": 20,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 67.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.12"
  },
  {
    "rank": 21,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 67.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.11"
  },
  {
    "rank": 22,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 66.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.07"
  },
  {
    "rank": 23,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 66.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.06"
  },
  {
    "rank": 24,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 25,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.00"
  },
  {
    "rank": 26,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 65.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.99"
  },
  {
    "rank": 27,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 64.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.48"
  },
  {
    "rank": 28,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 64.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.47"
  },
  {
    "rank": 29,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 64.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.47"
  },
  {
    "rank": 30,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 63.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.44"
  },
  {
    "rank": 31,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 63.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.44"
  },
  {
    "rank": 32,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.44"
  },
  {
    "rank": 33,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 63.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.43"
  },
  {
    "rank": 34,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 63.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.43"
  },
  {
    "rank": 35,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 62.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.41"
  },
  {
    "rank": 36,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 62.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.41"
  },
  {
    "rank": 37,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 61.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.38"
  },
  {
    "rank": 38,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 61.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.37"
  },
  {
    "rank": 39,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 60.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.34"
  },
  {
    "rank": 40,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 60.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.33"
  },
  {
    "rank": 41,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 59.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.32"
  },
  {
    "rank": 42,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 59.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.32"
  },
  {
    "rank": 43,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 58.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.29"
  },
  {
    "rank": 44,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 58.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.27"
  },
  {
    "rank": 45,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 57.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.26"
  },
  {
    "rank": 46,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 57.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 47,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 57.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.24"
  },
  {
    "rank": 48,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 56.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.23"
  },
  {
    "rank": 49,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 56.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.22"
  },
  {
    "rank": 50,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 56.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.22"
  },
  {
    "rank": 51,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 55.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 52,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 55.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.20"
  },
  {
    "rank": 53,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 55.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.19"
  },
  {
    "rank": 54,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 55.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.19"
  },
  {
    "rank": 55,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 55.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.18"
  },
  {
    "rank": 56,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 54.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.17"
  },
  {
    "rank": 57,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 54.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.17"
  },
  {
    "rank": 58,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 54.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.15"
  },
  {
    "rank": 59,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 53.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.14"
  },
  {
    "rank": 60,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 53.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.13"
  },
  {
    "rank": 61,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 52.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.11"
  },
  {
    "rank": 62,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 52.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 63,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 52.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.10"
  },
  {
    "rank": 64,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 52.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.09"
  },
  {
    "rank": 65,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 51.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.07"
  },
  {
    "rank": 66,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.05"
  },
  {
    "rank": 67,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 49.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.03"
  },
  {
    "rank": 68,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 49.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.02"
  },
  {
    "rank": 69,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 70,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 49.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.01"
  },
  {
    "rank": 71,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 49.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 72,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 48.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.00"
  },
  {
    "rank": 73,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 48.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.99"
  },
  {
    "rank": 74,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.99"
  },
  {
    "rank": 75,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 48.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.98"
  },
  {
    "rank": 76,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 47.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.96"
  },
  {
    "rank": 77,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.95"
  },
  {
    "rank": 78,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 47.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.95"
  },
  {
    "rank": 79,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 47.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.94"
  },
  {
    "rank": 80,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 46.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.91"
  },
  {
    "rank": 81,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.91"
  },
  {
    "rank": 82,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 45.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.90"
  },
  {
    "rank": 83,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 44.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 84,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 85,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 44.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 86,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 43.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 87,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 43.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 88,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 43.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 89,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 90,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 91,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 42.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 92,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 41.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 93,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 41.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 94,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 95,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 41.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 96,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 40.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 97,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 40.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 98,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 99,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 100,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 38.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 101,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 38.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 102,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 37.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 103,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 37.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 104,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 37.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 105,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 37.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 106,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 37.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 107,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 36.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 108,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 36.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 109,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 36.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 110,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 35.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 111,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 112,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 35.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 113,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 114,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 35.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 115,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 34.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 116,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 34.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 117,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 34.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 118,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 34.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 119,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 120,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 121,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 32.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 122,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 32.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 123,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 31.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 124,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 31.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 125,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 31.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 126,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 31.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 127,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 30.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 128,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 30.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 129,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 30.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 130,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 29.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 131,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 28.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 132,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 27.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 133,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 27.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 134,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 26.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 135,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 26.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  }
];

export const CYBER_EVAL_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    "rank": 1,
    "modelName": "GPT-6 Astra",
    "developer": "OpenAI",
    "score": 79.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.65"
  },
  {
    "rank": 2,
    "modelName": "Claude Opus 5",
    "developer": "Anthropic",
    "score": 76.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.45"
  },
  {
    "rank": 3,
    "modelName": "GPT-5.6 Sol",
    "developer": "OpenAI",
    "score": 75.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.44"
  },
  {
    "rank": 4,
    "modelName": "Claude Fable 5.1",
    "developer": "Anthropic",
    "score": 75.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.41"
  },
  {
    "rank": 5,
    "modelName": "DeepSeek-V4-Pro-0813",
    "developer": "DeepSeek",
    "score": 74.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.38"
  },
  {
    "rank": 6,
    "modelName": "Muse Spark 1.3",
    "developer": "Meta AI",
    "score": 74.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.34"
  },
  {
    "rank": 7,
    "modelName": "Claude Mythos Preview",
    "developer": "Anthropic",
    "score": 73.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.32"
  },
  {
    "rank": 8,
    "modelName": "Claude Opus 4.8",
    "developer": "Anthropic",
    "score": 73.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.31"
  },
  {
    "rank": 9,
    "modelName": "Claude Fable 5",
    "developer": "Anthropic",
    "score": 73.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.28"
  },
  {
    "rank": 10,
    "modelName": "Kimi K3",
    "developer": "Moonshot AI",
    "score": 72.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.26"
  },
  {
    "rank": 11,
    "modelName": "GLM-5.3",
    "developer": "Zhipu AI",
    "score": 72.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.23"
  },
  {
    "rank": 12,
    "modelName": "Qwen3.8 Max",
    "developer": "Alibaba Cloud",
    "score": 71.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.19"
  },
  {
    "rank": 13,
    "modelName": "GPT-5.6 Terra",
    "developer": "OpenAI",
    "score": 71.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.17"
  },
  {
    "rank": 14,
    "modelName": "Hy4 preview",
    "developer": "Tencent Hunyuan",
    "score": 70.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.11"
  },
  {
    "rank": 15,
    "modelName": "Gemini 3.8 Flash",
    "developer": "Google DeepMind",
    "score": 70.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.10"
  },
  {
    "rank": 16,
    "modelName": "GLM-5.3-Flash",
    "developer": "Zhipu AI",
    "score": 69.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.07"
  },
  {
    "rank": 17,
    "modelName": "Muse Spark 1.1",
    "developer": "Meta AI",
    "score": 69.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.05"
  },
  {
    "rank": 18,
    "modelName": "DeepSeek-V4-Flash-Vision-Exp",
    "developer": "DeepSeek",
    "score": 69.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.04"
  },
  {
    "rank": 19,
    "modelName": "Gemini 3.7 Flash",
    "developer": "Google DeepMind",
    "score": 68.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.01"
  },
  {
    "rank": 20,
    "modelName": "Grok 4.6",
    "developer": "xAI",
    "score": 68.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.01"
  },
  {
    "rank": 21,
    "modelName": "Qwen3.8-Flash-Next",
    "developer": "Alibaba Cloud",
    "score": 68.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$3.00"
  },
  {
    "rank": 22,
    "modelName": "Qwen3.8 Flash",
    "developer": "Alibaba Cloud",
    "score": 67.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.96"
  },
  {
    "rank": 23,
    "modelName": "Claude Sonnet 5",
    "developer": "Anthropic",
    "score": 67.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.94"
  },
  {
    "rank": 24,
    "modelName": "GPT-5.5",
    "developer": "OpenAI",
    "score": 67.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.93"
  },
  {
    "rank": 25,
    "modelName": "Grok 4.5",
    "developer": "xAI",
    "score": 67.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.92"
  },
  {
    "rank": 26,
    "modelName": "Claude Opus 4.6",
    "developer": "Anthropic",
    "score": 66.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.89"
  },
  {
    "rank": 27,
    "modelName": "DeepSeek-V4-Flash-0731",
    "developer": "DeepSeek",
    "score": 66.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.86"
  },
  {
    "rank": 28,
    "modelName": "Seed 2.1 Pro",
    "developer": "ByteDance",
    "score": 65.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.84"
  },
  {
    "rank": 29,
    "modelName": "GLM-5.2",
    "developer": "Zhipu AI",
    "score": 65.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.81"
  },
  {
    "rank": 30,
    "modelName": "Claude Opus 4.7",
    "developer": "Anthropic",
    "score": 65.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$2.81"
  },
  {
    "rank": 31,
    "modelName": "Qwen3.7 Max",
    "developer": "Alibaba Cloud",
    "score": 64.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.83"
  },
  {
    "rank": 32,
    "modelName": "GPT-5.6 Luna",
    "developer": "OpenAI",
    "score": 64.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.83"
  },
  {
    "rank": 33,
    "modelName": "Qwen3.8-27B",
    "developer": "Alibaba Cloud",
    "score": 64.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.81"
  },
  {
    "rank": 34,
    "modelName": "DeepSeek-V4-Pro-Max",
    "developer": "DeepSeek",
    "score": 63.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.81"
  },
  {
    "rank": 35,
    "modelName": "Gemini 3.8 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 63.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.80"
  },
  {
    "rank": 36,
    "modelName": "GPT-5.5 Pro",
    "developer": "OpenAI",
    "score": 62.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.78"
  },
  {
    "rank": 37,
    "modelName": "Kimi K2.6",
    "developer": "Moonshot AI",
    "score": 62.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.76"
  },
  {
    "rank": 38,
    "modelName": "Gemini 3.6 Flash",
    "developer": "Google DeepMind",
    "score": 61.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.74"
  },
  {
    "rank": 39,
    "modelName": "Seed 2.1 Turbo",
    "developer": "ByteDance",
    "score": 61.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.72"
  },
  {
    "rank": 40,
    "modelName": "Grok-4 Heavy",
    "developer": "xAI",
    "score": 60.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.71"
  },
  {
    "rank": 41,
    "modelName": "Gemini 3.1 Pro",
    "developer": "Google DeepMind",
    "score": 60.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.71"
  },
  {
    "rank": 42,
    "modelName": "GPT-5.2 Pro",
    "developer": "OpenAI",
    "score": 60.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.70"
  },
  {
    "rank": 43,
    "modelName": "Gemini 3.5 Flash",
    "developer": "Google DeepMind",
    "score": 59.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.69"
  },
  {
    "rank": 44,
    "modelName": "Hy3",
    "developer": "Tencent Hunyuan",
    "score": 59.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.67"
  },
  {
    "rank": 45,
    "modelName": "Sakana Namazu",
    "developer": "Sakana AI",
    "score": 58.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.66"
  },
  {
    "rank": 46,
    "modelName": "Qwen3.7-Plus",
    "developer": "Alibaba Cloud",
    "score": 58.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.65"
  },
  {
    "rank": 47,
    "modelName": "GPT-5.4",
    "developer": "OpenAI",
    "score": 58.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.64"
  },
  {
    "rank": 48,
    "modelName": "DeepSeek-V4-Flash-Max",
    "developer": "DeepSeek",
    "score": 57.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.62"
  },
  {
    "rank": 49,
    "modelName": "Muse Spark",
    "developer": "Meta AI",
    "score": 57.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.62"
  },
  {
    "rank": 50,
    "modelName": "Gemini 3.5 Flash Cyber",
    "developer": "Google DeepMind",
    "score": 57.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.62"
  },
  {
    "rank": 51,
    "modelName": "GPT-5.2",
    "developer": "OpenAI",
    "score": 56.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.60"
  },
  {
    "rank": 52,
    "modelName": "MiniMax M3",
    "developer": "MiniMax",
    "score": 56.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.59"
  },
  {
    "rank": 53,
    "modelName": "Laguna S 2.1",
    "developer": "Poolside",
    "score": 55.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.56"
  },
  {
    "rank": 54,
    "modelName": "Muse Spark 1.2",
    "developer": "Meta AI",
    "score": 55.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.56"
  },
  {
    "rank": 55,
    "modelName": "Qwen3.6 Plus",
    "developer": "Alibaba Cloud",
    "score": 54.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.54"
  },
  {
    "rank": 56,
    "modelName": "GLM-5.1",
    "developer": "Zhipu AI",
    "score": 54.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.53"
  },
  {
    "rank": 57,
    "modelName": "Claude Opus 4.5",
    "developer": "Anthropic",
    "score": 54.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.52"
  },
  {
    "rank": 58,
    "modelName": "Seed 2.0 Pro",
    "developer": "ByteDance",
    "score": 53.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.51"
  },
  {
    "rank": 59,
    "modelName": "Kimi K2.7 Code",
    "developer": "Moonshot AI",
    "score": 53.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.50"
  },
  {
    "rank": 60,
    "modelName": "Kimi K2.5",
    "developer": "Moonshot AI",
    "score": 53.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.49"
  },
  {
    "rank": 61,
    "modelName": "Inkling-Small",
    "developer": "Thinking Machines Lab",
    "score": 52.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.48"
  },
  {
    "rank": 62,
    "modelName": "Qwen3.5-397B-A17B",
    "developer": "Alibaba Cloud",
    "score": 52.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.46"
  },
  {
    "rank": 63,
    "modelName": "Gemini 3 Pro",
    "developer": "Google DeepMind",
    "score": 51.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.44"
  },
  {
    "rank": 64,
    "modelName": "Claude Sonnet 4.6",
    "developer": "Anthropic",
    "score": 50.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.41"
  },
  {
    "rank": 65,
    "modelName": "GLM-5",
    "developer": "Zhipu AI",
    "score": 50.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.41"
  },
  {
    "rank": 66,
    "modelName": "DeepSeek-V4-Flash-0423",
    "developer": "DeepSeek",
    "score": 50.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.40"
  },
  {
    "rank": 67,
    "modelName": "Step-3.5-Flash",
    "developer": "StepFun",
    "score": 50.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.39"
  },
  {
    "rank": 68,
    "modelName": "MiniMax M2.5",
    "developer": "MiniMax",
    "score": 49.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.38"
  },
  {
    "rank": 69,
    "modelName": "Gemini 3 Flash",
    "developer": "Google DeepMind",
    "score": 49.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.38"
  },
  {
    "rank": 70,
    "modelName": "GPT-5.1 Thinking",
    "developer": "OpenAI",
    "score": 49.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.37"
  },
  {
    "rank": 71,
    "modelName": "GPT-5.1 Instant",
    "developer": "OpenAI",
    "score": 48.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.35"
  },
  {
    "rank": 72,
    "modelName": "Solar Pro 4",
    "developer": "Upstage",
    "score": 48.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.35"
  },
  {
    "rank": 73,
    "modelName": "GPT-5.3 Codex",
    "developer": "OpenAI",
    "score": 48.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.34"
  },
  {
    "rank": 74,
    "modelName": "GPT-5.1",
    "developer": "OpenAI",
    "score": 47.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.33"
  },
  {
    "rank": 75,
    "modelName": "Nemotron 3 Ultra (550B A55B)",
    "developer": "NVIDIA",
    "score": 47.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.31"
  },
  {
    "rank": 76,
    "modelName": "Kimi K2-Thinking-0905",
    "developer": "Moonshot AI",
    "score": 46.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.30"
  },
  {
    "rank": 77,
    "modelName": "MiMo-V2-Pro",
    "developer": "Xiaomi AI",
    "score": 46.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.29"
  },
  {
    "rank": 78,
    "modelName": "LongCat-Flash-Thinking-2601",
    "developer": "Meituan AI",
    "score": 45.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.27"
  },
  {
    "rank": 79,
    "modelName": "DeepSeek-V3.2-Speciale",
    "developer": "DeepSeek",
    "score": 45.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.26"
  },
  {
    "rank": 80,
    "modelName": "Qwen3.6-27B",
    "developer": "Alibaba Cloud",
    "score": 45.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$1.25"
  },
  {
    "rank": 81,
    "modelName": "GPT-5.1 High",
    "developer": "OpenAI",
    "score": 45.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 82,
    "modelName": "MiniMax M2.7",
    "developer": "MiniMax",
    "score": 44.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 83,
    "modelName": "MiMo-V2.5",
    "developer": "Xiaomi AI",
    "score": 44.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 84,
    "modelName": "Muse Glimmer-30B",
    "developer": "Meta AI",
    "score": 43.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 85,
    "modelName": "Qwen3.5-122B-A10B",
    "developer": "Alibaba Cloud",
    "score": 43.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 86,
    "modelName": "GLM-4.7",
    "developer": "Zhipu AI",
    "score": 43.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 87,
    "modelName": "Grok-4",
    "developer": "xAI",
    "score": 43.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.34"
  },
  {
    "rank": 88,
    "modelName": "GPT-5.2 Codex",
    "developer": "OpenAI",
    "score": 42.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 89,
    "modelName": "DeepSeek-V3.2",
    "developer": "DeepSeek",
    "score": 42.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 90,
    "modelName": "DeepSeek-V3.2 (Thinking)",
    "developer": "DeepSeek",
    "score": 42.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 91,
    "modelName": "GPT-5",
    "developer": "OpenAI",
    "score": 42.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 92,
    "modelName": "GPT-5 High",
    "developer": "OpenAI",
    "score": 41.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 93,
    "modelName": "Qwen3.5-27B",
    "developer": "Alibaba Cloud",
    "score": 41.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.33"
  },
  {
    "rank": 94,
    "modelName": "ERNIE 5.0",
    "developer": "Baidu",
    "score": 40.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 95,
    "modelName": "Gemma 4 31B",
    "developer": "Google DeepMind",
    "score": 40.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 96,
    "modelName": "Grok 4 Fast",
    "developer": "xAI",
    "score": 39.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 97,
    "modelName": "MAI-Thinking-1",
    "developer": "Microsoft AI",
    "score": 39.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.32"
  },
  {
    "rank": 98,
    "modelName": "Qwen3.6-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 38.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 99,
    "modelName": "Grok-3 Mini",
    "developer": "xAI",
    "score": 38.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 100,
    "modelName": "Claude Sonnet 4.5",
    "developer": "Anthropic",
    "score": 38.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 101,
    "modelName": "Seed 2.0 Lite",
    "developer": "ByteDance",
    "score": 38.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 102,
    "modelName": "MiniMax M2.1",
    "developer": "MiniMax",
    "score": 37.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 103,
    "modelName": "GPT-5.5 Instant",
    "developer": "OpenAI",
    "score": 37.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.31"
  },
  {
    "rank": 104,
    "modelName": "GPT-5.1 Medium",
    "developer": "OpenAI",
    "score": 36.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 105,
    "modelName": "Grok-3",
    "developer": "xAI",
    "score": 36.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 106,
    "modelName": "o3",
    "developer": "OpenAI",
    "score": 35.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 107,
    "modelName": "Gemini 3.1 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 35.7,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 108,
    "modelName": "Nova 2 Pro",
    "developer": "Amazon AWS",
    "score": 35.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 109,
    "modelName": "Claude Opus 4.1",
    "developer": "Anthropic",
    "score": 35.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 110,
    "modelName": "MiMo-V2-Flash",
    "developer": "Xiaomi AI",
    "score": 35.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.30"
  },
  {
    "rank": 111,
    "modelName": "Qwen3.5-35B-A3B",
    "developer": "Alibaba Cloud",
    "score": 34.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 112,
    "modelName": "GLM-5V-Turbo",
    "developer": "Zhipu AI",
    "score": 33.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 113,
    "modelName": "GPT-5.4 mini",
    "developer": "OpenAI",
    "score": 33.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 114,
    "modelName": "Gemini 3.5 Flash-Lite",
    "developer": "Google DeepMind",
    "score": 33.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.29"
  },
  {
    "rank": 115,
    "modelName": "GPT-5 Medium",
    "developer": "OpenAI",
    "score": 32.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 116,
    "modelName": "Gemini 2.5 Pro Preview 06-05",
    "developer": "Google DeepMind",
    "score": 31.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 117,
    "modelName": "Gemma 4 26B-A4B",
    "developer": "Google DeepMind",
    "score": 31.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 118,
    "modelName": "DeepSeek-V3.2-Exp",
    "developer": "DeepSeek",
    "score": 31.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 119,
    "modelName": "GPT-5.1 Codex",
    "developer": "OpenAI",
    "score": 31.1,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.28"
  },
  {
    "rank": 120,
    "modelName": "GPT-5.3 Chat",
    "developer": "OpenAI",
    "score": 30.8,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 121,
    "modelName": "GPT-5.1 Codex High",
    "developer": "OpenAI",
    "score": 30.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 122,
    "modelName": "GLM-4.6",
    "developer": "Zhipu AI",
    "score": 30.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 123,
    "modelName": "Claude Opus 4",
    "developer": "Anthropic",
    "score": 29.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 124,
    "modelName": "MAI-Code-1-Flash",
    "developer": "Microsoft AI",
    "score": 29.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 125,
    "modelName": "GPT OSS 120B",
    "developer": "OpenAI",
    "score": 29.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.27"
  },
  {
    "rank": 126,
    "modelName": "LongCat-Flash-Thinking",
    "developer": "Meituan AI",
    "score": 28.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 127,
    "modelName": "MAI-Code-1.1-Flash",
    "developer": "Microsoft AI",
    "score": 28.3,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 128,
    "modelName": "Qwen3-235B-A22B-Thinking-2507",
    "developer": "Alibaba Cloud",
    "score": 27.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 129,
    "modelName": "GLM-4.5",
    "developer": "Zhipu AI",
    "score": 27.5,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 130,
    "modelName": "Gemini 2.5 Pro",
    "developer": "Google DeepMind",
    "score": 27.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.26"
  },
  {
    "rank": 131,
    "modelName": "MiMo-V2-Omni",
    "developer": "Xiaomi AI",
    "score": 26.4,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 132,
    "modelName": "o4-mini",
    "developer": "OpenAI",
    "score": 25.9,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 133,
    "modelName": "GPT OSS 20B High",
    "developer": "OpenAI",
    "score": 25.6,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 134,
    "modelName": "GPT-5 mini",
    "developer": "OpenAI",
    "score": 25.2,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.25"
  },
  {
    "rank": 135,
    "modelName": "MiniMax M2",
    "developer": "MiniMax",
    "score": 25.0,
    "date": "Sep 2026",
    "verifiedByNextVector": true,
    "costPerRun": "$0.24"
  }
];
