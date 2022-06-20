<template>
    <div class="tabBar">
        <div v-show="state.scrollBtnVisible" class="tabBar-action-tab">
            <icon icon="chevron-left" size="22" />
        </div>
        <div ref="scrollRef" class="tabBar-tabContainer">
            <div
                v-for="item in tabBarStore.tabBar" :key="item.path"
                :class="tabBarStore.active===item.path?'active':undefined" class="tabBar-tabContainer-tab">
                {{ item.title }}
                <icon class="tabBar-tabContainer-tab-icon" icon="close" size="14" />
            </div>
        </div>
        <div v-show="state.scrollBtnVisible" class="tabBar-action-tab">
            <icon icon="chevron-right" size="22" />
        </div>
        <n-dropdown @select="onSelect" :options="state.dropdownOption">
            <div class="tabBar-action-tab">
                <icon icon="chevron-down" size="22" />
            </div>
        </n-dropdown>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue'
    import RenderIcon from '@/components/Render/icon'
    import useTabBarStore from '@/store/modules/tabBar'
    
    const tabBarStore = useTabBarStore()
    const state = reactive({
        scrollBtnVisible: false,
        dropdownOption: [
            {
                label: '刷新当前',
                key: 'refresh',
                icon: () => RenderIcon({ icon: 'restore' })
            },
            {
                label: '关闭当前',
                key: 'closeCurrent',
                icon: () => RenderIcon({ icon: 'close' })
            },
            {
                label: '关闭其他',
                key: 'closeOther',
                icon: () => RenderIcon({ icon: 'swap-horizontal' })
            },
            {
                label: '关闭全部',
                key: 'closeAll',
                icon: () => RenderIcon({ icon: 'minus' })
            }
        ]
    })
    const scrollRef = ref<HTMLDivElement | null>(null)
    const isScroll = (): boolean => {
        const scrollDom = scrollRef.value
        if (!scrollDom) return false
        const { clientWidth, children } = scrollDom
        let widthSum = 0
        return Array.from(children).some(tab => {
            widthSum += tab.clientWidth + 15
            return widthSum > clientWidth
        })
    }
    const onSelect = (key) => {
        switch (key) {
            case 'refresh':
                tabBarStore.refreshCurrent()
                break
            case 'closeCurrent':
                tabBarStore.closeCurrent()
                break
            case 'closeOther':
                tabBarStore.closeOther()
                break
            case 'closeAll':
                tabBarStore.closeAll()
                break
        }
    }
    onMounted(() => {
        console.log(isScroll())
    })
</script>

<style lang="less" scoped>
.tabBar {
    width: 100%;
    padding: 0 10px;
    height: @layout-tab-bar-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    
    &-action-tab {
        background: @subBackgroundColor;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: calc(@layout-tab-bar-height - 15px);
        height: calc(@layout-tab-bar-height - 15px);
        box-shadow: 0 0 5px @divder;
    }
    
    &-tabContainer {
        flex: 1;
        display: flex;
        gap: 15px;
        overflow: hidden;
        padding: 2px 0;
        
        &-tab {
            background: @subBackgroundColor;
            display: inline-flex;
            flex-shrink: 0;
            justify-content: center;
            cursor: pointer;
            color: @mainTextColor;
            box-shadow: 0 0 5px @divder;
            align-items: center;
            border-radius: 4px;
            height: calc(@layout-tab-bar-height - 15px);
            padding: 0 10px 0 15px;
            gap: 5px;
            
            &:hover {
                color: @mainTextColor;
            }
            
            &.active {
                color: @theme;
            }
            
            &-icon {
                color: @subTextColor;
                transition: .1s;
                
                &:hover {
                    color: @mainTextColor;
                }
            }
        }
    }
    
}
</style>