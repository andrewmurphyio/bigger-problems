---
date: 2026-07-28T16:45:22+1000
author: Andrew Murphy
commit: c91b8b9
branch: main
repository: if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems
topic: "Recognizable AI/Claude tells in presentation prose and voice-preserving alternatives"
tags: [research, prose, ai-writing, slidev, presentation]
status: ready
last_updated: 2026-07-28T16:45:22+1000
last_updated_by: Andrew Murphy
citation_revision: "working tree based on dff4e6c"
working_tree_dirty: true
---

# Research: Recognizable AI/Claude Tells in Presentation Prose

## Research Question

Investigate recognizable AI/Claude tells in prose, then audit this presentation for them—especially aphoristic lines like “That is the question AI should make louder.” Identify recurring smells and recommend more natural alternatives without flattening the speaker’s voice.

## Summary

The useful finding is not that a sentence can be proven to be “Claude-written.” It cannot. Published research identifies corpus-level tendencies—narrower stylistic variation, informationally dense house styles, recurrent grammatical preferences, and formulaic structure—but those tendencies generalize poorly to a single short sentence. OpenAI’s own retired classifier reported only 26% true positives and 9% false positives on its challenge set, and called short-text classification especially unreliable. An eight-word slide subtitle is an editorial sample, not forensic evidence.

The presentation nevertheless had a real generated-prose smell. It came from **density**: several nearby lines used polished reversal, abstract synthesis, personification, fragment chains, and explanatory glosses after the audience already had the point. The smell was strongest when every visual layer tried to be the quote: eyebrow, H1, quote panel, subtitle, simulation title, caption, and speaker note.

The deck changed while this research was in progress. The original target line, the adjacent “That is the Theory of Constraints angle,” and the standalone competitive-advantage slide are no longer audience-visible. The practical ending was compressed into a 35-slide sequence (`slides.md:458-563`; `global-bottom.vue:8-15`). All repository citations below were therefore refreshed against the current working tree based on `dff4e6c`, not the original `c91b8b9` snapshot recorded when research began.

The current priorities are:

1. Reduce the four-beat contrast cluster around the evidence section (`components/PipelineSim.vue:124-135`; `slides.md:203-270`).
2. Replace the late abstract synthesis with one concrete queue observation (`slides.md:458-466`).
3. Let simulation copy annotate the visual instead of narrating its conclusion (`components/PipelineSim.vue:34-178`, `components/PipelineSim.vue:823-955`).
4. Remove generic coaching scaffolding from notes where it provides neither words to say nor an action to perform.
5. Keep earned stage lines such as “Output went up. Throughput did not,” “Code waits fine. Context rots,” and the final keyboard callback (`slides.md:213-238`, `slides.md:321-352`, `slides.md:544-549`).

The chosen editorial direction is **balanced stage voice**: retain keynote energy where evidence, timing, or a concrete image earns it; remove repeated formulas, vague personification, and redundant summaries.

## Detailed Findings

### 1. What the Research Supports—and What It Does Not

#### Supported at corpus level

- Reinhart et al. found systematic stylistic differences between human continuations and GPT-4o/Llama 3 continuations. Instruction-tuned models favored present-participial clauses, nominalization, phrasal coordination, and an informationally dense, noun-heavy style. The study also found model-family “house styles” and weaker generalization across corpora.
- Liu and Demberg found considerably more stylistic variation in human-authored text than ChatGPT output across controlled style-transfer tasks.
- Liang et al. explicitly describe generated-text trends that can be visible across a corpus yet too subtle to detect at the individual-text level.
- OpenAI’s classifier limitations demonstrate why intuitive authorship claims about one short phrase should be avoided.

#### Not supported

- No credible source found establishes “That is…,” aphoristic contrast, abstract personification, or em dashes as uniquely **Claude** tells.
- No individual phrase in this deck can establish model provenance.
- Polished compression is not inherently suspicious in a talk. Assertion-evidence slide research favors sentence headlines that state the main claim, and TED’s slide guidance recommends a single succinct line. Conference-slide rhetoric is therefore a major genre confound.

#### Practical taxonomy for this deck

These are editorial smells, not detector features:

