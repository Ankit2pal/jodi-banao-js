export default class SessionStorageHandler {
  static setKeyInStorage(key, value) {
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem(key, value);
    }
  }

  static getKeyFromStorage(key) {
    return window.sessionStorage.getItem(key);
  }

  static removeItemFromStorage(key) {
    window.sessionStorage.removeItem(key);
  }

  static clearStorage() {
    window.sessionStorage.clear();
  }
}
