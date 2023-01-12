import axios from 'axios';

export class BaseApiService {
  static INSTANCE = new BaseApiService();

  //token = useTypedSelector(state => state.user.access_token);

  post = async (url: string, headers: {}) => {
    console.log('postUrl: ', url);

    return await axios
      .post(url, headers)
      .then(response => {
        console.log('post response', response.data);
        return response.data;
      })
      .catch(error => {
        console.log('post error', error);
      });
  };

  get = async (url: string, token: string) => {
    console.log('getUrl: ', url);

    return await axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log('response', response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log('response', error);
        return error;
      });
  };
}
