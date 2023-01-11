import React, {Dispatch, FunctionComponent} from 'react';
import {View} from 'react-native';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {ReduxType} from '../models';
import {login, fetchCustomers} from '../redux/actions';

// styles
import {styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';

interface Props {
  dispatch: Dispatch<any>;
}

export const AuthScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const {root, centerPosition} = styles;

  const Login = () => {
    // dispatch(login(ReduxType.MAIN));
    dispatch(fetchCustomers());
  };

  return (
    <View style={[root, centerPosition]}>
      <Icon iconName={Logo} width={185} height={25} />

      <View style={{marginTop: 40, width: '100%'}}>
        <InputForm
          placeholder="Введите email"
          textContentType="emailAddress"
          // autoFocus={true}
        />

        <InputForm
          placeholder="Введите пароль"
          style={{marginTop: 16}}
          textContentType="password"
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
