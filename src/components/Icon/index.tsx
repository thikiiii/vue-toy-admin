import { defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import { icons as antd } from '@iconify-json/ant-design'
import { icons as la } from '@iconify-json/la'
import { icons as mdi } from '@iconify-json/mdi'

// 图标库
const icon = {
    antd,
    la,
    mdi
}
console.log(la)
export const Icon = defineComponent({
    name: 'Icon',
    props: {
        // 图标库
        iconLibrary: {
            type: String,
            validator(value: string) {
                return [ 'antd', 'la', 'mdi' ].includes(value)
            },
            required: true
        },
        // 图标
        icon: {
            type: String,
            required: true
        },
        color: String,
        size: [ Number, String ]
    },
    setup(props) {
        console.log(props)
        const svg = <svg viewBox="0 0 1024 1024"
                         v-html={ icon[props.iconLibrary].icons[props.icon].body }></svg>
        return () => (
            <NIcon size={ props.size }
                   color={ props.color }
                   component={ svg }>
            </NIcon>
        )
    }
})