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
              <item-wrapper :element="element" @changed="answerChanged" />
            </template>
          </div>
          <button
            type="submit"
            class="btn-primary mt-4"
            :disabled="loading || (sended && !isValid)"
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
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { ActionTypes } from "@/store/actions";
import ItemWrapper from "@/components/form/itemWrapper.vue";
import { useForm } from "@/hooks";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { isValidForm } from "@/utils";

export default defineComponent({
  name: "FormConductor",
  components: {
    ItemWrapper,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { model, loading, elements, showMessage } = useForm();
    const state = reactive({
      sended: false,
    });

    const isValid = computed(() => isValidForm(store.getters.getFormItems));

    const fetchForm = () => {
      store.dispatch(ActionTypes.FetchForm, route.params.id.toString());
    };

    const onSubmit = () => {
      state.sended = true;
      if (isValid.value) {
        store.dispatch(
          ActionTypes.SubmitQuestionnaire,
          store.getters.getResponseModel
        );
      } else {
        showMessage("All fields are required!", false);
      }
    };

    const answerChanged = (val: {
      uuid: string;
      score: number;
      negative: boolean;
    }) => {
      store.commit(MutationType.UpdateAnswer, val);
    };

    onMounted(() => {
      fetchForm();
    });

    return {
      ...toRefs(state),
      onSubmit,
      answerChanged,
      model,
      elements,
      loading,
      isValid,
    };
  },
});
</script>

<style scoped></style>
