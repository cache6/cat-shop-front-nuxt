<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// 반응형 변수 추가
const inputData = ref('')
const title = ref('')
const createdAt = ref('')
const author = ref('')

const router = useRouter()

async function sendData() {
    if (!inputData.value || !title.value || !createdAt.value || !author.value) {
        console.error('모든 필드를 입력해주세요');
        return;
    }

    const postData = {
        title: title.value,
        inputData: inputData.value,
        createdAt: createdAt.value,
        author: author.value,
    };

    try {
        console.log('데이터를 전송합니다:', postData);
        const response = await fetch('/api/create', {
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
        createdAt.value = '';
        author.value = '';

        router.push('/');
    } catch (error) {
        console.error('데이터 전송 오류:', error);
    }
}
</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
            <h1 class="text-3xl font-semibold">Write</h1>
        </div>
        <div>
            <Input v-model="title" placeholder="Title" />
            <Input v-model="createdAt" placeholder="Creation Date" />
            <Input v-model="author" placeholder="Author" />
            <Textarea v-model="inputData" placeholder="Write something..." />
            <Button @click="sendData">Submit</Button>
        </div>
    </main>
</template>
