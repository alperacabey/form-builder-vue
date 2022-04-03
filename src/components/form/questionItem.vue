<template>
  <div class="pb-8">
    <h4 class="font-semibold mb-2">{{ element.title }}</h4>
    <template v-for="response in responses" :key="response.uuid">
      <button
        :class="[
          'border rounded-md mr-4 px-4',
          { 'ring-2': element.score === response.score },
          { 'bg-green text-green-dark': ColorTypes[response.color] == 'green' },
          { 'bg-red text-red-dark': ColorTypes[response.color] == 'red' },
          { 'bg-gray text-gray-dark': ColorTypes[response.color] == 'gray' },
        ]"
        @click="
          () =>
            $emit('changed', {
              uuid: element.uuid,
              score: response.score,
              negative: response.negative,
              responded: true
            })
        "
      >
        {{ response.title }}
      </button>
    </template>

    <div class="flex mt-4 text-gray-dark">
      <note-icon v-if="element.notes_allowed" class="mr-8" />
      <camera-icon v-if="element.photos_allowed" class="mr-8" />
      <issue-icon v-if="element.issues_allowed" class="mr-8" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import CameraIcon from "@/components/common/cameraIcon.vue";
import IssueIcon from "@/components/common/issueIcon.vue";
import NoteIcon from "@/components/common/noteIcon.vue";
export default defineComponent({
  name: "question-item",
  props: {
    element: {
      require: true,
      type: Object,
    },
  },
  components: {
    CameraIcon,
    IssueIcon,
    NoteIcon,
  },
  setup(props) {
    const store = useStore();
    const ColorTypes = ref({
      "#4AD862": "green",
      "#FF6E44": "red",
      "#777777": "gray",
    });

    const responses = computed(
      () =>
        store.state.model.params.response_sets.find(
          (set) => set.uuid === props.element?.params?.response_set
        )?.responses
    );

    return { responses, ColorTypes };
  },
});
</script>
