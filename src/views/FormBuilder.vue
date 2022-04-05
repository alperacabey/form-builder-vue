<template>
  <div class="bg-gray h-full p-10">
    <div class="flex justify-center">
      <div v-if="loading && !model.checklist.checklist_title" class="loader" />
      <div v-else class="w-full max-w-lg">
        <h2>{{ model.checklist.checklist_title }}</h2>
        <h3>{{ model.checklist.checklist_description }}</h3>
        <div class="flex justify-between mt-3">
          <button
            class="btn-secondary mr-2"
            :disabled="loading"
            @click="() => addNewItem('section')"
          >
            + Section
          </button>
          <button
            class="btn-secondary"
            :disabled="loading"
            @click="() => addNewItem('question')"
          >
            + Question
          </button>
        </div>
        <div v-if="elements.length > 0">
          <div class="mt-4 shadow-card rounded-lg bg-white px-4">
            <nested-draggable
              v-model="elements"
              @handleDelete="handleDelete"
              :disabled="loading"
            />
          </div>
          <button
            type="submit"
            class="btn-primary mt-4"
            :disabled="loading || sended"
            @click="onSubmit"
          >
            <span v-if="loading" class="loader right-4" />Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import NestedDraggable from "@/components/nestedDraggable.vue";
import { useForm } from "@/hooks";

export default defineComponent({
  name: "FormBuilder",
  components: {
    NestedDraggable,
  },
  setup() {
    const store = useStore();
    const { sended, model, loading, elements, addNewItem, handleDelete } =
      useForm();

const fetchForm = () => {
      store.dispatch(ActionTypes.FetchInitialForm);
    };

    const onSubmit = () => {
      sended.value = true;
      store.dispatch(ActionTypes.SubmitForm, store.getters.getResponseModel);
    };

    onMounted(() => {
      fetchForm();
    });

    return {
      sended,
      model,
      loading,
      elements,
      addNewItem,
      handleDelete,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
