import { defineComponent, PropType } from 'vue'
import { Depth } from 'naive-ui/es/icon/src/Icon'
import { NIcon } from 'naive-ui'
import { icons as mdi } from '@iconify-json/mdi'

export type IconLibrary = 'mdi'

// 图标库
const icons = {
    // https://icon-sets.iconify.design/mdi/
    // https://materialdesignicons.com/
    mdi
}
const Icon = defineComponent({
    name: 'Icon',
    props: {
        library: {
            type: String as PropType<IconLibrary>,
            default: 'mdi'
        },
        depth: {
            type: [ String, Number ] as PropType<Depth>
        },
        icon: { required: true, type: String },
        color: String,
        size: String,
        pointer: { default: true, type: Boolean }
    },
    setup(props) {

        const iconLibrary = icons[props.library]
        return () => (
            <NIcon
                class={ props.pointer ? 'cursor-pointer' : undefined }
                size={ props.size }
                depth={ props.depth }
                color={ props.color }>
                <svg
                    viewBox={ `0 0 ${ iconLibrary?.width } ${ iconLibrary?.height }` }
                    v-html={ iconLibrary?.icons[props.icon]?.body } />
            </NIcon>
        )
    }
})
export default Icon