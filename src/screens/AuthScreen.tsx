import React, {Dispatch, FunctionComponent} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {MainButton, InputForm} from '../components';

import {Icon} from '../utils/Icon';
import {Logo} from '../assets/LogoSvg';

interface Props {
  dispatch: Dispatch<any>;
}

export const AuthScreen: FunctionComponent<Props> = ({dispatch}) => {
  const {root, centerPosition} = styles;

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

      <MainButton title="Войти" style={{marginTop: 24}} active={true} />
    </View>
  );
};
