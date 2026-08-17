---
theme: default
title: If you thought the speed of writing code was your problem, you have bigger problems
info: |
  NDC Oslo 2026 talk draft by Andrew Murphy.
  Core thesis: AI coding is powerful when coding is the constraint; at work, the bottleneck is usually somewhere else.
class: cover-title
transition: fade
mdc: true
colorSchema: dark
fonts:
  sans: Inter
  serif: Inter
  mono: JetBrains Mono
drawings:
  persist: false
---

<!-- markdownlint-disable MD003 MD013 MD024 MD025 MD033 -->

<div class="eyebrow">ndc-oslo/60-min</div>

<p class="cover-setup">If you thought <em>the speed of writing code</em> was your problem…</p>

<h1 class="cover-punch">you have <span class="cover-grad">bigger problems</span></h1>

<div class="footer-line"><span class="brand-a">andrew</span>.murphy</div>

<!--
Opening posture: pro-AI, excited, personal. This is not a dunk-on-tools talk. It starts with the genuine magic of going from idea to working product quickly.
-->

---

<div class="eyebrow">the-personal-problem</div>

# So many ideas. So little time

<div class="idea-storm">
  <span style="left: 5%; top: 14%; --hue: 52; --rot: -8deg; --delay: 0s">egg counter</span>
  <span style="left: 26%; top: 9%; --hue: 332; --rot: 7deg; --delay: .2s">net worth app</span>
  <span style="left: 58%; top: 12%; --hue: 188; --rot: -4deg; --delay: .4s">coop door bot</span>
  <span style="left: 76%; top: 22%; --hue: 96; --rot: 11deg; --delay: .1s">solar monitor</span>
  <span style="left: 16%; top: 41%; --hue: 24; --rot: 6deg; --delay: .5s">dividend chart</span>
  <span style="left: 45%; top: 39%; --hue: 276; --rot: -10deg; --delay: .15s">chicken cam</span>
  <span style="left: 68%; top: 49%; --hue: 42; --rot: 5deg; --delay: .3s">budget scraper</span>
  <span style="left: 9%; top: 66%; --hue: 196; --rot: -5deg; --delay: .6s">smart blinds</span>
  <span style="left: 80%; top: 66%; --hue: 348; --rot: -12deg; --delay: .35s">1:1 notes tool</span>
  <div class="constraint">available weekends</div>
</div>

<!--
Make this human. The audience has side projects, ideas, little tools they wish existed. Historically those ideas died in the gap between enthusiasm and implementation.
-->

---

<PipelineSim mode="weekendBefore" :speed="1.5" />

<!--
Before AI, the bottleneck in a weekend project is often just the lonely human doing all the mechanical work: scaffolding, wiring, debugging, styling, deploying.
-->

---

<PipelineSim mode="weekendAfter" :speed="1" />

<!--
This is the honest excitement. AI coding attacked the actual constraint in the small system. Therefore throughput improved. Don't minimize this; it is the reason the talk has credibility.
-->

---

# Friday night: idea  

# Sunday afternoon: working product

<div class="subtitle">Not polished. Not enterprise-grade. But real. Clickable. Alive.</div>

<!--
Let the room feel the possibility. This is the promise people are chasing at work.
-->

---

# So why can't work feel like this?

<!--
Pause. This is the hinge. The audience expects a complexity answer. We give a constraint answer.
-->

---

# Because the bottleneck at work is not coding

<!--
This is the first big reveal. Say it cleanly. Do not soften it into “work is complicated”. The point is sharper: AI helped when coding was the constraint; at work coding usually isn't the constraint.
-->

---

<div class="eyebrow">goldratt-would-like-a-word</div>

# Theory of Constraints in one slide

<div class="quote-panel">
  <p>Every system has exactly <em>one constraint</em>. The <em>throughput</em> of the <i>system</i> is determined by the <em>throughput</em> of <i>that constraint</i>.</p>
</div>

<!--
Keep this practical and visual. No long management theory detour. One bottleneck governs throughput. Land this lens BEFORE showing the work pipes, so the audience reads every pipe that follows through it.
-->

---

<PipelineSim mode="bottleneckRecap" :speed="5" />

<!--
Callback to the weekend pipe, now through the ToC lens: THIS is a bottleneck. The narrowest station set the throughput of the whole system — which is exactly why AI coding felt miraculous there.
-->

---

<div class="eyebrow">the-receipts</div>

# Writing code is <em>16%</em> of an engineer's time

<div class="subtitle">The other 84% is the rest of the pipe</div>

