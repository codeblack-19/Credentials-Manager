<template>
  <div class="px-5 text-center">
    <div v-if="access">
      <p class="text-center font-weight-medium text-subtitle-1 mb-1">
        Request for file access pending approval...
      </p>
    </div>
    <div v-else>
        <p class="text-center font-weight-medium text-subtitle-1 mb-1">
          Please request for file access from Creator
        </p>
        <FormAlert></FormAlert>
        <v-btn :loading="loading" color="blue-darken-2" @click="requestFile"
          >Request Access</v-btn
        >
    </div>
  </div>
</template>

<script setup lang="ts">
import FileRequestType from "~/types/fileRequestType";
import FileTypes from "~/types/fileType";
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const alertStore = useAlertStore();
const fileStore = useFileStore()

const loading = ref<boolean>(false);

const props = defineProps<{
  file?: FileTypes;
  access?: FileRequestType | null;
}>();

const emits = defineEmits(['update:access'])

onMounted(async() => {
    let data = await fileStore.getRequestedFile(props.file?.id!)
    emits("update:access", data)
})

const requestFile = async () => {
    loading.value = true
  let { error } = await supabase.from("file_requests").insert([
    {
      creator_uid: props.file?.creator_uid,
      accessor_uid: user.value?.id,
      file_id: props.file?.id,
      approved: false,
    } as never,
  ]);

  if (error) {
    alertStore.error = error.message;
  } else {
    let data = await fileStore.getRequestedFile(props.file?.id!)
    emits("update:access", data)
    alertStore.success = "Request sent succesfully";
  }

  loading.value = false
};
</script>
