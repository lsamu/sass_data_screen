<template>
  <CodeEditor ref="cm" v-model:code="contentRef" :config="config" :theme="projectStore.darkTheme ? 'dark' : 'light'"
    @change="codeChange">
    <template v-if="mode === 'debug'" #tool-bar>
      <div class="buttons">
        <x-icon class="item button" name="save" @click="handleSave" />
        <x-icon class="item button" name="back" @click="handleUndo" />
        <x-icon class="item button" name="next" @click="handleRedo" />
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div class="left">{{ title ? `数据名称：${title}` : '' }}</div>
        <div class="right">
          <div :class="['saved-status', savedStatus ? 'save' : 'unsave']">
            {{ savedStatus ? '已保存' : '未保存' }}
          </div>
          <div class="lang">JSON</div>
        </div>
      </div>
    </template>
  </CodeEditor>
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { message } from '@/utils/message'

const savedStatus = ref(true)

const projectStore = useProjectSettingStoreWithOut()

const props = defineProps({
  content:{
    default:""
  },
  title:{
    default:""
  },
  mode:{
    default:"use"
  },
  height:{
    default:"600px"
  }
})
const config = computed(() => {
  return {
    height: props.height,
    tabSize: 4,
    indentWithTab: true,
    autofocus: true,
    disabled: props.mode === 'debug' ? false : true
  }
})
const cm = ref(null)
const handleRedo = () => {
  const handler = cm.value!.handleRedo
  if (handler) {
    handler()
  }
}
const handleUndo = () => {
  const handler = cm.value!.handleUndo
  if (handler) {
    handler()
  }
}

const emits = defineEmits(["update:content"])

const contentRef = ref(JSON.stringify(props.content, null, '\t'))

const codeChange = (_) => {
  savedStatus.value = false
}

const handleSave = () => {
  try {
    emits('update:content', JSON.parse(contentRef.value))
    savedStatus.value = true
    message.success('保存成功')
  } catch (err: any) {
    console.log(err)
    message.warning('数据必须符合JSON格式')
  }
}
watch(
  () => props.content,
  () => {
    contentRef.value = JSON.stringify(props.content, null, '\t')
  }
)
</script>
<style lang="less" scoped>
.buttons {
  display: flex;

  .item {
    display: block;
    margin-left: 5px;
    margin-right: 5px;

    &.data {
      width: 120px;
    }

    &.button {
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}

.footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  div {
    margin-left: 5px;
    font-weight: 800;
    padding: 0 2px;
    border-radius: 2px;
  }

  .left {
    color: #2080f0;
  }

  .right {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    color: #ffff;

    .lang {
      background-color: #2080f0;
    }

    .saved-status {
      &.save {
        background-color: #18a058;
      }

      &.unsave {
        background-color: #d03050;
      }
    }
  }
}</style>
