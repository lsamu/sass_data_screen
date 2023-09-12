import { defineStore } from 'pinia'

import uuid from "node-uuid";

import { historyStore } from "./historyStore"

export const projectStore = defineStore('project', () => {

    // 撤销 重做
    const useHistory = historyStore();

    const project = reactive({
        title: "我的低代码",
        password: "",
        desc: "我是说明",
        version: "1.0.0",
        maps: [],//引用
        myComponents: [],//我的自定义组件
        components: [],//组件
        dataSource: [],//数据源
        vars: [],//变量
        jss: [],//函数
        code: `class LowCode {
    // 加载前
    onBefore(){

    }

    // 加载后
    onAfter(){
        
    }
}
`,//代码
        style: `/* 全局样式 */
#body{

}`,//样式
        width: 1436,
        events: [
            {
                name: `onInput`,
                script: `console.log('123456')`,
                desc: ``
            }
        ]
    })

    const that = reactive({
        component: {} as any, //选中的组件
        visual: true,
        history: true
    })

    // 选中组件
    const selectComponent = (id: string) => {

        const getComponet = (list: any[], iid: string): any => {
            for (let o of list || []) {
                if (o.id == iid) return o
                const o_ = getComponet(o.children, iid)
                if (o_) return o_
            }
        }

        that.component = getComponet(project.components, id);
    }

    const setComponent = (item: any) => {
        that.component = item;
    }

    // 添加组件
    const addComponent = (prop: any) => {
        prop.id = uuid();
        project.components.push(prop)
        setComponent(prop)
    }

    // 删除组件
    const deleteComponent = (item: any) => {

        const filterData = (data) => {
            let newData = data.filter(x => x.id != item.id);
            newData.forEach(x => x.children && (x.children = filterData(x.children)));
            return newData;
        }

        const dataNew = filterData(project.components);
        project.components = dataNew;
    }

    // 复制组件
    const copyComponent = (item: any) => {

        function findItemParent(data, itemSrc) {
            for (const item of data) {
                if (item.id === itemSrc.id) {
                    return data;
                }
                if (item.children) {
                    const foundItem = findItemParent(item.children, itemSrc);
                    if (foundItem) {
                        return foundItem;
                    }
                }
            }
            return null;
        }

        let parentItem = findItemParent(project.components, item)
        if (!parentItem) {
            parentItem = project.components
        }

        const targetIndex = parentItem.findIndex(item1 => item1.id === item.id);

        const itemNew = JSON.parse(JSON.stringify(item))
        itemNew.id = uuid();
        parentItem.splice(targetIndex + 1, 0, { ...itemNew });

        setComponent(itemNew)
    }

    const clearComponent = () => {
        project.components = [];
        that.component = {}
    }

    // 添加数据源
    const addDataSource = (form) => {
        const newForm = Object.assign({}, form)
        newForm.id = uuid();
        project.dataSource.push(newForm)
    }

    const addDataSourceParent = (parent, childrenItem) => {
        const newForm = Object.assign({}, childrenItem)
        newForm.id = uuid();
        parent["children"].push(newForm)
    }

    // 编辑数据源
    const editDataSource = (item) => {

        function findItemParent(data, itemSrc) {
            for (const item of data) {
                if (item.id === itemSrc.id) {
                    return data;
                }
                if (item.children) {
                    const foundItem = findItemParent(item.children, itemSrc);
                    if (foundItem) {
                        return foundItem;
                    }
                }
            }
            return null;
        }

        let parentItem = findItemParent(project.dataSource, item)
        if (!parentItem) {
            parentItem = project.components
        }

        const targetIndex = parentItem.findIndex(item1 => item1.id === item.id);

        parentItem[targetIndex] = item;
    }

    // 删除数据源
    const deleteDataSource = (item) => {
        const filterData = (data) => {
            let newData = data.filter(x => x.id != item.id);
            newData.forEach(x => x.children && (x.children = filterData(x.children)));
            return newData;
        }
        const dataNew = filterData(project.dataSource);
        project.dataSource = dataNew;
    }

    // 复制数据源
    const copyDataSource = (item) => {
        function findItemParent(data, itemSrc) {
            for (const item of data) {
                if (item.id === itemSrc.id) {
                    return data;
                }
                if (item.children) {
                    const foundItem = findItemParent(item.children, itemSrc);
                    if (foundItem) {
                        return foundItem;
                    }
                }
            }
            return null;
        }

        let parentItem = findItemParent(project.dataSource, item)
        if (!parentItem) {
            parentItem = project.components
        }

        const targetIndex = parentItem.findIndex(item1 => item1.id === item.id);

        const itemNew = Object.assign({}, item)
        itemNew.id = uuid();
        itemNew.label += " 复制"

        parentItem.splice(targetIndex + 1, 0, { ...itemNew });
    }

    const addJS = (item) => {
        const newItem = Object.assign({}, item)
        project.jss.push(newItem);
    }

    const addEvent = (item) => {
        const newItem = Object.assign({}, item)
        project.events.push(newItem);
    }

    // 监听这个数据变化
    watch(() => project.components, (n, o) => {
        if (that.history) {
            useHistory.change(n)
        }
    }, { deep: true })

    // todo:撤销
    const undo = () => {
        that.history = false
        project.components = useHistory.getPrev()
        setTimeout(() => {
            that.history = true
        }, 500)
    }

    // todo:重做
    const redo = () => {
        that.history = false
        project.components = useHistory.getNext();
        setTimeout(() => {
            that.history = true
        }, 500)
    }

    return {
        project,
        that,
        selectComponent,
        addComponent,
        deleteComponent,
        copyComponent,
        clearComponent,
        setComponent,
        addDataSource,
        addDataSourceParent,
        editDataSource,
        deleteDataSource,
        copyDataSource,
        addJS,
        addEvent,
        undo,
        redo
    }
}, { persist: true })