import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// api
import {ReduxType} from '../models';
import {useActions} from '../hooks/useAction';
import {ApiService, StorageService} from '../services';

// styles
import {Color, styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

// icon
import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';

interface Props {}

export const AuthScreen: FunctionComponent<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{}>({email: '', password: ''});
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const {navigateAction, loadingAction, saveUserInfo, saveProfileInfo} =
    useActions();

  const {root, screen, centerPosition, buttonOnKeyboard} = styles;

  const focusBtn = focus.email || focus.password;

  const verify = () => {
    setFocus(prevState => ({...prevState, password: false, email: false}));
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

  const Submit = async () => {
    let errorFound = verify();

    if (errorFound) {
      return;
    }

    loadingAction(true);

    ApiService.INSTANCE.login(email!!.trim(), password!!.trim())
      .then(resp => {
        console.log('login', resp);
        saveUserInfo(resp);
        saveProfileInfo({data: resp, role: 'user'});
        StorageService.INSTANCE.setProfileInfo(resp, 'user');
        navigateAction(ReduxType.MAIN);
      })
      .catch(e => {
        setError({
          email: 'Указан неверный email',
          password: 'Указан неверный пароль',
        });
        // errorResponse();
      })
      .finally(() => loadingAction(false));
  };

  return (
    <View style={root}>
      <View style={[screen, centerPosition]}>
        <Icon iconName={Logo} width={185} height={25} />

        <View style={{marginTop: 40, width: '100%'}}>
          <InputForm
            placeholder="Введите email"
            textContentType="emailAddress"
            value={email}
            errorMessage={error.email}
            onChangeText={val => setEmail(val)}
            onFocus={() => setFocus(prevState => ({...prevState, email: true}))}
            onBlur={() => setFocus(prevState => ({...prevState, email: false}))}
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
            onBlur={() =>
              setFocus(prevState => ({...prevState, password: false}))
            }
          />
        </View>

        {!focusBtn && (
          <MainButton
            title="Войти"
            style={{marginTop: 24}}
            color={Color.primary_500}
            onPress={Submit}
          />
        )}
      </View>

      {focusBtn && (
        <View style={buttonOnKeyboard}>
          <MainButton
            title="Войти"
            color={Color.primary_500}
            onPress={Submit}
            focus={true}
          />
        </View>
      )}
    </View>
  );
};
