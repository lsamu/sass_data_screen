<template>
  <el-collapse-item title="基本" name="base">
    <el-form-item label="标题：">
      <el-input v-model="thatOption.form.props.value"></el-input>
    </el-form-item>
  </el-collapse-item>

  <el-collapse-item title="事件" name="2">
    <system-event></system-event>
  </el-collapse-item>
</template>
<script lang="ts" setup>
const props = defineProps(["value"])

const emits = defineEmits(["update:value"])

const thatOption = reactive({
  activeName: "1",
  form: {} as any,
  children: [] as any
})

watchEffect(() => {
  thatOption.form = Object.assign({
    props: {
    }
  }, props.value || {});
})

</script>

<!-- <template>
  <box-form :option="currentOption" v-model="thatData.formData"></box-form>
</template>
<script lang="ts" setup>


const props = defineProps(["option", "data", "value"]);
const emits = defineEmits({});
const thatData = reactive({
  formData: props.value || {},
});

const currentOption = computed(() => {
  const defaultOption = {
    items: [
      {
        type: "group",
        items: [
          {
            caption: "文本设置",
            labelWidth: 90,
            items: [
              {
                type: "textarea",
                prop: "value",
                label: "文本",
                data: [],
              },
              {
                type: "input-number",
                prop: "size",
                label: "大小",
                controlsPosition: "right",
                data: [],
              },
              {
                type: "select",
                prop: "weight",
                label: "粗细",
                data: [
                  {
                    value: "normal",
                    label: "标准",
                  },
                  {
                    value: "bold",
                    label: "加粗",
                  },
                ],
              },
              {
                type: "slider",
                prop: "lineSpace",
                label: "行间距",
                data: [],
              },
              {
                type: "slider",
                prop: "wordSpace",
                label: "字间距",
                data: [],
              },
              {
                type: "select",
                prop: "align",
                label: "对齐",
                placeholder: "请选择对齐方式!",
                data: [
                  {
                    value: "1",
                    label: "居中",
                  },
                  {
                    value: "2",
                    label: "左对齐",
                  },
                  {
                    value: "3",
                    label: "右对齐",
                  },
                ],
              },
              {
                type: "input-color",
                prop: "color",
                label: "颜色",
                data: [],
              },
            ],
          },
        ],
      },
    ],
  };
  let oo = Object.assign(defaultOption, props.option);
  return oo;
});

const handleChange = (value) => {
  emits("input", value);
}

onMounted(() => {
  thatData.formData = Object.assign(thatData.formData, props.value || currentOption.value["value"] || {});
});

watch(
  () => props.value,
  (n, o) => {
    thatData.formData = n;
  },
  {
    deep: true,
  }
);
</script> -->
