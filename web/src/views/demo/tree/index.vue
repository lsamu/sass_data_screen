<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <box-tree v-bind="thatOption.component.props" v-on="thatOption.component.events"
                v-model:children="thatOption.component.children"></box-tree>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-box-tree v-model:value="thatOption.component"></option-box-tree>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        title: "树",
        componentName: "BoxTree",
        hidden: false,
        locked: false,
        props: {
            option: {
                toolbar: {
                    visible: true,
                    columns: []
                },
                context: {
                    visible: true,
                    columns: []
                }
            }
        },
    }
})

</script>
<style lang="scss"></style>