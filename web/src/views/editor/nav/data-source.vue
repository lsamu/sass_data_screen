<template>
  <!-- <el-button type="primary" icon="plus" @click="handleNew">新建</el-button> -->
  <el-button type="primary" icon="check" @click="handleImport">导入</el-button>
  <el-button type="primary" icon="check" @click="handleExport">导出</el-button>
  <el-input v-model="thatDataSource.input" placeholder="搜索">
    <template #prepend>
      <el-button icon="plus" @click="handleGroupNew"></el-button>
    </template>
    <template #append>
      <el-button icon="search" />
    </template>
  </el-input>
  <el-tree :data="useProject.project.dataSource" :props="thatDataSource.defaultProps" :expand-on-click-node="false">
    <template #default="{ node, data }">
      <span style="width: 100%;" class="custom-tree-node">
        <!-- <el-icon><Folder/></el-icon> -->
        <span>{{ node.label }} </span>
        <span class="context-menu">
          <el-dropdown trigger="click" @command="handleCommand($event, data)">
            <span>
              <el-icon :size="15">
                <More />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item :icon="SetUp" command="set">设置</el-dropdown-item> -->
                <el-dropdown-item icon="plus" command="add" divided v-if="data.type == 'group'">添加</el-dropdown-item>
                <el-dropdown-item :icon="Edit" command="edit" v-if="data.type == 'group'">编辑</el-dropdown-item>
                <el-dropdown-item :icon="DocumentCopy" command="copy" v-if="data.type == 'group'">复制</el-dropdown-item>
                <el-dropdown-item :icon="Delete" command="delete" v-if="data.type == 'group'">删除</el-dropdown-item>

                <el-dropdown-item icon="plus" command="addData" divided
                  v-if="data.type == 'group'">添加接口</el-dropdown-item>
                <el-dropdown-item icon="edit" command="editData" v-if="data.type == 'interface'">编辑接口</el-dropdown-item>
                <el-dropdown-item icon="document-copy" command="copyData"
                  v-if="data.type == 'interface'">复制接口</el-dropdown-item>
                <el-dropdown-item icon="delete" command="deleteData"
                  v-if="data.type == 'interface'">删除接口</el-dropdown-item>
                <!-- <el-dropdown-item icon="view" command="viewData" v-if="data.type == 'interface'">查看数据</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>

  <el-dialog v-model="thatGroup.dialog.visible" :title="thatGroup.dialog.title" width="40%" draggable>
    <el-form :model="thatGroup.form" label-width="80px">
      <el-form-item label="名称：">
        <el-input v-model="thatGroup.form.label" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button icon="CircleCloseFilled" @click="thatGroup.dialog.visible = false">取消</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="handleGroupSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="thatInterface.dialog.visible" :title="thatInterface.dialog.title" width="60%" draggable>
    <el-form :model="thatInterface.form" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item label="名称：">
            <el-input v-model="thatInterface.form.label" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="地址：">
            <el-input placeholder="请输入请求URL" v-model="thatInterface.form.url">
              <template #prepend>
                <el-select v-model="thatInterface.form.method" style="width: 100px">
                  <el-option v-for="item, index in ['GET', 'POST', 'PUT', 'DELETE']" :key="index" :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col>

          <el-tabs v-model="thatInterface.active" type="card">
            <el-tab-pane name="first0" label="参数">
              <el-table :data="thatInterface.form.params" style="width: 100%">
                <el-table-column prop="key" label="键">
                  <template #default="scope">
                    <el-input v-model="scope.row.key" placeholder="请输入键" />
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="值">
                  <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="请输入值" />
                  </template>
                </el-table-column>
                <el-table-column prop="desc" label="说明">
                  <template #default="scope">
                    <el-input v-model="scope.row.desc" placeholder="请输入说明" />
                  </template>
                </el-table-column>
                <el-table-column prop="key" label="操作" width="140">
                  <template #default="scope">
                    <el-button type="primary">移动</el-button>
                    <el-button type="danger" @click="handleDelParam(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" @click="handleAddParam">添加</el-button>
            </el-tab-pane>
            <el-tab-pane name="first2" label="Header">
              <el-table :data="thatInterface.form.headers" style="width: 100%">
                <el-table-column prop="key" label="键">
                  <template #default="scope">
                    <el-input v-model="scope.row.key" placeholder="请输入键" />
                  </template>
                </el-table-column>
                <el-table-column prop="value" label="值">
                  <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="请输入值" />
                  </template>
                </el-table-column>
                <el-table-column prop="desc" label="说明">
                  <template #default="scope">
                    <el-input v-model="scope.row.desc" placeholder="请输入说明" />
                  </template>
                </el-table-column>
                <el-table-column prop="key" label="操作" width="140">
                  <template #default="scope">
                    <el-button type="primary">移动</el-button>
                    <el-button type="danger" @click="handleDelHeader(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" @click="handleAddHeader">添加</el-button>
            </el-tab-pane>
            <el-tab-pane name="first3" label="Body">
              <system-ace lang="json" v-model:value="thatInterface.form.body"></system-ace>
            </el-tab-pane>
            <el-tab-pane name="first4" label="接口描述">
              <el-input type="textarea" :rows="10"></el-input>
            </el-tab-pane>
            <el-tab-pane name="first5" label="请求前脚本">
              <system-ace v-model:value="thatInterface.form.script.before"></system-ace>
            </el-tab-pane>
            <el-tab-pane name="first6" label="请求后脚本">
              <system-ace v-model:value="thatInterface.form.script.after"></system-ace>
            </el-tab-pane>
            <el-tab-pane name="first7" label="设置">
              <el-form-item label="是否自动请求：">
                <el-switch v-model="thatInterface.form.auto"></el-switch>
              </el-form-item>
              <el-form-item label="超时时间：">
                <el-input type="number" v-model="thatInterface.form.timeout" placeholder="请输入超时时间"></el-input>
              </el-form-item>
              <el-form-item label="定时刷新：">
                <el-input type="number" v-model="thatInterface.form.refresh" placeholder="请输入刷新时间"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="result" label="请求结果">
              <system-ace v-model:value="thatInterface.result"></system-ace>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button icon="CircleCloseFilled" type="success" @click="handleApiTest">测试</el-button>
        <el-button @click="thatInterface.dialog.visible = false">取消</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="handleInterfaceSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="thatImport.visible" title="导入" width="60%" draggable>
    <el-form :model="thatImport.form" label-width="100px">
      <el-form-item label="内容：">
        <system-ace lang="json" v-model:value="thatImport.form.content"></system-ace>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button icon="CircleCloseFilled" @click="thatImport.visible = false">取消</el-button>
        <el-button icon="Check" type="primary" @click="thatImport.visible = false">校验</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="thatImport.visible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="thatExport.visible" title="导出" width="60%" draggable>
    <el-form :model="thatExport.form" label-width="100px">
      <el-form-item label="内容：">
        <system-ace lang="json" v-model:value="thatExport.form.content"></system-ace>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="thatExport.visible = false">将代码复制剪贴板</el-button>
        <el-button type="primary" icon="SuccessFilled" @click="thatExport.visible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="thatView.dialog.visible" title="查看数据" width="60%" draggable>
    <!-- 单行 多行 分页 树形 -->

    <el-table :data="thatView.data" style="width: 100%">
      <el-table-column :prop="item.prop" :label="item.label" v-for="item, index in thatView.columns" :key="index" />
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="1000" />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" icon="SuccessFilled" @click="thatView.dialog.visible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { Calendar, Search, Edit, SetUp, DocumentCopy, More, Delete, Folder } from '@element-plus/icons-vue'