1. **Formula density** — many unrelated points use the same `X. Not Y.` or `Not X. But Y.` wrapper.
2. **Deictic synthesis** — “this,” “that,” and “it” summarize an idea without naming the mechanism.
3. **Abstract agency** — AI, questions, time, or constraints “amplify,” “get louder,” “hide,” or “live.”
4. **Redundant interpretation** — a title, caption, note, and following slide all explain the same visual.
5. **Uniform cadence** — fragment chains and balanced clauses appear so often that the audience can predict the second half.
6. **Metaphor drift** — pipe, traffic jam, avalanche, rot, wall, sound, flight, and drowning compete within one argument.
7. **Editorial boilerplate** — notes say “hinge,” “money shot,” “let this sting,” or “make it land” instead of recording a story, fact, click, pause, or actual sentence.

### 2. The Reorder Resolved the Original Worst Cluster

The current deck no longer contains “That is the question AI should make louder.” The transition now ends with the concrete question “So where does value get stuck?” and moves directly into “Find the constraint” (`slides.md:458-480`). This removes the abstract sound metaphor and the repeated `That is…` certification formula.

Other improvements from the compression:

- Theory of Constraints is taught before the work simulations and revisited through the “one more slide” joke (`slides.md:102-119`, `slides.md:187-195`); the late “Theory of Constraints angle” gloss is gone.
- Map, measure, and fix now appear as one three-card method rather than several standalone summary slides (`slides.md:474-494`).
- “Stop starting. Start finishing.” is attached to the resolved pipeline visual instead of occupying a standalone slide (`components/PipelineSim.vue:162-173`; `slides.md:499-502`).
- The standalone competitive-advantage slide is gone. Its long not-X/but-Y sentence survives only in the final speaker note (`slides.md:544-549`).
- The footer now maps the compressed ending to slide 30 and Q&A to slide 35 (`global-bottom.vue:8-15`).

The compression did introduce a smaller repetition risk: the close now runs through “Find,” “Stop/Start,” “Use AI there,” “Use AI at the constraint,” and “Fix” in five consecutive beats (`slides.md:474-549`; `components/PipelineSim.vue:164`). The problem is no longer a long repeated method; it is an imperative ladder.

### 3. Andrew’s Voice Baseline

#### Internal anchors

The strongest voice is specific before it is clever:

- Personal shorthand—“egg counter,” “coop door bot,” “chicken cam,” and “available weekends”—establishes a recognisable person rather than a generic presenter (`slides.md:37-49`).
- “The scope grew after the estimate. It happens.” is self-deprecating and technically situated (`slides.md:187-195`).
- “Writing code faster just means you arrive at ‘oh no’ sooner” follows a concrete ticket/Figma failure mode (`slides.md:289-302`).
- “Code waits fine. Context rots.” earns its compression through the Monday-to-Monday timeline beneath it (`slides.md:319-358`).
- The meeting with someone on holiday and the Copilot/org-chart line are specific workplace absurdities (`slides.md:407-419`).
- “Bring snacks. This will be depressing” now lives in the merged-method note and still supplies the right dry undercut (`slides.md:474-494`).

#### External anchors

Andrew’s original post confirms the same register:

- concrete workplace artifacts: Jira tickets, Figma links, PR queues, flaky CI, deploy approvals, and meetings;
- direct contractions and imperatives;
- Australian/British forms such as “optimise,” “organisation,” and “on holiday”;
- self-deprecating or shared-failure jokes after a concrete setup;
- longer irregular sentences broken by short deadpan tags.

The deck’s “oh no” is a venue-safe adaptation of the post’s stronger original wording. The calendar, holiday, org-chart, value-stream, cycle-time, WIP, and snack material also comes directly from the published post. A second published piece confirms the pattern with lines such as “Let’s call her Sarah (because that’s her name)” and “Bargaining is just denial in glasses and a false nose.”

#### Voice rules for replacements

- Prefer the actual queue, PR, ticket, meeting, review, or deploy gate over an abstract “challenge.”
- Use contractions where the line is meant to be spoken.
- Let one short payoff follow a concrete setup; do not make every sentence the payoff.
- Keep dry humour distributional. Adding a joke or Australianism to every replacement would become another formula.
- Preserve technical terms where they carry the argument: constraint, throughput, WIP, cycle time, queue, and wait.
- Keep one canonical visual vocabulary—pipe, station, queue, flow, stuck—and make competing metaphors earn their place.

### 4. Prominence-Weighted Current Audit

