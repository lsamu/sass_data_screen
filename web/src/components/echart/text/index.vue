<template>
  <div class="box-echart-text">

  </div>
</template>
<script lang="ts" setup>


const props = defineProps(["option", "data", "value"]);
const emits = defineEmits({});

const thatData = reactive({
  formData: "",
});

const currentOption = computed(() => {
  let oo = {};
  return oo;
});

const currentData = computed(() => {
  let oo = {};
  return oo;
});

const handleChange = (value) => {
  emits("input", value);
}

onMounted(() => {
  thatData.formData = props.value || currentOption.value["value"] || "";
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

</script>
<style lang="scss">
.box-echart-text {
  width: 100%;
  height: 100%;
}
</style>