import React, {FunctionComponent} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// helpers
import {touchOpacity} from '../../helpers';
import moment from 'moment';

interface Props {
  order: any;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
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

  const indicatorColor = (status: string) => {
    switch (status) {
      case 'Оплачено':
        return Color.secondary_600;
      case 'Завершен':
        return Color.succes_500;
      case 'Ожидает согласования':
        return Color.warning_500;
      case 'Опубликован':
        return Color.info_500;
      case 'Принят в работу':
        return Color.secondary_600;
      case 'Отменен':
        return Color.secondary_400;
      default:
        return Color.warning_500;
    }
  };

  return (
    <TouchableOpacity
      style={[orderCard, props.style]}
      onPress={props.onPress}
      activeOpacity={touchOpacity}>
      <Text style={[text_Body2, {color: indicatorColor(props.order.status)}]}>
        {props.order.status}
      </Text>

      <View style={[between_container, {marginTop: 2}]}>
        <Text style={[text_Subtitle1, {marginRight: 16, flex: 1}]}>
          {props.order.provider.name}
        </Text>

        <Text style={text_Body2}>
          {props.order.total_cost.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          })}
        </Text>
      </View>

      <View style={between_container}>
        <Text style={text_Caption1}>{props.order.product.type.name}</Text>

        <View style={row_container}>
          <Text style={[text_Caption2, {marginRight: 8}]}>
            {moment(new Date(props.order.created)).format('DD.MM.YY')}
          </Text>

          <Text style={text_Caption2}>{props.order.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