The deck’s visual hierarchy magnifies short prose. H1 text is bold, tightly tracked, restricted to 20 characters per line, and reaches 3.4rem (`style.css:74-87`). Subtitles are 1.3rem (`style.css:165-170`), quote-panel text is 1.5rem monospaced (`style.css:376-394`), and footnotes are only 0.78rem (`style.css:569-572`). A weak phrase in a footnote is cheap; a weak phrase on a sparse H1/subtitle slide dominates the room.

#### P0 — Current audience copy

| Current copy | Judgment | Reason | Balanced-stage alternative |
| --- | --- | --- | --- |
| “AI accelerates build. The system does not accelerate.” (`components/PipelineSim.vue:126`) | Rewrite | Opens a four-screen run of near-identical reversals and states the conclusion before the animation. | “Code gets faster. Review gets a queue.” |
| “Output went up. Throughput did not” (`slides.md:213`) | Keep | Names the exact technical distinction and is immediately supported by metrics and sources (`slides.md:213-246`). | No change. |
| “You produced more code and shipped less software” (`slides.md:251`) | Rewrite | Repeats the previous slide instead of foregrounding the new METR perception result. | “19% slower. They thought they were 20% faster.” |
| “AI coding isn’t the problem. It just isn’t the miracle” (`slides.md:265`) | Rewrite | The disclaimer is necessary, but another polished polarity follows three previous reversals. | “AI helps with the 16%. The other 84% is still there.” |
| “AI coding didn’t invent this. It amplifies it” plus “Same queues…” (`slides.md:458-463`) | Rewrite | `this/it` are abstract, and the heading, fragment chain, and subtitle all attempt a synthesis. | “The queues were already there. Now they fill faster.” Keep the current question at `slides.md:466`. |
| “Stop starting. Start finishing.” (`components/PipelineSim.vue:164`) | Keep | The resolved pipeline visual now earns the familiar maxim. | No change. |
| “Ten things in flight is not faster than three things done” (`components/PipelineSim.vue:165`) | Cut or rewrite | Restates the title and names arbitrary quantities not represented as a fixed three-item limit. | “Same output. Fewer things waiting.” |
| “Use AI at the constraint” (`slides.md:530`) | Rewrite | Repeats “If coding is the bottleneck, great. Use AI there” from the preceding slide (`slides.md:507-523`). | “Use AI on research, review, and CI.” |
| “Fix the bottleneck / It’s not the keyboard” (`slides.md:544-546`) | Keep | Concrete callback, central thesis, and deliberate closing timing. | No change. |

#### P1 — Staccato and contrast worth retaining

- “So many ideas. So little time” is generic in isolation but is immediately personalised by the project wall (`slides.md:37-49`). Keep.
- “Not polished. Not enterprise-grade. But real. Clickable. Alive.” is the most formulaic fragment sequence (`slides.md:74-78`). It can remain under the balanced-stage direction, but is a reasonable rehearsal test. The natural fallback is: “It wasn’t polished or enterprise-grade, but it worked.”
- “Code waits fine. Context rots.” is grounded by visible causal evidence (`slides.md:319-358`). Keep.
- “More code. More unknowns. More blast radius.” is scan-friendly microcopy inside a causal diagram (`slides.md:365-400`). Keep unless the whole slide sounds too uniformly clipped in rehearsal.
- The final keyboard line is entitled to be polished. A talk needs peaks; the problem is making every transition another peak.

#### P1 — Metaphor discipline

The delivery pipe is the documented memory hook (`README.md:37-41`) and the simulation implements queues, service rates, back-pressure, input, output, and work getting stuck (`components/PipelineSim.vue:34-178`, `components/PipelineSim.vue:912-955`).

Keep the secondary metaphors that are concretely paid off:

- “Context rots” has a full context-decay timeline (`slides.md:319-358`).
- The deploy trust spiral has a rendered causal loop (`slides.md:365-400`).
- The load-bearing calendar and org-chart refactor are distinctive published Andrew lines (`slides.md:407-419`).

The original acoustic metaphor—amplify/louder—was the weak cluster. “Louder” is now gone, but “amplifies” remains at `slides.md:460`. Replacing the whole synthesis with queue language would return the talk to its canonical visual model.

### 5. Simulation Copy Should Annotate, Not Narrate

