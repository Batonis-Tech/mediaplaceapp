import {ReduxType} from '../../models';

export function login(payload: any) {
  return {
    type: ReduxType.LOG_IN,
    payload: payload,
  };
}

export const fetchCustomers = () => {
  return function (dispatch) {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => dispatch(login(json)));
  };
};
