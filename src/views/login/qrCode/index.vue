<script lang="ts" setup>
import { useLoginContext } from '@/views/login/useLoginContext'

const { setAction } = useLoginContext()
</script>

<template>
    <p @click="setAction('PasswordLogin')">二维码</p>
</template>

<style scoped></style>
