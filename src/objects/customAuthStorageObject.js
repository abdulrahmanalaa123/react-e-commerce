function storageObject() {
  this.getItem = (key) => {
    return localStorage.getItem(key);
  };

  this.setItem = (key, val) => {
    localStorage.setItem(key, val);
  };

  this.removeItem = (key) => {
    localStorage.removeItem(key);
  };
}

export const customStorageObject = new storageObject();
