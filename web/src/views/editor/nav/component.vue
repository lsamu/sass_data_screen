<template>
  <el-tabs v-model="thatTabsComponent.activeName">
    <el-tab-pane label="组件" name="first">
      <el-input v-model="thatTabsComponent.input" placeholder="搜索" :suffix-icon="Search" />
      <el-collapse v-model="thatCollapse1.activeName" accordion>

        <el-collapse-item :title="item.title" :name="'fisrt' + index" v-for="item, index in componentList">

          <draggable tag="el-row" :component-data="getComponentData" v-model="item.children"
            :group="{ name: 'components', pull: 'clone', put: false }" item-key="componentName" :sort="false"
            :clone="clone">
            <template #item="{ element }">
              <el-col :span="12">
                <el-button @click="handleAddComponent(element)" style="width:95%;margin: 5px; border: 1px dashed #409eff;"
                  :title="element.componentName">{{ element.title }}
                </el-button>
              </el-col>
            </template>
          </draggable>

        </el-collapse-item>

      </el-collapse>

    </el-tab-pane>
    <el-tab-pane label="模板" name="first2">
      <el-input v-model="thatTabsComponent.input" placeholder="搜索" :suffix-icon="Search" />
      <el-scrollbar>
        <el-row>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                fit="fit" />
              <div style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px">
                典型表单

                <span style="float:right">
                  <el-dropdown trigger="click">
                    <span>
                      <el-icon :size="15">
                        <More />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item icon="edit" command="edit">加载</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                fit="fit" />
              <div style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px">
                注册表单
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                fit="fit" />
              <div style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px">
                高级表单
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                fit="fit" />
              <div style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px">
                高级表格
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="自定义" name="first3">
      <el-input v-model="thatTabsComponent.input" placeholder="搜索" :suffix-icon="Search" />
      <el-button icon="plus" type="primary" @click="handleAddMyComponent">添加</el-button>

      <el-scrollbar>

        <draggable tag="el-row" :component-data="getComponentData" v-model="useProject.project.myComponents"
          :group="{ name: 'components', pull: 'clone', put: false }" item-key="componentName" :sort="false"
          :clone="clone">
          <template #item="{ element }">
            <el-col :span="12">

              <el-card :body-style="{ padding: '0px' }">
                <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  fit="fit" />
                <div style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:12px">
                  {{ element.title }}

                  <span style="float:right">
                    <el-dropdown trigger="click" @command="handleCommandMyComponent($event, element)">
                      <span>
                        <el-icon :size="15">
                          <More />
                        </el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>

                          <el-dropdown-item icon="edit" command="edit">编辑</el-dropdown-item>
                          <el-dropdown-item icon="Delete" command="delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </span>
                </div>
              </el-card>

            </el-col>
          </template>
        </draggable>

      </el-scrollbar>

    </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="myComponentOption.dialog.visible" title="自定义组件" width="50%" draggable>

    <el-form :model="myComponentOption.form" label-width="100px">
      <el-form-item label="标题：">
        <el-input v-model="myComponentOption.form.title" placeholder="请输入标题" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button icon="CircleCloseFilled" @click="myComponentOption.dialog.visible = false">取消</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="handleSubmitMyComponent">
          确定
        </el-button>
      </span>
    </template>

  </el-dialog>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
import uuid from "node-uuid";
import { Calendar, Search, Upload } from '@element-plus/icons-vue'
import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const { proxy, appContext } = getCurrentInstance();

const props = defineProps(["option", "data", "value"])

const thatTabsComponent = reactive({
  input: "",
  activeName: "first"
})

const thatCollapse1 = reactive({
  activeName: "fisrt0"
})

const componentList = props.data;

/**
 * 组件数据
 */
const getComponentData = () => {
  return {
    span: 12
  }
}

/**
 * 添加组件
 */
const handleAddComponent = (item) => {
  const itemNew = JSON.parse(JSON.stringify(item))
  useProject.addComponent(itemNew);
}

/**
 * 复制组件
 */
const onClone = (context) => {

}

/**
 * 复制组件
 */
const clone = (item) => {
  const uu = uuid();
  const itemNew = JSON.parse(JSON.stringify(item))
  itemNew.id = uu;
  itemNew.name = item.componentName + "_" + uu

  itemNew.props["label"] = item.title;
  itemNew.props["prop"] = "label";

  useProject.setComponent(itemNew)
  return itemNew;
}

const onEnd = (a, b, c) => {
  console.log(a, b, c)
}

//#region 自定义组件

/**
 * 自定义组价属性
 */
const myComponentOption = reactive({
  dialog: {
    visible: false
  },
  form: {} as any
})

/**
 * 添加自定义组件
 */
const handleAddMyComponent = () => {
  myComponentOption.form = {}
  myComponentOption.dialog.visible = true;
}

/**
 * 提交自定义组件
 */
const handleSubmitMyComponent = () => {
  const uu = uuid();
  useProject.project.myComponents.push({
    componentName: "BoxDiy",
    hidden: false,
    locked: false,
    ...myComponentOption.form,
    props: {

    },
    events: {

    },
    children: [
      {
        title: "自定义单行文本",
        componentName: "ElInput",
        hidden: false,
        locked: false,
        props: {

        },
        events: {}
      }
    ]
  })
  // 注册组件
  // appContext.app.component("", null);

  myComponentOption.dialog.visible = false;
}

/**
 * 操作
 */
const handleCommandMyComponent = (command, item) => {
  switch (command) {
    case "edit":
      myComponentOption.form = item;
      myComponentOption.dialog.visible = true;
      break
    case "delete":
      const index = useProject.project.myComponents.indexOf(item)
      if (index !== -1) {
        useProject.project.myComponents.splice(index, 1)
      }
      break
  }
}
//#endregion

</script>