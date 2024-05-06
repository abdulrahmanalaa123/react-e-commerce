import { formatHelper } from "./formatHelper";

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
