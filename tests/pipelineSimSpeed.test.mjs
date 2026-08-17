import assert from "node:assert/strict";
import test from "node:test";
import {
	PIPELINE_SPEED_LEVEL_MAX,
	PIPELINE_SPEED_LEVEL_MIN,
	pipelineSpeedFactorForLevel,
	pipelineSpeedLevelForFactor,
} from "../composables/pipelineSimSpeed.ts";

test("maps absolute speed factors onto the internal slider scale", () => {
	for (const factor of [32, 100, 1000]) {
		const level = pipelineSpeedLevelForFactor(factor);

		assert.equal(pipelineSpeedFactorForLevel(level), factor);
		assert.ok(level >= PIPELINE_SPEED_LEVEL_MIN);
		assert.ok(level <= PIPELINE_SPEED_LEVEL_MAX);
	}
});

test("keeps the linear portion of the speed slider unchanged", () => {
	for (const factor of [1, 1.5, 5, 10]) {
		const level = pipelineSpeedLevelForFactor(factor);

		assert.equal(level, factor);
		assert.equal(pipelineSpeedFactorForLevel(level), factor);
	}
});
