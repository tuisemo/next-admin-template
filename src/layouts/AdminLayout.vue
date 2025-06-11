<template>
    <a-layout class="next-layout">
        <a-layout-header class="next-layout-header">

        </a-layout-header>
        <a-layout-content class="flex flex-row">
            <a-layout-sider class="fixed top-0 left-0 pt-[64px]"></a-layout-sider>
            <a-layout style="padding-top:64px;">
                <RouterView></RouterView>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<style scoped lang="scss">
.next-layout {
    height: 100%;
    width: 100%;

    .next-layout-header {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
    }
}
</style>