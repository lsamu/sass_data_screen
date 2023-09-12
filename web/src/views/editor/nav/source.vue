<template>
    <el-tabs v-model="thatCode.activeName">
        <el-tab-pane label="代码" name="first">
            <UseFullscreen v-slot="{ isFullscreen, enter, exit, toggle }">
                <el-button icon="FullScreen" type="primary" @click="toggle">全屏</el-button>
                <el-button icon="Check" type="primary" @click="handleCodeTest">校验</el-button>
                <system-ace v-model:value="useProject.project.code" style="height:100%"></system-ace>
            </UseFullscreen>

        </el-tab-pane>

        <el-tab-pane label="样式" name="first1">
            <UseFullscreen v-slot="{ isFullscreen, enter, exit, toggle }">
                <el-button icon="FullScreen" type="primary" @click="toggle">全屏</el-button>
                <system-ace lang="css" v-model:value="thatCode.style" style="height:100%"></system-ace>
            </UseFullscreen>
        </el-tab-pane>

    </el-tabs>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"
const useProject = projectStore();

import { UseFullscreen } from "@vueuse/components"
import { ElMessage } from "element-plus";

const thatCode = reactive({
    activeName: "first",
    code: "function aa(){}",
    style: "#main{}"
})

watchEffect(() => {
    thatCode.code = useProject.project.code;
    thatCode.style = useProject.project.style;
})

// 监听代码变化
// watch(()=>useProject.project.code,(n,o)=>{
//     const classCode = ` 
//         ${n}
//     return LowCode;`
//         const ff = new Function(classCode);
//         const lowCode = ff();

//         lowCode["onBefore"]();

//         lowCode["onAfter"]();
// })

const handleCodeScreen = () => {

}

const handleCodeTest = () => {
    try {
        const classCode = ` 
        ${useProject.project.code}
    return LowCode;`
        const ff = new Function(classCode);
        const lowCode = ff();
        const ll = new lowCode();

        if (ll["onBefore"]) {
            ll["onBefore"]();
        }

        if (ll["onAfter"]) {
            ll["onAfter"]();
        }

        // document.addEventListener("DOMContentLoaded", function(){

        // });
        ElMessage.success("校验成功")
    } catch (error) {
        ElMessage.error(error.message)
    }

}

</script>