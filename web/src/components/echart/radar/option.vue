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
            caption: "雷达图",
            labelWidth: 90,
            items: [
              {
                type: "textarea",
                prop: "url",
                label: "地址",
                data: [],
              },
              {
                type: "upload",
                prop: "url",
                label: "上传",
                data: [],
              },
            ],
          },
          {
            caption: "数据处理",
            items: [
              {
                label: "数据类型",
                type: "radio",
                prop: "dataType",
                value: 1,
                data: [
                  {
                    label: "静态",
                    value: 1,
                  },
                  {
                    label: "动态",
                    value: 2,
                  },
                  {
                    label: "SQL",
                    value: 3,
                  },
                ],
              },
              {
                label: "刷新时间",
                type: "input-number",
                prop: "refreshTime",
                value: 60,
              },
              {
                label: "编辑数据",
                prop: "value",
                type: "button-dialog",
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
