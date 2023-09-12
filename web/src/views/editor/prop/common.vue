<template>
    <el-form :model="useProject.that.component" label-width="80px">
        <el-form-item label="编号：">
            <el-input v-model="useProject.that.component.id" readonly disabled />
        </el-form-item>
        <el-form-item label="名称：">
            <el-input v-model="useProject.that.component.title" />
        </el-form-item>
        <el-form-item label="锁定：">
            <el-switch v-model="useProject.that.component.locked" />
        </el-form-item>
        <el-form-item label="隐藏：">
            <el-switch v-model="useProject.that.component.hidden" />
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

</script>