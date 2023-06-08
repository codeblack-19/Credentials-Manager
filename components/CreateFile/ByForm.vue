<template>
  <div>
    <div class="text-center">
      <v-btn color="blue-darken-1" block>
        Create with Form

        <v-dialog v-model="dialog" persistent activator="parent" width="auto">
          <v-card width="350px" class="pa-4">
            <div class="d-flex justify-space-between align-center mb-2">
              <p class="text-h6 text-center">Upload A File</p>
              <v-btn
                @click="closeDialog"
                :elevation="0"
                value="flat"
                size="small"
                icon="mdi-window-close"
              />
            </div>
            <FormAlert />
            <v-form id="uploadForm" v-model="form" @submit.prevent="createFile">
              <v-text-field
                variant="outlined"
                v-model="formBody.file_name"
                :rules="[rules.required, rules.file_name_length]"
                label="File Name"
                name="file_name"
              >
              </v-text-field>
              <v-select
                label="File type"
                v-model="formBody.file_type"
                :rules="[rules.required]"
                :items="[...config.public.ACCEPTED_FILE_TYPES_CREATING]"
                variant="outlined"
              ></v-select>
              <v-text-field
                variant="outlined"
                v-model="formBody.secret_code"
                :rules="[rules.required, rules.secret_length]"
                label="Secret Code"
                name="secret_code"
              >
              </v-text-field>
              <v-radio-group v-model="formBody.visibility" inline>
                <v-radio label="Private" value="Private"></v-radio>
                <v-radio label="Public" value="Public"></v-radio>
              </v-radio-group>

              <div class="text-center">
                <v-btn
                  :elevation="0"
                  color="blue-darken-1"
                  :disabled="!form"
                  :loading="loading"
                  type="submit"
                  >Submit</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createAndUploadTempFile,
  saveFileDetails,
} from "~/utils/FileProcessing";

const alertStore = useAlertStore();
const config = useRuntimeConfig();
const fileStore = useFileStore();

const dialog = ref<boolean>(false);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);

const formBody = ref({
  file_type: ".txt",
  file_name: "",
  secret_code: "",
  visibility: "Private",
});

const rules = ref({
  required: (value: any) => !!value || "Required Field",
  file_name_length: (value: any) =>
    (value.length >= 3 && value.length <= 10) ||
    "Name must be >= 3 and =< 10 letters",
  secret_length: (value: any) =>
    (value.length > 5 && value.length < 10) ||
    "Secret Code must be > 5 and < 10 letters",
});

const createFile = async () => {
  alertStore.error = null
  loading.value = true
  await createAndUploadTempFile(
    formBody.value.file_name,
    formBody.value.file_type
  )
    .then(async (data) => {
      await saveFileDetails(formBody.value, data)
        .then(async () => {
          alertStore.success = "File Created sucessfully";
          await fileStore.getUserFiles();
          setTimeout(() => {
            closeDialog();
          }, 500);
        })
        .catch((e) => {
          alertStore.error = e;
        });
    })
    .catch((e) => (alertStore.error = e))
    .finally(() => (loading.value = false));
};

const closeDialog = () => {
  formBody.value = {
    file_type: "",
    file_name: "",
    secret_code: "",
    visibility: "Private",
  };
  alertStore.clear();
  dialog.value = false;
};
</script>
