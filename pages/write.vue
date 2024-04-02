<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const inputData = ref('')

async function sendData() {
    if (!inputData.value) {
        console.error('입력 데이터가 없습니다');
        return;
    }

    try {
        console.log('데이터를 전송합니다:', inputData.value);
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: inputData.value }),
        });
        console.log('response:', response);

        if (!response.ok) {
            throw new Error('데이터 전송 실패');
        }

        const data = await response.json();
        console.log('데이터가 성공적으로 전송되었습니다:', data);
        inputData.value = ''; // 데이터를 성공적으로 전송한 후 inputData를 초기화합니다.
    } catch (error) {
        console.error('데이터 전송 오류:', error);
    }
}
</script>

<template>
    <!-- <div class="flex min-h-screen w-full flex-col">
        <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav
                class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <a href="#" class="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Package2 class="h-6 w-6" />
                    <span class="sr-only">Acme Inc</span>
                </a>
                <a href="#" class="text-foreground transition-colors hover:text-foreground">
                    Shop
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                    User
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                    (Products)
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                    (Customers)
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                    (Analytics)
                </a>
            </nav>
            <Sheet>
                <SheetTrigger as-child>
                    <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                        <Menu class="h-5 w-5" />
                        <span class="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav class="grid gap-6 text-lg font-medium">
                        <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                            <Package2 class="h-6 w-6" />
                            <span class="sr-only">Acme Inc</span>
                        </a>
                        <a href="#" class="hover:text-foreground">
                            Dashboard
                        </a>
                        <a href="#" class="text-muted-foreground hover:text-foreground">
                            Orders
                        </a>
                        <a href="#" class="text-muted-foreground hover:text-foreground">
                            Products
                        </a>
                        <a href="#" class="text-muted-foreground hover:text-foreground">
                            Customers
                        </a>
                        <a href="#" class="text-muted-foreground hover:text-foreground">
                            Analytics
                        </a>
                    </nav>
                </SheetContent>
            </Sheet>
            <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form class="ml-auto flex-1 sm:flex-initial">
                    <div class="relative">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search products..."
                            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" class="rounded-full">
                            <CircleUser class="h-5 w-5" />
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header> -->
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
            <h1 class="text-3xl font-semibold">Write</h1>
        </div>
        <div>
            <Textarea v-model="inputData" placeholder="Write something..." />
            <Button @click="sendData">Submit</Button>
        </div>

    </main>
    <!-- </div> -->
</template>
