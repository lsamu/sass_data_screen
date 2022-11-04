<template>
    <div class="box-editor-container">
        <el-container style="height: calc(100vh)">
            <el-header height="50px" style="padding:0">
                <Header :option="{ title: '可视化数据大屏' }"></Header>
            </el-header>
            <el-container style="height: calc(100vh)">
                <el-main style="padding:0">
                    <splitpanes class="default-theme">
                        <pane :size="20" :minSize="10" :maxSize="50">
                            <box-editor-toolbox></box-editor-toolbox>
                        </pane>
                        <pane>
                            <box-editor-page-resize></box-editor-page-resize>
                        </pane>
                        <pane :size="20" :minSize="10" :maxSize="50">
                            <box-editor-property-layout-resize></box-editor-property-layout-resize>
                        </pane>
                    </splitpanes>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import Vue from "vue";
import Header from "@/components/editor/layout/top.vue";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { saveAs } from "file-saver";
import { projectStore } from '@/components/editor/hook/projectState'
import { Notification } from "element-ui";
import Splitpanes from "@/components/editor/layout/splitpanes/splitpanes.vue";
import Pane from "@/components/editor/layout/splitpanes/pane.vue";
import "splitpanes/dist/splitpanes.css";
import BoxEchart from "@/components/echart/main";
import cc from './components'
import {componentStore} from "@/components/editor/hook/componentStore"
Vue.use(BoxEchart, { option: true });

const root = getCurrentInstance();
const that = root.proxy;
const thatData = reactive({});
const project = projectStore();
const component = componentStore();
component.load(cc)

const refScreen = () =>{
    return (that.$refs["refScreen"] as any).$refs["screen"] as any;
};

const saveChartData = async ()=> {
    const dataURL = await generateScreenShot();
    console.log(dataURL);
    console.log("保存成功");
};

const generateScreenShot = async ()=> {
    const canvas = await html2canvas(refScreen(), {
        backgroundColor: "#142E48",
    });
    let dataURL = canvas.toDataURL("image/png");
    return dataURL;
};

//导出图片
const exportChartSnap = async ()=> {
    var img = await generateScreenShot();
    var alink = document.createElement("a");
    alink.href = img;
    alink.download = project.chartData.title + "screen.png";
    alink.click();
};

const htmlTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title><style>*{ padding:0;margin:0;}#container{overflow:hidden;width:100%;height:0;position:absolute;padding-top:#{containerPaddingTop}#}</style></head>
<body><div id="container">#{containerInnerHtml}#</div></body></html>`;

const exportH5 = ()=> {
    const finalHtmlCode = htmlTemplate.replace("#{containerInnerHtml}", "");
    const htmlBolb = new Blob([finalHtmlCode], { type: "text/html" });
    saveAs(htmlBolb, "index.html");
};

const exportPDF = ()=> {
    //https://blog.csdn.net/andy_5826_liu/article/details/105044032
    //Notification.info("未实现");
    var doc = new jsPDF();
    doc.text("Hello world!", 10, 30, {
        baseline: "bottom",
        angle: 90,
    });
    doc.save("two-by-four.pdf");
};

</script>
<style lang="scss" scoped>
.box-editor-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .topbar-view {
        position: absolute;
        height: 60px;
        width: 100vw;
        z-index: 1000;
    }

    .toolbar-view {
        position: absolute;
        top: 60px;
        width: 300px;
        bottom: 0;
        z-index: 1000;
    }

    .config-view {
        position: absolute;
        right: 0;
        top: 60px;
        width: 300px;
        bottom: 0;
        z-index: 1000;
    }

    .scale-view {
        position: absolute;
        right: 316px;
        bottom: 16px;
        z-index: 1000;

        &.preview {
            right: 40px;
        }
    }

    .main-view {
        background: #eeeeee;
        padding: 60px 300px 0 300px;
        overflow: hidden;
        height: calc(100vh);
    }
}
</style>
