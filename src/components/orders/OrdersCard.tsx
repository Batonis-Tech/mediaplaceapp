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
  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={props.onPress}
      activeOpacity={touchOpacity}>
      <Text style={[styles.text_Body2, {color: Color.danger_500}]}>
        Отклонен
      </Text>

      <View style={[styles.between_container, {marginTop: 2}]}>
        <Text style={[styles.text_Subtitle1, {marginRight: 16}]}>
          Интересные животные планеты Земля
        </Text>

        <Text style={styles.text_Body2}>4 000 ₽</Text>
      </View>

      <View style={styles.between_container}>
        <Text style={styles.text_Caption1}>Пресс-релиз</Text>

        <View style={styles.row_container}>
          <Text style={[styles.text_Caption2, {marginRight: 8}]}>12.04.22</Text>

          <Text style={styles.text_Caption2}>000003243</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