`Scenario` requires an eyebrow, title, and caption (`components/PipelineSim.vue:16-23`). Unless `noHeader` is set, the title is rendered as an H2 and reused as the SVG accessibility label (`components/PipelineSim.vue:823-840`). The caption is outside that condition and always renders (`components/PipelineSim.vue:955`). Stage labels, queue counts, and input/output rates already explain much of the state (`components/PipelineSim.vue:912-936`).

| Scenario | Current judgment |
| --- | --- |
| `weekendBefore` (`components/PipelineSim.vue:35-42`) | Keep. The caption is personal and establishes the pipe. |
| `weekendAfter` (`components/PipelineSim.vue:45-52`) | Keep title; caption is optional because the Friday/Sunday slide supplies the payoff. |
| `bottleneckRecap` (`components/PipelineSim.vue:55-62`) | Keep the callback; cut or trim “Nothing else matters until it moves,” which repeats the ToC quote and uses an absolute. |
| `workBefore` (`components/PipelineSim.vue:65-78`) | Keep title; caption is redundant with title, narrow bore, and queue. |
| `workMap` (`components/PipelineSim.vue:81-100`) | Keep. Its question/instruction performs a real job on a manual reveal (`slides.md:148-151`). |
| `workReview` (`components/PipelineSim.vue:103-121`) | Keep title; trim caption to the interactive question. It is also a manual reveal (`slides.md:179-182`). |
| `workBoost` (`components/PipelineSim.vue:124-135`) | Rewrite title; cut caption. “The balls are ideas” duplicates the legend and the next slide owns the conclusion. |
| `discoveryBottleneck` (`components/PipelineSim.vue:138-146`) | Keep title as SVG label; cut visible caption because `no-header` leaves the outer slide heading to make the point (`slides.md:289-291`). |
| `postCodeBottleneck` (`components/PipelineSim.vue:149-159`) | Keep title as SVG label; cut visible caption because the outer heading already states the premise (`slides.md:309-311`). |
| `fixedConstraint` (`components/PipelineSim.vue:162-173`) | Keep title; cut or correct caption. |

#### `fixedConstraint` accuracy note

The current copy says “Ten things in flight is not faster than three things done,” and its speaker note says the system produces “more value out” (`components/PipelineSim.vue:164-165`; `slides.md:499-502`). The simulation does not encode a fixed three-item WIP limit. Non-shedding queue caps equal the stage’s service-slot count, capped at ten (`components/PipelineSim.vue:425-434`), queues start empty (`components/PipelineSim.vue:452-459`), and steady-state flow is calculated as the minimum of spawn and service rates (`components/PipelineSim.vue:488-501`, `components/PipelineSim.vue:558-569`).

With the current rates and half-density spawn rule, both `workBoost` and `fixedConstraint` settle at roughly 34 items/min out; the rendered output labels expose that rate (`components/PipelineSim.vue:306-307`, `components/PipelineSim.vue:930-936`). The resolved scenario demonstrates **shorter queues and a better completion ratio**, not higher absolute out-rate. “Same output. Fewer things waiting.” matches the implemented behavior.

### 6. Speaker Notes: Keep Actions and Facts, Remove Editorial Labels

`slides.md` intentionally combines projected content and speaker notes (`README.md:27-31`). Comments therefore carry no visual weight, but generic notes can still make delivery sound generated if spoken nearly verbatim.

Keep:

- manual simulation choreography and reveal timing (`slides.md:140-182`);
- source detail and study limitations (`slides.md:128-135`, `slides.md:213-258`);
- the final two pauses (`slides.md:544-549`);
- concrete anecdotes and actual sentences to say.

Rewrite or cut:

- “This is the hinge,” “first big reveal,” and “Land this lens” (`slides.md:88-111`);
- “Hero animation / visual” and “money shot” (`slides.md:203-206`);
- “Let this sting” (`slides.md:251-258`);
- “Expect nods,” “Good joke line,” reaction forecasting, and “Short sharp line” (`slides.md:275-302`, `slides.md:352-358`, `slides.md:419-422`);
- the merged method note that reads the three cards back aloud (`slides.md:474-494`);
- the fixed-simulation note’s inaccurate “more value out” claim (`slides.md:499-502`);
- “This keeps the talk pro-tool…” (`slides.md:507-523`);
- the long competitive-advantage sentence immediately before the intentionally short final line (`slides.md:544-549`).

Useful note replacements are concrete memory cues:

