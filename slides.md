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

<PipelineSim mode="bottleneckRecap" :speed="1" />

<!--
Callback to the weekend pipe, now through the ToC lens: THIS is a bottleneck. The narrowest station set the throughput of the whole system — which is exactly why AI coding felt miraculous there.
-->

---

<div class="eyebrow">the-receipts</div>

# Writing code is <em>16%</em> of an engineer's time

<div class="subtitle">The other 84% is the rest of the pipe</div>

<div class="footnote">IDC, “How Do Software Developers Spend Their Time?” (2025) — 16% in 2024, up from 15% the year before.</div>

<!--
Bridge from the weekend pipe to the work pipe. On the weekend, coding was most of the effort — and it was the constraint. At work, coding is 16% of an engineer's day. Hold that number: you're about to see the work pipeline and guess where its bottleneck is.

Source: IDC, "How Do Software Developers Spend Their Time?" (Adam Resnick, Feb 2025) — https://www.idc.com/getdoc.jsp?containerId=US53204725 · coverage: https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html
-->

---

<PipelineSim mode="workBefore" :speed="5" />

<!--
The obvious bottleneck first: hand-written code is the narrow part everyone can see, ideas queueing behind engineering. This is the world the weekend fix expects — and here, widening Code genuinely would help.
-->

---

<PipelineSim mode="workMap" manual :speed="5" />

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
    <p>Speeding up coding sped up the system.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">Work project</div>
    <p><strong>Coding is one station.</strong></p>
    <p>Speeding up one station may just feed the queue.</p>
  </div>
</div>

<!--
Make the category error explicit — the audience just watched it happen on the previous slide: Code got the AI boost, the jam formed at Discovery anyway. We assumed the local improvement generalizes to the organizational system.
-->

---

<PipelineSim mode="workReview" manual :speed="5" />

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

<PipelineSim mode="workBoost" :speed="1" />

<!--
Hero animation / visual. AI accelerates Build. Review is still constrained. The WIP pile avalanches. This is the money shot: you didn't speed delivery, you created a traffic jam and called it productivity.
-->

---

<div class="eyebrow">what-changed</div>

# Output went up. Throughput did not

<div class="card">
  <div class="metric">
    <div class="metric-label">Coding speed</div>
    <div class="metric-track"><div class="metric-bar" style="width: 78%"></div></div>
    <div class="metric-value">↑ 55%</div>
  </div>
  <div class="metric">
    <div class="metric-label">Code churn</div>
    <div class="metric-track"><div class="metric-bar" style="width: 92%"></div></div>
    <div class="metric-value">× 2</div>
  </div>
  <div class="metric">
    <div class="metric-label">Delivery throughput</div>
    <div class="metric-track"><div class="metric-bar down" style="width: 8%"></div></div>
    <div class="metric-value down">↓ 1.5%</div>
  </div>
  <div class="metric">
    <div class="metric-label">Delivery stability</div>
    <div class="metric-track"><div class="metric-bar down" style="width: 18%"></div></div>
    <div class="metric-value down">↓ 7.2%</div>
  </div>
</div>

<div class="footnote">GitHub Copilot research (task speed) · GitClear 2024, 153M changed lines (churn vs 2021 baseline) · DORA 2024 (per 25% increase in AI adoption)</div>

<!--
Every number is sourced. GitHub's own research: 55% faster task completion with Copilot. GitClear analysed 153M changed lines: code churn — lines reverted or rewritten within two weeks — doubled vs the pre-AI baseline. And DORA 2024: for every 25% increase in AI adoption, delivery throughput dips 1.5% and delivery stability drops 7.2%. Individually faster, collectively slower. The system did not get faster — it got noisier.

Sources:
- GitHub 55%: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- GitClear churn: https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality
- DORA 2024: https://dora.dev/research/2024/dora-report/
-->

---

# You produced more code and shipped less software

<div class="footnote">METR RCT, 2025: experienced developers using AI took 19% <em>longer</em> — while believing they had been 20% faster.</div>

<!--
Let this sting. It's the emotional version of the chart. The METR randomized controlled trial is the kicker: 16 experienced open-source devs, real issues in their own repos — 19% slower with AI, yet they self-reported a 20% speedup. Even the perception of speed is unreliable.

Source: METR (July 2025) — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · paper: https://arxiv.org/abs/2507.09089
-->

---

<div class="eyebrow">the-usual-suspects</div>

# The constraint in the wild

<div class="subtitle">Four examples you will recognise.</div>

<!--
Section turn. The room already knows WHY delivery gets slower — the ToC lens did that. This section is recognition: four examples of where the constraint hides in real organisations. Expect nods. None of them is the keyboard.
-->

---

<div class="eyebrow">bottleneck-suspect-1</div>

# You don't know what to build

<PipelineSim mode="discoveryBottleneck" :speed="1" />

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

<PipelineSim mode="postCodeBottleneck" :speed="1" />

<!--
Code being written is not done. Code sitting in review, CI, QA, security, staging, approvals, deploy windows is inventory.
-->

---

<div class="eyebrow">the-horror-show</div>

# The PR queue remembers what you forgot

