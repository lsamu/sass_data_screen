<template>
    <el-collapse-item title="基本" name="base">

        <el-form-item label="大小：">
          
        </el-form-item>

        <el-form-item label="文字：">
        </el-form-item>

        <el-form-item label="样式：">

        </el-form-item>

        <el-form-item label="图标：">
          
        </el-form-item>

    </el-collapse-item>

    <el-collapse-item title="事件" name="event">

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