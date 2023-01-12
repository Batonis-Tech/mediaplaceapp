import React, {Dispatch, FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// api
import {Action, ReduxType} from '../models';
import {useActions} from '../hooks/useAction';
import {ApiService} from '../services';

// styles
import {styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

// icon
import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';
import {useTypedSelector} from '../hooks/useTypeSelector';

interface Props {
  dispatch: Dispatch<Action>;
}

export const AuthScreen: FunctionComponent<Props> = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{}>({email: '', password: ''});

  const {navigateAction, loginAction} = useActions();

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

  const Submit = async () => {
    verify();

    try {
      await ApiService.INSTANCE.Login(email, password).then(resp => {
        loginAction(resp.token_type + ' ' + resp.access_token);
        navigateAction(ReduxType.MAIN);
      });
    } catch (e) {
      console.log('ERROR');
      setError({
        email: 'Указан неверный email',
        password: 'Указан неверный пароль',
      });
      //dispatch(navigate(ReduxType.SPLASH));
      //dispatch(loading(false));
    }
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
        onPress={Submit}
      />
    </View>
  );
};
