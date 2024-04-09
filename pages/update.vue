<script setup lang="ts">
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';


interface Invoice {
    _id: string;
    inputData: string;
    title: string;
    createdAt: string;
    author: string;
}

const inputData = ref('')
const title = ref('')

const route = useRoute();
const id = route.params.id as string;
const invoice = ref<Invoice | null>(null);
const error = ref<string | null>(null);

const router = useRouter();

// 데이터를 가져오는 로직을 별도의 함수로 분리
async function fetchInvoice() {
    try {
        console.log('데이터를 가져옵니다update:', id);
        invoice.value = await $fetch(`/api/view/${id}`) as any; // or a more specific type if known
        if (invoice.value) {
            title.value = invoice.value.title;
            inputData.value = invoice.value.inputData;
        }
    } catch (err) {
        error.value = '데이터를 가져오는 중 오류가 발생했습니다.';
    }
}

async function sendUpdateData() {
    if (!inputData.value || !title.value) {
        console.error('모든 필드를 입력해주세요');
        return;
    }

    const postData = {
        title: title.value,
        inputData: inputData.value,
    };

    try {
        console.log('데이터를 전송합니다:', postData);
        const response = await fetch(`/api/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        console.log('response:', response);

        if (!response.ok) {
            throw new Error('데이터 전송 실패');
        }

        const data = await response.json();
        console.log('데이터가 성공적으로 전송되었습니다:', data);

        inputData.value = '';
        title.value = '';

        router.push('/');
    } catch (error) {
        console.error('데이터 전송 오류:', error);
    }
}

onMounted(fetchInvoice);
</script>


<template>

    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
            <h1 class="text-3xl font-semibold">Update</h1>
        </div>
        <div class="flex flex-col  px-20" v-if="invoice">
            <Input v-model="title" placeholder="Title" />
            <Textarea v-model="inputData" placeholder="Write something..." />
            <Button @click="sendUpdateData">Submit</Button>
        </div>
        <div v-else-if="error">
            {{ error }}
        </div>

    </main>
</template>