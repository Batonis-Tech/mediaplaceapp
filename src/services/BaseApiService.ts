import axios from 'axios';
import {useTypedSelector} from '../hooks/useTypeSelector';
import {StorageService} from './StorageService';

export class BaseApiService {
  static INSTANCE = new BaseApiService();

  _token?: null;

  constructor() {
    // noinspection JSIgnoredPromiseFromCall
    this.loadAuthToken();
  }

  // token = useTypedSelector(state => state.user.access_token);

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
      .then(response => {
        //console.log('post response', response.data);
        return response.data;
      })
      .catch(error => {
        console.log('post error', error);
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
      .then(response => {
        //console.log('get response', response.data);
        return response.data;
      })
      .catch(error => {
        console.log('get error', error);
        return error;
      });
  };
}
