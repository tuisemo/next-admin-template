<template>
    <div>
        <a-menu
            v-model:selectedKeys="state.selectedKeys"
            style="width: 256px"
            mode="inline"
            :open-keys="state.openKeys"
            :items="items"
            @openChange="onOpenChange"></a-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
    rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
    openKeys: ['sub1'],
    selectedKeys: [],
});

const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey: string = openKeys.find(key => state.openKeys.indexOf(key) === -1) || '';
    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};
</script>

<style scoped></style>