<template>
  <el-input v-model="thatOutline.input" placeholder="搜索" :suffix-icon="Search" />
  <el-tree ref="refTree" :data="thatOutline.data" :props="thatOutline.defaultProps" @node-click="onNodeClick"
    highlight-current node-key="id" :expand-on-click-node="false">
    <template #default="{ node, data }">
      <span style="width: 100%;" class="custom-tree-node" @click="onNodeClick(data)">
        <span>{{ node.label }}</span>
        <span class="context-menu">
          <el-dropdown trigger="click" @command="handleCommand($event, data)">
            <span class="el-dropdown-link">
              <el-icon :size="15">
                <More />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item :icon="SetUp" command="addInterface">设置</el-dropdown-item> -->
                <!-- <el-dropdown-item :icon="Edit" command="edit">编辑</el-dropdown-item> -->
                <el-dropdown-item :icon="DocumentCopy" command="copy">复制</el-dropdown-item>
                <el-dropdown-item :icon="Delete" command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
</template>
<script lang="ts" setup>
import { Calendar, Search, Edit, SetUp, DocumentCopy, More, Delete } from '@element-plus/icons-vue'

import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const refTree = ref();

const thatOutline = reactive({
  activeName: "first",
  input: "",
  data: [],
  defaultProps: {
    children: 'children',
    label: 'title',
  }
})

watchEffect(() => {
  thatOutline.data = useProject.project.components;
})


const onNodeClick = (node: any) => {
  useProject.setComponent(node);
}

const onLock = (node: any) => {

}

const onCopy = (node: any) => {
  useProject.copyComponent(node);
}

const onDelete = (node: any) => {
  useProject.deleteComponent(node);
}

const handleCommand = (command, item) => {
  switch (command) {
    case "copy":
      useProject.copyComponent(item)
      break;
    case "delete":
      useProject.deleteComponent(item)
      break;
  }
}

</script>
<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  &:hover>.context-menu {
    display: inherit;
  }
}

.context-menu {
  float: right;
  display: none;
}
</style>