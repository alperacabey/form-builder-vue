export type Type = "form" | "page" | "question" | "section";

export class Item {
  title: string;
  uuid: string;
  type: Type;
  items: Array<Item>;
  params?: ResponseParams;
  required?: boolean;
  negative?: boolean;
  notes_allowed?: boolean;
  photos_allowed?: boolean;
  issues_allowed?: boolean;
  color?: string;
  responded?: boolean;
  constructor(item: Item) {
    this.title = item.title;
    this.uuid = item.uuid;
    this.type = item.type;
    if (item.items) this.items = item.items;
    else this.items = [];
  }
}

type ResponseParams = {
  multiple_selection?: boolean;
  response_set?: string;
  collapsed?: boolean;
};

type Form = {
  uuid: string;
  type: Type;
  items: Array<Item>;
};

export type CheckList = {
  checklist_title: string;
  checklist_description: string;
  form: Form;
};

export type Sets = {
  uuid: string;
  responses: Array<Item>;
};

export type Params = {
  response_sets: Array<Sets>;
};

export type ResponseModel = {
  checklist: CheckList;
  params: Params;
};

export type RequestModel = {
  checklist: CheckList;
  params: Params;
};

export type State = {
  loading: boolean;
  responseModel: ResponseModel;
};

export const state: State = {
  loading: true,
  responseModel: {
    checklist: {
      checklist_title: "",
      checklist_description: "",
      form: {
        uuid: "",
        type: "form",
        items: [],
      },
    },
    params: {
      response_sets: [],
    },
  },
};
