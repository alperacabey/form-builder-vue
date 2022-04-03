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
  computed,
  onMounted,
  WritableComputedRef,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { Item } from "@/store/state";
import { MutationType } from "@/store/mutations";
import ItemWrapper from "@/components/form/itemWrapper.vue";

export default defineComponent({
  name: "FormConductor",
  props: {
    // id: { type: Number, required: true }
  },
  components: {
    ItemWrapper,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      sended: false,
    });
    const model = computed(() => store.getters.getResponseModel);
    const loading = computed(() => store.getters.loading);
    const elements: WritableComputedRef<Array<Item>> = computed({
      get(): Array<Item> {
        return store.getters.getFormItems || [];
      },
      set(value): void {
        if (state.sended) state.sended = false;
        store.commit(MutationType.UpdateFormItems, value);
      },
    });

    const fetchForm = () => {
      store.dispatch(ActionTypes.FetchForm, route.params.id.toString());
    };

    const onSubmit = () => {
      state.sended = true;
      store.dispatch(ActionTypes.SubmitQuestionnaire, store.getters.getResponseModel);
    };

    onMounted(() => {
      fetchForm();
    });

    return { ...toRefs(state), onSubmit, model, elements, loading };
  },
});
</script>

<style scoped></style>
