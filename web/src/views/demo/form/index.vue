<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <box-form v-bind="thatOption.component.props" v-on="thatOption.component.events" v-model:children="thatOption.component.children"></box-form>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-box-form v-model:value="thatOption.component"></option-box-form>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        title: "表单",
        componentName: "BoxForm",
        hidden: false,
        locked: false,
        props: {
            option: {
                title: "",
                labelWidth: 120,
                labelPosition:"right",
                toolbar: {
                    visible: true,
                    location: "center",
                    columns: [
                        
                    ]
                }
            }
        },
        events: {

        },
        children: [
            {
                title: "文本框",
                componentName: "el-input",
                hidden: false,
                locked: false,
                props: {
                    label: "字段",
                    prop: "title"
                },
                events: {

                },
            }
        ]
    }
})


</script>
<style lang="scss"></style>