<div class="footnote">IDC, “How Do Software Developers Spend Their Time?” (2025) — 16% in 2024, up from 15% the year before.</div>

<!--
Bridge from the weekend pipe to the work pipe. IDC's survey reports that developers spent 16% of a self-reported typical month developing applications. This is not directly observed keyboard time. The remaining 84% is arithmetic. Hold the contrast: you're about to see the work pipeline and guess where its bottleneck is.

Source: IDC, "How Do Software Developers Spend Their Time?" (Adam Resnick, Feb 2025) — https://www.idc.com/getdoc.jsp?containerId=US53204725 · coverage: https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html
-->

---

<PipelineSim mode="workBefore" :speed="32" />

<!--
The obvious bottleneck first: hand-written code is the narrow part everyone can see, ideas queueing behind engineering. This is the world the weekend fix expects — and here, widening Code genuinely would help.
-->

---

<PipelineSim mode="workMap" manual :speed="32" />

<!--
Now expand Code with AI — same pipe otherwise. Ask the room: where is the bottleneck NOW? Eyes go to the delivery end — Review, QA, Deploy. Press run: the queue forms at DISCOVERY, right at the start of the pipe. It was quietly the second-narrowest station all along (narrower than Review, Deploy in between — all honest bores). Knowing what to build is the constraint. This plants the seed for the discovery-bottleneck slide later.
-->

---

<div class="eyebrow">the-trap</div>

# We copied the weekend fix into the work system

<div class="two-col">
  <div class="card cool">
    <div class="mini-label">Weekend project</div>
    <p><strong>Coding was the constraint.</strong></p>
  </div>
  <div class="card hot">
    <div class="mini-label">Work project</div>
    <p><strong>Coding is one station.</strong></p>
  </div>
</div>

<!--
Make the category error explicit — the audience just watched it happen on the previous slide: Code got the AI boost, the jam formed at Discovery anyway. We assumed the local improvement generalizes to the organizational system.
-->

---

<PipelineSim mode="workReview" manual :speed="32" />

<!--
The constraint MOVES. Say the org invests in discovery — researchers, clearer problems. Run the same system: the queue surfaces at Review next, the slowest remaining rate. Fixing a bottleneck never removes the constraint; it relocates it. This is why the work never feels done.
-->

---

<div class="eyebrow">goldratt-has-a-second-word</div>

# Theory of Constraints in one <em>more</em> slide

<div class="quote-panel">
  <p>Optimising anything that is <em>not the constraint</em> doesn't just fail to help. It makes the system <em>worse</em> — more WIP, deeper queues, older context, later feedback.</p>
</div>

<div class="footnote">Yes, I said “one slide”. The scope grew after the estimate. It happens.</div>

<!--
Delayed callback — the audience saw "in one slide" several minutes ago. Deliver it first: "I know what I said. One slide. This is why estimation isn't the talk." Then land the corollary hard — Goldratt's version is "any improvement not made at the constraint is an illusion". Non-constraint improvements pump inventory into the system: queues grow, context decays while work waits, feedback arrives later, defects live longer. Worse, not just not-better. The next slide proves it live.
-->

---

<PipelineSim mode="workBoost" :speed="5" />

<!--
Hero animation / visual. AI accelerates Build. Review is still constrained. The WIP pile avalanches. This is the money shot: you didn't speed delivery, you created a traffic jam and called it productivity.
-->

---

<div class="eyebrow">what-changed</div>

# Output went up. Throughput did not

<div class="card">
  <div class="metric">
    <div class="metric-label">Coding speed</div>
    <div class="metric-track"><div class="metric-bar up" style="--scale: 0.55"></div></div>
    <div class="metric-value">↑ 55%</div>
  </div>
  <div class="metric">
    <div class="metric-label">Code churn</div>
    <div class="metric-track"><div class="metric-bar up" style="--scale: 1"></div></div>
    <div class="metric-value">× 2</div>
  </div>
  <div class="metric">
    <div class="metric-label">Delivery throughput</div>
    <div class="metric-track"><div class="metric-bar down" style="--scale: 0.015"></div></div>
    <div class="metric-value down">↓ 1.5%</div>
  </div>
  <div class="metric">
    <div class="metric-label">Delivery stability</div>
    <div class="metric-track"><div class="metric-bar down" style="--scale: 0.072"></div></div>
    <div class="metric-value down">↓ 7.2%</div>
  </div>
</div>

<div class="footnote">GitHub Copilot research (task speed) · GitClear 2024, 153M changed lines (churn vs 2021 baseline) · DORA 2024 (per 25% increase in AI adoption)</div>

