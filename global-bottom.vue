<script setup lang="ts">
import { computed, unref } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()

// Single source of truth for the bottom progress-group ticks.
// Slide routes: 1 setup/weekend, 8 ToC lens, 20 constraints in the wild,
// 30 what to do instead, 40 Q&A/outro.
const sections = [
  { title: 'setup', start: 1 },
  { title: 'toc lens', start: 8 },
  { title: 'constraints', start: 20 },
  { title: 'what to do', start: 30 },
  { title: 'q&a', start: 40 },
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
</script>

<template>
  <div class="deck-progress" aria-hidden="true">
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
  height: 5px;
  pointer-events: none;
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
