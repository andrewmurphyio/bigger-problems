<script setup lang="ts">
import type { PipelineSimEvent, PipelineSimHoverTarget } from '../composables/pipelineSimSync.ts'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { usePipelineSimSync } from '../composables/usePipelineSimSync.ts'

type Stage = {
  label: string
  sub?: string
  rate?: number
  queue?: number
  bottleneck?: boolean
  subtle?: boolean
  boosted?: boolean
  faded?: boolean
  sheds?: boolean
}

type Scenario = {
  eyebrow: string
  title: string
  caption: string
  pace?: number
  preFill?: number
  coldStart?: boolean
  timeScale?: number
  stages: Stage[]
}

const props = withDefaults(defineProps<{ mode?: string, manual?: boolean, speed?: number, noHeader?: boolean }>(), {
  mode: 'workBoost',
  manual: false,
  speed: undefined,
  noHeader: false,
})

const scenarios: Record<string, Scenario> = {
  weekendBefore: {
    eyebrow: 'small system',
    title: 'Weekend projects before AI',
    caption: 'Ideas were waiting behind the slowest part of the pipe: me turning them into working code.',
    stages: [
      { label: 'Ideas', sub: 'too many', rate: 5, queue: 10 },
      { label: 'Coding', sub: 'nights + weekends', rate: 1, bottleneck: true, sheds: true, queue: 1 },
      { label: 'Working thing', sub: 'eventually', rate: 3 },
    ],
  },
  weekendAfter: {
    eyebrow: 'constraint attacked',
    title: 'Weekend projects with AI coding',
    caption: 'When coding really is the bottleneck, more ideas make it through the pipe.',
    stages: [
      { label: 'Ideas', sub: 'still too many', rate: 5, queue: 2 },
      { label: 'Coding', sub: 'AI-assisted', rate: 6, boosted: true, queue: 0 },
      { label: 'Working thing', sub: 'Sunday afternoon', rate: 5 },
    ],
  },
  bottleneckRecap: {
    eyebrow: 'goldratt would like a word',
    title: 'This is a bottleneck',
    caption: 'The narrowest station sets the throughput of the whole system. Nothing else matters until it moves.',
    stages: [
      { label: 'Ideas', sub: 'too many', rate: 5, queue: 10 },
      { label: 'Coding', sub: 'nights + weekends', rate: 1, bottleneck: true, sheds: true, queue: 1 },
      { label: 'Working thing', sub: 'eventually', rate: 3 },
    ],
  },
  workBefore: {
    eyebrow: 'the obvious bottleneck',
    title: 'The obvious bottleneck: coding',
    caption: 'Hand-written code is the narrow part everyone can see. Ideas queue behind engineering.',
    pace: 5,
    stages: [
      { label: 'Idea', rate: 6, queue: 2 },
      { label: 'Discovery', sub: 'what problem?', rate: 2.4, queue: 2 },
      { label: 'Prioritise', sub: 'whose goal?', rate: 4.2, sheds: true, queue: 2 },
      { label: 'Code', sub: 'by hand', rate: 1, bottleneck: true, queue: 2 },
      { label: 'Review', sub: 'humans', rate: 2.7, queue: 2 },
      { label: 'CI / QA', sub: 'confidence', rate: 5, queue: 1 },
      { label: 'Deploy', sub: 'permission', rate: 3.4, queue: 1 },
      { label: 'User', sub: 'value', rate: 3 },
    ],
  },
  workMap: {
    // Identical to workBefore except one thing: the Coding stage got MUCH
    // bigger (AI boost). The honest twist: Discovery has quietly been the
    // second-narrowest station all along — narrower than Review, with Deploy
    // between them. All eyes go to the delivery end; the jam forms at the
    // START of the pipe. Knowing what to build is the true constraint.
    eyebrow: 'place your bets',
    title: 'Code is wide now. Where is the bottleneck?',
    caption: 'Guess first — then run the system and watch where the queue forms.',
    pace: 5,
    coldStart: true,
    stages: [
      { label: 'Idea', rate: 6, queue: 2 },
      { label: 'Discovery', sub: 'what problem?', rate: 2.4, bottleneck: true, subtle: true, queue: 2 },
      { label: 'Prioritise', sub: 'whose goal?', rate: 4.2, sheds: true, queue: 2 },
      { label: 'Code', sub: 'faster now', rate: 8, boosted: true, queue: 2 },
      { label: 'Review', sub: 'humans', rate: 2.7, queue: 2 },
      { label: 'CI / QA', sub: 'confidence', rate: 5, queue: 1 },
      { label: 'Deploy', sub: 'permission', rate: 3.4, queue: 1 },
      { label: 'User', sub: 'value', rate: 3 },
    ],
  },
  workReview: {
    // Identical to workMap except ONE change: Discovery got the investment
    // (rate 2.4 -> 5, highlighted alongside Code as the fixed stations).
    // Review is now the slowest remaining gate, so the jam surfaces there
    // next. The constraint never disappears; it moves.
    eyebrow: 'the constraint moves',
    title: 'Fix discovery. The bottleneck moves again.',
    caption: 'Discovery got the investment. Nothing else did. Where does the queue form now?',
    pace: 5,
    coldStart: true,
    stages: [
      { label: 'Idea', rate: 6, queue: 2 },
      { label: 'Discovery', sub: 'researched', rate: 5, boosted: true, queue: 2 },
      { label: 'Prioritise', sub: 'whose goal?', rate: 4.2, sheds: true, queue: 2 },
      { label: 'Code', sub: 'faster now', rate: 8, boosted: true, queue: 2 },
      { label: 'Review', sub: 'humans', rate: 2.7, bottleneck: true, subtle: true, queue: 2 },
      { label: 'CI / QA', sub: 'confidence', rate: 5, queue: 1 },
      { label: 'Deploy', sub: 'permission', rate: 3.4, queue: 1 },
      { label: 'User', sub: 'value', rate: 3 },
    ],
  },
  workBoost: {
    eyebrow: 'non-bottleneck optimisation',
    title: 'AI accelerates build. The system does not accelerate.',
    caption: 'The balls are ideas. If review is the constraint, faster coding creates back-pressure before review.',
    stages: [
      { label: 'Idea', rate: 6, queue: 3 },
      { label: 'Discovery', sub: 'ambiguous', rate: 3, queue: 4 },
      { label: 'Code', sub: 'AI boost', rate: 8, boosted: true, queue: 22 },
      { label: 'Review', sub: 'constraint', rate: 2, bottleneck: true, queue: 7 },
      { label: 'CI / QA', sub: 'wait', rate: 3, queue: 4 },
      { label: 'Deploy', sub: 'gate', rate: 3, queue: 2 },
      { label: 'User', sub: 'still waiting', rate: 3 },
    ],
  },
  discoveryBottleneck: {
    eyebrow: 'bottleneck suspect',
    title: 'Sometimes the constraint is knowing what to build',
    caption: 'Faster coding does not help when ideas are blocked before implementation starts.',
    stages: [
      { label: 'Idea', rate: 7, queue: 13 },
      { label: 'Discovery', sub: 'constraint', rate: 1, bottleneck: true, sheds: true, queue: 4 },
      { label: 'Code', sub: 'fast', rate: 6, boosted: true, faded: true, queue: 1 },
      { label: 'Ship', sub: 'wrong thing?', rate: 2 },
    ],
  },
  postCodeBottleneck: {
    eyebrow: 'bottleneck suspect',
    title: 'Sometimes “done” is where waiting begins',
    caption: 'Ideas do not reach users while they are stuck behind review, CI, QA, approvals, or release windows.',
    stages: [
      { label: 'Code', sub: 'done', rate: 7, boosted: true, queue: 20 },
      { label: 'Review', sub: 'constraint', rate: 2, bottleneck: true, queue: 10 },
      { label: 'CI', sub: 'flake?', rate: 3, queue: 6 },
      { label: 'QA', sub: 'handoff', rate: 3, queue: 4 },
      { label: 'Deploy', sub: 'window', rate: 2.5, queue: 2 },
      { label: 'User', sub: 'eventually', rate: 2 },
    ],
  },
  fixedConstraint: {
    eyebrow: 'system optimisation',
    title: 'Stop starting. Start finishing.',
    caption: 'Ten things in flight is not faster than three things done.',
    stages: [
      { label: 'Idea', rate: 4, queue: 1 },
      { label: 'Discovery', sub: 'clearer', rate: 4, queue: 1 },
      { label: 'Code', sub: 'AI-assisted', rate: 5, boosted: true, queue: 2 },
      { label: 'Review', sub: 'smaller PRs', rate: 5, boosted: true, queue: 1 },
      { label: 'CI / QA', sub: 'fast feedback', rate: 4, queue: 1 },
      { label: 'Deploy', sub: 'boring', rate: 4, queue: 0 },
      { label: 'User', sub: 'value', rate: 4 },
    ],
  },
}

