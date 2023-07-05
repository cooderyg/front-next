import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState",
  default: true,
});

export const accessTokenState = atom({
  key: "accessToken",
  default: "",
});

export const visitedPageState = atom({
  key: "visitedPageState",
  default: "",
});
