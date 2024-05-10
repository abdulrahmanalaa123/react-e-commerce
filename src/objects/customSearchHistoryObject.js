function productSearchStorageObject() {
  this.getSearchHistory = () => {
    const storage = localStorage.getItem("searchTerms");
    // loose equality of null checks for both null and undefined
    const val = storage == null ? JSON.stringify([]) : storage;
    return JSON.parse(val);
  };

  this.addSearchTerm = (val) => {
    const currentSearches = this.getSearchHistory();
    let newSearch = [];
    if (currentSearches) {
      if (currentSearches.includes(val)) {
        newSearch = currentSearches;
      } else {
        newSearch = val ? [val, ...currentSearches] : currentSearches;
      }
    } else {
      newSearch = [val];
    }

    localStorage.setItem("searchTerms", JSON.stringify(newSearch));
  };

  this.removeSearchTerm = (val) => {
    const currentSearches = this.getSearchHistory();
    const filtered = currentSearches.filter((value) => value !== val);
    localStorage.setItem("searchTerms", JSON.stringify(filtered));
  };
  this.clearSearchHistory = () => {
    localStorage.removeItem("searchTerms");
  };
}

export const productSearchHistory = new productSearchStorageObject();
