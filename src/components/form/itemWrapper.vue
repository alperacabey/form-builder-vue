<template>
  <div class="my-4">
    <component
      :is="component"
      :element="element"
      @changed="(val) => $emit('changed', val)"
    />
    <template v-for="el in element.items" :key="el.uuid">
      <item-wrapper :element="el" 
      @changed="(val) => $emit('changed', val)"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";

export default defineComponent({
  name: "item-wrapper",
  props: {
    element: { type: Object, required: true },
  },
  setup(props) {
    const component = computed(() =>
      defineAsyncComponent(() => import(`./${props.element.type}Item.vue`))
    );
    return { component };
  },
});
</script>
