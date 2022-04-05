export type Type = "form" | "page" | "question" | "section";

export class Item {
  uuid: string;
  type: Type = "question";
  items: Array<Item> = [];
  title?: string;
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
    this.items = item.items?.map((i) => new Item(i)) || [];
    this.params = item.params;
    this.required = item.required;
    this.negative = item.negative;
    this.notes_allowed = item.notes_allowed;
    this.photos_allowed = item.photos_allowed;
    this.issues_allowed = item.issues_allowed;
    this.color = item.color;
    this.responded = item.responded;
  }
}

type ResponseParams = {
  multiple_selection?: boolean;
  response_set?: string;
  collapsed?: boolean;
};

export class CheckList {
  checklist_title: string;
  checklist_description: string;
  form: Item;
  constructor(item: CheckList) {
    this.checklist_title = item.checklist_title;
    this.checklist_description = item.checklist_description;
    this.form = new Item(item.form);
  }
}

export type Sets = {
  uuid: string;
  responses: Array<Item>;
};

export type Params = {
  response_sets: Array<Sets>;
};

export class ResponseModel {
  checklist: CheckList;
  params: Params;
  constructor(item: ResponseModel) {
    this.checklist = new CheckList(item.checklist);
    this.params = item.params;
  }
}

export type RequestModel = {
  checklist: CheckList;
  params: Params;
};

export type State = {
  loading: boolean;
  model: ResponseModel;
};

export const state: State = {
  loading: true,
  model: {
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
