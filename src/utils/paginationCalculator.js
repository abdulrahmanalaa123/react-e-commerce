function trailsCalculator(totalPages, activePage) {
  // should be 3 for mobile devices
  const valuesCount = 4;

  const preceedingLimit = Math.floor(valuesCount / 2);
  const leadingLimit = Math.ceil(valuesCount / 2);

  // main equation activePage - 1 (start element) > preceedingLimit + 1 (element worth to put the ellipsis for)
  const preceedingTrailing =
    activePage > preceedingLimit + 2 && totalPages > valuesCount + 2;

  const leadingTrailing =
    totalPages - activePage > leadingLimit + 2 && totalPages > valuesCount + 2;

  let startIndex;
  let length;
  if (!preceedingTrailing && !leadingTrailing) {
    startIndex = 2;
    length = totalPages - startIndex;
  } else if (preceedingTrailing && leadingTrailing) {
    startIndex = activePage - preceedingLimit;
    length = valuesCount;
  } else if (preceedingTrailing && !leadingTrailing) {
    startIndex = totalPages - valuesCount;
    length = valuesCount;
  } else if (!preceedingTrailing && leadingTrailing) {
    startIndex = 2;
    length = valuesCount;
  }
  return { startIndex, length, leadingTrailing, preceedingTrailing };
}

export default trailsCalculator;
