<template>
    <div>
        <el-row v-for="item, index in currentOption.rows" :key="index">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps(["option"])
const emits = defineEmits([])

const currentOption = computed(() => {
    return props.option
})
</script>