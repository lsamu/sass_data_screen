<template>
  <el-container>
    <el-header height="48px">
      <TopIndex></TopIndex>
    </el-header>
    <el-container style="height: calc(100vh - 100px);">

      <el-aside width="350px" class="widget-config-container" style="padding:10px;background: rgb(242, 243, 245);"
        :style="{ '--el-aside-width': thatOption.left == false ? '0px' : '350px' }">
        <div style="top: 10px;
    left: 0px;
    right: 0px;
    bottom: 10px;
    position: absolute;height: calc(100% - 20px);background-color: #fff;padding: 0 10px 0 0;">
          <el-tabs v-model="thatNavs.activeName" tab-position="left">
            <el-tab-pane label="组件库" name="first">
              <NavComponent :data="cc"></NavComponent>
            </el-tab-pane>
            <el-tab-pane label="大纲树" name="second">
              <NavOutline></NavOutline>
            </el-tab-pane>
            <el-tab-pane label="数据源" name="third">
              <NavDataSource></NavDataSource>
            </el-tab-pane>
            <el-tab-pane label="源码区" name="fourth">
              <NavSource></NavSource>
            </el-tab-pane>
            <el-tab-pane label="变量区" name="fourth1">
              <NavVariable></NavVariable>
            </el-tab-pane>
            <!-- <el-tab-pane label="外部JS" name="fourth2">
              <NavJavaScript></NavJavaScript>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="函数区" name="fourth3">
              <NavFunction></NavFunction>
            </el-tab-pane> -->
          </el-tabs>
        </div>

      </el-aside>

      <el-container>
        <el-main style="padding: 0;position: relative;background: #f2f3f5" ref="refMain">
          <WidgetContainerVisual></WidgetContainerVisual>
        </el-main>
      </el-container>

      <el-aside width="350px" class="widget-config-container" style="padding:10px;background: rgb(242, 243, 245);"
        :style="{ '--el-aside-width': thatOption.right == false ? '0px' : '350px' }">
        <div style="top: 10px;
    left: 0px;
    right: 0px;
    bottom: 10px;
    position: absolute;height: calc(100% - 20px);background-color: #fff;padding: 0 10px;">
          <el-tabs v-model="thatProp.activeName">
            <el-tab-pane label="属性" name="first">

              <PropProp></PropProp>

            </el-tab-pane>
            <el-tab-pane label="样式" name="first1">
              <PropStyle></PropStyle>
            </el-tab-pane>
            <!-- <el-tab-pane label="事件" name="first2">
              <PropEvent></PropEvent>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="公共" name="common">
              <PropCommon></PropCommon>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </el-aside>

    </el-container>
    <el-footer height="30px">
      <div style="text-align: center; line-height: 30px; font-size: 14px;">
        2023~
      </div>
    </el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import PropEvent from "./prop/event.vue"
import PropStyle from "./prop/style.vue"
import PropProp from "./prop/prop.vue"
import PropCommon from "./prop/common.vue"

import NavOutline from "./nav/outline.vue"
import NavComponent from "./nav/component.vue"
import NavDataSource from "./nav/data-source.vue"
import NavSource from "./nav/source.vue"
import NavVariable from "./nav/variable.vue"

import cc from "../../components/components"

import TopIndex from "./top/index.vue"

import WidgetContainerVisual from "./widget-container/visual.vue"

import { projectStore } from "../../store/projectStore"

const useProject = projectStore();

const {proxy,appContext} = getCurrentInstance();

console.log(proxy)

const pp = appContext.app.component("BoxDatagrid")
console.log(pp)

const aa = resolveComponent("BoxDatagrid123")
console.log(aa) 

onMounted(() => {
  // const projectJson = localStorage.getItem("lowcode_project_json")
  // if (projectJson) {
  //   const json = JSON.parse(projectJson);
  //   useProject.project = json
  // }

  useProject.that.visual = true;
})

const refMain = ref();

const thatNavs = reactive({
  activeName: "first"
})

const thatProp = reactive({
  activeName: "first",
})

const thatOption = reactive({
  left: true,
  right: true
})

</script>

<style lang="scss">
.widget-config-container {
  position: relative;
  overflow: unset;
}
</style>
../../components/big/components