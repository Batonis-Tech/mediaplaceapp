import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// api
import {ReduxType} from '../models';
import {useActions} from '../hooks/useAction';
import {ApiService} from '../services';

// styles
import {Color, styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

// icon
import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';

interface Props {}

export const AuthScreen: FunctionComponent<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{}>({email: '', password: ''});
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const {navigateAction, loadingAction, saveUserInfo} = useActions();

  const {root, centerPosition} = styles;

  const verify = () => {
    setError({
      email: '',
      password: '',
    });

    let errorFound = false;
    if (email?.length === 0) {
      setError(prevState => ({
        ...prevState,
        email: 'Обязательно для заполнения',
      }));
      errorFound = true;
    }
    if (password?.length === 0) {
      setError(prevState => ({
        ...prevState,
        password: 'Обязательно для заполнения',
      }));
      errorFound = true;
    }
    return errorFound;
  };

  const mainLoading = (show: boolean) => {
    loadingAction(show);
    setLoading(show);
  };

  const Submit = async () => {
    let errorFound = verify();

    if (errorFound) {
      return;
    }

    mainLoading(true);

    ApiService.INSTANCE.login(email!!.trim(), password!!.trim())
      .then(resp => {
        saveUserInfo(resp);
        navigateAction(ReduxType.MAIN);
      })
      .catch(e => {
        setError({
          email: 'Указан неверный email',
          password: 'Указан неверный пароль',
        });
        // errorResponse();
      })
      .finally(() => mainLoading(false));
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
          onFocus={() => setFocus(prevState => ({...prevState, email: true}))}
        />

        <InputForm
          placeholder="Введите пароль"
          style={{marginTop: 16}}
          textContentType="password"
          value={password}
          errorMessage={error.password}
          onChangeText={val => setPassword(val)}
          onFocus={() =>
            setFocus(prevState => ({...prevState, password: true}))
          }
        />
      </View>

      <MainButton
        title="Войти"
        style={{marginTop: 24}}
        color={!loading ? Color.primary_500 : Color.primary_050}
        onPress={Submit}
        focus={focus.email || focus.password}
      />
    </View>
  );
};
