

<template>
 <!-- @click="()=> $emit('clicked', element.uuid)" -->
  <draggable
    v-bind="dragOptions"
    :value="value"
    :disabled="disabled"
    @input="emitter"
  >
    <template #item="{ element }">
      <div :class="['item-group']" :key="element.uuid" >
        <div :class="['item', {'bg-gray-light':selectedItem === element.uuid}]">
          <span :class="[{'font-semibold' :element.type === 'section'}]">{{ element.title }}</span>
          <button type="button" @click="()=> $emit('handleDelete', element.uuid)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 right-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          </button>
        </div>
        <nested-draggable v-if="element.items" class="item-sub" v-model="element.items" @handleDelete="(val) => $emit('handleDelete', val)" :disabled="disabled"/>
      </div>
    </template>
  </draggable>
</template>

<script>
import { defineComponent, computed, reactive, toRefs, watch } from 'vue'
import draggable from "vuedraggable";

import { Item } from '@/store/state'
export default defineComponent({
  name: "nested-draggable",
  components: {
    draggable
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    },
    selectedItem: {
      require: false,
      type: String,
      default:null
    },
    disabled:{
      require: false,
      type: Boolean,
      default:false
    }
  },
  setup(props, emit){
       const state = reactive({
         selected : ''
    })

    const emitter = (value) => {
      console.log('emittr')
      emit("input", value);
    }

    const dragOptions = computed(()=> ({
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        tag:"div",
        class:"item-container",
        itemKey:"uuid",
      })
    )

    const move = (title) => {
    console.log('deleted item =' , title)
}
    const realValue = computed(()=> (props.value ? props.value.map(item=> new Item(item)) : props.list.map(item=> new Item(item))))

    watch(state, (currentValue, oldValue) => {
      console.log(currentValue.selected)
      
    });

    return { ...toRefs(state), emitter, move, dragOptions , realValue}
  }
});
</script>

<style lang="scss" scoped>
.item-container {
  margin: 0;
  max-height: 500px;
  overflow-y: scroll;
}
.item{

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

.item::before{
    content: '.';
    position: absolute;
    top:0px;
    left: 5px;
    font-size: 20px;
    line-height: 20px;
    text-shadow: 0 5px #777777, 0 10px #777777, 5px 0 #777777, 5px 5px #777777, 5px 10px #777777;
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