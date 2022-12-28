function converterSorter(sorter) {
  switch (sorter.order) {
    case "ascend":
      return "&column=" + sorter.column + "&order=1";
    case "descend":
      return "&column=" + sorter.column + "&order=-1";
    default:
      return "&column=" + sorter.column + "&order=-1";
  }
}
export default converterSorter;
