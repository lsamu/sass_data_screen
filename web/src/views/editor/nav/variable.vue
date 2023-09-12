<template>
    <el-button type="primary" icon="plus" @click="handleVarAdd">添加</el-button>
    <el-table :data="thatVar.data" style="width: 100%" stripe border>
        <el-table-column prop="name" label="变量">
            <template #default="scope">
                <el-input v-model="scope.row.name"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="value" label="值">
            <template #default="scope">
                <el-input v-model="scope.row.value"></el-input>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="desc" label="说明">
            <template #default="scope">
                <el-input type="textarea" v-model="scope.row.desc"></el-input>
            </template>
        </el-table-column> -->
        <el-table-column prop="desc" label="操作" width="50px">
            <template #default="scope">
                <el-button type="danger" icon="delete" @click="handleVarDelete(scope.row)" circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="thatVar.dialog.visible" :title="thatVar.dialog.title" width="60%" draggable>
        <el-form :model="thatVar.form" label-width="80px">
            <el-form-item label="变量：">
                <el-input v-model="thatVar.form.label" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button icon="CircleCloseFilled" @click="thatVar.dialog.visible = false">取消</el-button>
                <el-button type="primary" icon="SuccessFilled" @click="handleVarSubmit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const thatVar = reactive({
    dialog: {
        visible: false,
        title: "全局变量"
    },
    form: {} as any,
    data: []
})

watchEffect(() => {
    thatVar.data = useProject.project.vars;
})

const handleVarDelete = (item) => {

    let newSet = new Set(thatVar.data)
    newSet.delete(item)
    let newArr = [...newSet]

    useProject.project.vars = newArr;
}

const handleVarSubmit = () => {

    thatVar.dialog.visible = false;

}

const handleVarAdd = () => {

    thatVar.data.push({
        name: "名称",
        value: "值",
        desc: "说明"
    })

}
</script>