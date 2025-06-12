<template>
    <button @click="fetchData">
        app
    </button>
    <x-footer></x-footer>
</template>

<script setup lang="ts">
import { getUserList } from "@/apis/common";

const fetchData = async () => {
    const res = await getUserList({ city: "北京" });
    console.log("🚀 ~ fetchData ~ res:", res)
};

</script>

<style scoped></style>