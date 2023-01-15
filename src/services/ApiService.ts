import {useActions} from '../hooks/useAction';
import {ReduxType} from '../models';

import {BaseApiService} from './BaseApiService';
import {ApiEndpoints, CLIENT_ID, CLIENT_SECRET} from './Endpoints';

export class ApiService {
  static INSTANCE = new ApiService();

  login = async (username: string, password: string) => {
    return await BaseApiService.INSTANCE.post(ApiEndpoints.SignIn, {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: username,
      password: password,
    }).then(resp => resp);
  };

  getUserInfo = async (token: string) => {
    return await BaseApiService.INSTANCE.get(ApiEndpoints.GetMe, token).then(
      resp => resp,
    );
  };

  getGetOrdersUser = async (token: string, id: string) => {
    return await BaseApiService.INSTANCE.get(
      ApiEndpoints.GetOrdersMy(id),
      token,
    ).then(resp => resp);
  };

  openOrder = async (token: string, id: string) => {
    return await BaseApiService.INSTANCE.get(
      ApiEndpoints.GetOrderDetails(id),
      token,
    ).then(resp => resp);
  };
}
