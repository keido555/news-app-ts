import { Article } from "../../types/navigation";

export type AddClipAction = {
  type: "ADD_CLIP";
  clip: Article;
};

export const addClip = ({ clip }: any) => {
  return {
    type: "ADD_CLIP",
    clip,
  };
};

export type DeleteClipAction = {
  type: "DELETE_CLIP";
  clip: Article;
};

export const deleteClip = ({ clip }: any) => {
  return {
    type: "DELETE_CLIP",
    clip,
  };
};
