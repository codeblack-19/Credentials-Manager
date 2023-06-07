export const useAlertStore = defineStore('alertStore', () => {
    const error = ref<string | null>(null)
    const success = ref<string | null>(null)

    const clear = () => {
        error.value = null
        success.value = null
    }

    return { error, success, clear }
})