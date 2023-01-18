import AsyncStorage from '@react-native-community/async-storage';

const keys = {
  AUTH: 'AUTH',
  PROFILE_INFO: 'PROFILE_INFO',
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

  setProfileInfo(data: any, role: 'user' | 'platform'): Promise<T> {
    return StorageService.setObject(keys.PROFILE_INFO, {data, role});
  }

  getProfileInfo(): Promise<void | null> {
    return StorageService.getObject(keys.PROFILE_INFO);
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
