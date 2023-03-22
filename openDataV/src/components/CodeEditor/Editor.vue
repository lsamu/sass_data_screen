<template>
  <div class="editor">
    <div class="tool-bar">
      <slot name="tool-bar"> </slot>
    </div>
    <div class="main" :style="{ maxHeight: config.height }">
      <codemirror :model-value="code" :style="{
        width: '100%',
        height: config.height,
        backgroundColor: '#fff',
        color: '#333'
      }" placeholder="Please enter the code." :extensions="extensions" :autofocus="config.autofocus"
        :disabled="config.disabled" :indent-with-tab="config.indentWithTab" :tab-size="config.tabSize"
        @ready="handleReady" @focus="log('focus', $event)" @blur="log('blur', $event)" @update:model-value="codeChange" />
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { redo, undo } from '@codemirror/commands'

const props = defineProps({
  code: {
    default: ""
  },
  language: {
    default: json as any
  },
  theme: {
    default: "dark"
  },
  config: {
    default: {
      height: '200px',
      tabSize: 4,
      indentWithTab: true,
      autofocus: true,
      disabled: false,
      line: false
    }
  }
})

const emits = defineEmits(["update:code", "change"])

let cmView

const extensions = computed(() => {
  const result: any[] = []
  if (props.language) {
    result.push(props.language())
  }
  if (props.theme === 'dark') {
    result.push(oneDark)
  }
  return result
})

const handleReady = ({ view }: any) => {
  cmView = view
}
const log = console.log
const codeChange = (value: string, viewUpdate) => {
  emits('update:code', value)
  emits('change', value, viewUpdate)
}

const handleRedo = () => {
  if (cmView) {
    redo({
      state: cmView.state,
      dispatch: cmView.dispatch
    })
  }
}
const handleUndo = () => {
  if (cmView) {
    undo({
      state: cmView.state,
      dispatch: cmView.dispatch
    })
  }
}
defineExpose({ handleRedo, handleUndo })
</script>

<style lang="less" scoped>
.editor {
  .main {
    display: flex;
    overflow: hidden;

    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #8b8b8b;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }

    ::-webkit-scrollbar-track {
      background-color: #ccc;
    }

    .code {
      width: 30%;
      height: 100px;
      margin: 0;
      padding: 0.4em;
      font-family: monospace;
    }
  }
}
</style>
