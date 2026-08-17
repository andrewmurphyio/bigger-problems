<script setup lang="ts">
import { computed, unref } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()

// Single source of truth for the bottom progress-group ticks.
// Slide routes: 1 setup/weekend, 8 ToC lens, 20 constraints in the wild,
// 30 what to do instead, 35 Q&A/outro.
const sections = [
  { title: 'weekend magic', start: 1 },
  { title: 'the bottleneck', start: 8 },
  { title: 'where it hurts', start: 20 },
  { title: 'fix the pipe', start: 30 },
  { title: 'q&a', start: 35 },
]

const page = computed(() => Number(unref(currentPage)) || 1)
const count = computed(() => Math.max(1, Number(unref(total)) || 1))
const progress = computed(() => `${Math.min(100, Math.max(0, (page.value / count.value) * 100))}%`)
const ticks = computed(() =>
  sections.slice(1).map((section) => ({
    ...section,
    left: `${Math.min(100, Math.max(0, ((section.start - 1) / count.value) * 100))}%`,
  })),
)

const labels = computed(() =>
  sections.map((section, index) => {
    const next = sections[index + 1]?.start ?? count.value + 1
    const start = Math.min(100, Math.max(0, ((section.start - 1) / count.value) * 100))
    const end = Math.min(100, Math.max(start, ((next - 1) / count.value) * 100))
    const midpoint = Math.min(97, Math.max(3, start + (end - start) / 2))
    return {
      ...section,
      active: page.value >= section.start && page.value < next,
      left: `${midpoint}%`,
    }
  }),
)
</script>

<template>
  <div class="deck-progress" aria-hidden="true">
    <div class="deck-progress__labels">
      <span
        v-for="label in labels"
        :key="label.title"
        class="deck-progress__label"
        :class="{ 'deck-progress__label--active': label.active }"
        :style="{ left: label.left }"
      >{{ label.title }}</span>
    </div>
    <div class="deck-progress__track">
      <div class="deck-progress__fill" :style="{ width: progress }" />
      <span
        v-for="tick in ticks"
        :key="tick.title"
        class="deck-progress__tick"
        :style="{ left: tick.left }"
      />
    </div>
  </div>
</template>

<style scoped>
.deck-progress {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  height: 18px;
  pointer-events: none;
}

.deck-progress__labels {
  position: absolute;
  right: 0;
  bottom: 6px;
  left: 0;
  height: 10px;
  pointer-events: none;
}

.deck-progress__label {
  position: absolute;
  bottom: 0;
  color: var(--deck-muted, #8f8a99);
  font: 700 9px / 1 var(--slidev-code-font-family, ui-monospace, monospace);
  letter-spacing: 0.08em;
  opacity: 0.42;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(-50%);
}

.deck-progress__label--active {
  color: var(--deck-accent, #d783dc);
  opacity: 0.78;
}

.deck-progress__track {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(44, 40, 67, 0.72);
}

.deck-progress__fill {
  width: 0;
  height: 100%;
  background: var(--deck-accent, #d783dc);
}

.deck-progress__tick {
  position: absolute;
  top: -2px;
  width: 1px;
  height: 7px;
  background: var(--deck-muted, #8f8a99);
  opacity: 0.55;
  transform: translateX(-0.5px);
}
</style>
