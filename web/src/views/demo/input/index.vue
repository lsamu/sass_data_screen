<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <el-input v-bind="thatOption.component.props" v-on="thatOption.component.events" v-model:children="thatOption.component.children"></el-input>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-el-input v-model:value="thatOption.component"></option-el-input>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        title: "单行文本",
        componentName: "ElInput",
        hidden: false,
        locked: false,
        props: {

        },
        events: {}
    }
})


</script>
<style lang="scss"></style>