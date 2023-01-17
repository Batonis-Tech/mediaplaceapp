import AsyncStorage from '@react-native-community/async-storage';

const keys = {
  AUTH: 'AUTH',
  USER_INFO: 'USER_INFO',
};

export class StorageService {
  static INSTANCE = new StorageService();

  setAuthToken(token: string): Promise<void> {
    return StorageService.setObject(keys.AUTH, token);
  }

  getAuthToken(): Promise<void | null> {
    return StorageService.getObject(keys.AUTH);
  }

  removeAuthToken(): Promise<void> {
    return StorageService.setObject(keys.AUTH, null);
  }

  setUserInfo(token: string): Promise<void> {
    return StorageService.setObject(keys.USER_INFO, token);
  }

  // base function
  private static setObject<T>(key: string, value: T): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  private static getObject<T>(key: string): Promise<T | null> {
    return AsyncStorage.getItem(key).then(value => {
      if (value != null) {
        return JSON.parse(value) as T;
      } else {
        return null;
      }
    });
  }
}
