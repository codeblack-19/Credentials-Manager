import { UserProfile } from "~/types/userProfile"

export const useUserStore = defineStore('userStore', () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const UserProfile = ref<UserProfile | null>(null)

    const getUserProfile = async () => {
        const { data } = await supabase.from('UserProfile').select('*').eq('email', user.value?.email).single()
        UserProfile.value = data ?? null
    }

    const getUserById = async (id: string) => {
        const { data } = await useFetch(`/api/users/${id}`)
        return data.value
    }
    
    return {
        UserProfile,
        getUserProfile,
        getUserById
    }
})