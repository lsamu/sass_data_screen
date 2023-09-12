<template>
    <el-row>
        <el-col :span="18" style="padding: 10px;">
            <box-tabs></box-tabs>
        </el-col>
        <el-col :span="6" style="padding: 10px;">
            <option-box-tabs></option-box-tabs>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>

const thatOption = reactive({
    component: {
        props: {

        },
        events: {

        }
    }
})

</script>
<style lang="scss"></style>