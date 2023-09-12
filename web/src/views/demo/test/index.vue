<template>
    <el-form :model="thatOption.form" label-width="120px">

        <el-row>

            <el-col :span="12">
                <el-form-item label="" label-width="0">
                    <div style="text-align: center;">
                        <el-button>按钮</el-button>
                        <el-button>按钮</el-button>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="Activity name2">
                    <el-input v-model="thatOption.form.name2" />
                </el-form-item>
            </el-col>

        </el-row>

    </el-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';


const thatOption = reactive({
    form: {} as any
})

</script>