const scenario = computed(() => scenarios[props.mode] ?? scenarios.workBoost)
const ballSpeed = computed(() => BALL_SPEED * (scenario.value.pace ?? 1))

// --- One continuous pipe: geometry in SVG user units ---

const VIEW_W = 1000
const VIEW_H = 232
const CY = 116
const PIPE_X0 = 26
const PIPE_X1 = 974

type StageGeom = {
  stage: Stage
  x: number
  h: number
  xa: number
  xb: number
}

function caliberFor(stage: Stage) {
  // Bore is an explicit, honest function of service rate — always. The
  // visual never lies about capacity.
  const rate = stage.rate ?? 1
  return Math.min(36, Math.max(7, 4 + rate * 4.2))
}

const geom = computed(() => {
  const stages = scenario.value.stages
  const n = stages.length
  const span = (PIPE_X1 - PIPE_X0) / n
  const items: StageGeom[] = stages.map((stage, i) => ({
    stage,
    x: PIPE_X0 + span * (i + 0.5),
    h: caliberFor(stage),
    xa: 0,
    xb: 0,
  }))
  for (let i = 0; i < n; i++) {
    const prev = items[i - 1]
    const next = items[i + 1]
    items[i].xa = prev ? (prev.x + items[i].x) / 2 : PIPE_X0
    items[i].xb = next ? (items[i].x + next.x) / 2 : PIPE_X1
  }
  return items
})

function smooth(u: number) {
  const t = Math.min(1, Math.max(0, u))
  return t * t * (3 - 2 * t)
}

// Each station holds its own bore for its whole span (a plateau), with a
// short transition at each boundary. Real organisations are lumpy pipes.
const TRANSITION = 26

function caliberAt(x: number) {
  const items = geom.value
  if (!items.length) return 18
  if (x <= items[0].xa) return items[0].h
  for (let i = 0; i < items.length; i++) {
    const g = items[i]
    if (x > g.xb && i < items.length - 1) continue
    const prev = items[i - 1]
    const next = items[i + 1]
    if (prev && x < g.xa + TRANSITION / 2) {
      const t = smooth((x - (g.xa - TRANSITION / 2)) / TRANSITION)
      return prev.h + (g.h - prev.h) * t
    }
    if (next && x > g.xb - TRANSITION / 2) {
      const t = smooth((x - (g.xb - TRANSITION / 2)) / TRANSITION)
      return g.h + (next.h - g.h) * t
    }
    return g.h
  }
  return items[items.length - 1].h
}

