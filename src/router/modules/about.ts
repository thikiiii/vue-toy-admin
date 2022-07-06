import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const about: RouteRecordRaw[] = [
    {
        path: '/about',
        name: 'about',
        component: Layout,
        children: [
            {
                path: '/about/index',
                name: 'about_index',
                component: () => import('@/views/about/index.vue')
            }
        ]
    }
]
export default about