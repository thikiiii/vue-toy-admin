<script lang="ts" setup>
import { inject, reactive, toRefs } from 'vue'


const size = inject<string>('size')


// 按键提示
const keyPrompt = [
    {
        icons: [ { name: 'arrow-left-bottom', iconLibrary: 'mdi' } ],
        prompt: '回车'
    },
    {
        icons: [
            {
                name: 'arrow-up',
                iconLibrary: 'mdi'
            },
            {
                name: 'arrow-down',
                iconLibrary: 'mdi'
            }
        ],
        prompt: '切换'
    },
    {
        icons: [
            {
                name: 'keyboard-esc',
                iconLibrary: 'mdi'
            }
        ],
        prompt: '切换'
    }
]
// TODO: 缺默认激活
const state = reactive({
    // 模态框是否可见
    visibleModal: false,
    // 搜索值
    searchText: false,
    // 搜索列表
    menuList: [],
    // 历史记录
    historyRecordList: [
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        },
        {
            icon: 'lock',
            menuList: [ '测试1', '测试2' ],
            path: '/'
        }
    ]
    
})


const { visibleModal, menuList, searchText, historyRecordList } = toRefs(state)
</script>

<template>
    <!-- App搜索 -->
    <icon :size="size" icon="magnify" pointer @click="visibleModal=true" />
    <n-modal v-model:show="visibleModal">
        <n-card
            :bordered="false"
            :segmented="{ content: true,footer: 'soft'}"
            aria-modal="true"
            class="appSearch"
            role="dialog"
            size="large"
        >
            <n-input v-model="searchText" placeholder="搜索菜单..." size="large">
                <template #suffix>
                    <icon icon="magnify" size="22" />
                </template>
            </n-input>
            <div v-if="!menuList.length" class="appSearch-list">
                <!-- 记录 -->
                <n-card
                    v-for="(item,i) in historyRecordList" :key="i"
                    hoverable
                    size="small">
                    <div class="appSearch-list-item">
                        <div class="appSearch-list-item-name">
                            <icon :icon="item.icon" class="appSearch-list-item-icon" size="22" />
                            <span v-for="(title,index) in item.menuList" :key="title">
                                {{ title }}
                                <icon v-if="index!==item.menuList.length-1" icon="chevron-right" size="20" />
                            </span>
                        </div>
                        <div class="appSearch-list-item-other">
                            <icon icon="arrow-left-bottom" size="20" />
                        </div>
                    </div>
                </n-card>
            </div>
            <n-empty v-if="!menuList.length&&!historyRecordList.length" description="什么也没有找到" />
            <template #footer>
                <div class="appSearch-footer">
                    <div class="appSearch-footer-prompt">
                        <div v-for="item in keyPrompt" :key="item.prompt" class="appSearch-footer-prompt-key">
                            <icon
                                v-for="icon in item.icons"
                                :key="icon.name"
                                :icon="icon.name"
                                :library="icon.iconLibrary"
                                :pointer="false"
                                class="appSearch-footer-prompt-key-icon"
                                size="16" />
                            {{ item.prompt }}
                        </div>
                    </div>
                    <n-button quaternary size="small">
                        <template #icon>
                            <icon icon="delete-empty-outline" />
                        </template>
                        清空记录
                    </n-button>
                </div>
            </template>
        </n-card>
    </n-modal>
</template>

<style lang="less" scoped>
.appSearch {
    width: 600px;
    
    &-list {
        width: 100%;
        max-height: 400px;
        overflow: auto;
        margin-top: 10px;
        
        :deep(.n-card) {
            margin-bottom: 5px;
            
            .n-card__content {
                width: 100%;
            }
            
            &:hover {
                background: @theme;
                color: white;
            }
        }
        
        &-item {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            
            &-name {
                display: flex;
                align-items: center;
                flex: 1;
            }
            
            span {
                display: flex;
                align-items: center;
            }
            
            &-icon {
                margin-right: 10px;
            }
        }
    }
    
    &-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        &-prompt {
            display: flex;
            align-items: center;
            gap: 20px;
            
            &-key {
                display: flex;
                align-items: center;
                gap: 5px;
                
                &-icon {
                    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
                }
            }
        }
    }
}


</style>