<div class="timeline">
  <div class="timeline-row"><div class="time">Monday</div><div class="event">PR opened. Author still has all the context.</div></div>
  <div class="timeline-row"><div class="time">Tuesday</div><div class="event">Author starts the next AI-assisted feature.</div></div>
  <div class="timeline-row"><div class="time">Thursday</div><div class="event">Review comments arrive. Nobody remembers the edge cases.</div></div>
  <div class="timeline-row"><div class="time">Friday</div><div class="event">Rubber stamp, flaky CI, deploy delayed.</div></div>
  <div class="timeline-row"><div class="time">Monday</div><div class="event">“Wait, why did we build it this way?”</div></div>
</div>

<!--
This is where people laugh because it hurts. Make it specific. Context decays while WIP grows.
-->

---

<div class="eyebrow">bottleneck-suspect-3</div>

# Quality does not scale because typing got cheaper

<div class="two-col">
  <div class="card hot">
    <div class="mini-label">more code</div>
    <p>More surface area. More branches. More integration points. More things nobody fully understands.</p>
  </div>
  <div class="card cool">
    <div class="mini-label">same system</div>
    <p>Same review energy. Same test confidence. Same shared understanding. Same production blast radius.</p>
  </div>
</div>

<!--
This is not anti-AI. It is anti-confusing generation with comprehension. The bottleneck might be understanding.
-->

---

<div class="eyebrow">bottleneck-suspect-4</div>

# Your calendar is a load-bearing wall

<div class="quote-panel">
  <p>Sometimes the entire delivery system is waiting for <em>a meeting</em> with someone who is <em>on holiday</em>.</p>
</div>

<!--
Coordination is a real constraint. AI cannot refactor the org chart by producing more PRs.
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

# Where does value get stuck?

<div class="subtitle">That is the question AI should make louder.</div>

<!--
Transition from diagnosis to what to do instead.
-->

---

<div class="eyebrow">what-to-do-instead</div>

# Map the value stream

<ul class="checklist">
  <li>Follow one feature from idea to user value.</li>
  <li>Write down every step.</li>
  <li>Write down every wait between steps.</li>
  <li>Bring snacks. This will be depressing.</li>
</ul>

<!--
Make it actionable and boring. The boring thing is the thing that works.
-->

---

<div class="eyebrow">what-to-do-instead</div>

# Measure cycle time, not output

<div class="quote-panel">
  <p>The gap <em>between</em> steps is where your <em>delivery time</em> lives.</p>
</div>

<!--
Emphasize elapsed time from idea/commit to production/use, not activity inside one station.
-->

---

<div class="eyebrow">what-to-do-instead</div>

# Find the wait states and kill them

<div class="two-col">
  <div class="card hot">
    <div class="mini-label">if this waits</div>
    <p>PR review, deploy approval, security signoff, product decision, flaky CI</p>
  </div>
  <div class="card cool">
    <div class="mini-label">fix that station</div>
    <p>Smaller PRs, pairing, dedicated review time, automated gates, fast feedback, delegated decisions</p>
  </div>
</div>

<!--
Do not prescribe one universal fix. The fix depends on the actual constraint.
-->

---

# Stop starting. Start finishing

<div class="subtitle">Ten things in flight is not faster than three things done.</div>

<!--
WIP limits. Context switching. Inventory. This connects directly to the avalanche visual.
-->

---

<PipelineSim mode="fixedConstraint" :speed="1" />

<!--
A satisfying visual resolution: fewer piles, more value out. AI is still present, but the system improvement comes from fixing the real constraint.
-->

---

<div class="eyebrow">use-ai-where-the-constraint-is</div>

# If coding is the bottleneck, great. Use AI there

<div class="two-col">
  <div class="card cool">
    <div class="mini-label">solo / small system</div>
    <p>AI coding can directly increase throughput because the constraint really is implementation.</p>
  </div>
  <div class="card hot">
    <div class="mini-label">larger org system</div>
    <p>Look first. The constraint might be discovery, review, confidence, deployment, or decisions.</p>
  </div>
</div>

<!--
This keeps the talk pro-tool and pro-systems thinking.
-->

---

<div class="eyebrow">ai-at-the-constraint</div>

# Better questions

<ul class="checklist">
  <li>If discovery is stuck: can AI help synthesize research, logs, support tickets?</li>
  <li>If review is stuck: can AI help make PRs smaller, clearer, safer?</li>
  <li>If CI is stuck: can AI help isolate flaky tests and shorten feedback loops?</li>
  <li>If decisions are stuck: can AI make tradeoffs explicit enough to decide?</li>
</ul>

<!--
This is the practical reframing: not “where can we generate code?” but “where is the constraint and how can AI help there?”
-->

---

# The competitive advantage is not writing code fastest

<div class="subtitle">It is figuring out what to build, building it, and getting it into users' hands while everyone else is drowning in WIP.</div>

<!--
Almost the blog's final argument. Make it land.
-->

---

# Fix the bottleneck

<div class="subtitle">It's not the keyboard.</div>

<!--
Final line. Pause after “bottleneck”, then after “keyboard”.
-->
