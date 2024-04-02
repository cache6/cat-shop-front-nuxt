<script setup lang="ts">
import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


const invoices = [
    {
        invoice: '1',
        paymentStatus: '판매중',
        totalAmount: '$250.00',
        paymentMethod: '고양이 용품1',
    },
    {
        invoice: '2',
        paymentStatus: '판매중',
        totalAmount: '$150.00',
        paymentMethod: '고양이 용품2',
    },
    {
        invoice: '3',
        paymentStatus: '판매중',
        totalAmount: '$350.00',
        paymentMethod: '고양이 용품3',
    },
    {
        invoice: '4',
        paymentStatus: '판매중',
        totalAmount: '$450.00',
        paymentMethod: '고양이 용품4',
    },
    {
        invoice: '5',
        paymentStatus: '판매중',
        totalAmount: '$550.00',
        paymentMethod: '고양이 용품5',
    },
    {
        invoice: '6',
        paymentStatus: '판매중',
        totalAmount: '$200.00',
        paymentMethod: '고양이 용품6',
    },
    {
        invoice: '7',
        paymentStatus: '판매중',
        totalAmount: '$300.00',
        paymentMethod: '고양이 용품7',
    },
]

function handleClick(invoice: { invoice: string; paymentStatus: string; totalAmount: string; paymentMethod: string }) {
    console.log('clicked', invoice)
}


</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
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
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div class="flex justify-end">
                <Button variant="outline">
                    <NuxtLink to="/write">
                        글 작성</NuxtLink>
                </Button>
            </div>
            <div class="grid gap-4 md:gap-8 ">

                <Table>
                    <TableCaption>1</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[100px]">
                                번호
                            </TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead>제목</TableHead>
                            <TableHead class="text-right">
                                가격
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <TableRow @click="() => handleClick(invoice)" v-for="invoice in invoices"
                            :key="invoice.invoice">
                            <TableCell class="font-medium">
                                {{ invoice.invoice }}
                            </TableCell>
                            <TableCell>{{ invoice.paymentStatus }}</TableCell>
                            <TableCell>
                                <NuxtLink to="/view">{{ invoice.paymentMethod }}</NuxtLink>
                            </TableCell>
                            <TableCell class="text-right">
                                {{ invoice.totalAmount }}
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </main>
    </div>

</template>