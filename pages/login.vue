<template>
    <div class="h-100 pa-10 d-flex ml-0 ml-md-15 justify-center justify-md-start align-center">
        <v-sheet width="350px" height="auto" class="py-10 px-6" rounded>
            <v-form v-model="form" @submit.prevent="submitForm">
                <p class="text-h4 text-center font-weight-light">Login</p>
                <p class="text-caption text-blue-darken-2 text-center mb-1">Credentials Manager</p>
                <FormAlert />
                <div class="mt-3">
                    <v-text-field variant="outlined" density="compact" v-model="formFields.email"
                        :rules="[rules.required, rules.valid_email]" label="Email Address" name="email_address">
                    </v-text-field>
                    <v-text-field variant="outlined" density="compact" v-model="formFields.password" :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'" label="Password"
                        :rules="[rules.required]" :type="show_password ? 'text' : 'password'" name="password"
                        @click:append="show_password = !show_password"></v-text-field>
                    
                    <div class="text-center">
                        <v-btn :disabled="!form" :loading="loading" color="blue-darken-1" type="submit" class="" :elevation="1">Login</v-btn>
                    </div>
                    <p class="mt-5 text-caption">
                       Don't have an account? <NuxtLink to="/signup" class="text-blue-darken-2"> Click here to Signup</NuxtLink>
                    </p>
                </div>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ["auth-lg"]
})

const alertStore = useAlertStore()
const form = ref(false)
const loading = ref(false)
const show_password = ref<boolean>(false)
const supabase = useSupabaseClient()

const formFields = ref({
    email: null,
    password: null
})

const rules = ref({
    required: (value: any) => !!value || "This field is Required",
    valid_email: (value: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid Email Address"
})

const submitForm = async () => {
    loading.value = true
    alertStore.clear()

    const { error: authError } =  await supabase.auth.signInWithPassword({
        email: formFields.value.email ?? "",
        password: formFields.value.password ?? ""
    }).finally(() => loading.value = false)

    if(authError){
        alertStore.error = authError.message
    }else{
        alertStore.success = "Logged in successfully"
        setTimeout(() => {
            window.location.href =  '/'
        }, 1000)
    }

}

</script>