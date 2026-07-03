# If you thought the speed of writing code was your problem, you have bigger problems

Slidev deck draft for Andrew Murphy's NDC Oslo 2026 talk.

## Concept

The deck starts with a personal pipeline: *so many ideas, so little time*.
AI coding makes weekend projects dramatically faster because, in that small
system, coding really is the bottleneck.

The work reveal is sharper:

> Because the bottleneck at work is not coding.

The recurring visual system is a delivery pipe with idea balls moving through it.
When AI accelerates the wrong station, the pipe shows back-pressure: idea balls
queue at the real constraint instead of turning into delivered user value.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Files

- `slides.md` — talk structure, slides, and speaker notes
- `components/PipelineSim.vue` — reusable animated pipeline visual
- `style.css` — restrained professional visual system and slide styling

## Design direction

Matches [andrewmurphy.io](https://andrewmurphy.io/): dark terminal aesthetic.

- Tone: professional, clean, and direct
- Memory hook: ideas as balls flowing live through a constrained pipe (real queue simulation)
- Palette: near-black `#020103`, violet accent `#d783dc`, teal `#03dac5` for work in progress, rose `#cf6679` for constraints/overflow
- Typography: JetBrains Mono headings and labels, Inter body, `~/` eyebrow chips
- Motion: one live pipe/back-pressure simulation; queues build from empty and overflow when full
