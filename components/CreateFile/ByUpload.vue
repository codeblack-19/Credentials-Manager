<template>
  <div>
    <div class="text-center">
      <v-btn color="blue-darken-1" block>
        upload File

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
            <v-form id="uploadForm" v-model="form" @submit.prevent="uploadFile">
              <v-file-input
                :rules="[rules.required_file, rules.file_type, rules.file_size]"
                v-model="formBody.file"
                label="File input"
                variant="outlined"
                prepend-icon=""
                prepend-inner-icon="mdi-attachment"
                :accept="config.public.ACCEPTED_FILE_TYPES"
              ></v-file-input>
              <v-text-field
                variant="outlined"
                v-model="formBody.secretCode"
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
import { UploadFileType } from "~/types/formFieldTypes";
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const alertStore = useAlertStore()
const config = useRuntimeConfig();
const fileStore = useFileStore()

const dialog = ref<boolean>(false);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);

const getExt = (filepath: string) => {
  return "." + filepath?.split("?")[0].split("#")[0].split(".").pop();
};

const formBody = ref<UploadFileType>({
  file: [],
  secretCode: "",
  visibility: "Private",
});

const rules = ref({
  required: (value: any) => !!value || "Required Field",
  required_file: (value: any) => value.length > 0 || "File is required",
  file_type: (value: any) =>
    config.public.ACCEPTED_FILE_TYPES.includes(getExt(value[0].name) ?? "") ||
    "Invalid File type",
  file_size: (value: any) =>
    value[0].size < 5000000 || "File should be less than 5 MB",
  secret_length: (value: any) =>
    (value.length > 5 && value.length < 10) ||
    "Secret Code must be > 5 and < 10 letters",
});

const uploadFile = async () => {
  loading.value = true;
  const { data, error: err } = await supabase.storage
    .from(config.public.SUPABASE_BUCKET)
    .upload(
      new Date().toISOString() + "_" + formBody.value.file[0].name,
      formBody.value.file[0]
    )

  if (err) {
    alertStore.error = err.message;
  } else {
    const file_url = supabase.storage
      .from(config.public.SUPABASE_BUCKET)
      .getPublicUrl(data.path);

    await save_user_file(file_url.data.publicUrl)
  }
  loading.value = false
};

const save_user_file = async (file_url: string) => {
  let { error: err } = await supabase
    .from("files")
    .insert([
      {
        secret_code: formBody.value.secretCode,
        file_url: file_url,
        visibility: formBody.value.visibility,
        title: formBody.value.file[0].name,
        creator_uid: user.value?.id
      } as never,
    ]);

  if(err){
    alertStore.error = err.message
  }else{
    alertStore.success = "File saved successfully"
    await fileStore.getFiles()
    setTimeout(() => {
      closeDialog()
    }, 500)
  }
};

const closeDialog = () => {
  formBody.value = {
    file: [],
    secretCode: "",
    visibility: "Private",
  };
  alertStore.clear()
  dialog.value = false;
};
</script>
