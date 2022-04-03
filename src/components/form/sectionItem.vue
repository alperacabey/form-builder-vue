<template>
  <h2 class="font-semibold">{{ element.title }}</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "section-item",
  props: {
    element: {
      require: true,
      type: Object,
    },
  },
});
</script>