- `slides.md:494`: “Use a real feature, not the process diagram. Count elapsed time, especially the gaps. Fix the longest one. Bring snacks; the timestamps will be depressing.”
- `slides.md:502`: “Code no longer outruns Review. The out-rate stays about 34/min; the queues get shorter. AI is still in Code.”
- `slides.md:549`: retain only “Pause after ‘bottleneck’, then after ‘keyboard’.”

### 7. Persistent Labels

The footer titles are defined once (`global-bottom.vue:8-15`), mapped into always-rendered labels (`global-bottom.vue:28-52`), and displayed in uppercase 9px text at 42% opacity, rising to 78% when active (`global-bottom.vue:67-100`). Their per-frame prominence is low, but their repetition is high.

- `the bottleneck`, `fix the pipe`, and `q&a` are useful navigation.
- `weekend magic` is more marketing-like, but it reflects the intentionally enthusiastic opening.
- `where it hurts` is the least specific. “where work waits” would preserve energy while naming the actual section.

This is low priority. Commit `5f7a1e4` intentionally made the labels punchier, so a prose cleanup should not silently undo that prior design goal.

## Code References

- `README.md:27-41` — file roles, “professional, clean, and direct” tone, pipe memory hook, and motion model.
- `slides.md:37-54` — personal project wall and generic “Make this human” note.
- `slides.md:74-97` — Friday/Sunday fragment sequence, hinge note, and first work reveal.
- `slides.md:102-119` — Theory of Constraints definition, “Land this lens,” and callback note.
- `slides.md:140-182` — manual work simulations and useful interaction choreography.
- `slides.md:187-206` — second ToC slide, estimation joke, and “money shot” note.
- `slides.md:203-270` — workBoost, metric thesis, METR slide, and miracle disclaimer contrast cluster.
- `slides.md:275-302` — four-suspect turn, concrete discovery example, and “oh no” line.
- `slides.md:309-358` — post-code bottleneck and context-decay timeline.
- `slides.md:365-422` — deploy trust loop, calendar example, and org-chart line.
- `slides.md:429-466` — measurement comparison and current late synthesis.
- `slides.md:474-502` — compressed three-step method and fixedConstraint invocation.
- `slides.md:507-549` — current closing imperative sequence and final speaker note.
- `slides.md:554-563` — Q&A handoff and statement that the bottleneck slide is the real ending.
- `components/PipelineSim.vue:16-23` — required scenario prose fields.
- `components/PipelineSim.vue:34-178` — all scenario titles, captions, and stage microcopy.
- `components/PipelineSim.vue:425-459` — queue caps and empty-start behavior.
- `components/PipelineSim.vue:488-501` — scenario spawn-rate logic.
- `components/PipelineSim.vue:558-569` — steady-state flow calculation.
- `components/PipelineSim.vue:823-840` — conditional title rendering and SVG accessible label.
- `components/PipelineSim.vue:912-955` — stage labels, wait counts, rates, controls, and unconditional caption rendering.
- `components/PipelineSim.vue:1010-1015` — simulation title prominence.
- `components/PipelineSim.vue:1126-1133` — caption styling.
- `global-bottom.vue:8-15` — current 35-slide section map and persistent vocabulary.
- `global-bottom.vue:28-52` — label calculation and rendering.
- `global-bottom.vue:67-100` — fixed placement, uppercase treatment, and opacity.
- `style.css:74-87` — H1/H2/H3 hierarchy.
- `style.css:165-170` — subtitle hierarchy.
- `style.css:376-394` — quote-panel hierarchy.
- `style.css:569-572` — footnote hierarchy.

## Integration Points

### Inbound References

- `slides.md:58-66` — weekend scenarios establish the pipe before the thesis.
- `slides.md:116` — bottleneck recap reuses the weekend visual after the ToC definition.
- `slides.md:140-203` — work scenarios build the central contrast and evidence sequence.
- `slides.md:289-311` — `no-header` scenarios rely on outer headings while captions remain visible.
- `slides.md:499` — compressed ending invokes the revised `fixedConstraint` scenario.

### Outbound Dependencies

- `components/PipelineSim.vue:178` — mode lookup falls back to `workBoost`, so its prose is also the fallback copy.
- `components/PipelineSim.vue:823-840` — scenario titles feed both visual headings and accessibility labels.
- `components/PipelineSim.vue:912-955` — registry prose is combined with dynamic labels and measurements.
- `style.css:74-170` — global hierarchy determines how loudly slide prose reads.

