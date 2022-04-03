<template>
  <div class="bg-gray h-full p-10">
    <div class="flex justify-center">
      <div v-if="loading && !model.checklist.checklist_title" class="loader" />
      <div v-else class="w-full max-w-lg">
        <h2>{{ model.checklist.checklist_title }}</h2>
        <h3>{{ model.checklist.checklist_description }}</h3>
        <div v-if="elements.length > 0">
          <div class="mt-4 px-4 py-1 shadow-card rounded-lg bg-white text-left">
            <template v-for="element in elements" :key="element.uuid">
              <item-wrapper :element="element" />
            </template>
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
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
import { ActionTypes } from "@/store/actions";
import ItemWrapper from "@/components/form/itemWrapper.vue";
import { useForm } from "@/hooks";
import { useStore } from "@/store";

export default defineComponent({
  name: "FormConductor",
  components: {
    ItemWrapper,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { model, loading, elements } = useForm();
    const state = reactive({
      sended: false,
    });

    const fetchForm = () => {
      store.dispatch(ActionTypes.FetchForm, route.params.id.toString());
    };

    const onSubmit = () => {
      state.sended = true;
      store.dispatch(
        ActionTypes.SubmitQuestionnaire,
        store.getters.getResponseModel
      );
    };

    onMounted(() => {
      fetchForm();
    });

    return { ...toRefs(state), onSubmit, model, elements, loading };
  },
});
</script>

<style scoped></style>
