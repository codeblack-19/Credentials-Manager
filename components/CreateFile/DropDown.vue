<template>
  <div>
    <ClientOnly>
      <v-menu location="start">
        <template v-slot:activator="{ props }">
          <!-- <v-btn color="primary" dark v-bind="props"> Dropdown </v-btn> -->
          <v-btn size="sm" elevation="1" icon="mdi-plus" rounded="sm" v-bind="props" />
        </template>
  
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <CreateFileByUpload />
            </v-list-item-title>
            <v-list-item-title class="mt-1">
              <CreateFileByForm />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts"></script>