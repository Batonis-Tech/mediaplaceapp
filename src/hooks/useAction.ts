import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserAction from '../redux/actions';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(UserAction, dispatch);
};
