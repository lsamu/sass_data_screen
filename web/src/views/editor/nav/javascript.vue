<template>
    <el-button type="primary" icon="plus" @click="handleJSAdd">添加</el-button>
    <el-table :data="thatJS.data" style="width: 100%" stripe border>
        <!-- <el-table-column prop="name" label="名称">
            <template #default="scope">
                <el-input v-model="scope.row.name"></el-input>
            </template>
        </el-table-column> -->
        <el-table-column prop="value" label="地址">
            <template #default="scope">
                <el-input v-model="scope.row.url"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="desc" label="操作" width="50px">
            <template #default="scope">
                <el-button type="danger" icon="delete" @click="handleJSDelete(scope.row)" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const thatJS = reactive({
    dialog: {
        visible: false,
        title: "函数"
    },
    data: []
})

watchEffect(() => {
    thatJS.data = useProject.project.jss;
})

const handleJSAdd = () => {

    useProject.addJS({
        name: "名称",
        url: "JS地址",
    })

}

const handleJSDelete = (item) => {

    let newSet = new Set(thatJS.data)
    newSet.delete(item)
    let newArr = [...newSet]

    useProject.project.jss = newArr;

}

</script>