const Store = require('electron-store');
const store = new Store();

const cache = {
  set: (key, value) => {
    store.set(key, value);
  },
  get: (key) => {
    return store.get(key);
  },
  getStore: () => {
    return store.get();
  },
  clear: () => {
    return store.clear();
  } 
};

module.exports = cache;