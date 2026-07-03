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

# If you thought the speed of writing code was your problem, you have bigger problems

<div class="subtitle">AI made my weekend projects feel impossible in the best way. Then it made work feel weird.</div>

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

<PipelineSim mode="weekendBefore" />

<!--
Before AI, the bottleneck in a weekend project is often just the lonely human doing all the mechanical work: scaffolding, wiring, debugging, styling, deploying.
-->

---

<PipelineSim mode="weekendAfter" />

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
  <p>Every system has <em>exactly one constraint</em>. The <em>throughput</em> of the system is determined by the <em>throughput</em> of <em>that constraint</em>.</p>
</div>

<!--
Keep this practical and visual. No long management theory detour. One bottleneck governs throughput. Land this lens BEFORE showing the work pipes, so the audience reads every pipe that follows through it.
-->

---

<PipelineSim mode="bottleneckRecap" />

<!--
Callback to the weekend pipe, now through the ToC lens: THIS is a bottleneck. The narrowest station set the throughput of the whole system — which is exactly why AI coding felt miraculous there.
-->

---

<PipelineSim mode="workUnknown" />

<!--
Now the work pipe with nothing highlighted. Ask the room and let it sit: where is the bottleneck in YOUR system? Every system has one. Most teams have never traced theirs.
-->

---

<PipelineSim mode="workBefore" />

<!--
So let's pretend the bottleneck IS code — the way everyone implicitly assumes. Hand-written code as the constriction, ideas queueing behind engineering. This is the world the weekend fix expects.
-->

---

<PipelineSim mode="workMap" />

<!--
Same developer. Same tool. Different system. At work the value stream is longer, more social, more gated, and more ambiguous.
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
Make the category error explicit. We assume the local improvement generalizes to the organizational system.
-->

---

# Optimising a non-bottleneck does not make the system faster

<div class="subtitle">It creates inventory.</div>

<!--
This is the scary corollary. Inventory in software is WIP, queues, stale PRs, half-made decisions, context loss.
-->

---

<PipelineSim mode="workBoost" />

<!--
Hero animation / visual. AI accelerates Build. Review is still constrained. The WIP pile avalanches. This is the money shot: you didn't speed delivery, you created a traffic jam and called it productivity.
-->

---

<div class="eyebrow">what-changed</div>

# Output went up. Throughput did not

<div class="card">
  <div class="metric">
    <div class="metric-label">Code output</div>
    <div class="metric-track"><div class="metric-bar" style="width: 92%"></div></div>
    <div class="metric-value">↑ 3x</div>
  </div>
  <div class="metric">
    <div class="metric-label">Review capacity</div>
    <div class="metric-track"><div class="metric-bar" style="width: 34%"></div></div>
    <div class="metric-value">same</div>
  </div>
  <div class="metric">
    <div class="metric-label">Deploy capacity</div>
    <div class="metric-track"><div class="metric-bar" style="width: 28%"></div></div>
    <div class="metric-value">same</div>
  </div>
  <div class="metric">
    <div class="metric-label">User value</div>
    <div class="metric-track"><div class="metric-bar" style="width: 31%"></div></div>
    <div class="metric-value">same-ish</div>
  </div>
</div>

<!--
Output metrics make people feel good. Throughput is what users feel. If the exit rate doesn't change, the system did not get faster.
-->

---

# You produced more code and shipped less software

<!--
Let this sting. It's the emotional version of the chart.
-->

---

<div class="eyebrow">bottleneck-suspect-1</div>

# You don't know what to build

<PipelineSim mode="discoveryBottleneck" />

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

<PipelineSim mode="postCodeBottleneck" />

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

<PipelineSim mode="fixedConstraint" />

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
