export const PIPELINE_SPEED_LEVEL_MAX = 12;
export const PIPELINE_SPEED_LEVEL_MIN = 1;

const PIPELINE_LINEAR_SPEED_MAX = 10;
const PIPELINE_SPEED_FACTOR_MAX = 1000;

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

export function normalizePipelineSpeedFactor(factor: number) {
	if (!Number.isFinite(factor)) return PIPELINE_SPEED_LEVEL_MIN;

	return clamp(factor, PIPELINE_SPEED_LEVEL_MIN, PIPELINE_SPEED_FACTOR_MAX);
}

export function pipelineSpeedFactorForLevel(level: number) {
	const normalizedLevel = Number.isFinite(level)
		? clamp(level, PIPELINE_SPEED_LEVEL_MIN, PIPELINE_SPEED_LEVEL_MAX)
		: PIPELINE_SPEED_LEVEL_MIN;

	return normalizedLevel <= PIPELINE_LINEAR_SPEED_MAX
		? normalizedLevel
		: Math.round(10 ** (normalizedLevel - 9));
}

export function pipelineSpeedLevelForFactor(factor: number) {
	const normalizedFactor = normalizePipelineSpeedFactor(factor);

	return normalizedFactor <= PIPELINE_LINEAR_SPEED_MAX
		? normalizedFactor
		: 9 + Math.log10(normalizedFactor);
}