function sampledEdge(g: StageGeom, sign: number) {
  const pts: string[] = []
  const steps = Math.max(6, Math.round((g.xb - g.xa) / 6))
  for (let k = 0; k <= steps; k++) {
    const x = g.xa + ((g.xb - g.xa) * k) / steps
    pts.push(`${x.toFixed(1)} ${(CY + sign * caliberAt(x)).toFixed(1)}`)
  }
  return pts
}

function topPath(g: StageGeom) {
  return `M ${sampledEdge(g, -1).join(' L ')}`
}

function bottomPath(g: StageGeom) {
  return `M ${sampledEdge(g, 1).join(' L ')}`
}

function fillPath(g: StageGeom) {
  const top = sampledEdge(g, -1)
  const bottom = sampledEdge(g, 1).reverse()
  return `M ${top.join(' L ')} L ${bottom.join(' L ')} Z`
}

function scaledEdge(g: StageGeom, sign: number, k: number) {
  const pts: string[] = []
  const steps = Math.max(6, Math.round((g.xb - g.xa) / 6))
  for (let s = 0; s <= steps; s++) {
    const x = g.xa + ((g.xb - g.xa) * s) / steps
    pts.push(`${x.toFixed(1)} ${(CY + sign * caliberAt(x) * k).toFixed(1)}`)
  }
  return pts
}

// The hatched region between the pipe wall and the utilised inner band:
// capacity the organisation pays for but does not use.
function wastePath(g: StageGeom, util: number) {
  const k = Math.min(1, Math.max(0.12, util))
  if (k >= 0.97) return ''
  const topOuter = scaledEdge(g, -1, 1)
  const topInner = scaledEdge(g, -1, k).reverse()
  const botOuter = scaledEdge(g, 1, 1)
  const botInner = scaledEdge(g, 1, k).reverse()
  return `M ${topOuter.join(' L ')} L ${topInner.join(' L ')} Z `
    + `M ${botOuter.join(' L ')} L ${botInner.join(' L ')} Z`
}

// --- Live queue simulation ---
// Every ball is one entity: it enters on the left, queues behind the gate at
// each station, is released at that station's service rate, and flows on.
// Overflow happens only when a ball arrives at a queue that is actually full.

const RATE_SCALE = 0.28 // stage rate -> balls per second of service
const BALL_SPEED = 60 // units per second while flowing
const LANES = [-3, 0, 3, -1.6, 1.6]

// Ball colour tracks how much of the pipeline has worked on the idea.
// The ramp runs raw idea (violet) -> coded/value (teal) through distinct
// waypoint hues, so every station visibly turns the ball from one colour
// to the next. A ball keeps its colour once a stage has transformed it.
const COLOR_RAMP = [
  [215, 131, 220], // #d783dc raw idea (site violet)
  [151, 71, 255], // #9747ff purple
  [106, 92, 255], // #6a5cff violet-blue
  [74, 125, 255], // #4a7dff blue
  [45, 176, 205], // #2db0cd cyan
  [3, 218, 197], // #03dac5 coded / value (site teal)
]
const STUCK_RGB = [207, 102, 121]

function mixRgb(from: number[], to: number[], t: number) {
  const u = Math.min(1, Math.max(0, t))
  return [
    from[0] + (to[0] - from[0]) * u,
    from[1] + (to[1] - from[1]) * u,
    from[2] + (to[2] - from[2]) * u,
  ]
}

function rampColor(progress: number) {
  const t = Math.min(1, Math.max(0, progress)) * (COLOR_RAMP.length - 1)
  const i = Math.min(COLOR_RAMP.length - 2, Math.floor(t))
  return mixRgb(COLOR_RAMP[i], COLOR_RAMP[i + 1], t - i)
}

type SimBall = {
  id: number
  x: number
  y: number
  lane: number
  state: 'flow' | 'queued' | 'spill'
  gatePos: number
  hot: boolean
  active: boolean
  progress: number
  cr: number
  cg: number
  cb: number
  fill: string
  opacity: number
  spillT: number
  spillX: number
  spillY: number
}

type SimGate = {
  bottleneck: boolean
  cap: number
  interval: number
  queue: number[]
  serving: number | null
  sheds: boolean
  slots: { x: number, y: number }[]
  timer: number
  x: number
}

const rootEl = ref<HTMLElement | null>(null)
const balls = shallowRef<SimBall[]>([])
const gates = shallowRef<SimGate[]>([])
const started = ref(false)
// Live tuning dial: ABSOLUTE speed level 1-10. The same number means the
// same ball speed on every pipeline (level x 60 units/sec of travel); each
// scenario's tuned pace sets its default position.
const speedLevel = ref(1)
// Dial position 1..10 is a linear ×1..×10. Past 10 it turns logarithmic:
// each extra notch is a decade — 11 → ×100, 12 → ×1000.
const speedFactor = computed(() =>
  speedLevel.value <= 10 ? speedLevel.value : Math.round(10 ** (speedLevel.value - 9)),
)

// Steady-state throughput and utilisation, derived analytically from the
// configured rates: flow through any station is min(demand, every upstream
// service rate). Static per scenario — the physics, not a noisy sample.
const flowStats = ref({ inRate: 0, outRate: 0 })
const stageUtil = ref<number[]>([])
const showWaste = ref(false)
const remoteHoverTarget = ref<PipelineSimHoverTarget | null>(null)

let nextId = 1
let rafHandle = 0
let lastTime = 0
let spawnTimer = 0
let spawnIntervalSec = 1
let running = false
let isVisible = false
let observer: IntersectionObserver | null = null

