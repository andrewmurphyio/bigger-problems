import assert from "node:assert/strict";
import test from "node:test";
import { reactive, ref, toRaw, watch } from "vue";
import { createPipelineSimSync } from "../composables/pipelineSimSync.ts";

function connect(source, target) {
	return watch(
		() => source.pipelineSimEvent,
		(event) => {
			target.pipelineSimEvent = structuredClone(toRaw(event));
		},
		{ flush: "sync" },
	);
}

function createClient({ isPresenter, mode, state }) {
	const events = [];
	const sync = createPipelineSimSync({
		isPresenter: ref(isPresenter),
		mode,
		onEvent: (event) => events.push(event),
		state,
	});
	return { events, sync };
}

test("propagates presenter controls to the matching viewer", () => {
	const presenterState = reactive({});
	const viewerState = reactive({});
	const disconnect = connect(presenterState, viewerState);
	const presenter = createClient({
		isPresenter: true,
		mode: "workMap",
		state: presenterState,
	});
	const viewer = createClient({
		isPresenter: false,
		mode: "workMap",
		state: viewerState,
	});

	presenter.sync.publish("start", true);
	presenter.sync.publish("showWaste", false);
	presenter.sync.publish("speed", 32);

	assert.deepEqual(
		viewer.events.map(({ control, value }) => ({ control, value })),
		[
			{ control: "start", value: true },
			{ control: "showWaste", value: false },
			{ control: "speed", value: 32 },
		],
	);

	presenter.sync.stop();
	viewer.sync.stop();
	disconnect();
});

test("mirrors hover targets, clears them, and isolates other modes", () => {
	const presenterState = reactive({});
	const viewerState = reactive({});
	const disconnect = connect(presenterState, viewerState);
	const presenter = createClient({
		isPresenter: true,
		mode: "workMap",
		state: presenterState,
	});
	const viewer = createClient({
		isPresenter: false,
		mode: "workMap",
		state: viewerState,
	});
	const otherViewer = createClient({
		isPresenter: false,
		mode: "workReview",
		state: viewerState,
	});

	presenter.sync.publish("hover", "run");
	presenter.sync.publish("hover", "showWaste");
	presenter.sync.publish("hover", "speed");
	presenter.sync.publish("hover", null);
	presenter.sync.publish("hover", "run");
	presenter.sync.publish("hover", "run");

	assert.deepEqual(
		viewer.events.map(({ value }) => value),
		["run", "showWaste", "speed", null, "run", "run"],
	);
	assert.notEqual(viewer.events.at(-2).nonce, viewer.events.at(-1).nonce);
	assert.deepEqual(otherViewer.events, []);

	presenter.sync.stop();
	viewer.sync.stop();
	otherViewer.sync.stop();
	disconnect();
});

test("does not let a viewer publish control events", () => {
	const state = reactive({});
	const viewer = createClient({ isPresenter: false, mode: "workMap", state });

	viewer.sync.publish("speed", 12);

	assert.equal(state.pipelineSimEvent, undefined);
	viewer.sync.stop();
});

test("isolates events by simulation mode", () => {
	const presenterState = reactive({});
	const viewerState = reactive({});
	const disconnect = connect(presenterState, viewerState);
	const presenter = createClient({
		isPresenter: true,
		mode: "workMap",
		state: presenterState,
	});
	const otherViewer = createClient({
		isPresenter: false,
		mode: "workReview",
		state: viewerState,
	});

	presenter.sync.publish("start", true);

	assert.deepEqual(otherViewer.events, []);
	presenter.sync.stop();
	otherViewer.sync.stop();
	disconnect();
});

test("delivers repeated commands with distinct nonces", () => {
	const presenterState = reactive({});
	const viewerState = reactive({});
	const disconnect = connect(presenterState, viewerState);
	const presenter = createClient({
		isPresenter: true,
		mode: "workMap",
		state: presenterState,
	});
	const viewer = createClient({
		isPresenter: false,
		mode: "workMap",
		state: viewerState,
	});

	presenter.sync.publish("showWaste", true);
	presenter.sync.publish("showWaste", true);

	assert.equal(viewer.events.length, 2);
	assert.notEqual(viewer.events[0].nonce, viewer.events[1].nonce);
	presenter.sync.stop();
	viewer.sync.stop();
	disconnect();
});

test("stops applying events after cleanup", () => {
	const presenterState = reactive({});
	const viewerState = reactive({});
	const disconnect = connect(presenterState, viewerState);
	const presenter = createClient({
		isPresenter: true,
		mode: "workMap",
		state: presenterState,
	});
	const viewer = createClient({
		isPresenter: false,
		mode: "workMap",
		state: viewerState,
	});

	viewer.sync.stop();
	presenter.sync.publish("speed", 8);

	assert.deepEqual(viewer.events, []);
	presenter.sync.stop();
	disconnect();
});