<!--
These results come from separate studies, not one causal chain. GitHub found 55% faster completion on one JavaScript HTTP-server task. GitClear projected that 2024 code churn could double vs 2021 after analysing 153M changed lines. DORA estimated that each 25% increase in AI adoption was associated with 1.5% lower delivery throughput and 7.2% lower delivery stability; it did not establish causation.

Sources:
- GitHub 55%: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- GitClear churn projection: https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality
- DORA 2024 associations: https://dora.dev/research/2024/dora-report/
-->

---

# You produced more code and shipped less software

<div class="footnote">METR RCT, 2025: experienced developers using AI took 19% <em>longer</em> — while believing they had been 20% faster.</div>

<!--
Treat this as a historical result, not a current benchmark. METR's randomized controlled trial covered 16 experienced open-source developers working on real issues in their own repos: they were 19% slower with AI yet estimated they had been 20% faster. METR now labels the study out of date and not representative of current models.

Source: METR (July 2025) — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · paper: https://arxiv.org/abs/2507.09089
-->

---

<div class="eyebrow">not-a-villain</div>

# AI coding isn't the problem. It just isn't the <em>miracle</em>

<div class="subtitle">Faster typing only helps if you fix the pipeline it feeds.</div>

<!--
Explicit disclaimer so nobody hears "AI bad". The tool is genuinely good at the 16% it touches. But a local speedup at a non-constraint doesn't move throughput — it just fills queues faster. AI becomes a miracle only when you reassess the whole pipeline and point it at the actual constraint. That's the whole talk in one slide.
-->

---

<div class="eyebrow">the-usual-suspects</div>

# The constraint in the wild

<div class="subtitle">Four places the constraint hides.</div>

<!--
Section turn. The room already knows WHY delivery gets slower — the ToC lens did that. This section is recognition: four examples of where the constraint hides in real organisations. Expect nods. None of them is the keyboard.
-->

---

<div class="eyebrow">bottleneck-suspect-1</div>

# You don't know what to build

<PipelineSim mode="discoveryBottleneck" no-header :speed="5" />

<!--
The PM hasn't talked to a user, the ticket has three sentences and a Figma link, engineers make fifty micro-decisions and guess. AI makes guessing faster.
-->

---

# Writing code faster just means you arrive at “oh no” sooner

<!--
Good joke line. Use your own language on stage.
-->

---

<div class="eyebrow">bottleneck-suspect-2</div>

# Everything after code is “done”

<PipelineSim mode="postCodeBottleneck" no-header :speed="5" />

<!--
Code being written is not done. Code sitting in review, CI, QA, security, staging, approvals, deploy windows is inventory.
-->

---

<div class="eyebrow">the-horror-show</div>

# Code waits fine. <em>Context rots.</em>

<div class="timeline">
  <div class="timeline-legend">author's context remaining</div>
  <div class="timeline-row" style="--node: var(--deck-teal); --ctx: 100%">
    <span class="node"></span>
    <div class="time">Mon</div>
    <div class="event">PR opened.</div>
    <div class="ctx"><div class="ctx-track"><div class="ctx-bar"></div></div><span>100%</span></div>
  </div>
  <div class="timeline-row" style="--node: var(--deck-accent-strong); --ctx: 35%">
    <span class="node"></span>
    <div class="time">Thu</div>
    <div class="event">Review arrives.</div>
    <div class="ctx"><div class="ctx-track"><div class="ctx-bar"></div></div><span>35%</span></div>
  </div>
  <div class="timeline-row bad" style="--node: var(--deck-danger); --ctx: 0%">
    <span class="node"></span>
    <div class="time">Next Mon</div>
    <div class="event">“Why did we build it this way?”</div>
    <div class="ctx"><div class="ctx-track"><div class="ctx-bar"></div></div><span>0%</span></div>
  </div>
</div>

<!--
This is where people laugh because it hurts. Make it specific. Context decays while WIP grows.
-->

---

<div class="eyebrow">bottleneck-suspect-3</div>

# The deploy trust spiral

<div class="trust-loop">
  <div class="trust-step">
    <span class="step-id">1</span>
    <strong>Flaky tests</strong>
  </div>
  <div class="trust-step">
    <span class="step-id">2</span>
    <strong>Bigger batches</strong>
  </div>
  <div class="trust-step danger">
    <span class="step-id">3</span>
    <strong>Riskier releases</strong>
  </div>
  <div class="trust-step">
    <span class="step-id">4</span>
    <strong>Deploy less</strong>
  </div>
  <div class="trust-step danger">
    <span class="step-id">5</span>
    <strong>Trust drops</strong>
  </div>
