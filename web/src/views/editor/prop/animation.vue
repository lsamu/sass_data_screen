<template>
    <div>
        <el-form :model="thatOption.form" label-width="120px">
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="动画名称：">
                        <el-input v-model="thatOption.form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="持续时间：">
                        <el-input v-model="thatOption.form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="延时时间：">
                        <el-input v-model="thatOption.form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重复次数：">
                        <el-input v-model="thatOption.form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="运动函数：">
                        <el-input v-model="thatOption.form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="运动函数：" label-width="0">
                        <el-button type="danger">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <el-button type="primary">运行动画</el-button>
        <el-button type="success">添加动画</el-button>
    </div>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    form: {} as any
})

</script>