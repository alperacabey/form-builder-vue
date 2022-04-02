import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, ResponseModel , Item} from './state'
import formService from '@/services/form-service'
import { AxiosResponse } from 'axios'
// import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { useToast } from 'vue-toastification'
const toast = useToast()

export enum ActionTypes {
  FetchInitialForm = 'FETCH_INITIAL_FORM',
  UpdateFormItems = 'UPDATE_FORM_ITEMS',
  SubmitForm = 'SUBMIT_FORM',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
  }
  export type Actions = {
    [ActionTypes.FetchInitialForm](context: ActionAugments): void
    [ActionTypes.UpdateFormItems](context: ActionAugments, payload : Array<Item>): void
    [ActionTypes.SubmitForm](context: ActionAugments, payload : ResponseModel): void
 }

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FetchInitialForm]({ commit }) {
    commit(MutationType.SetLoading, true)
    const response : any = await fetch('/api/form',{method:'get'});
    console.log('FetchInitialForm' ,JSON.parse(response._bodyInit))
    commit(MutationType.SetForm, JSON.parse(response._bodyInit))
    commit(MutationType.SetLoading, false)
  },
  async [ActionTypes.SubmitForm]({ commit }, payload) {
    commit(MutationType.SetLoading, true)
    const response : AxiosResponse<any,any>= await formService.postForm(payload);
    if(response.status === 200)
      toast.success("Form submitted successfully!")
    commit(MutationType.SetLoading, false)
  },
  [ActionTypes.UpdateFormItems]({ commit }, payload) {
    commit(MutationType.UpdateFormItems, payload)
  },
}