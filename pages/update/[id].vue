<script setup lang="ts">
import { useRoute, useAsyncData } from 'nuxt/app';
import { computed, ref } from 'vue';

interface Invoice {
    inputData: string;
}

const route = useRoute();
const routeId = computed(() => route.params.id);

const loading = ref(true);
const error = ref(null);

const { data: invoice, refresh } = useAsyncData<Invoice | null>(
    'invoice',
    async () => {
        loading.value = true;
        error.value = null;
        try {
            if (!routeId.value) {
                return null;
            }
            return await $fetch<Invoice>(`/api/update/${routeId.value}`);
        } catch (err: any) {
            error.value = err.message;
            return null;
        } finally {
            loading.value = false;
        }
    },
    { watch: [routeId] }
);

defineExpose({ refresh });
</script>

<template>

</template>