<template>
    <el-button type="primary" icon="plus" @click="handleFuncOpen">新建</el-button>

    <el-table :data="thatFunc.data" style="width: 100%" stripe border>
        <el-table-column prop="name" label="函数名">
        </el-table-column>
        <el-table-column prop="desc" label="操作" width="120px">
            <template #default="scope">
                <el-button icon="edit" @click="handleFuncEdit(scope.row)" circle></el-button>
                <el-button type="success" icon="CopyDocument" @click="handleFuncCopy(scope.row)" circle></el-button>
                <el-button type="danger" icon="delete" @click="handleFuncDelete(scope.row)" circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="thatFunc.dialog.visible" :title="thatFunc.dialog.title" width="60%" draggable>
        <el-form :model="thatFunc.form" label-width="80px">
            <el-form-item label="名称：">
                <el-input v-model="thatFunc.form.name" />
            </el-form-item>
            <el-form-item label="内容：">
                <span style="font-size: 14px; font-weight: 500px;">Function(){</span>
                <system-ace v-model:value="thatFunc.form.script" />
                <span style="font-size: 14px; font-weight: 500px;">}</span>
            </el-form-item>
            <el-form-item label="说明：">
                <el-input type="textarea" v-model="thatFunc.form.desc" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button icon="CircleCloseFilled" @click="thatFunc.dialog.visible = false">取消</el-button>
                <el-button icon="Check" type="primary" @click="handleFuncTest">校验</el-button>
                <el-button type="primary" icon="SuccessFilled" @click="handleFuncSubmit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"
import { ElMessage } from "element-plus";

const useProject = projectStore();

const thatFunc = reactive({
    dialog: {
        visible: false,
        title: "函数"
    },
    form: {} as any,
    resetForm: {
        name: "onClickxxxx",
        script: `const args = arguments[0];

console.log(args)

`
    } as any,
    data: []
})

watchEffect(() => {
    thatFunc.data = useProject.project.events;
})

const handleFuncOpen = () => {
    thatFunc.dialog.visible = true;
    nextTick(() => {
        thatFunc.form = Object.assign({}, thatFunc.resetForm)
    })
}

const handleFuncEdit = (item) => {
    thatFunc.dialog.visible = true;
    nextTick(() => {
        thatFunc.form = Object.assign({}, item)
    })
}

const handleFuncCopy = (item) => {

    let cc = Object.assign({}, item)
    cc.name = cc.name + "-复制"

    let newSet = new Set(thatFunc.data)
    newSet.add(cc);
    let newArr = [...newSet]

    useProject.project.events = newArr;

}

const handleFuncDelete = (item) => {

    let newSet = new Set(thatFunc.data)
    newSet.delete(item)
    let newArr = [...newSet]

    useProject.project.events = newArr;

}

const handleFuncSubmit = () => {
    thatFunc.dialog.visible = false;

    useProject.addEvent({
        ...thatFunc.form
    })
}

const handleFuncTest = () => {
    try {
        const aa = thatFunc.form.script;

        var v = new Function(aa);

        const ret = v()

        ElMessage.success("测试通过")

    } catch (error) {
        ElMessage.error(error.message)
    }

}

</script>