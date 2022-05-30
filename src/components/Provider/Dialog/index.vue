<template />
<script lang="ts" setup>
import { useDialog } from 'naive-ui'
import { useDialog as useDialogStore } from '@/store/modules/naiveProvider'
// 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
const dialog = useDialog()
const dialogStore = useDialogStore()
Object.keys(dialog).forEach(item => dialogStore[item] = dialog[item])
</script>