function buildSlots(gateX: number, minX: number) {
  // Physical queue slots between this gate and the previous station.
  // Single file on the centerline: slot index = position in line, so when
  // the head is served every dot steps one slot toward the gate. The queue
  // reads as a queue — no vertical shuffling between rows.
  const out: { x: number, y: number }[] = []
  for (let i = 0; out.length < 30; i++) {
    const x = gateX - 16 - i * 9
    if (x < minX) break
    out.push({ x, y: CY })
  }
  return out
}

function buildSim() {
  const items = geom.value
  const stages = scenario.value.stages
  const gs: SimGate[] = []

  // A gate sits at every station after the entry stage; the final stage is the exit.
  const timeScale = scenario.value.timeScale ?? 1
  for (let j = 1; j <= items.length - 2; j++) {
    const stage = stages[j]
    const rate = stage.rate ?? 1
    const seed = Math.min(stages[j - 1].queue ?? 0, 26)
    const interval = 1 / (rate * RATE_SCALE * timeScale)
    const sheds = Boolean(stage.sheds)
    const slots = buildSlots(items[j].x, items[j - 1].x + 24)
    gs.push({
      bottleneck: Boolean(stage.bottleneck),
      // No station ever holds more than 10 items. Shedding gates drop work
      // at capacity; everywhere else a full queue blocks the upstream gate
      // and pressure backs up the pipe.
      cap: Math.min(10, sheds ? Math.max(seed, 8) : slots.length),
      interval,
      queue: [],
      serving: null,
      sheds,
      slots,
      timer: interval * (0.3 + (((j * 7) % 10) / 10) * 0.5),
      x: items[j].x,
    })
  }

  const bs: SimBall[] = []

  // Queues start EMPTY on slide entry by default: the audience watches ideas
  // stack up live behind each constraint. Scenarios can opt into preFill to
  // start the story mid-flight (for example: code just got faster).
  // Manual slides always begin completely empty: the pipe is a still diagram
  // until the presenter presses run.
  const preFill = props.manual || scenario.value.coldStart ? 0 : (scenario.value.preFill ?? 0)
  if (preFill > 0) {
    for (let gi = 0; gi < gs.length; gi++) {
      const gate = gs[gi]
      const seedCount = Math.min(
        Math.round((stages[gi].queue ?? 0) * preFill),
        gate.slots.length,
        gate.cap,
      )
      for (let s = 0; s < seedCount; s++) {
        const slot = gate.slots[s]
        const progress = gi / Math.max(1, gs.length)
        const [cr, cg, cb] = rampColor(progress)
        const ball: SimBall = {
          id: nextId++,
          x: slot.x,
          y: slot.y,
          lane: LANES[s % LANES.length],
          state: 'queued',
          gatePos: gi,
          hot: false,
          active: false,
          progress,
          cr,
          cg,
          cb,
          fill: `rgb(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)})`,
          opacity: 1,
          spillT: 0,
          spillX: 0,
          spillY: 0,
        }
        gate.queue.push(ball.id)
        bs.push(ball)
      }
    }
  }

  const bottleneckGates = gs.filter((gate) => gate.bottleneck)
  if (bottleneckGates.length) {
    const slowestService = Math.min(...bottleneckGates.map((gate) => 1 / gate.interval))
    spawnIntervalSec = 1 / (slowestService + 1)
  } else {
    const entryRate = stages[0].rate ?? 3
    const gateRates = gs.map((gate) => 1 / gate.interval / RATE_SCALE)
    spawnIntervalSec = 1 / (Math.min(entryRate, ...gateRates) * RATE_SCALE)
  }

  // Half-density stream: fewer balls in the pipe, same service rates.
  spawnIntervalSec *= 2

  // Time-lapse scenarios run the whole system faster so consequences appear
  // within seconds of the slide loading.
  spawnIntervalSec /= timeScale

  // Pre-fill the through-flow at steady-state density so the number of balls
  // in transit looks constant from the first frame: each segment carries what
  // the slower of spawn rate / upstream service rates lets through.
  const coldStart = props.manual || Boolean(scenario.value.coldStart)
  let throughputPerSec = 1 / spawnIntervalSec
  let segStart = -8
  for (let seg = 0; !coldStart && seg <= gs.length; seg++) {
    const segEnd = seg < gs.length ? gs[seg].x - 26 : VIEW_W + 8
    const len = Math.max(0, segEnd - segStart)
    const count = Math.round((throughputPerSec * len) / ballSpeed.value)
    for (let k = 0; k < count; k++) {
      const jitter = (((k * 37) % 11) - 5) * 1.6
      const x = segStart + ((k + 0.5) * len) / count + jitter
      const lane = LANES[(k + seg) % LANES.length]
      const progress = seg / Math.max(1, gs.length)
      const [cr, cg, cb] = rampColor(progress)
      bs.push({
        id: nextId++,
        x,
        y: CY + lane,
        lane,
        state: 'flow',
        gatePos: seg,
        hot: false,
        active: false,
        progress,
        cr,
        cg,
        cb,
        fill: `rgb(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)})`,
        opacity: 1,
        spillT: 0,
        spillX: 0,
        spillY: 0,
      })
    }
    if (seg < gs.length) {
      // Nothing is seeded past the first constraint: the slide starts with an
      // empty downstream and output accumulates only as work actually passes.
      if (gs[seg].bottleneck) break
      throughputPerSec = Math.min(throughputPerSec, 1 / gs[seg].interval)
      segStart = gs[seg].x + 10
    }
  }

  spawnTimer = coldStart ? 0.3 : spawnIntervalSec * 0.5
  speedLevel.value = props.speed ?? scenario.value.pace ?? 1

  // Steady-state utilisation: flow through station i is min(demand, every
  // upstream service rate). Static per scenario — the constraint runs at
  // 100%, everything else shows its true wasted share.
  const spawnRate = 1 / spawnIntervalSec
  const utils: number[] = []
  utils.push(Math.min(1, spawnRate / ((stages[0].rate ?? 1) * RATE_SCALE * timeScale)))
  let flow = spawnRate
  for (const gate of gs) {
    const svc = 1 / gate.interval
    flow = Math.min(flow, svc)
    utils.push(Math.min(1, flow / svc))
  }
  utils.push(Math.min(1, flow / ((stages[stages.length - 1].rate ?? 1) * RATE_SCALE * timeScale)))
  stageUtil.value = utils
  flowStats.value = { inRate: spawnRate, outRate: flow }

  // Slides that openly show their bottleneck start with the toggle on;
  // guess/reveal slides (subtle constraints) start with it off so the
  // presenter can flip it as the payoff.
  showWaste.value = stages.some((stage) => stage.bottleneck && !stage.subtle)

  gates.value = gs
  balls.value = bs
}

