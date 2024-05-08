import { formatHelper } from "./formatHelper";

// only used in the products query since i need to format the whole query
export function queryFormatter(queryObject) {
  const finalObject = {};
  // filtered object from random keys wouldnt
  for (const key of Object.keys(queryObject)) {
    if (formatHelper[key]) {
      finalObject[key] = formatHelper[key](queryObject[key]);
    }
  }
  return finalObject;
}
