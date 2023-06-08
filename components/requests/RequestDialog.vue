<template>
  <div>
    <div class="text-center">
      <v-btn color="blue-darken-1" block>
        <v-badge :color="notify ? 'red' : 'white'" dot>
          <v-btn size="small" icon="mdi-bell"></v-btn>
        </v-badge>

        <v-dialog v-model="dialog" persistent activator="parent" width="auto">
          <v-card width="350px" class="pa-4">
            <div class="d-flex justify-space-between align-center">
              <p>Notifications</p>
              <v-btn
                @click="dialog = !dialog"
                :elevation="0"
                value="flat"
                size="small"
                icon="mdi-window-close"
              />
            </div>
            <v-divider class="my-2"></v-divider>
            <div>
              <template v-for="(req, key) in fileStore.requestFiles" :key="key">
                <FileAccessCard :req="req" />
              </template>
            </div>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const dialog = ref<boolean>(false);
const fileStore = useFileStore();

const notify = computed(() => fileStore.requestFiles?.filter((item) => !item.approved).length)
</script>
