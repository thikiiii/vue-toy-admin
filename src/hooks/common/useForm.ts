import { onMounted, Ref } from 'vue'
import { NForm } from 'naive-ui'

export interface UseFormOption {

}

const useForm = (componentRef:Ref<InstanceType<typeof NForm> | null>,option:UseFormOption) => {
    console.log(componentRef)
    console.log(option)
    onMounted(() => {
        console.log(componentRef)
    })
}

export default useForm
