<template>
  <div>
    <v-card
      variant="flat"
      color="grey-lighten-4"
      class="mt-2 py-2 px-3"
      v-if="req?.creator_uid == user?.id"
    >
      <p class="text-body-2">
        Access requested for file -
        <span class="text-blue-darken-2">{{ file?.title }}</span>
        by
        <span class="text-blue-darken-2 mr-1">{{
          accessor?.email.split("@")[0]
        }}</span>
        <v-chip
          v-if="!req?.approved"
          :color="req?.approved ? 'success' : 'warning'"
          size="x-small"
          >{{ req?.approved ? `Approved` : `Pending` }}</v-chip
        >
      </p>
      <div class="d-flex flex-wrap justify-space-between text-caption">
        <div>
          <v-btn
            v-if="!req?.approved"
            :loading="loading"
            variant="flat"
            color="blue-darken-1"
            size="x-small"
            @click="approveRequest"
            >Approve</v-btn
          >
          <v-btn
            v-if="req?.approved"
            :loading="loading"
            variant="flat"
            color="error"
            size="x-small"
            @click="revokeRequest"
            >Revoke</v-btn
          >
        </div>
        <span class="text-blue-darken-2 ml-5 font-italic">
          {{ useTimeAgo(new Date(req?.created_at)).value }}</span
        >
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import FileRequestType from "~/types/fileRequestType";
import FileTypes from "~/types/fileType";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const fileStore = useFileStore();

const props = defineProps<{
  req?: FileRequestType;
  file?: FileTypes | null;
  accessor?: any;
}>();

const loading = ref<boolean>(false);

const approveRequest = async () => {
  loading.value = true;
  const { error } = await supabase
    .from("file_requests")
    .update({ approved: !props.req?.approved } as never)
    .eq("id", props.req?.id);

  if (error) {
    console.log(error.message);
  } else {
    await fileStore.getRequestedFiles();
  }

  loading.value = false;
};

const revokeRequest = async () => {
  loading.value = true;
  const { error } = await supabase
    .from("file_requests")
    .delete()
    .eq("id", props.req?.id);

  if (error) {
    console.log(error.message);
  } else {
    await fileStore.getRequestedFiles();
  }

  loading.value = false;
};
</script>
