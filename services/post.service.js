import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
import converterSorter from "helpers/converterSorter";
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
function getPost(limit, page, sorter, filter) {
  var baseUrls = baseUrl + "?limit=" + limit + "&page=" + page;
  if (sorter&&sorter.column) {
    baseUrls = baseUrls + converterSorter(sorter);
  }
  if(filter&&filter.title){
    baseUrls = baseUrls + "&title="+ filter.title
  }  if(filter&&filter.active){
    baseUrls = baseUrls + "&active="+ filter.active
  }
  return fetchWrapper.get(baseUrls);
}
