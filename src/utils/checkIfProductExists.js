export default function checkIfProductExists(
  variationOptions,
  currentProductFeatures
) {
  if (Object.keys(variationOptions).length && currentProductFeatures.length) {
    if (
      Object.keys(variationOptions).length !== currentProductFeatures.length
    ) {
      throw "Sorry This product doesnt exist";
    }
    const allVariations = Object.entries(variationOptions);

    allVariations.forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const finalValue = value.filter((availableOptions) => {
          return currentProductFeatures.includes(availableOptions.value);
        });
        const valueDoesntExist = !finalValue.length;

        if (valueDoesntExist) {
          throw "Sorry This product doesnt exist";
        }
      }
    });
  } else if (
    !Object.keys(variationOptions).length &&
    currentProductFeatures.length
  ) {
    console.log("this activated");
    throw "Sorry this product doesnt exist";
  }
}
