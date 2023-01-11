import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// helpers
import {touchOpacity} from '../../helpers';

interface Props {
  status: string;
  onPress: () => void;
}

export const OrdersCard: FunctionComponent<Props> = props => {
  const {
    orderCard,
    between_container,
    row_container,
    //fonts
    text_Caption1,
    text_Caption2,
    text_Body2,
    text_Subtitle1,
  } = styles;

  return (
    <TouchableOpacity
      style={orderCard}
      onPress={props.onPress}
      activeOpacity={touchOpacity}>
      <Text style={[text_Body2, {color: Color.danger_500}]}>Отклонен</Text>

      <View style={[between_container, {marginTop: 2}]}>
        <Text style={[text_Subtitle1, {marginRight: 16, flex: 1}]}>
          Интересные животные планеты Земля
        </Text>

        <Text style={text_Body2}>4 000 ₽</Text>
      </View>

      <View style={between_container}>
        <Text style={text_Caption1}>Пресс-релиз</Text>

        <View style={row_container}>
          <Text style={[text_Caption2, {marginRight: 8}]}>12.04.22</Text>

          <Text style={text_Caption2}>000003243</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
