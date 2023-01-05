import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
import converterSorter from "helpers/converterSorter";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/upload`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const uploadService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  upload,
};
function upload(formdata) {
  return fetchWrapper.uploadFile(baseUrl, formdata);
}
