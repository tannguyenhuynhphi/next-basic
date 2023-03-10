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
  addPost,
  getPost,
};
function getPost(limit, page, sorter, filter) {
  var baseUrls = baseUrl + "?limit=" + limit + "&page=" + page;
  if (sorter && sorter.column) {
    baseUrls = baseUrls + converterSorter(sorter);
  }
  if (filter && filter.title) {
    baseUrls = baseUrls + "&title=" + filter.title;
  }
  if (filter && filter.active) {
    baseUrls = baseUrls + "&active=" + filter.active;
  }
  if (filter && filter.ranges) {
    baseUrls =
      baseUrls +
      "&startDate=" +
      filter.ranges[0] +
      "&endDate=" +
      filter.ranges[1];
  }
  return fetchWrapper.get(baseUrls);
}
function addPost(title, content, location, nameImages, id) {
  const baseUrls = baseUrl;
  const body = {
    title: title,
    content: content,
    location: location,
    image: nameImages,
    create: id,
  };
  return fetchWrapper.post(baseUrls,body);
}
