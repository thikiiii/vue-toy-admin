<template>
    <!-- App搜索 -->
    <n-icon size="22" @click="visibleModal=true" class="cursor-pointer">
        <antd-search-outlined />
    </n-icon>
    <n-modal v-model:show="visibleModal">
        <n-card
            class="appSearch"
            :bordered="false"
            size="large"
            role="dialog"
            aria-modal="true"
            :segmented="{ content: true,footer: 'soft'}"
        >
            <n-input v-model="searchText" placeholder="搜索菜单..." size="large">
                <template #suffix>
                    <n-icon size="22">
                        <antd-search-outlined />
                    </n-icon>
                </template>
            </n-input>
            <icon icon-library="antd" icon="user-outlined" />
            <div class="appSearch-content">
                <h3 class="appSearch-content-title" v-if="historyRecordList.length&&!menuList.length">历史记录</h3>
                <ul class="appSearch-content-list">
                    <li class="appSearch-content-list-item" :key="i" v-for="(item,i) in historyRecordList">
                        <n-icon size="22" />
                        <span v-for="(menu,index) in item.menuList" :key="menu.path">{{ menu.title }}
                            <n-icon v-if="index!==item.menuList.length-1" />
                        </span>
                    </li>
                </ul>
                <h3 class="appSearch-content-title" v-if="menuList.length">结果</h3>
            </div>
            <n-empty v-if="isEmpty" description="什么也没有找到" />
            <template #footer>
                <div class="appSearch-footer">
                    <div class="appSearch-footer-button">
                        <icon
                            icon="enter-outlined"
                            size="16"
                            class="appSearch-footer-button-icon"
                            icon-library="antd" />
                        <span class="appSearch-footer-button-text">回车</span>
                    </div>
                    <div class="appSearch-footer-button">
                        <icon
                            icon="arrow-up"
                            size="16"
                            class="appSearch-footer-button-icon"
                            icon-library="la" />
                        <icon
                            icon="arrow-down"
                            size="16"
                            class="appSearch-footer-button-icon"
                            icon-library="la" />
                        <span class="appSearch-footer-button-text">切换</span>
                    </div>
                    <div class="appSearch-footer-button">
                        <icon
                            icon="keyboard-esc"
                            size="16"
                            class="appSearch-footer-button-icon"
                            icon-library="mdi" />
                        <span class="appSearch-footer-button-text">回车</span>
                    </div>
                </div>
            </template>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { Icon } from '@/components/Icon'

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
            icon: 'ant-design:appstore-twotone',
            menuList: [
                {
                    path: '/1',
                    title: '测试1'
                },
                {
                    path: '/2',
                    title: '测试2'
                }
            ]
        },
        {
            icon: 'ant-design:appstore-twotone',
            menuList: [
                {
                    path: '/1',
                    title: '测试1'
                },
                {
                    path: '/2',
                    title: '测试2'
                }
            ]
        }
    ],
    // 空是否显示
    isEmpty: false
})

const { visibleModal, menuList, searchText, isEmpty, historyRecordList } = toRefs(state)
</script>

<style lang="less" scoped>
.appSearch {
    width: 600px;
    
    &-content {
        padding: 10px;
        width: 100%;
        max-height: 400px;
        overflow: auto;
        margin-top: 10px;
    }
    
    &-footer {
        display: flex;
        align-items: center;
        gap: 20px;
        
        &-button {
            display: flex;
            align-items: center;
            gap: 5px;
            
            &-icon {
                box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
            }
        }
    }
}


</style>