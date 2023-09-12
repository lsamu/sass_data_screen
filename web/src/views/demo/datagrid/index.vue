<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <box-datagrid v-bind="thatOption.component.props" v-on="thatOption.component.events"
                v-model:children="thatOption.component.children"></box-datagrid>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-box-datagrid v-model:value="thatOption.component"></option-box-datagrid>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        title: "高级表格",
        componentName: "BoxDatagrid",
        hidden: false,
        locked: false,
        props: {
            option: {
                size: "default",
                ext: {
                    visible: true,
                    title: "操作",
                    width: 180,
                    fixed: "right",
                    columns: [
                        {
                            label: "编辑",
                            name: "el-button",
                            props: {
                                type: "primary"
                            }
                        }
                    ]
                },
                columns: [],
                toolbar: {
                    visible: true,
                    left: {
                        visible: true,
                        columns: [
                            {
                                label: "新建",
                                name: "el-button",
                                props: {
                                    type: "primary"
                                }
                            }
                        ]
                    },
                    right: {
                        visible: true,
                        columns: []
                    }
                },
                page: {
                    visible: true,
                    location: "buttom",
                    total: 100,
                    pageIndex: 1,
                    pageSize: 20,
                    pageSizes: [10, 20, 50, 100, 500],
                    layout: "total, sizes, prev, pager, next, jumper",
                }
            },
            data: []
        },
        events: {

        },
        children: null
    }
})

</script>
<style lang="scss"></style>