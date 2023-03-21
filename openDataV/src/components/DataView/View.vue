<template>
  <CodeEditor ref="cm" :config="curConfig" :theme="projectStore.darkTheme ? 'dark' : 'light'" :code="content"
    @change="formChange" />
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps(["content", "disabled", "config"]),
  {
    content: '',
    disabled: false,
    config: () => {
      return {
        height: '600px',
        tabSize: 4,
        indentWithTab: true,
        autofocus: true,
        disabled: false
      }
    }
  }
) as any
const curConfig = computed(() => {
  return { ...props.config, disabled: props.disable || false }
})

const emits = defineEmits(["change", "update:content"])

const formChange = (value) => {
  emits('change', value)
  emits('update:content', value)
}
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
