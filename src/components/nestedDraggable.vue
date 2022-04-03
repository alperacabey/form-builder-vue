<template>
  <draggable
    v-bind="dragOptions"
    :value="value"
    :disabled="disabled"
    @input="emitter"
  >
    <template #item="{ element }">
      <div :class="['item-group']" :key="element.uuid">
        <div
          :class="['item', { 'bg-gray-light': selectedItem === element.uuid }]"
        >
          <span :class="[{ 'font-semibold': element.type === 'section' }]">{{
            element.title
          }}</span>
          <button
            type="button"
            @click="() => $emit('handleDelete', element.uuid)"
          >
            <delete-icon />
          </button>
        </div>
        <nested-draggable
          v-if="element.items"
          class="item-sub"
          v-model="element.items"
          @handleDelete="(val) => $emit('handleDelete', val)"
          :disabled="disabled"
        />
      </div>
    </template>
  </draggable>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from "vue";
import draggable from "vuedraggable";
import { Item } from "@/store/state";
import DeleteIcon from "@/components/common/deleteIcon.vue";
export default defineComponent({
  name: "nested-draggable",
  components: {
    draggable,
    DeleteIcon,
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
    selectedItem: {
      require: false,
      type: String,
      default: null,
    },
    disabled: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props, emit) {
    const state = reactive({
      selected: "",
    });

    const emitter = (value) => {
      emit("input", value);
    };

    const dragOptions = computed(() => ({
      animation: 0,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
      tag: "div",
      class: "item-container",
      itemKey: "uuid",
    }));

    const realValue = computed(() =>
      props.value
        ? props.value.map((item) => new Item(item))
        : props.list.map((item) => new Item(item))
    );

    return { ...toRefs(state), emitter, dragOptions, realValue };
  },
});
</script>

<style lang="scss" scoped>
.item-container {
  margin: 0;
  max-height: 500px;
  overflow-y: scroll;
}
.item {
  cursor: move;
  position: relative;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  i {
    cursor: pointer;
  }
}
.item::after {
  content: "";
  box-shadow: 0 1px 0 0 #e6e6e6;
  position: absolute;
  height: 1px;
  width: 100%;
  bottom: 1px;
  left: 0;
}

.item::before {
  content: ".";
  position: absolute;
  top: 0px;
  left: 5px;
  font-size: 20px;
  line-height: 20px;
  text-shadow: 0 5px #777777, 0 10px #777777, 5px 0 #777777, 5px 5px #777777,
    5px 10px #777777;
}
.item-sub {
  margin: 0 0 0 1rem;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #e6e6e6;
}
</style>
