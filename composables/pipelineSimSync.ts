import type { Ref } from "vue";
import { watch } from "vue";

export type PipelineSimHoverTarget = "run" | "showWaste" | "speed";

export interface PipelineSimControlValues {
	hover: PipelineSimHoverTarget | null;
	showWaste: boolean;
	speed: number;
	start: true;
}

export type PipelineSimControl = keyof PipelineSimControlValues;

export type PipelineSimEvent = {
	[Control in PipelineSimControl]: {
		control: Control;
		mode: string;
		nonce: string;
		value: PipelineSimControlValues[Control];
	};
}[PipelineSimControl];

export interface PipelineSimSharedState {
	pipelineSimEvent?: unknown;
}

export interface PipelineSimSyncOptions {
	isPresenter: Readonly<Ref<boolean>>;
	mode: string;
	onEvent: (event: PipelineSimEvent) => void;
	state: PipelineSimSharedState;
}

let eventSequence = 0;

function isPipelineSimEvent(value: unknown): value is PipelineSimEvent {
	if (typeof value !== "object" || value === null) return false;

	const event = value as Record<string, unknown>;
	if (typeof event.mode !== "string" || typeof event.nonce !== "string")
		return false;

	switch (event.control) {
		case "hover":
			return (
				event.value === null ||
				event.value === "run" ||
				event.value === "showWaste" ||
				event.value === "speed"
			);
		case "showWaste":
			return typeof event.value === "boolean";
		case "speed":
			return typeof event.value === "number" && Number.isFinite(event.value);
		case "start":
			return event.value === true;
		default:
			return false;
	}
}

function nextEventNonce() {
	eventSequence += 1;
	return `${Date.now()}:${eventSequence}`;
}

export function createPipelineSimSync(options: PipelineSimSyncOptions) {
	const stop = watch(
		() => options.state.pipelineSimEvent,
		(value) => {
			if (
				options.isPresenter.value ||
				!isPipelineSimEvent(value) ||
				value.mode !== options.mode
			)
				return;

			options.onEvent(value);
		},
		{ flush: "sync" },
	);

	function publish<Control extends PipelineSimControl>(
		control: Control,
		value: PipelineSimControlValues[Control],
	) {
		if (!options.isPresenter.value) return;

		options.state.pipelineSimEvent = {
			control,
			mode: options.mode,
			nonce: nextEventNonce(),
			value,
		};
	}

	return { publish, stop };
}
