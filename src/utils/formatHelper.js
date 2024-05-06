const availableFilters = {
  color: ["Beige", "Red", "Yellow", "Green", "Blue", "Purple"],
  size: ["Small", "Medium", "Large"],
};
// this module was made in intent of filtering user search queries to prevent malicious behaviours it doesnt achieve that, i do realize it
// as well it was supposed to be put ontop of the searchQueryhook but it was scrapped because it would fuck up the checkbox mechanisms
// i later regretted then i realized it can be just put ontop of the requests hooks  butt then filters like color,size,subcategory or even options are pointless
// since you can basically input any shit and it would just return nothing and its safe because of the postgrest api implemented inside the supabase client
// maybe using this i would disregard bullshit queries and just wont change the products view, maybe also would fix links typos and it would be some sort of a feature idfk
//  but the categories,pageNo,priceRange ones are useful nonetheless i could scrap the rest but ill just leave them as a reminder of me hoping to do something good
export const formatHelper = {
  // options is added for future edit of removing specific option filtering
  options: (valsObject) => {
    let finalObject = {};
    Object.keys(valsObject).map((key) => {
      if (key.toLowerCase === "color") {
        finalObject[key] = this.color(valsObject[key]);
      } else {
        // replacing any special character other than the . and the dollar
        finalObject[key] = valsObject[key].map((val) =>
          val.replace(/[^\w\s\.\$\p{L}]/gi, "")
        );
      }
    });
  },
  // this will check for all non regular expressions and its an easier function to write rather than treating the strings first
  // then checking since mostly you would reach my values using my available selectors
  color: (vals) => {
    const filteredVals = vals.filter((val) =>
      availableFilters["color"].includes(val)
    );
    return filteredVals;
  },
  size: (vals) => {
    const filteredVals = vals.map((val) =>
      val.replace(/[^\w\s\.\$\p{L}]/gi, "")
    );
    return filteredVals;
  },
  subcategory: (vals) => {
    const filteredVals = vals.map((val) => val.replace(/[^\w\s\.\p{L}]/gi, ""));
    return filteredVals;
  },
  priceRange: (vals) => {
    let filteredVals = vals.map((val) => {
      let splittedArr = val.split("-");
      splittedArr = splittedArr.map((val) => Number(val.replace("$", "")));
      return splittedArr.filter((val) => !isNaN(val));
    });
    filteredVals = filteredVals.filter((arr) => arr.length === 2);
    return filteredVals;
  },
  pageNo: (val) => {
    let actualVal;
    if (Array.isArray(val)) {
      actualVal = val[0];
    } else {
      actualVal = val;
    }
    return isNan(Number(actualVal)) ? 1 : Number(actualVal);
  },
  category: (val) => {
    const validCategories = ["Plants", "Seeds", "GardenSupplies", "Pots"];
    if (Array.isArray(val)) {
      return val.filter((val) => validCategories.includes(val));
    } else {
      return validCategories.includes(val) ? val : "";
    }
  },
};
