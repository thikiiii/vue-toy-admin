<template />
<script lang="ts" setup>
import { useNotification } from 'naive-ui'
import { useNotification as useNotificationStore } from '@/store/modules/naiveProvider'
// 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
const notification = useNotification()
const notificationStore = useNotificationStore()
Object.keys(notification).forEach(item => notificationStore[item] = notification[item])
</script>
