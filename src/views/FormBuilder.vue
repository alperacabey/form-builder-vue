<template>
  <div class="bg-gray h-full p-10">
    <div class="mx-24 flex justify-center">
      <div v-if="loading && !model.checklist.checklist_title" class="loader" />
      <div v-else>
        <h2>{{model.checklist.checklist_title}}</h2>
        <h3>{{model.checklist.checklist_description}}</h3>
        <div class="flex justify-between mt-3">
        <button 
        class="btn-secondary mr-2"
        :disabled="loading"
        @click="() => {}">
          + Section
        </button>
        <button 
        class="btn-secondary"
        :disabled="loading"
        @click="() => {}">
          + Question
        </button>  
        </div>
        <div class="mt-4 shadow-card rounded-lg bg-white px-4">
          <nested-draggable v-model="elements" @clicked="(uuid) => selected = uuid"/>
        </div>
        <button 
        type="submit"
        class="btn-primary mt-4"
        :disabled="loading || sended"
        @click="onSubmit">
          <span v-if="loading" class="loader right-4" />Submit
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted , WritableComputedRef} from 'vue'
import { useStore,  } from '@/store'
import { ActionTypes } from '@/store/actions'
import { Item, ResponseModel } from '@/store/state'
import { MutationType } from '@/store/mutations'

// import draggable from "vuedraggable";
import NestedDraggable from "@/components/nestedDraggable.vue"

export default defineComponent({
  name: 'FormBuilder',
  props: {
      // id: { type: Number, required: true }
  },
   components: {
        NestedDraggable,
      },
  setup() {
    const store = useStore()
    const state = reactive({
             selected:null,
             sended:false
    })
    const model = computed(() => store.getters.getResponseModel)
    const loading = computed(() => store.getters.loading)
    const elements: WritableComputedRef<Array<Item>> = computed({
      get(): Array<Item> {
        return store.getters.getFormItems || [];
      },
      set(value): void {
        if(state.sended) state.sended = false;
        store.dispatch(ActionTypes.UpdateFormItems, value)
      },
    });
 
    const fetchForm = () => {
       store.dispatch(ActionTypes.FetchInitialForm)
    }

    const onSubmit = () => {
      state.sended = true
      store.dispatch(ActionTypes.SubmitForm, store.getters.getResponseModel)
    }
    onMounted(() => {
      fetchForm() 
      });
    
    return {...toRefs(state), onSubmit, model, elements, loading }
  }
})
</script>

<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
</style>