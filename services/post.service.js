import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/post`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const postService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getPost,
};
function getPost() {
  return fetchWrapper.get(baseUrl);
}
