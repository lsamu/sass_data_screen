<template>
    <el-collapse-item title="基本" name="base">
      <el-form-item label="标题：">
        <el-input v-model="thatOption.form.props.value"></el-input>
      </el-form-item>
    </el-collapse-item>
  
    <el-collapse-item title="事件" name="2">
      <system-event></system-event>
    </el-collapse-item>
  </template>
  <script lang="ts" setup>
  const props = defineProps(["value"])
  
  const emits = defineEmits(["update:value"])
  
  const thatOption = reactive({
    activeName: "1",
    form: {} as any,
    children: [] as any
  })
  
  watchEffect(() => {
    thatOption.form = Object.assign({
      props: {
      }
    }, props.value || {});
  })
  
  </script>
  