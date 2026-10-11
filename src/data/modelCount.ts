import { ALL_MODELS } from './modelsData';

// Live registry size, so UI copy never drifts from the actual model count
export const MODEL_COUNT = ALL_MODELS.length;
// Tracked models that have an arena.ai text row (the rest have no Arena score yet)
export const ARENA_RANKED_COUNT = ALL_MODELS.filter((m) => m.arenaRank).length;