import { ElMessage, ElNotification, ElMessageBox } from "element-plus"

import axios from 'axios';

import { projectStore } from "../../../store/projectStore"

const useProject = projectStore();

const thatDataSource = reactive({
  input: "",
  data: [],
  defaultProps: {
    children: 'children',
    label: 'label',
  }
})

const thatInterface = reactive({
  dialog: {
    visible: false,
    title: "新建接口"
  },
  active: "first0",
  form: {
    header: [],
    params: [],
    body: "{}",
    refresh: 0
  } as any,
  defaultForm: {
    label: "新接口",
    type: "interface",
    auto: false,
    method: "GET",
    timeout: 60,
    params: [],
    headers: [],
    script: {
      before: "",
      after: ""
    },
    refresh: 0
  } as any,
  selectedNode: null,
  result: "",// 请求结果
})

const handleNew = (item) => {
  thatInterface.dialog.visible = true;
  thatInterface.dialog.title = "新建接口";
  thatInterface.form = Object.assign({}, thatInterface.defaultForm)
  thatInterface.selectedNode = item;
  nextTick(() => {

  })
}

const handleEdit = (item) => {
  thatInterface.dialog.visible = true;
  thatInterface.dialog.title = "编辑接口";
  thatInterface.form = Object.assign({}, item)
  nextTick(() => {

  })
}

