<template>
    新建事件:
    <el-select v-model="thatPropEvent.value" placeholder="组件自带事件" @change="handleChange">
        <el-option v-for="item, index in []" :key="index" :label="item.name" :value="item.name" />
    </el-select>
    <el-table :data="currentEvents">
        <el-table-column prop="name" label="事件" />
        <el-table-column prop="name" label="操作" width="180">
            <template #default="scope">
                <el-button type="primary" @click="handleBand(scope.row)">绑定</el-button>
                <el-button type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="thatDialog.visible" title="事件设置" width="60%" draggable>

        <el-form :model="thatDialog.form" label-width="120px">
            <el-row>
                <el-col :span="4">
                    <el-input v-model="thatTree.input" placeholder="Please input">
                        <template #append>新建</template>
                    </el-input>
                    <el-tree :data="thatTree.data" :props="thatTree.defaultProps" @node-click="handleNodeClick">
                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <span>{{ node.label }}</span>
                                <span>
                                    <a > 复制 </a>
                                    <a > 删除 </a>
                                </span>
                            </span>
                        </template>
                    </el-tree>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="函数名称：">
                        <el-input v-model="thatDialog.form.name" />
                    </el-form-item>
                    <el-form-item label="脚本内容：">
                        <system-ace v-model="thatDialog.form.script"></system-ace>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button icon="CircleCloseFilled" @click="thatDialog.visible = false">取消</el-button>
                <el-button type="success" @click="thatDialog.visible = false">保存</el-button>
                <el-button type="primary" icon="SuccessFilled" @click="thatDialog.visible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const currentEvents = computed(() => {
    const events = useProject.that.component.events
    if (!events) {
        return []
    }
    const aa = []
    for (const key in events) {
        aa.push({
            name: key,
            value: events[key]
        })
    }
    return aa;
})

const thatPropEvent = reactive({
    value: null,
    data: []
})

const handleChange = (val) => {
    useProject.that.component.events[val] = ""
}

const thatDialog = reactive({
    visible: false,
    form: {} as any
})

const handleBand = (row) => {
    thatDialog.visible = true;
}

const thatTree = reactive({
    input: "",
    data: [
        {
            label: 'onChange',
            script: `console.log('123')`
        },
        {
            label: 'onChange2',
            script: `console.log('456')`
        },
    ],
    defaultProps: {
        children: 'children',
        label: 'label',
    }
})

const handleNodeClick = (data) => {

}

</script>