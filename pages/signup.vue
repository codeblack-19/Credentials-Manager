<template>
    <div class="h-100 pa-10 d-flex ml-0 ml-md-15 justify-center justify-md-start align-center">
        <v-sheet width="350px" height="auto" class="py-10 px-6" rounded>
            <v-form v-model="form" @submit.prevent="submitForm">
                <p class="text-h4 text-center font-weight-light">Sign Up</p>
                <p class="text-caption text-blue-darken-2 text-center mb-1">Credentials Manager</p>
                <FormAlert />
                <div class="mt-3">
                    <v-text-field variant="outlined" density="compact" v-model="formFields.email"
                        :rules="[rules.required, rules.valid_email]" label="Email Address" name="email_address">
                    </v-text-field>
                    <v-text-field variant="outlined" density="compact" v-model="formFields.password"
                        label="Password" :rules="[rules.required, rules.password_length]"
                        :type="show_password ? 'text' : 'password'" name="password"></v-text-field>
                    <v-text-field variant="outlined" density="compact" v-model="formFields.confirm_password"
                        label="Confirm Password"
                        :rules="[rules.required, rules.confirm_password]" :type="show_password ? 'text' : 'password'"
                        name="conform_password"></v-text-field>

                    <div class="text-right">
                        <v-btn @click="show_password = !show_password" variant="plain" size="small" class="mb-2">show passwords</v-btn>
                    </div>

                    <div class="text-center">
                        <v-btn :disabled="!form" :loading="loading" color="blue-darken-1" type="submit" class=""
                            :elevation="1">Register</v-btn>
                    </div>
                    <p class="mt-5 text-caption text-center">
                        Already registered? <NuxtLink to="/login" class="text-blue-darken-2"> Click here to login
                        </NuxtLink>
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

const formFields = ref({
    email: null,
    password: null,
    confirm_password: null
})

const rules = ref({
    required: (value: any) => !!value || "This field is Required",
    password_length: (value: any) => value.length > 5 || "Password must > 5 characters",
    valid_email: (value: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid Email Address",
    confirm_password: (value:any) => value == formFields.value.password || "Invalid Password"
})

const submitForm = async () => {
    loading.value = true;
    alertStore.clear()

    const { error } =  await useFetch('/api/signup', {
        method: 'POST',
        body: {
            ...formFields.value
        }
    }).finally(() => loading.value = false)

    if(error.value?.message){
        alertStore.error = error.value.data.message
    }else{
        alertStore.success = "SignUp successfull, vists your mail to Verify your account"
    }
}
</script>