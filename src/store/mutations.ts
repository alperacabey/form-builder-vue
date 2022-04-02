import { MutationTree } from 'vuex'
import { State, ResponseModel, Item } from '@/store/state'

export enum MutationType {
    SetLoading = 'SET_LOADING',
    SetForm = 'SET_FORM',
    UpdateFormItems ='UPDATE_FORM_ITEMS'
  }
  
  //mutations.ts
  export type Mutations = {
    [MutationType.SetLoading](state: State, value: boolean): void
    [MutationType.SetForm](state: State, payload: ResponseModel): void
    [MutationType.UpdateFormItems](state: State, payload: Array<Item>): void
  }
  
  export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetLoading](state, value) {
      state.loading = value
      console.log("I am loading...")
    },
    [MutationType.SetForm](state, payload) {
      console.log('setForm = ', payload)
      state.responseModel = payload
    },
    [MutationType.UpdateFormItems](state, payload) {
      state.responseModel.checklist.form.items[0].items = payload
    },
  }