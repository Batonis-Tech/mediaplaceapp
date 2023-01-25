import axios from 'axios';
import {StorageService} from './StorageService';

export class BaseApiService {
  static INSTANCE = new BaseApiService();

  _token?: null;

  constructor() {
    this.loadAuthToken();
  }

  loadAuthToken(): Promise<void> {
    return StorageService.INSTANCE.getAuthToken()
      .then(token => {
        this._token = token;
      })
      .catch(err => {
        this._token = null;
        throw err;
      });
  }

  post = async (url: string, headers: {}) => {
    console.log('postUrl: ', url);

    return await axios
      .post(url, headers)
      .then(response => response.data)
      .catch(error => {
        console.log('post error', error);
        return error;
      });
  };

  get = async (url: string) => {
    console.log('getUrl: ', url);

    return await await axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: this._token,
        },
      })
      .then(response => response.data)
      .catch(error => {
        console.log('get error', error);
        return error;
      });
  };
}
