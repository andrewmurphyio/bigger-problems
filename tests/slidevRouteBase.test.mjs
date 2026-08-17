import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

test("Slidev keeps presenter routes relative to the configured router base", () => {
	const helperPath = path.join(
		projectRoot,
		"node_modules/@slidev/client/logic/slidePath.ts",
	);

	assert.ok(
		fs.existsSync(helperPath),
		"installed Slidev must include the relative slide-path helper",
	);

	const helperSource = fs.readFileSync(helperPath, "utf8");
	assert.match(
		helperSource,
		/presenter \? `\/presenter\/\$\{no\}`/,
		"presenter paths must not include import.meta.env.BASE_URL",
	);
	assert.doesNotMatch(helperSource, /BASE_URL/);

	const routerBase = "/bigger-problems/";
	const routePath = "/presenter/2";
	const browserPath = `${routerBase.slice(0, -1)}${routePath}`;

	assert.equal(browserPath, "/bigger-problems/presenter/2");
});
