<template>
    <div class="drag-resize-example">
        <el-row>
            <el-col :span="6">
                <draggable class="drag-list1" :list="items" @end="onDragEnd"
                    :group="{ name: 'group1', pull: 'clone', put: false }">
                    <template #item="{ element }">
                        <div class="item" :style="{ width: element.width + 'px', height: element.height + 'px' }">
                            我是组件
                        </div>
                    </template>
                </draggable>
            </el-col>
            <el-col :span="18">
                <draggable class="drag-list" :list="items" @end="onDragEnd"
                    :group="{ name: 'group1' }">
                    <template #item="{ element }">
                        <vue-draggable-resizable :w="element.width" :h="element.height" @resize="onResize(element)">
                            {{ element }}
                        </vue-draggable-resizable>
                    </template>
                </draggable>
            </el-col>
        </el-row>



    </div>
</template>
  
<script>
import Draggable from 'vuedraggable';
import VueDraggableResizable from 'vue3-draggable-resizable';

export default {
    components: {
        Draggable,
        VueDraggableResizable
    },
    data() {
        return {
            items: [
                { id: 1, text: 'Item 1', width: 100, height: 100 },
                { id: 2, text: 'Item 2', width: 150, height: 150 },
            ]
        };
    },
    methods: {
        onDragEnd(event) {
            // Handle drag end
        },
        onResize(item) {
            // Handle item resize
        }
    }
};
</script>
  
<style>
.drag-resize-example {

}

.drag-list1 {
    border: 1px solid red
}

.drag-list {
    border: 1px solid blue;

    height:500px;
    position:relative
}

.item {
    border: 1px solid #ccc;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

</style>