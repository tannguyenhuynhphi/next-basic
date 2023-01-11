import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers";
import converterSorter from "helpers/converterSorter";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/product`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const productService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  addProduct,
  getProduct,
  getProductId,
};
function getProduct(limit, page, filter, sorter) {
  var baseUrls = baseUrl + "?limit=" + limit + "&page=" + page;
  if (sorter && sorter.column) {
    baseUrls = baseUrls + converterSorter(sorter);
  }
  if (filter && filter.name) {
    baseUrls = baseUrls + "&name=" + filter.name;
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
function getProductId(id) {
  var baseUrls = baseUrl +"/"+ id
  return fetchWrapper.get(baseUrls);
}
function addProduct(name, detail, quantity, imageUrl, promotion,price) {
const baseUrls = baseUrl;
const body = {
  name: name,
  detail: detail,
  quantity: quantity,
  imageUrl: imageUrl,
  promotion: promotion,
  price: price,
};
return fetchWrapper.post(baseUrls,body);
}
