import { AddClipAction, DeleteClipAction } from "../store/actions/user";
import { User } from "./navigation";

export interface State {
  user: User;
}

export type Actions =
  // user
  AddClipAction | DeleteClipAction;
