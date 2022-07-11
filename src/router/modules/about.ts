import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { RoleEnum } from '@/enums/auth'

const about: RouteRecordRaw[] = [
    {
        path: '/about',
        name: 'about',
        component: Layout,
        children: [
            {
                path: '/about/index',
                name: 'about_index',
                meta: {
                    title: '关于',
                    roles: [ RoleEnum.SUPER ]
                },
                component: () => import('@/views/about/About.vue')
            }
        ]
    }
]
export default about