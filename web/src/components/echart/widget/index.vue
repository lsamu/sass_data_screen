<template>
    <div class="box-echart-widget">
        <drager rotatable v-for="element, index in componentList" :key="index">
            <component :ref="element['name'] || element['id']" :is='getComponent(element)' v-bind="element['props']"
                v-on="getEvents(element['events'])" v-model:children="element['children']" v-model:value="element['value']"
                v-model="element['value']">
            </component>
        </drager>
    </div>
</template>
<script lang="ts" setup>
import 'es-drager/lib/style.css'
import Drager from 'es-drager'

import { Calendar, Search, DocumentCopy, Delete, Rank } from '@element-plus/icons-vue'
import uuid from "node-uuid";
import { projectStore } from "@@/store/projectStore"

const useProject = projectStore();

const props = defineProps(["option", "children", "span", "data", "value"])

const emits = defineEmits(["update:children"])

const componentList = computed({
    get: () => props.children || [],
    set: val => {
        emits('update:children', val)
    }
})

const getEvents = (events) => {
    if (!events || JSON.stringify(events) == '{}') {
        return events
    }
    const ret_events = {}
    for (const key in events) {
        const event = events[key];
        const script = useProject.project.events.find(x => x.name == event).script
        ret_events[key] = eval(script);
    }
    return ret_events
}

const getComponent = (item: any) => {
    return item["componentName"];
}

const onChoose = (context) => {
    const item = context.item.__draggable_context.element;
    useProject.setComponent(item);
}

const onCopy = (item) => {
    useProject.copyComponent(item)
}

const onDelete = (item) => {
    useProject.deleteComponent(item)
}

</script>
<style lang="scss">
.box-echart-widget {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>