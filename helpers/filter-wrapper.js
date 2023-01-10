import { FormatToTimestamp } from "./formatDatetime";

export async function getFilter(req) {
  var pages = 0;
  var limits = 12;
  var sorters = { _id: -1 };
  var filter = {};
  if (req.query.page) {
    pages = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limits = parseInt(req.query.limit);
  }
  if (req.query.column) {
    var column = req.query.column;
    var order = req.query.order;
    sorters = JSON.parse(`{"${column}":${order}}`);
  }
  if (req.query.title) {
    filter.title = { $regex: req.query.title };
  }
  if (req.query.active) {
    filter.active = req.query.active === "true" ? true : false;
  }
  if (req.query.startDate && req.query.endDate) {
    filter.dateCreated = {
      $gte: FormatToTimestamp(req.query.startDate),
      $lt: FormatToTimestamp(req.query.endDate) + 86399999,
    };
  }
  return {
    pages: pages,
    limits: limits,
    sorters: sorters,
    filter: filter,
  };
}
