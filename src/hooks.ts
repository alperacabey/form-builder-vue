import { reactive, computed, WritableComputedRef } from "vue";
import { useToast } from "vue-toastification";
import { Item, Type } from "@/store/state";
import { MutationType } from "@/store/mutations";
import { useStore } from "@/store";

export const useForm = () => {
  const store = useStore();
  const toast = useToast();
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

  const addNewItem = (type: Type) => {
    state.sended = false;
    store.commit(MutationType.AddItem, type);
  };

  const handleDelete = (uuid: string) => {
    state.sended = false;
    store.commit(MutationType.DeleteItem, uuid);
  };

  const showMessage = (message: string, isSuccess: boolean) => {
    if (isSuccess) toast.error(message);
    else toast.error(message);
  };
  
  return {
    store,
    model,
    loading,
    elements,
    addNewItem,
    handleDelete,
    showMessage,
  };
};