</div>

<div class="trust-return">↺ and the cycle repeats</div>

<!--
This is straight from the original post's "deploy trust spiral". If your team is already scared to deploy, AI doesn't make you faster — it gives you more code to be scared of. Flaky tests and weak observability reduce trust; low trust makes teams batch changes; bigger batches are riskier; riskier releases happen less often; shipping less often further erodes trust.
-->

---

<div class="eyebrow">bottleneck-suspect-4</div>

# Your org runs on blocking I/O

<div class="quote-panel">
  <p>Sometimes the whole delivery system is blocked on <em>a meeting</em> with someone who is <em>on holiday</em>.</p>
</div>

<!--
Coordination is blocking I/O. More PRs just add requests to the queue; they do not make the dependency available.
-->

---

# No amount of Copilot refactors the org chart

<!--
Short sharp line.
-->

---

<div class="eyebrow">the-measurement-bug</div>

# Counting code output is counting widgets at the wrong station

<div class="two-col">
  <div class="card hot">
    <div class="mini-label">easy to count</div>
    <ul>
      <li>Lines of code</li>
      <li>PRs opened</li>
      <li>Story points “done”</li>
      <li>AI acceptance rate</li>
    </ul>
  </div>
  <div class="card cool">
    <div class="mini-label">actually matters</div>
    <ul>
      <li>Cycle time</li>
      <li>Wait time</li>
      <li>Deployment frequency</li>
      <li>User value delivered</li>
    </ul>
  </div>
</div>

<!--
If the metric watches Build, every improvement looks like Build. The system optimizes toward the dashboard.
-->

---

<div class="eyebrow">old-problems-faster</div>

# AI coding didn't invent this. It <em>amplifies</em> it

<div class="quote-panel">
  <p>Same queues. Same handoffs. Same incentives. More work arriving per minute.</p>
</div>

<!--
Synthesis beat and practical turn. We already knew these problems existed: vague requirements, review queues, deploy fear, calendar bottlenecks, bad metrics. AI coding increases the feed rate into the same constrained system. The useful response is to find where value now waits.
-->

---

<div class="eyebrow">what-to-do-instead</div>

# Find the constraint

<div class="three-col">
  <div class="card cool">
    <div class="mini-label">1 · map</div>
    <p>Follow one feature from idea to user.</p>
  </div>
  <div class="card">
    <div class="mini-label">2 · measure</div>
    <p>Mark every wait between steps.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">3 · fix</div>
    <p>Attack the largest wait.</p>
  </div>
</div>

<!--
One method, three moves. Map the real path, not the official process. Measure elapsed time and waiting, not activity inside one station. Then improve the station causing the largest delay. The constraint determines the intervention. Bring snacks. This will be depressing.
-->

---

<PipelineSim mode="fixedConstraint" :speed="5" />

<!--
A satisfying visual resolution: fewer piles, more value out. WIP limits reduce context switching and inventory. AI is still present, but the system gets faster because the real constraint was improved.
-->

---

<div class="eyebrow">use-ai-where-the-constraint-is</div>

# Is coding the bottleneck?

<div class="two-col">
  <div class="card cool">
    <div class="mini-label">yes</div>
    <p><strong>Use AI there.</strong></p>
  </div>
  <div class="card hot">
    <div class="mini-label">not sure</div>
    <p><strong>Find the constraint first.</strong></p>
  </div>
</div>

<!--
This keeps the talk pro-tool and pro-systems thinking. In a solo project or small system, implementation can genuinely be the constraint, so AI coding can directly increase throughput. In a larger organization, check whether work actually waits in discovery, review, confidence, deployment, or decisions.
-->

---

<div class="eyebrow">ai-at-the-constraint · 1/3</div>

# Compress discovery with AI

<div class="three-col">
  <div class="card cool">
    <div class="mini-label">input</div>
    <p>Tickets, interviews, research, and usage logs.</p>
  </div>
  <div class="card">
    <div class="mini-label">ask AI</div>
    <p>Cluster recurring pains, cite sources, expose contradictions.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">faster output</div>
    <p>Draft problem statements and open questions.</p>
  </div>
</div>

<!--
AI compresses scattered evidence into a reviewable starting point; it does not decide what to build. Example prompt: “Cluster these sources by user problem. For each theme, cite source IDs, estimate frequency, list contradictions, and draft a testable problem statement. Do not fill gaps—list open questions.” Product judgment remains human.
-->

---

<div class="eyebrow">ai-at-the-constraint · 2/3</div>

