function productSearchStorageObject() {
  this.getSearchHistory = () => {
    return JSON.parse(localStorage.getItem("searchTerms"));
  };

  this.addSearchTerm = (val) => {
    const currentSearches = JSON.parse(localStorage.getItem("searchTerms"));
    const newSearch = currentSearches ? [val, ...currentSearches] : [val];
    localStorage.setItem("searchTerms", JSON.stringify(newSearch));
  };

  this.removeSearchTerm = (val) => {
    const currentSearches = JSON.parse(localStorage.getItem("searchTerms"));
    const filtered = currentSearches.filter((value) => value !== val);
    localStorage.set("searchTerms", JSON.parse(filtered));
  };
  this.clearSearchHistory = () => {
    localStorage.removeItem("searchTerms");
  };
}

export const productSearchHistory = new productSearchStorageObject();
