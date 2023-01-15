import React, {FunctionComponent} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

// styles
import {styles} from '../../styles';

// helpers
import {indicatorColor, touchOpacity, formatCost} from '../../helpers';
import {useMoment} from '../../helpers';

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

  const {order} = props;

  return (
    <TouchableOpacity
      style={[orderCard, props.style]}
      onPress={props.onPress}
      activeOpacity={touchOpacity}>
      <Text style={[text_Body2, {color: indicatorColor(order.status)}]}>
        {order.status}
      </Text>

      <View style={[between_container, {marginTop: 2}]}>
        <Text style={[text_Subtitle1, {marginRight: 16, flex: 1}]}>
          {order.provider.name}
        </Text>

        <Text style={text_Body2}>{formatCost(order.total_cost)}</Text>
      </View>

      <View style={between_container}>
        <Text style={text_Caption1}>{order.product.type.name}</Text>

        <View style={row_container}>
          <Text style={[text_Caption2, {marginRight: 8}]}>
            {useMoment(order.created)}
          </Text>

          <Text style={text_Caption2}>{order.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
