<template>
  <main ref="literacyPage" :class="['literacy-page', { 'has-structure': isStructureOpen }]">
    <p class="word" aria-live="polite">{{ word }}</p>

    <div class="corner-actions">
      <button
        type="button"
        :aria-pressed="isStructureOpen"
        @click="isStructureOpen ? closeStructure() : openStructure()"
      >
        拆字
      </button>
      <button type="button" :aria-pressed="isFullscreen" @click="toggleFullscreen">
        {{ isFullscreen ? '退出全屏' : '全屏' }}
      </button>
      <button type="button" @click="openEditor">修改</button>
    </div>

    <div v-if="isEditorOpen" class="dialog-backdrop" @click.self="closeEditor">
      <section
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <h1 id="editor-title">修改文字</h1>
        <form @submit.prevent="saveWord">
          <label for="word-input">汉字</label>
          <input
            id="word-input"
            ref="wordInput"
            v-model="draftWord"
            type="text"
            maxlength="1"
            autocomplete="off"
            @input="updateStructureDraft"
          />
          <label for="structure-type">结构</label>
          <select id="structure-type" v-model="draftStructureType">
            <option v-for="option in structureTypes" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <label for="structure-parts">部件</label>
          <input id="structure-parts" v-model="draftParts" type="text" autocomplete="off" />
          <label for="stroke-input">笔画</label>
          <input id="stroke-input" v-model="draftStrokes" type="text" autocomplete="off" />
          <div class="dialog-actions">
            <button class="secondary-button" type="button" @click="closeEditor">取消</button>
            <button type="submit" :disabled="!draftWord.trim()">确认</button>
          </div>
        </form>
      </section>
    </div>

    <aside v-if="isStructureOpen" class="learning-panel" aria-labelledby="structure-title">
      <section class="structure-content">
        <h1 id="structure-title">拆字</h1>
        <p class="panel-word">{{ word }}</p>
        <p class="structure-type">{{ activeStructure.type }}</p>
        <div class="parts" aria-label="组成部件">
          <template v-for="(part, index) in activeStructure.parts" :key="`${part}-${index}`">
            <span v-if="index" class="plus" aria-hidden="true">+</span>
            <span class="part">{{ part }}</span>
          </template>
        </div>
        <p class="stroke-heading">笔画{{ activeStructure.strokes?.length ?? 0 }}画</p>
        <div v-if="activeStructure.strokes?.length" class="strokes" aria-label="笔画顺序">
          <span
            v-for="(stroke, index) in activeStructure.strokes ?? []"
            :key="`${stroke}-${index}`"
            class="stroke"
          >
            {{ index + 1 }}. {{ stroke }}
          </span>
        </div>
        <p v-else class="empty-strokes">暂无笔画数据</p>
      </section>
      <button class="panel-close" type="button" @click="closeStructure">收起</button>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

type CharacterStructure = {
  type: string
  parts: string[]
  strokes?: string[]
}

const characterStructures: Record<string, CharacterStructure> = {
  人: { type: '独体结构', parts: ['人'] },
  大: { type: '独体结构', parts: ['大'] },
  小: { type: '独体结构', parts: ['小'] },
  山: { type: '独体结构', parts: ['山'] },
  水: { type: '独体结构', parts: ['水'] },
  火: { type: '独体结构', parts: ['火'] },
  木: { type: '独体结构', parts: ['木'] },
  土: { type: '独体结构', parts: ['土'] },
  口: { type: '独体结构', parts: ['口'] },
  日: { type: '独体结构', parts: ['日'] },
  月: { type: '独体结构', parts: ['月'] },
  明: { type: '左右结构', parts: ['日', '月'] },
  好: { type: '左右结构', parts: ['女', '子'] },
  休: { type: '左右结构', parts: ['人', '木'] },
  林: { type: '左右结构', parts: ['木', '木'] },
  森: { type: '品字结构', parts: ['木', '木', '木'] },
  从: { type: '左右结构', parts: ['人', '人'] },
  众: { type: '品字结构', parts: ['人', '人', '人'] },
  朋: { type: '左右结构', parts: ['月', '月'] },
  男: { type: '上下结构', parts: ['田', '力'] },
  看: { type: '上下结构', parts: ['手', '目'] },
  问: { type: '半包围结构', parts: ['门', '口'] },
  间: { type: '半包围结构', parts: ['门', '日'] },
  安: { type: '上下结构', parts: ['宀', '女'] },
  家: { type: '上下结构', parts: ['宀', '豕'] },
  国: { type: '全包围结构', parts: ['囗', '玉'] },
  园: { type: '全包围结构', parts: ['囗', '元'] },
  回: { type: '全包围结构', parts: ['囗', '口'] },
  因: { type: '全包围结构', parts: ['囗', '大'] },
  学: { type: '上下结构', parts: ['⺍', '冖', '子'] },
  字: { type: '上下结构', parts: ['宀', '子'] },
  语: { type: '左右结构', parts: ['讠', '吾'] },
  你: { type: '左右结构', parts: ['亻', '尔'] },
  他: { type: '左右结构', parts: ['亻', '也'] },
  她: { type: '左右结构', parts: ['女', '也'] },
  花: { type: '上下结构', parts: ['艹', '化'] },
  草: { type: '上下结构', parts: ['艹', '早'] },
  红: { type: '左右结构', parts: ['纟', '工'] },
  绿: { type: '左右结构', parts: ['纟', '录'] },
}

