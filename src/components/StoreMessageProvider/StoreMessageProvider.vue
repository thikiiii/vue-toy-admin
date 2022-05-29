<template />
<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useMessage as useMessageStore } from '@/store/modules/prompt'
// 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
const message = useMessage()
const messageStore = useMessageStore()
Object.keys(message).forEach(item => messageStore[item] = message[item])
</script>
