<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <box-split v-bind="thatOption.component.props" v-on="thatOption.component.events" v-model:children="thatOption.component.children"></box-split>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-box-split v-model:value="thatOption.component"></option-box-split>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        title: "分割容器",
        componentName: "BoxSplit",
        hidden: false,
        locked: false,
        props: {
            
        },
        events: {

        },
        children: []
    }
})


</script>
<style lang="scss"></style>