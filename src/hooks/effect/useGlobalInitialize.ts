import { onMounted } from "vue";
import { useThemeStore } from "@/store/modules/theme";

// 全局初始化
export const useGlobalInitialize = () => {
    const themeStore = useThemeStore()

    onMounted(() => {
        // dom加载完成后 初始化主题
        themeStore.initTheme()
    })
};