### Infrastructure Wiring

- `global-bottom.vue:8-15` — hard-coded section starts must remain aligned with slide order.
- `global-bottom.vue:28-52` — every section title is rendered on every slide; active state changes emphasis, not inclusion.
- `components/PipelineSim.vue:27-31` — `noHeader` defaults to false.
- `components/PipelineSim.vue:823-825` — `noHeader` hides eyebrow/title only.
- `components/PipelineSim.vue:955` — captions remain visible even when headers are suppressed.

## Architecture Insights

- The deck has three prose systems, not one: projected Markdown, component registry microcopy, and private speaker notes. An audit that reads only `slides.md` misses high-prominence simulation headings and persistent footer language.
- Visual evidence should own the mechanism; prose should identify what changed or where to look. When copy states the conclusion before and after an animation, the simulation becomes decoration.
- The pipe is a deep visual module: stages, rates, queues, labels, and measurements all express the thesis. Copy is strongest when it uses that module’s native terms.
- The current compressed ending is structurally stronger than the original. Its remaining risk is command density, not conceptual repetition.
- One crafted line per slide is compatible with the deck’s design. The generated feel appears when every visual layer is independently optimized for punch.

## Precedents & Lessons

Seven related change sequences were analyzed.

### Precedent: Generic project labels became personal details

**Commit(s)**: `2b5575a` — “Initial commit: NDC Oslo talk deck — live pipeline simulation” (2026-07-03); `8e1f2d3` — “content: personalise weekend idea chips” (2026-07-03)

**Blast radius**: initial deck across slides, simulation, styling, and configuration; follow-up concentrated in `slides.md`.

**Follow-up fixes**:

- `8e1f2d3` replaced generic side-project categories with the current personal list (`slides.md:40-48`).

**Takeaway**: The best historical tone improvement added specific life detail rather than a stronger slogan.

### Precedent: AI framing accumulated in adjacent synthesis beats

**Commit(s)**: `0b2263e` — “feat: reframe AI coding before examples section” (2026-07-06); `0e369e5` — “feat: synthesize AI as amplifier of existing constraints” (2026-07-06)

**Blast radius**: `slides.md` only.

**Follow-up fixes**:

- The current compression removed the late `That is…` glosses but retained the abstract amplify heading (`slides.md:458-466`).

**Takeaway**: Audit a rhetorical sequence as a unit; a reasonable line can become templated through its neighbors.

### Precedent: Progress labels were intentionally made punchier

**Commit(s)**: `5ff907f` — “feat: subtle grouped progress bar across deck” (2026-07-06); `bcedf56` — “feat: label progress bar sections” (2026-07-06); `5f7a1e4` — “style: punchier progress section labels” (2026-07-06)

**Blast radius**: `global-bottom.vue`, with section-language alignment in `slides.md`.

**Follow-up fixes**:

- `c91b8b9` clarified that the examples section counts categories, not slides.
- The current working tree removes the temporary comparison-appendix label and maps Q&A to slide 35 (`global-bottom.vue:8-15`).

**Takeaway**: Footer cleanup is low priority because slogan energy was a deliberate earlier preference.

### Precedent: Interactive copy was corrected after it spoiled the reveal

**Commit(s)**: `c7d1754` — “feat: 'the constraint moves' slide - Review is the next bottleneck” (2026-07-03); `7059adc` — “feat: workReview slide is press-to-play like workMap” (2026-07-06); `2158c1a` — “fix: workReview caption no longer spoils the Review reveal” (2026-07-06)

**Blast radius**: `components/PipelineSim.vue` and `slides.md`.

**Follow-up fixes**:

- The caption changed from an answer to a question, but still carries a polished absolute before it (`components/PipelineSim.vue:109-110`).

**Takeaway**: Titles, captions, notes, and interaction state must be edited as one narrative unit.

### Precedent: Concrete diagrams replaced abstract claims

**Commit(s)**: `ca4b6b5` — “feat: PR-queue timeline redesign with context-decay meters” (2026-07-06); `3161757` — “feat: sharper title on the context-decay slide” (2026-07-06); `4354ef4` — “feat: replace quality slide with deploy trust spiral” (2026-07-06)

