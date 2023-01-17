import {BaseApiService} from './BaseApiService';
import {ApiEndpoints, CLIENT_ID, CLIENT_SECRET} from './Endpoints';
import {StorageService} from './StorageService';

export class ApiService {
  static INSTANCE = new ApiService();

  signInSilently(): Promise<void | null> {
    return StorageService.INSTANCE.getAuthToken().then(resp => resp);
    //   .catch(() => {
    //     console.log('catch');
    //     BaseApiService.INSTANCE._token = null;
    //     return false;
    //   });
  }

  login(username: string, password: string): Promise<void> {
    return BaseApiService.INSTANCE.post(ApiEndpoints.SignIn, {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: username,
      password: password,
    })
      .then(data =>
        StorageService.INSTANCE.setAuthToken(
          `${data.token_type} ${data.access_token}`,
        ),
      )
      .then(() => BaseApiService.INSTANCE.loadAuthToken())
      .then(() => this.getUserInfo())
      .then(user => user);
  }

  logout(): Promise<void> {
    return StorageService.INSTANCE.removeAuthToken();
  }

  getUserInfo(): Promise<void> {
    return BaseApiService.INSTANCE.get(ApiEndpoints.GetMe).then(resp => resp);
  }

  getGetOrdersUser(id: string): Promise<T> {
    return BaseApiService.INSTANCE.get(ApiEndpoints.GetOrdersMy(id)).then(
      resp => resp,
    );
  }

  openOrder(id: string): Promise<void> {
    return BaseApiService.INSTANCE.get(ApiEndpoints.GetOrderDetails(id)).then(
      resp => resp,
    );
  }
}
