<template>
    <div class="box-echart-layout">

        <drager rotatable v-for="element, index in componentList" :key="index" 
        :width="100" 
        :height="80"   
        :selected="useProject.that.component && useProject.that.component.id == element.id"
        @click="onChoose(element)"
        @change="onChange"
        >
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

const getComponent = (item: any) => {
    return item["componentName"];
}

const onChoose = (item) => {
    useProject.setComponent(item);
}

const onChange = (item)=>{
    useProject.that.component.location = item
}
</script>
<style lang="scss">
.box-echart-layout {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>