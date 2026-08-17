import type {
	PipelineSimEvent,
	PipelineSimHoverTarget,
	PipelineSimSharedState,
} from "./pipelineSimSync.ts";
import { sharedState, useNav } from "@slidev/client";
import { computed, onBeforeUnmount, ref, watchEffect } from "vue";
import { createPipelineSimSync } from "./pipelineSimSync.ts";

interface PipelineSimCursor {
	style?: "cursor" | "laser" | "pointer";
	x: number;
	y: number;
}

const pipelineSimSharedState = sharedState as typeof sharedState &
	PipelineSimSharedState;

function getPipelineSimCursor() {
	return pipelineSimSharedState.cursor as PipelineSimCursor | undefined;
}

export function usePipelineSimSync(
	mode: string,
	onEvent: (event: PipelineSimEvent) => void,
) {
	const { isPresenter } = useNav();
	const presenterPointerActive = ref(false);
	let previousCursorStyle: "cursor" | "laser" = "cursor";

	const sync = createPipelineSimSync({
		isPresenter,
		mode,
		onEvent,
		state: pipelineSimSharedState,
	});

	const stopPointerSync = watchEffect(
		() => {
			if (!isPresenter.value || !presenterPointerActive.value) return;

			const cursor = getPipelineSimCursor();
			if (!cursor || cursor.style === "pointer") return;

			if (cursor.style === "cursor" || cursor.style === "laser")
				previousCursorStyle = cursor.style;
			cursor.style = "pointer";
		},
		{ flush: "sync" },
	);

	const remotePointer = computed(() => {
		if (isPresenter.value) return undefined;

		const cursor = getPipelineSimCursor();
		return cursor?.style === "pointer" ? cursor : undefined;
	});

	function setPresenterPointer(active: boolean) {
		presenterPointerActive.value = active;
		if (active) return;

		const cursor = getPipelineSimCursor();
		if (cursor?.style === "pointer") cursor.style = previousCursorStyle;
	}

	function publishHover(target: PipelineSimHoverTarget | null) {
		setPresenterPointer(target !== null);
		sync.publish("hover", target);
	}

	onBeforeUnmount(() => {
		publishHover(null);
		stopPointerSync();
		sync.stop();
	});

	return {
		publish: sync.publish,
		publishHover,
		remotePointer,
	};
}
