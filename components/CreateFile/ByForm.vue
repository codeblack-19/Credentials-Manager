<template>
  <div>
    <div class="text-center">
      <v-btn color="blue-darken-1" block>
        Create with Form

        <v-dialog v-model="dialog" persistent activator="parent" width="auto">
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false"
                >Close Dialog</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const dialog = ref<boolean>(false);
</script>

<style scoped></style>
