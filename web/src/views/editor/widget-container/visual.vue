<template>
    <!-- <div class="widget-container" :style="{ width: useProject.project.width+'px' }"> -->
    <div class="widget-container" @click.self="handleUnActiveComponet()">
        <div class="empty" v-if="!useProject.project.components || useProject.project.components.length == 0" @click.self="handleUnActiveComponet()">从左侧拖拽或点击来添加字段
        </div>
        <box-widget v-model:children="useProject.project.components" ref="refDragItem"></box-widget>
    </div>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"

const {proxy} = getCurrentInstance()

const useProject = projectStore();

const thatOption = reactive({
    value: ""
})

const refDragItem = ref();

// 移除组件
const handleUnActiveComponet = ()=>{
    useProject.that.component = null;
}

const handleComponent = () => {
    const refs = refDragItem.value.$refs;
    const findCompent = (refs) => {
        for (const key in refs) {
            const find = refs[key];
            if (find && JSON.stringify(find.$refs) != '{}') {
                findCompent(find.$refs);
            }
        }
    }
    findCompent(refs)
    const retCom = get(thatOption.value)
}

// 获取组件
const get = (name: string) => {
    const refs = refDragItem.value.$refs;
    let selectComponent = null;
    const findCompent = (refs) => {
        for (const key in refs) {
            if (key == name) {
                selectComponent = refs[key];
                break;
            }
            const find = refs[key];
            if (find && JSON.stringify(find.$refs) != '{}') {
                findCompent(find.$refs);
            }
        }
    }
    findCompent(refs)
    return selectComponent;
}

// 触发方法
const event = (name,...args)=>{
    console.log(name,args)
}



</script>
<style lang="scss">
.widget-container {
    // padding: 3px;
    border: 0;
    background: #fafafa;
    border-radius: 0;
    box-shadow: #fafafa 0 4px 12px;
    top: 10px;
    left: 16px;
    right: 16px;
    bottom: 10px;

    position: absolute;
    overflow-x: auto;

    color: #303133;
    background: #ffffff;
    height: calc(100% - 20px);
    // border: 1px solid #e4e7ed;
    min-width: 500px;
    text-align: left;
    background-color: #fff;

    margin: auto;
    
    .empty {
        position: absolute;
        text-align: center;
        height: 20px !important;
        min-height: 20px !important;
        font-size: 20px;
        top: 50%;
        width: 100%;
        margin-top: -10px;
        color: #a8abb2;
    }
   
}
</style>