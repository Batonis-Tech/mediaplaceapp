import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

// styles
import {styles, Color} from '../styles';

import {get} from '../services';
import {useDispatch, useSelector} from 'react-redux';

interface Props {}

export const SplashScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [art, setArt] = useState([]);

  const {root, centerPosition} = styles;

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const src =
    'https://content.guardianapis.com/search?page=2&q=debate&api-key=test';

  const tryToLogIn = () => {
    dispatch(get(src));
    console.log(user);

    if (user.length !== 0) {
      setLoading(false);
    }
  };

  useEffect(tryToLogIn, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1}}
        size="large"
        color={Color.secondary_600}
      />
    );
  }

  return (
    <View style={[root, centerPosition]}>
      <Text>Что-то пошло не так...</Text>

      {user?.map((item, index) => {
        return <Text key={index}>{index}</Text>;
      })}
    </View>
  );
};
