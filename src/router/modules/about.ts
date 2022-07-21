import { RouteRecordRaw } from 'vue-router'
import { RoleEnum } from '@/enums/auth'

// 没有 children 说明就是单页面，有子项这一级就是目录
const about: RouteRecordRaw[] = [
    {
        path: '/about',
        name: 'about',
        meta: {
            title: '关于',
            roles: [ RoleEnum.SUPER ],
            icon: 'lock'
        },
        component: () => import('@/views/about/About.vue')
    }
]
export default about