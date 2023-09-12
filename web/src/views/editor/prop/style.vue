<template>
    <el-form :model="thatPropStyle.form" label-width="100px">
        <system-ace lang="css" v-model:value="thatPropStyle.form.style" ></system-ace>
        <el-collapse v-model="thatPropStyle.activeName" accordion>
            <el-collapse-item title="布局" name="1">
                <el-form-item label="布局模式：">
                    <el-radio-group v-model="thatPropStyle.form.display">
                        <el-radio-button label="内联" />
                        <el-radio-button label="弹性" />
                        <el-radio-button label="块级" />
                        <el-radio-button label="内联块" />
                        <el-radio-button label="隐藏" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽度：">
                    <el-input-number controls-position="right" v-model="thatPropStyle.form.width" />
                </el-form-item>
                <el-form-item label="高度：">
                    <el-input-number controls-position="right"  v-model="thatPropStyle.form.height" />
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="文字" name="2">
                <el-form-item label="字号：">
                    <el-input-number controls-position="right"  v-model="thatPropStyle.form.fontSize" />
                </el-form-item>
                <el-form-item label="行高：">
                    <el-input-number controls-position="right"  v-model="thatPropStyle.form.lineHeight" />
                </el-form-item>
                <el-form-item label="字重：">
                    <el-select v-model="thatPropStyle.form.weight" />
                </el-form-item>
                <el-form-item label="字体：">
                    <el-select v-model="thatPropStyle.form.font" />
                </el-form-item>
                <el-form-item label="颜色：">
                    <el-color-picker v-model="thatPropStyle.form.color" />
                </el-form-item>
                <el-form-item label="对齐：">
                    <el-radio-group v-model="thatPropStyle.form.align">
                        <el-radio-button label="左对齐" />
                        <el-radio-button label="居中对齐" />
                        <el-radio-button label="右对齐" />
                        <el-radio-button label="两端对齐" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="透明度：">
                    <el-slider v-model="thatPropStyle.form.opt" />
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="背景" name="3">
                <el-form-item label="背景：">
                    <el-color-picker v-model="thatPropStyle.form.background" />
                </el-form-item>
                <el-form-item label="透明度：">
                    <el-slider v-model="thatPropStyle.form.backgroundopt" />
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="位置" name="4">
                <el-form-item label="定位：">
                    <el-select v-model="thatPropStyle.form.position" />
                </el-form-item>
                <el-form-item label="zIndex：">
                    <el-input-number controls-position="right" v-model="thatPropStyle.form.zIndex" />
                </el-form-item>
                <el-form-item label="浮动方向：">
                    <el-radio-group v-model="thatPropStyle.form.float">
                        <el-radio-button label="不浮动" />
                        <el-radio-button label="左浮动" />
                        <el-radio-button label="右浮动" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="清除位置：">
                    <el-radio-group v-model="thatPropStyle.form.clear">
                        <el-radio-button label="不清除" />
                        <el-radio-button label="左清除" />
                        <el-radio-button label="右清除" />
                        <el-radio-button label="两边清除" />
                    </el-radio-group>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="边框" name="5">
                <el-form-item label="圆角：">
                    <el-slider v-model="thatPropStyle.form.biad" />
                </el-form-item>
                <el-form-item label="边框：">
                    <el-input-number controls-position="right" v-model="thatPropStyle.form.border1" />
                    <el-color-picker v-model="thatPropStyle.form.border2" />
                    <el-select v-model="thatPropStyle.form.border3" />
                </el-form-item>
                <el-form-item label="阴影：">
                    <el-color-picker v-model="thatPropStyle.form.slod" />
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
    </el-form>
</template>
<script lang="ts" setup>
const thatPropStyle = reactive({
    form: {} as any,
    activeName: "first",
})

</script>