function tick(dt: number) {
  const gs = gates.value
  const arr = balls.value.slice()

  // Each station works on ONE ball at a time: it sits in the throat for the
  // service interval, is released downstream, then the next in queue slides in.
  for (let gi = 0; gi < gs.length; gi++) {
    const gate = gs[gi]
    gate.timer -= dt
    if (gate.timer <= 0) {
      const next = gs[gi + 1]
      if (gate.serving != null && next && !next.sheds && next.queue.length >= next.cap) {
        // Downstream is physically full: hold the finished item in place.
        // Back-pressure, not loss — retry shortly.
        gate.timer = 0.25
        continue
      }
      gate.timer += gate.interval
      if (gate.serving != null) {
        const released = arr.find((ball) => ball.id === gate.serving)
        if (released) {
          released.state = 'flow'
          released.gatePos = gi + 1
          released.progress = Math.max(released.progress, (gi + 1) / gs.length)
        }
        gate.serving = null
      }
      if (gate.queue.length) {
        gate.serving = gate.queue.shift() ?? null
      }
    }
  }

  // New ideas arrive from the left.
  spawnTimer -= dt
  if (spawnTimer <= 0 && arr.length < 90) {
    spawnTimer += spawnIntervalSec
    const lane = LANES[nextId % LANES.length]
    arr.push({
      id: nextId++,
      x: -10,
      y: CY + lane,
      lane,
      state: 'flow',
      gatePos: 0,
      hot: false,
      active: false,
      progress: 0,
      cr: COLOR_RAMP[0][0],
      cg: COLOR_RAMP[0][1],
      cb: COLOR_RAMP[0][2],
      fill: `rgb(${COLOR_RAMP[0][0]},${COLOR_RAMP[0][1]},${COLOR_RAMP[0][2]})`,
      opacity: 1,
      spillT: 0,
      spillX: 0,
      spillY: 0,
    })
  }

  for (const ball of arr) {
    if (ball.state === 'queued') {
      const gate = gs[ball.gatePos]
      if (gate && gate.serving === ball.id) {
        // Being actively worked: sit inside the station throat while this
        // station slowly shifts the idea's colour one stage toward coded.
        const ease = Math.min(1, dt * 7)
        ball.x += (gate.x - ball.x) * ease
        ball.y += (CY - ball.y) * ease
        ball.active = true
        ball.hot = false
        const stageShare = 1 / gs.length
        ball.progress = Math.min(
          (ball.gatePos + 1) / gs.length,
          ball.progress + (dt / gate.interval) * stageShare,
        )
        continue
      }
      const idx = gate ? gate.queue.indexOf(ball.id) : -1
      if (gate && idx >= 0) {
        const slot = gate.slots[Math.min(idx, gate.slots.length - 1)]
        const ease = Math.min(1, dt * 7)
        ball.x += (slot.x - ball.x) * ease
        ball.y += (slot.y - ball.y) * ease
        // Waiting does not change an idea: queued balls keep their colour.
        ball.hot = false
        ball.active = false
      }
      continue
    }

    if (ball.state === 'spill') {
      ball.spillT += dt
      const t = ball.spillT
      ball.x = ball.spillX + 44 * t
      ball.y = ball.spillY - 62 * t + 170 * t * t
      ball.opacity = Math.max(0, 1 - t / 1.25)
      continue
    }

    // Flowing: move right, squeezing lanes down inside narrow sections.
    ball.x += ballSpeed.value * dt
    const caliber = caliberAt(ball.x)
    const squeeze = Math.min(1, Math.max(0.12, (caliber - 5) / 20))
    const targetY = CY + ball.lane * squeeze
    ball.y += (targetY - ball.y) * Math.min(1, dt * 8)
    ball.hot = false

    // The ball inside a station's throat is the one actively being worked.
    const servedBy = gs[ball.gatePos - 1]
    ball.active = Boolean(servedBy && Math.abs(ball.x - servedBy.x) < 22)

    const gate = gs[ball.gatePos]
    if (gate) {
      if (gate.serving == null && gate.queue.length === 0) {
        // Station is idle: this ball flows straight into the throat for service.
        if (ball.x >= gate.x - 8) {
          ball.state = 'queued'
          gate.serving = ball.id
          gate.timer = gate.interval
        }
      } else {
        const tail = gate.slots[Math.min(gate.queue.length, gate.slots.length - 1)]
        if (ball.x >= tail.x) {
          if (gate.queue.length >= gate.cap && !gate.sheds) {
            // This station never drops work: the idea waits in the pipe just
            // behind the queue, backing pressure up towards earlier stations.
            ball.x = Math.min(ball.x, tail.x - 8)
          } else if (gate.queue.length >= gate.cap) {
            // Shedding station (prioritisation): one idea gets dropped.
            // Roughly half the time it is the newly arriving idea; otherwise a
            // random already-queued idea gets shoved out and the new one joins.
            if (Math.random() < 0.5) {
              ball.state = 'spill'
              ball.active = false
              ball.spillT = 0
              ball.spillX = ball.x
              ball.spillY = CY - caliberAt(ball.x) - 3
            } else {
              const victimIdx = Math.floor(Math.random() * gate.queue.length)
              const victimId = gate.queue.splice(victimIdx, 1)[0]
              const victim = arr.find((candidate) => candidate.id === victimId)
              if (victim) {
                victim.state = 'spill'
                victim.active = false
                victim.hot = true
                victim.spillT = 0
                victim.spillX = victim.x
                victim.spillY = CY - caliberAt(victim.x) - 3
              }
              ball.state = 'queued'
              ball.active = false
              gate.queue.push(ball.id)
            }
          } else {
            ball.state = 'queued'
            ball.active = false
            gate.queue.push(ball.id)
          }
        }
      }
    }
  }

  // Colour: ease every ball toward its progress colour (or stuck-rose).
  for (const ball of arr) {
    const target = ball.hot || ball.state === 'spill'
      ? STUCK_RGB
      : rampColor(ball.progress)
    const ease = Math.min(1, dt * 2.6)
    ball.cr += (target[0] - ball.cr) * ease
    ball.cg += (target[1] - ball.cg) * ease
    ball.cb += (target[2] - ball.cb) * ease
    ball.fill = `rgb(${Math.round(ball.cr)},${Math.round(ball.cg)},${Math.round(ball.cb)})`
  }

  balls.value = arr.filter(
    (ball) => ball.x < VIEW_W + 16 && (ball.state !== 'spill' || ball.spillT < 1.3),
  )
}

