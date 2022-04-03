export type Type = "form" | "page" | "question" | "section";

export class Item {
  title: string;
  uuid: string;
  type: Type;
  items: Array<Item>;
  required?: boolean;
  negative?: boolean;
  notes_allowed?: boolean;
  photos_allowed?: boolean;
  issues_allowed?: boolean;
  constructor(item: Item) {
    this.title = item.title;
    this.uuid = item.uuid;
    this.type = item.type;
    if (item.items) this.items = item.items;
    else this.items = [];
  }
}

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
export type ResponseModel = {
  checklist: CheckList;
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
  },
};
