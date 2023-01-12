import React, {Dispatch, FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// hooks
import {useTypedSelector} from '../hooks/useTypeSelector';
import axios from 'axios';
import {Action, ReduxType} from '../models';
import {useActions} from '../hooks/useAction';
import {useDispatch} from 'react-redux';
import {navigate, loading} from '../redux/actions';

// styles
import {styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

// icon
import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';

interface Props {
  dispatch: Dispatch<Action>;
}

export const AuthScreen: FunctionComponent<Props> = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{}>({email: '', password: ''});

  const {fetchCustomers} = useActions();

  const dispatch = useDispatch();

  const {root, centerPosition} = styles;

  const verify = () => {
    setError({
      email: '',
      password: '',
    });

    if (email?.length === 0) {
      setError(prevState => ({
        ...prevState,
        email: 'Обязательно для заполнения',
      }));
    }
    if (password?.length === 0) {
      setError(prevState => ({
        ...prevState,
        password: 'Обязательно для заполнения',
      }));
    }
  };

  const Login = async () => {
    verify();

    try {
      dispatch(loading(true));

      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );

      setTimeout(() => {
        dispatch({type: ReduxType.LOG_IN, payload: response.data});
        dispatch(navigate(ReduxType.MAIN));
        dispatch(loading(false));
      }, 500);
    } catch (e) {
      dispatch(navigate(ReduxType.SPLASH));
      dispatch(loading(false));
    }

    // fetchCustomers();
  };

  return (
    <View style={[root, centerPosition]}>
      <Icon iconName={Logo} width={185} height={25} />

      <View style={{marginTop: 40, width: '100%'}}>
        <InputForm
          placeholder="Введите email"
          textContentType="emailAddress"
          value={email}
          errorMessage={error.email}
          onChangeText={val => setEmail(val)}
          // autoFocus={true}
        />

        <InputForm
          placeholder="Введите пароль"
          style={{marginTop: 16}}
          textContentType="password"
          value={password}
          errorMessage={error.password}
          onChangeText={val => setPassword(val)}
        />
      </View>

      <MainButton
        title="Войти"
        style={{marginTop: 24}}
        active={true}
        onPress={() => Login()}
      />
    </View>
  );
};