function loop(now: number) {
  rafHandle = 0
  if (!running) return
  const total = Math.min(0.05, (now - lastTime) / 1000) * (speedFactor.value / (scenario.value.pace ?? 1))
  lastTime = now
  // Substep so the discrete-event maths stays accurate at ×100/×1000:
  // one huge dt would teleport balls past gates and batch releases.
  const steps = Math.max(1, Math.min(400, Math.ceil(total / 0.06)))
  const h = total / steps
  for (let s = 0; s < steps; s++) tick(h)
  rafHandle = requestAnimationFrame(loop)
}

function setRunning(value: boolean) {
  running = value
  if (running && !rafHandle) {
    lastTime = performance.now()
    rafHandle = requestAnimationFrame(loop)
  }
}

function applySyncedControl(event: PipelineSimEvent) {
  switch (event.control) {
    case 'hover':
      remoteHoverTarget.value = event.value
      break
    case 'showWaste':
      showWaste.value = event.value
      break
    case 'speed':
      speedLevel.value = event.value
      break
    case 'start':
      started.value = true
      setRunning(isVisible)
      break
  }
}

const {
  publish: publishControl,
  publishHover,
  remotePointer,
} = usePipelineSimSync(props.mode, applySyncedControl)

function startSim() {
  publishHover(null)
  started.value = true
  setRunning(isVisible)
  publishControl('start', true)
}

function updateShowWaste(event: Event) {
  const input = event.currentTarget
  if (!(input instanceof HTMLInputElement))
    return

  showWaste.value = input.checked
  publishControl('showWaste', input.checked)
}

function updateSpeed(event: Event) {
  const input = event.currentTarget
  if (!(input instanceof HTMLInputElement))
    return

  const value = Number(input.value)
  if (!Number.isFinite(value))
    return

  speedLevel.value = value
  publishControl('speed', value)
}

onMounted(() => {
  buildSim()
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      // Restart the story each time the slide comes into view: empty queues,
      // then ideas visibly stack up behind the constraint. Manual slides
      // re-arm their run button instead of auto-starting.
      isVisible = entry.isIntersecting
      if (!isVisible && props.manual) started.value = false
      if (isVisible && !running && (!props.manual || !started.value)) buildSim()
      setRunning(isVisible && (!props.manual || started.value))
    }
  })
  if (rootEl.value) observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  running = false
  if (rafHandle) cancelAnimationFrame(rafHandle)
  if (observer) observer.disconnect()
})

watch(() => props.mode, buildSim)
// Live dial updates when the speed is edited in the slide markdown.
watch(() => props.speed, (value) => {
  if (value != null) speedLevel.value = value
})

const queueLabels = computed(() => {
  void balls.value
  return gates.value
    .map((gate) => ({ len: gate.queue.length, x: gate.x - 52 }))
    .filter((entry) => entry.len >= 6)
})
</script>