# Pre-review the PR with AI

<div class="three-col">
  <div class="card cool">
    <div class="mini-label">input</div>
    <p>Diff, acceptance criteria, architecture notes, test output.</p>
  </div>
  <div class="card">
    <div class="mini-label">ask AI</div>
    <p>Map impact; flag risky paths, missing tests, and edge cases.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">faster output</div>
    <p>Focused reviewer checklist and a split plan.</p>
  </div>
</div>

<!--
The goal is to reduce reviewer cognitive load before a human opens the PR, not generate more review comments. Example prompt: “Review this diff against the acceptance criteria and architecture notes. Map changed behavior, flag risky paths and missing tests, then propose how to split the PR. Return a focused reviewer checklist; do not approve it.” Human reviewers still own trade-offs, security judgment, and approval.
-->

---

<div class="eyebrow">ai-at-the-constraint · 3/3</div>

# Shorten the CI loop with AI

<div class="three-col">
  <div class="card cool">
    <div class="mini-label">input</div>
    <p>Failing and passing logs, test history, and the diff.</p>
  </div>
  <div class="card">
    <div class="mini-label">ask AI</div>
    <p>Cluster failures and rank likely causes.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">faster output</div>
    <p>Minimal repro and a targeted verification plan.</p>
  </div>
</div>

<!--
AI turns noisy failures into testable hypotheses; the team still verifies the fix. Example prompt: “Compare failed and passing runs with this diff. Cluster equivalent failures, rank likely causes with evidence, identify likely flakes, and draft the smallest repro plus commands to verify it. Treat every hypothesis as unconfirmed.”
-->

---

# Fix the bottleneck

<div class="subtitle">It's not the keyboard.</div>

<!--
Set up the final slide verbally: “The competitive advantage is not writing code fastest. It is figuring out what to build, building it, and getting it into users' hands while everyone else is drowning in WIP.” Then let the shorter line land. Pause after “bottleneck”, then after “keyboard”.
-->

---

<div class="eyebrow">thanks</div>

# Thanks. <em>Q&A</em>

<div class="subtitle">Questions?</div>

<p class="site-link"><a href="https://andrewmurphy.io/">andrewmurphy.io</a></p>

<p class="footnote">Thanks to <a href="https://www.linkedin.com/in/jecornwall/" target="_blank" rel="noopener noreferrer">Jason Cornwall</a> for the balls idea.</p>

<!--
Light outro after the punchline. Leave "Fix the bottleneck" as the real ending; this is just the room handoff.
-->

---

<div class="eyebrow">sources</div>

# Resources

<div class="resource-grid">
  <div class="resource-card">
    <span class="resource-slide">Slide 10</span>
    <div class="resource-title"><a href="https://www.idc.com/getdoc.jsp?containerId=US53204725" target="_blank" rel="noopener noreferrer">IDC · Developer time (2025)</a></div>
    <p>Self-reported application-development time: 16%; remaining 84% derived. <a class="resource-extra" href="https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html" target="_blank" rel="noopener noreferrer">Coverage ↗</a></p>
  </div>
  <div class="resource-card">
    <span class="resource-slide">Slide 17</span>
    <div class="resource-title"><a href="https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" target="_blank" rel="noopener noreferrer">GitHub · Copilot productivity</a></div>
    <p>One JavaScript task: 55% faster.</p>
  </div>
  <div class="resource-card">
    <span class="resource-slide">Slide 17</span>
    <div class="resource-title"><a href="https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality" target="_blank" rel="noopener noreferrer">GitClear · Coding on Copilot (2024)</a></div>
    <p>Projected 2024 churn: ≈2× 2021, from 153M changed lines.</p>
  </div>
  <div class="resource-card">
    <span class="resource-slide">Slide 17</span>
    <div class="resource-title"><a href="https://dora.dev/research/2024/dora-report/" target="_blank" rel="noopener noreferrer">DORA · 2024 report</a></div>
    <p>Per +25% AI adoption: −1.5% throughput; −7.2% stability (association).</p>
  </div>
  <div class="resource-card">
    <span class="resource-slide">Slide 18</span>
    <div class="resource-title"><a href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/" target="_blank" rel="noopener noreferrer">METR · Experienced OSS developers (2025)</a></div>
    <p>Historical RCT: 19% slower while estimating 20% faster. <a class="resource-extra" href="https://arxiv.org/abs/2507.09089" target="_blank" rel="noopener noreferrer">Paper ↗</a></p>
  </div>
</div>

<!--
Every dataset cited in the talk, collected in one place for the audience to follow up after Q&A.
-->
