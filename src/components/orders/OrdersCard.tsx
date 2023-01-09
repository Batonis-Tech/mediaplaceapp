import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';

// styles
import {Color, styles} from '../../styles';

interface Props {
  status: string;
}

export const OrdersCard: FunctionComponent<Props> = props => {
  return (
    <View style={styles.orderCard}>
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
        <Text style={[styles.text_Caption1, {color: Color.secondary_600}]}>
          Пресс-релиз
        </Text>

        <View style={styles.row_container}>
          <Text
            style={[
              styles.text_Caption2,
              {marginRight: 8, color: Color.secondary_600},
            ]}>
            12.04.22
          </Text>

          <Text style={[styles.text_Caption2, {color: Color.secondary_600}]}>
            000003243
          </Text>
        </View>
      </View>
    </View>
  );
};
