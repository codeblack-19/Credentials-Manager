<template>
  <div>
    <!-- creator file request view card -->
    <RequestsCreatorCard v-if="req?.creator_uid == user?.id" :file="file" :accessor="accessor" :req="req" />

    <!-- accessor file request view card -->
    <v-card
      variant="flat"
      color="grey-lighten-4"
      class="mt-2 py-2 px-3"
      style="cursor: pointer"
      v-else
    >
      <div class="text-body-2">
        You Requested access for file -
        <span class="text-blue-darken-2 mr-2">{{ file?.title }}</span> |
        <v-chip v-if="!req?.approved" :color="req?.approved ? 'success' : 'warning'" size="x-small">{{ req?.approved ? `Approved` : `Pending` }}</v-chip>
        <span v-else>Secrete Code - <v-chip color="blue-darken-2" size="x-small">{{ file?.secret_code }}</v-chip></span>
      </div>
      <div class="text-right text-caption">
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
const user = useSupabaseUser();
const userStore = useUserStore();
const fileStore = useFileStore();

const props = defineProps<{
  req?: FileRequestType;
}>();

const file = ref<FileTypes | null>();
const accessor = ref<any>();

onBeforeMount(async () => {
  file.value = await fileStore.getOneFile(props.req?.file_id!);
  accessor.value = await userStore.getUserById(props.req?.accessor_uid!);
});
</script>
