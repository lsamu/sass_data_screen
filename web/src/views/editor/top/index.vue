<template>
  <div class="tool-bar">
    <div class="tool-bar-item">
      <!-- <el-button type="primary" @click="handleSize('pc')" link>电脑</el-button>
      <el-button type="primary" @click="handleSize('pad')" link>平板</el-button>
      <el-button type="primary" @click="handleSize('mobile')" link>手机</el-button>
      <el-input type="number" v-model="useProject.project.width" style="width:150px">
        <template #append>px</template>
      </el-input> -->

      <!-- <div>
        画布大小:
        <el-slider v-model="panZoomOption.value" :min="10" :max="200" />
        <el-select v-model="panZoomOption.value">
          <el-option v-for="item in panZoomOption.options" :key="item.value" :label="item.value" :value="item.value" />
        </el-select>
      </div> -->
      <el-button type="primary" :icon="ArrowLeftBold" @click="handlePrev">撤销</el-button>
      <el-button type="primary" :icon="ArrowRightBold" @click="handleNext">恢复</el-button>
      <el-button type="primary" :icon="FullScreen" @click="handleFullScreen">全屏</el-button>
    </div>
    <div class="tool-bar-middle">
      <div class="tool-bar-title">{{ useProject.project.title }}</div>
    </div>
    <div class="tool-bar-item">


      <el-button type="primary" :icon="View" @click="handlePreview">预览</el-button>
      <!-- <el-button type="primary" :icon="Document" @click="handleCode">生成代码</el-button> -->
      <el-button type="primary" :icon="Memo" @click="handleJSON">生成JSON</el-button>
      <el-button type="primary" :icon="Memo" @click="handleJSON">加载JSON</el-button>
      <el-button type="danger" :icon="CircleClose" @click="handleClear">清空</el-button>
      <!-- <el-button type="primary" :icon="Flag">快捷键</el-button> -->
      <el-button type="primary" :icon="Select" @click="handleSave">保存</el-button>
    </div>
  </div>

  <!-- <div class="topArea">
    <div class="right">
      <el-button type="primary" :icon="ArrowLeftBold" @click="handlePrev" link>撤销</el-button>
      <el-button type="primary" :icon="ArrowRightBold" @click="handleNext" link>恢复</el-button>
      <el-button type="primary" :icon="FullScreen" @click="handleFullScreen" link>全屏</el-button>
      <el-button type="primary" :icon="View" @click="handlePreview" link>预览</el-button>
      <el-button type="primary" :icon="Memo" @click="handleJSON" link>生成JSON</el-button>
      <el-button type="primary" :icon="Memo" @click="handleJSON" link>加载JSON</el-button>
      <el-button type="danger" :icon="CircleClose" @click="handleClear" link>清空</el-button>
      <el-button type="primary" :icon="Select" @click="handleSave" link>保存</el-button>
    </div>
  </div> -->

  <el-dialog v-model="thatPreview.visible" title="预览" fullscreen center :before-close="handlePreviewClose">
    <div class="container-preview">

      <el-scrollbar :height="height - 110">
        <WidgetContainer></WidgetContainer>
      </el-scrollbar>

    </div>

  </el-dialog>

  <el-dialog v-model="thatCode.visible" title="生成代码" width="70%" draggable="true">
    <system-ace v-model:value="thatCode.content"></system-ace>
  </el-dialog>

  <el-dialog v-model="thatJSON.visible" title="生成JSON" width="70%" draggable="true">
    <system-ace lang="json" v-model:value="thatJSON.content"></system-ace>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="thatJSON.visible = false">复制到剪贴板</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="thatJSON.visible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { projectStore } from "../../../store/projectStore"
import { useFullscreen, useWindowSize } from '@vueuse/core'
import { ElMessage, ElMessageBox, ElMessage as Message } from "element-plus";
import { ArrowLeftBold, ArrowRightBold, FullScreen, View, Remove, CircleClose, Select, Document, Memo, Flag } from '@element-plus/icons-vue'
import WidgetContainer from "../widget-container/index.vue"

const { isFullscreen, enter, exit, toggle } = useFullscreen()


const { width, height } = useWindowSize();

const useProject = projectStore();

// 撤销
const handlePrev = () => {
  useProject.undo()
}

const handleNext = () => {
  useProject.redo()
}

// 清除
const handleClear = () => {

  // ElMessageBox.confirm("清除不可恢复,确定继续", "提示", { type: "warning" }).then(() => {
  //   useProject.clearComponent();
  //   ElMessage.success("组件清除成功")
  // }).catch(() => {

  // })
  useProject.clearComponent();
}

//全屏
const handleFullScreen = () => {
  toggle()
}

const thatPreview = reactive({
  visible: false
})

const handlePreview = () => {
  useProject.that.visual = false;
  thatPreview.visible = true
}

const handlePreviewClose = () => {
  useProject.that.visual = true;
  thatPreview.visible = false
}

const thatCode = reactive({
  visible: false,
  content: ""
})

const handleCode = () => {
  thatCode.visible = true
  thatCode.content = `
  const aa = args[0];
  function bb(){
    console.log("bb");
  }

  console.log(aa);
  `
}

const thatJSON = reactive({
  visible: false,
  content: ""
})

const handleJSON = () => {
  thatJSON.visible = true;
  const json = JSON.stringify(useProject.project, null, '\t')
  thatJSON.content = json;
}

const handleSize = (type = "pc") => {
  switch (type) {
    case "pc":
      useProject.project.width = 1435
      break;
    case "pad":
      useProject.project.width = 770
      break
    case "mobile":
      useProject.project.width = 375
      break
  }
}

const handleSave = () => {

  // const json = JSON.stringify(useProject.project)

  // localStorage.setItem("lowcode_project_json", json)

  Message.success({
    message: "保存成功"
  })
}

const panZoomOption = reactive({
  value: 100,
  options: [
    {
      label: "200%",
      value: 200
    },
    {
      label: "150%",
      value: 150
    },
    {
      label: "100%",
      value: 100
    },
    {
      label: "80%",
      value: 80
    },
    {
      label: "50%",
      value: 50
    }
  ]
})

</script>
<style lang="scss">
.tool-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px var(--n-text-color) solid;

  .tool-bar-item {
    height: 100%;
    display: flex;
    align-items: center;
  }

  button {
    border: none;
    // padding: 5px 5px;
    margin: auto 3px;
  }

  .tool-bar-title {
    font-size: 20px;
    font-weight: 400;
  }
}

.container-preview {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  height: 100%;
  overflow: auto;
}
</style>