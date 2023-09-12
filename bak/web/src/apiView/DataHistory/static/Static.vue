<template>
  <n-card title="静态数据" size="small">
    <n-input placeholder="请输入搜索条件" />
    <n-tabs>
      <n-tab-pane name="静态数据">
        <n-ol align-text>
          <n-li
            v-for="item in dataList"
            :key="item.id"
            v-contextmenu="() => dataListContextMenus(item.id)"
            class="data-item"
            @click="selectDataItem(item.id)"
            ><n-space>{{ item.name }}</n-space></n-li
          >
        </n-ol>
      </n-tab-pane>
      <n-tab-pane name="最近使用">
        <n-ol align-text>
          <n-li
            v-for="item in dataHistory"
            :key="item.id"
            v-contextmenu="() => dataHistoryContextMenus(item.id)"
            class="data-item"
            @click="selectDataItem(item.id)"
            ><n-space>{{ item.name }}</n-space></n-li
          >
        </n-ol>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
import { deleteStaticDataApi, getStaticDataListApi } from '@/api/data'
import { eventBus, StaticKey } from '@/bus'
import useDataSnapShot from '@/apiView/hooks/snapshot'

import { message } from '@/utils/message'

const snapShot = useDataSnapShot('STATIC', true)
const dataHistory = ref([])
const dataList = ref([])
const loadStaticList = async () => {
  try {
    const resp = await getStaticDataListApi()
    if (resp.status === 200) {
      dataList.value = resp.data
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

const selectDataItem = (id) => {
  eventBus.emit(StaticKey.STATIC_KEY, id)
}
const getHistory = async () => {
  const data = await snapShot.list()
  dataHistory.value = data.map((el) => el.data)
}

onMounted(async () => {
  await loadStaticList()
  await getHistory()
})

const removeData = async (id) => {
  try {
    const resp = await deleteStaticDataApi(id)
    if (resp.status === 200) {
      message.success('删除成功')
      await loadStaticList()
    }
  } catch (err) {
    return undefined
  }
}

const clearSnapshot = async () => {
  await snapShot.clear()
  await getHistory()
}

const dataListContextMenus = (id) => {
  return [
    {
      text: '删除',
      subText: '',
      handler: () => removeData(id)
    }
  ]
}

const dataHistoryContextMenus = () => {
  return [
    {
      text: '清除',
      subText: '',
      handler: () => clearSnapshot()
    }
  ]
}
</script>
<style lang="less">
.data-item {
  &:hover {
    transform: scale(1.01);
    color: #2d8cf0;
    cursor: pointer;
  }
}
</style>