const characterStrokes: Record<string, string[]> = {
  人: ['丿', '㇏'],
  大: ['一', '丿', '㇏'],
  小: ['丨', '㇇', '丶'],
  山: ['丨', '㇄', '丨'],
  水: ['丨', '㇇', '丿', '㇏'],
  火: ['丶', '丿', '丿', '㇏'],
  木: ['一', '丨', '丿', '㇏'],
  土: ['一', '丨', '一'],
  口: ['丨', '𠃍', '一'],
  日: ['丨', '𠃍', '一', '一'],
  月: ['丿', '𠃌', '一', '一'],
  明: ['丨', '𠃍', '一', '一', '丿', '𠃌', '一', '一'],
  好: ['ㄑ', '丿', '一', '㇇', '亅', '一'],
  手: ['丿', '一', '一', '亅'],
  女: ['ㄑ', '丿', '一'],
  子: ['㇇', '亅', '一'],
  田: ['丨', '𠃍', '一', '丨', '一'],
  力: ['𠃌', '丿'],
  王: ['一', '一', '丨', '一'],
}

const structureTypes = ['独体结构', '左右结构', '上下结构', '半包围结构', '全包围结构', '品字结构', '其他结构']

const word = ref('人')
const draftWord = ref(word.value)
const draftStructureType = ref('独体结构')
const draftParts = ref('人')
const draftStrokes = ref('丿 + ㇏')
const isEditorOpen = ref(false)
const isStructureOpen = ref(false)
const isFullscreen = ref(false)
const literacyPage = ref<HTMLElement | null>(null)
const wordInput = ref<HTMLInputElement | null>(null)
const customStructures = ref<Record<string, CharacterStructure>>({})

const activeStructure = computed<CharacterStructure>(() => {
  const custom = customStructures.value[word.value]
  const preset = characterStructures[word.value]
  return {
    type: custom?.type ?? preset?.type ?? '其他结构',
    parts: custom?.parts ?? preset?.parts ?? [word.value],
    strokes: custom?.strokes ?? characterStrokes[word.value] ?? [],
  }
})

async function openEditor() {
  draftWord.value = word.value
  setStructureDraft(word.value)
  isEditorOpen.value = true
  await nextTick()
  wordInput.value?.focus()
  wordInput.value?.select()
}

function closeEditor() {
  isEditorOpen.value = false
}

function updateStructureDraft() {
  draftWord.value = Array.from(draftWord.value).slice(0, 1).join('')
  setStructureDraft(draftWord.value)
}

function setStructureDraft(character: string) {
  const structure = customStructures.value[character] ?? characterStructures[character]
  draftStructureType.value = structure?.type ?? '其他结构'
  draftParts.value = structure?.parts.join(' + ') ?? character
  draftStrokes.value = structure?.strokes?.join(' + ') ?? characterStrokes[character]?.join(' + ') ?? ''
}

function openStructure() {
  isStructureOpen.value = true
}

function closeStructure() {
  isStructureOpen.value = false
}

async function toggleFullscreen() {
  if (!literacyPage.value) return

  if (document.fullscreenElement === literacyPage.value) {
    await document.exitFullscreen()
    return
  }

  await literacyPage.value.requestFullscreen()
}

function syncFullscreenState() {
  isFullscreen.value = document.fullscreenElement === literacyPage.value
}

onMounted(() => {
  document.addEventListener('fullscreenchange', syncFullscreenState)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', syncFullscreenState)
  if (document.fullscreenElement === literacyPage.value) {
    void document.exitFullscreen()
  }
})

function getParts(character: string) {
  const parts = draftParts.value.split(/[+＋、，,\s]+/).filter(Boolean)
  return parts.length ? parts : [character]
}