const handleCopy = (item) => {
  useProject.copyDataSource(item);
}

const handleDelete = (item) => {
  useProject.deleteDataSource(item);
}

const handleCommand = (command, item) => {
  switch (command) {
    case "add":
      handleGroupNew()
      break;
    case "edit":
      handleGroupEdit(item)
      break;
    case "delete":
      handleGroupDelete(item)
      break;
    case "copy":
      handleGroupCopy(item)
      break;
    case "addData":
      handleNew(item)
      break;
    case "editData":
      handleEdit(item);
      break;
    case "deleteData":
      handleDelete(item);
      break;
    case "copyData":
      handleCopy(item);
      break;
    case "viewData":
      // handleCopy(item);
      thatView.dialog.visible = true;

      // 获取item数据  todo:
      thatView.columns.push({
        prop: "title",
        label: "title"
      })

      thatView.data.push({
        title: "我是标题1"
      })
      break;
  }
}

// 添加
const handleAddParam = () => {
  thatInterface.form.params.push({
    key: "键",
    value: "",
    desc: ""
  })
}

// 删除
const handleDelParam = (row) => {
  const index = thatInterface.form.params.indexOf(row)
  if (index !== -1) {
    thatInterface.form.params.splice(index, 1)
  }
}

// 添加
const handleAddHeader = () => {
  thatInterface.form.headers.push({
    key: "键",
    value: "",
    desc: ""
  })
}

// 删除
const handleDelHeader = (row) => {
  const index = thatInterface.form.headers.indexOf(row)
  if (index !== -1) {
    thatInterface.form.headers.splice(index, 1)
  }
}

const thatImport = reactive({
  visible: false,
  form: { content: "" } as any
})

const thatExport = reactive({
  visible: false,
  form: { content: "" } as any
})

const handleImport = () => {
  thatImport.visible = true;
}

const handleExport = () => {
  thatExport.visible = true;
}

// 确定
const handleInterfaceSubmit = () => {
  if (thatInterface.form && thatInterface.form.id) {
    useProject.editDataSource(thatInterface.form);
  } else {
    useProject.addDataSourceParent(thatInterface.selectedNode, thatInterface.form);
  }
  thatInterface.selectedNode = null;
  thatInterface.dialog.visible = false
}

// 测试
const handleApiTest = async () => {

  axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  const method = thatInterface.form.method;
  const url = thatInterface.form.url;

  const header = {}

  for (const item of thatInterface.form.headers) {
    header[item.key] = item.value;
  }

  if (!header["content-type"]) {
    header["content-type"] = "application/json"
  }


  let oo = {
    method: method,
    url: url,
    headers: header,
  }

  const data = {}
  for (const item of thatInterface.form.params) {
    data[item.key] = item.value;
  }

  if (method.toUpperCase() == "GET") {
    oo["params"] = data;
  } else {
    let body = thatInterface.form.body;
    if (!body) {
      body = "{}"
    }
    const data = JSON.parse(body);
    oo["data"] = data;
  }

  thatInterface.active = "result";

  try {
    const ret = await axios.request(oo);
    thatInterface.result = JSON.stringify(ret.data, null, '\t')
    ElMessage.success("请求成功")
  } catch (error) {
    thatInterface.result = JSON.stringify(error, null, '\t')
    ElMessage.error("请求失败")
  }
}

const thatGroup = reactive({
  dialog: {
    title: "新建分组",
    visible: false
  },
  form: {} as any
})

const handleGroupNew = () => {
  thatGroup.dialog.visible = true;
  nextTick(() => {
    thatGroup.form = {
      type: "group",
      children: []
    };
  })
}

const handleGroupEdit = (item) => {
  thatGroup.dialog.title = "编辑分组";
  thatGroup.dialog.visible = true;
  nextTick(() => {
    const newItem = Object.assign({}, item);
    thatGroup.form = newItem;
  })
}

const handleGroupCopy = (item) => {
  useProject.copyDataSource(item);
}

const handleGroupDelete = (item) => {
  useProject.deleteDataSource(item);
}

const handleGroupSubmit = () => {
  if (thatGroup.form && thatGroup.form.id) {
    useProject.editDataSource(thatGroup.form);
  } else {
    useProject.addDataSource(thatGroup.form);
  }
  thatGroup.dialog.visible = false;
}

const thatView = reactive({
  dialog: {
    visible: false
  },
  data: [],//数据
  columns: []//列
})

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