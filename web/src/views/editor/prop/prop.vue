<template>
    <system-prop>

        <template #default="scope">
            <component :is='getComponent(scope.form)' v-model:value="scope.form"></component>
        </template>

    </system-prop>
</template>
<script lang="ts" setup>

const getComponent = (cc) => {
    return "Option" + cc.componentName;
}

</script>