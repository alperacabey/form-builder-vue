<template>
  <draggable
    v-bind="dragOptions"
    :value="value"
    @input="emitter"
  >
    <template #item="{ element }">
      <div class="item-group" :key="element.uuid" @click="()=> $emit('clicked', element.uuid)">
        <div class="item"> <span :class="[{'font-semibold' :element.type === 'section'}]">{{ element.title }}</span></div>
        <nested-draggable v-if="element.items" class="item-sub" v-model="element.items" @clicked="()=> $emit('clicked', element.uuid)"/>
      </div>
    </template>
  </draggable>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'
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
    }
  },
  setup(props, emit){
       const state = reactive({
    })

    const emitter = (value) => {
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

    const realValue = computed(()=> (props.value ? props.value.map(item=> new Item(item)) : props.list.map(item=> new Item(item))))
    
    return { ...toRefs(state), emitter , dragOptions , realValue}
  }
});
</script>

<style lang="scss" scoped>
.item-container {
  margin: 0;
}
.item{

  cursor: move;
  position: relative;
  height: 40px;
  display: flex;
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
    bottom: 0;
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