<template>
  <section ref="rootEl" class="pipeline-sim">
    <Teleport v-if="remoteHoverTarget && remotePointer" to="#slide-content">
      <div
        class="pipeline-remote-pointer"
        :style="{ left: `${remotePointer.x}%`, top: `${remotePointer.y}%` }"
        aria-hidden="true"
      >
        <span class="i-ph-hand-pointing-fill" />
      </div>
    </Teleport>

    <div v-if="!props.noHeader" class="pipeline-head">
      <span>{{ scenario.eyebrow.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') }}</span>
      <h2>{{ scenario.title }}</h2>
    </div>

    <div class="pipe-legend">
      <span class="legend-ball" />
      <span>idea</span>
      <span class="legend-ball working" />
      <span>coded / value</span>
    </div>

    <svg
      class="pipe-canvas"
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      :aria-label="scenario.title"
    >
      <defs>
        <pattern
          :id="`waste-${props.mode}`"
          width="7"
          height="7"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="7" class="waste-line" />
        </pattern>
      </defs>

      <!-- one continuous pipe body -->
      <path
        v-for="(g, i) in geom"
        :key="`fill-${props.mode}-${i}`"
        class="pipe-fill"
        :class="{ bottleneck: g.stage.bottleneck && (!g.stage.subtle || showWaste), boosted: g.stage.boosted, faded: g.stage.faded }"
        :d="fillPath(g)"
      />

      <!-- wasted capacity: the unused share of each station's bore -->
      <g v-if="showWaste" class="waste-layer">
        <path
          v-for="(g, i) in geom"
          :key="`waste-${props.mode}-${i}`"
          class="waste-band"
          :fill="`url(#waste-${props.mode})`"
          :d="wastePath(g, stageUtil[i] ?? 0)"
        />
      </g>

      <!-- station markers inside the pipe -->
      <line
        v-for="(g, i) in geom"
        :key="`mark-${props.mode}-${i}`"
        class="station-mark"
        :x1="g.x"
        :x2="g.x"
        :y1="CY - g.h + 5"
        :y2="CY + g.h - 5"
      />

      <!-- live simulated ideas -->
      <circle
        v-for="ball in balls"
        :key="ball.id"
        class="sim-ball"
        :class="{ active: ball.active }"
        :cx="ball.x.toFixed(1)"
        :cy="ball.y.toFixed(1)"
        :r="ball.active ? 5.2 : 4.5"
        :style="{ fill: ball.fill }"
        :opacity="ball.opacity.toFixed(2)"
      />

      <!-- pipe walls drawn over the balls -->
      <g v-for="(g, i) in geom" :key="`edge-${props.mode}-${i}`" :class="{ faded: g.stage.faded }">
        <path
          class="pipe-edge"
          :class="{ bottleneck: g.stage.bottleneck && (!g.stage.subtle || showWaste), boosted: g.stage.boosted }"
          :d="topPath(g)"
        />
        <path
          class="pipe-edge"
          :class="{ bottleneck: g.stage.bottleneck && (!g.stage.subtle || showWaste), boosted: g.stage.boosted }"
          :d="bottomPath(g)"
        />
      </g>

      <!-- labels -->
      <g v-for="(g, i) in geom" :key="`text-${props.mode}-${i}`" :class="{ faded: g.stage.faded }">
        <text class="stage-label" :x="g.x" y="62" text-anchor="middle">{{ g.stage.label }}</text>
        <text v-if="g.stage.sub" class="stage-sub" :x="g.x" y="194" text-anchor="middle">
          {{ g.stage.sub }}
        </text>
      </g>
      <text
        v-for="(entry, qi) in queueLabels"
        :key="`ql-${props.mode}-${qi}`"
        class="queue-label"
        :x="entry.x"
        y="176"
        text-anchor="middle"
      >
        {{ entry.len }} ideas waiting
      </text>

      <!-- measured throughput at the pipe ends -->
      <text class="rate-label rate-in" :x="PIPE_X0" y="215" text-anchor="start">
        → in {{ Math.round(flowStats.inRate * 60) }}/min
      </text>
      <text class="rate-label rate-out" :x="PIPE_X1" y="215" text-anchor="end">
        out {{ Math.round(flowStats.outRate * 60) }}/min
        ({{ flowStats.inRate > 0 ? Math.round((flowStats.outRate / flowStats.inRate) * 100) : 0 }}% of input) →
      </text>
    </svg>

    <div class="pipe-controls">
      <button
        v-if="props.manual && !started"
        type="button"
        class="run-btn"
        :class="{ 'is-remote-hover': remoteHoverTarget === 'run' }"
        @click="startSim"
        @pointerenter="publishHover('run')"
        @pointerleave="publishHover(null)"
        @pointercancel="publishHover(null)"
      >
        ▶ run the system
      </button>
      <label
        class="waste-toggle"
        :class="{ 'is-remote-hover': remoteHoverTarget === 'showWaste' }"
        @pointerenter="publishHover('showWaste')"
        @pointerleave="publishHover(null)"
        @pointercancel="publishHover(null)"
      >
        <input :checked="showWaste" type="checkbox" @change="updateShowWaste" />
        <span>show bottleneck</span>
      </label>
      <div
        class="speed-dial"
        :class="{ 'is-remote-hover': remoteHoverTarget === 'speed' }"
        @pointerenter="publishHover('speed')"
        @pointerleave="publishHover(null)"
        @pointercancel="publishHover(null)"
      >
        <span>speed</span>
        <input :value="speedLevel" type="range" min="1" max="12" step="0.5" @input="updateSpeed" />
        <span>×{{ speedFactor }}</span>
      </div>
    </div>

    <p class="pipeline-caption">{{ scenario.caption }}</p>
  </section>
</template>

<style scoped>
.pipeline-sim {
  width: 100%;
  min-height: 21rem;
  padding: 1.15rem 1.15rem 1rem;
  border: 1px solid var(--deck-line, #2c2843);
  border-radius: 0.75rem;
  background: rgba(20, 15, 34, 0.72);
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.45);
  overflow: hidden;
  position: relative;
}

.pipeline-sim::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    linear-gradient(rgba(250, 250, 250, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(250, 250, 250, 0.028) 1px, transparent 1px);
  background-size: 2.2rem 2.2rem;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
}

.pipeline-head {
  position: relative;
  z-index: 2;
  margin-bottom: 0.45rem;
}

.pipeline-head span {
  display: inline-flex;
  padding: 0.22rem 0.5rem;
  border: 1px solid var(--deck-line, #2c2843);
  border-radius: 0.25rem;
  background: rgba(35, 33, 56, 0.4);
  color: var(--deck-muted, #8f8a99);
  font: 600 0.62rem/1 var(--slidev-code-font-family);
  letter-spacing: 0.06em;
  text-transform: lowercase;
}

.pipeline-head span::before {
  content: '~/';
  margin-right: 0.12rem;
  color: var(--deck-accent, #d783dc);
  font-weight: 700;
}

.pipeline-head h2 {
  margin: 0.55rem 0 0;
  max-width: 58rem;
  color: var(--deck-ink, #fafafa);
  font-size: clamp(1.2rem, 2.3vw, 1.85rem);
  line-height: 1.08;
}

.pipe-legend {
  position: absolute;
  top: 1.35rem;
  right: 1.25rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--deck-muted, #8f8a99);
  font: 600 0.62rem/1 var(--slidev-code-font-family);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.legend-ball {
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 50%;
  background: var(--deck-accent, #d783dc);
  box-shadow: inset 0 0 0 1px rgba(250, 250, 250, 0.14);
}

.legend-ball.working {
  margin-left: 0.55rem;
  background: var(--deck-teal, #03dac5);
}

.pipe-canvas {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: auto;
  margin-top: 0.35rem;
}

.pipe-fill {
  fill: #120d1f;
}

.pipe-fill.boosted {
  fill: rgba(138, 56, 245, 0.16);
}

.pipe-fill.bottleneck {
  fill: rgba(207, 102, 121, 0.12);
}

.pipe-edge {
  fill: none;
  stroke: #3a3457;
  stroke-width: 2.4;
  stroke-linecap: round;
}

.pipe-edge.boosted {
  stroke: rgba(151, 71, 255, 0.66);
}

.pipe-edge.bottleneck {
  stroke: rgba(207, 102, 121, 0.85);
  animation: edgePulse 1.9s ease-in-out infinite;
}

.station-mark {
  stroke: rgba(250, 250, 250, 0.14);
  stroke-width: 1.4;
  stroke-dasharray: 3 4;
}

.faded {
  opacity: 0.5;
}

.sim-ball {
  stroke: rgba(2, 1, 3, 0.5);
  stroke-width: 1;
  transition: r 0.6s ease;
}

.stage-label {
  fill: var(--deck-ink, #fafafa);
  font: 700 13px 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: -0.02em;
}

.stage-sub,
.queue-label {
  fill: var(--deck-muted, #8f8a99);
  font: 600 8.5px var(--slidev-code-font-family);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.rate-label {
  font: 700 9.5px var(--slidev-code-font-family);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.rate-in {
  fill: var(--deck-accent, #d783dc);
}

.rate-out {
  fill: var(--deck-teal, #03dac5);
}

.pipeline-caption {
  position: relative;
  z-index: 2;
  margin: 0.7rem 0 0;
  max-width: 60rem;
  color: var(--deck-muted, #8f8a99);
  font-size: 0.96rem;
  line-height: 1.34;
}

.pipe-controls {
  position: relative;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.1rem;
  min-height: 1.9rem;
  margin-top: 0.2rem;
}

.speed-dial {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--deck-muted, #8f8a99);
  font: 600 0.62rem/1 var(--slidev-code-font-family);
  text-transform: lowercase;
  cursor: pointer;
}

.waste-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--deck-muted, #8f8a99);
  font: 600 0.62rem/1 var(--slidev-code-font-family);
  text-transform: lowercase;
  cursor: pointer;
}

.speed-dial,
.waste-toggle {
  border-radius: 0.2rem;
  transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease;
}

.speed-dial:hover,
.speed-dial.is-remote-hover,
.waste-toggle:hover,
.waste-toggle.is-remote-hover {
  color: var(--deck-ink, #fafafa);
  background: rgba(151, 71, 255, 0.12);
  box-shadow: 0 0 0 0.3rem rgba(151, 71, 255, 0.12);
}

.waste-toggle input {
  accent-color: var(--deck-accent, #d783dc);
  cursor: pointer;
}

.waste-band {
  opacity: 0.5;
  pointer-events: none;
}

.waste-line {
  stroke: #8f8a99;
  stroke-width: 1.4;
}

.speed-dial input {
  width: 6.5rem;
  accent-color: var(--deck-accent, #d783dc);
  cursor: pointer;
}

.speed-dial span:last-child {
  min-width: 3.4rem;
}

.run-btn {
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--deck-accent, #d783dc);
  border-radius: 0.25rem;
  background: rgba(2, 1, 3, 0.82);
  color: var(--deck-accent, #d783dc);
  font: 700 0.82rem/1 var(--slidev-code-font-family);
  letter-spacing: 0.06em;
  text-transform: lowercase;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease;
}

.run-btn:hover,
.run-btn.is-remote-hover {
  background: var(--deck-accent, #d783dc);
  color: #020103;
}

.pipeline-remote-pointer {
  position: absolute;
  z-index: 10000;
  width: 1.65rem;
  height: 1.65rem;
  color: var(--deck-ink, #fafafa);
  pointer-events: none;
  transform: translate(-28%, -6%);
  filter:
    drop-shadow(0 0 1px #020103)
    drop-shadow(0 2px 2px rgba(2, 1, 3, 0.8));
}

.pipeline-remote-pointer > span {
  display: block;
  width: 100%;
  height: 100%;
}

@keyframes edgePulse {
  0%,
  100% {
    stroke-opacity: 0.78;
  }
  50% {
    stroke-opacity: 1;
  }
}
</style>