function getStrokes() {
  return draftStrokes.value.split(/[+＋、，,\s]+/).filter(Boolean)
}

function saveWord() {
  const nextWord = draftWord.value.trim()
  if (!nextWord) return

  word.value = nextWord
  customStructures.value = {
    ...customStructures.value,
    [nextWord]: {
      type: draftStructureType.value,
      parts: getParts(nextWord),
      strokes: getStrokes(),
    },
  }
  closeEditor()
}
</script>

<style scoped>
.literacy-page button,
.literacy-page input,
.literacy-page select {
  font: inherit;
}

.literacy-page {
  position: relative;
  width: 100%;
  min-height: clamp(30rem, calc(100dvh - 11.5rem), 48rem);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  background: #ffffff;
  color: #000000;
}

.literacy-page:fullscreen {
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.literacy-page.has-structure {
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.72fr);
}

.word {
  grid-column: 1;
  margin: 0;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: clamp(9rem, 48vmin, 32rem);
  font-weight: 800;
  line-height: 1;
  transition: transform 220ms ease;
}

.corner-actions button,
.dialog-actions button {
  min-width: 5.5rem;
  min-height: 2.8rem;
  border: 1px solid #000000;
  border-radius: 6px;
  background: #000000;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.corner-actions {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  gap: 0.5rem;
}

.corner-actions button:focus-visible,
.dialog-actions button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid #000000;
  outline-offset: 3px;
}

.dialog-backdrop {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgb(0 0 0 / 25%);
}

.dialog {
  box-sizing: border-box;
  width: min(100%, 22rem);
  border: 2px solid #000000;
  border-radius: 6px;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 8px 8px 0 #000000;
}

.dialog h1 {
  margin: 0 0 1.5rem;
  font-size: 1.35rem;
}

.dialog label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.dialog input {
  box-sizing: border-box;
  width: 100%;
  border: 2px solid #000000;
  border-radius: 4px;
  padding: 0.5rem 0.7rem;
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.dialog select {
  box-sizing: border-box;
  width: 100%;
  border: 2px solid #000000;
  border-radius: 4px;
  padding: 0.65rem 0.7rem;
  color: #000000;
  background: #ffffff;
  font-weight: 700;
}

.dialog input + label,
.dialog select + label {
  margin-top: 1rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.dialog-actions .secondary-button {
  background: #ffffff;
  color: #000000;
}

.dialog-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.learning-panel {
  box-sizing: border-box;
  grid-column: 2;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
  border-left: 1px solid #000000;
  padding: 2rem 2rem 6rem;
  text-align: center;
}

.structure-content {
  width: min(100%, 25rem);
}

.learning-panel h1 {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
}

.panel-word {
  margin: 0;
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1;
}

.structure-type {
  margin: 1rem 0;
  font-weight: 700;
}

.parts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.part {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border: 2px solid #000000;
  border-radius: 4px;
  font-size: 2rem;
  font-weight: 800;
}

.plus {
  font-size: 1.5rem;
  font-weight: 800;
}

.stroke-heading {
  margin: 1.25rem 0 0.75rem;
  font-weight: 700;
}

.strokes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.stroke {
  display: grid;
  min-width: 3.5rem;
  min-height: 2.5rem;
  place-items: center;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 700;
}

.empty-strokes {
  margin: 0;
  color: #555555;
}

.panel-close {
  min-width: 5.5rem;
  min-height: 2.8rem;
  margin-top: 2rem;
  border: 1px solid #000000;
  border-radius: 6px;
  background: #ffffff;
  color: #000000;
  font-weight: 700;
  cursor: pointer;
}

.panel-close:focus-visible {
  outline: 3px solid #000000;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .word {
    font-size: clamp(8rem, 58vmin, 18rem);
  }

  .corner-actions {
    gap: 0.35rem;
  }

  .corner-actions button {
    min-width: 4.5rem;
  }
}

@media (max-width: 700px) {
  .literacy-page.has-structure {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    overflow-y: auto;
  }

  .literacy-page.has-structure .word {
    display: grid;
    flex: 0 0 42vh;
    place-items: center;
    font-size: clamp(7rem, 35vmin, 14rem);
  }

  .learning-panel {
    flex: 0 0 auto;
    border-top: 1px solid #000000;
    border-left: 0;
    padding: 1.5rem 1rem 6rem;
  }

  .panel-word {
    font-size: 4rem;
  }

  .part {
    width: 3rem;
    height: 3rem;
  }

  .stroke {
    min-width: 3rem;
  }
}
</style>