**Blast radius**: `slides.md` and `style.css`.

**Follow-up fixes**:

- The context and trust slides now earn their aphorisms through visible causality (`slides.md:319-400`).

**Takeaway**: Keep polished lines when the slide proves them; rewrite lines that merely certify their own importance.

### Precedent: Claims were grounded after copy was written

**Commit(s)**: `cee448b` — “feat: slide 17/18 numbers are now sourced research” (2026-07-06); `0b892a4` — “docs: research links in speaker notes (IDC, GitHub, GitClear, DORA, METR)” (2026-07-06)

**Blast radius**: `slides.md` and metric styling in `style.css`.

**Follow-up fixes**:

- Source links remain in private notes; no later correction appears through `dff4e6c`.

**Takeaway**: Evidence lets a concise headline stay concise. Generic emotional coaching around the evidence remains removable.

### Precedent: The practical ending was compressed

**Commit(s)**: `dff4e6c` — “refactor: compress the fix-the-pipe ending” (2026-07-28)

**Blast radius**: 4 files; 125 insertions and 62 deletions across `slides.md`, `components/PipelineSim.vue`, `global-bottom.vue`, and `style.css`.

**Follow-up fixes**:

- The current uncommitted working tree removes the temporary comparison appendix and its `cuts` footer section.

**Takeaway**: Compression resolved the original worst prose cluster. The next editorial pass should be selective, not another structural rewrite.

### Composite Lessons

- Personal specificity beats generic punch (`8e1f2d3`).
- Interactive visuals need observational copy, not pre-written conclusions (`2158c1a`).
- Concrete evidence earns rhetoric (`ca4b6b5`, `4354ef4`, `cee448b`).
- Repeated “sharper,” “synthesize,” and “punchier” edits explain the deck’s formula density; they do not establish AI authorship.
- The current compression (`dff4e6c`) is already the major structural fix. Remaining work is copy-level rationing.

## Historical Context (from `.rpiv/artifacts/`)

No prior `.rpiv/artifacts/` research, design, plan, or review documents were present when the scope trace ran.

## Developer Context

**Q (`slides.md:299`, `slides.md:419`, `slides.md:494`): Which register should guide replacements—the dry concrete baseline, balanced stage rhetoric, or minimal intervention?**  
A: Balanced stage voice. Keep keynote-style aphorisms where they earn their place; remove repeated formulas, vague personification, and redundant summaries.

**Q (`slides.md:458-563`, `global-bottom.vue:8-15`): The slides and order changed after the original scan; should research stop or refresh against the new sequence?**  
A: Keep going. Refresh the citations and findings against the changed deck.

## Related Research

No related repository research documents were found.

## Open Questions

1. Is `fixedConstraint` intended to demonstrate higher throughput, lower WIP, or both? The implementation currently demonstrates shorter queues and a better completion ratio at roughly the same absolute out-rate as `workBoost` (`components/PipelineSim.vue:124-173`, `components/PipelineSim.vue:488-569`).
2. Is the full competitive-advantage sentence in `slides.md:549` meant to be spoken verbatim or retained only as a private memory cue? Its editorial priority changes depending on that answer.
3. Should `no-header` simulations keep visible captions for standalone comprehension, or should the outer H1 and SVG accessible title carry the meaning (`slides.md:289-311`; `components/PipelineSim.vue:823-840`, `components/PipelineSim.vue:955`)?

## Sources

- Reinhart et al., “Do LLMs write like humans? Variation in grammatical and rhetorical styles”: <https://www.pnas.org/doi/10.1073/pnas.2422455122>
- Open preprint of the same study: <https://arxiv.org/html/2410.16107v1>
- Liu and Demberg, “ChatGPT vs Human-authored Text”: <https://aclanthology.org/2023.acl-srw.1/>
- Liang et al., “Monitoring AI-Modified Content at Scale”: <https://proceedings.mlr.press/v235/liang24b.html>
- OpenAI, “New AI classifier for indicating AI-written text”: <https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/>
- Penn State assertion-evidence slide research: <https://writing.engr.psu.edu/research.html>
- TED, “Create + prepare slides”: <https://www.ted.com/pages/create-prepare-slides>
- Andrew Murphy, original post: <https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems>
- Andrew Murphy, “The five stages of losing our craft”: <https://andrewmurphy.io/blog/the-five-stages-of-losing-our-craft>
