import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// helpers
import {indicatorColor, useMoment, formatCost} from '../../helpers';

interface Props {
  orderInfo: any;
}

const Item = ({name, price, style}) => {
  return (
    <View style={[styles.between_container, style, {marginTop: 4}]}>
      <Text style={[styles.text_Body2, {color: Color.secondary_600}]}>
        {name}
      </Text>

      <Text style={styles.text_Body2}>{formatCost(price)}</Text>
    </View>
  );
};

export const OrderInfo: FunctionComponent<Props> = props => {
  const {
    orderCard,
    between_container,
    //fonts
    text_Caption1,
    text_Body2,
    text_Subtitle1,
  } = styles;

  const {orderInfo} = props;

  return (
    <View style={orderCard}>
      <View style={between_container}>
        <Text style={text_Caption1}>{useMoment(orderInfo.created)}</Text>
        <Text style={text_Caption1}>{orderInfo.id}</Text>
      </View>

      <View style={{marginTop: 2}}>
        <Text style={[text_Body2, {color: indicatorColor(orderInfo.status)}]}>
          {orderInfo.status}
        </Text>
        <Text style={text_Subtitle1}>{orderInfo.provider.name}</Text>

        <View style={between_container}>
          <Text style={[text_Body2, {color: Color.secondary_600}]}>
            Тип публикации
          </Text>

          <Text style={text_Body2}>{orderInfo.product.type.name}</Text>
        </View>
      </View>

      <View style={[styles.between_container, {marginTop: 8}]}>
        <Text style={styles.text_Subtitle2}>Оплачено</Text>
        <Text style={styles.text_Body2}>
          {formatCost(orderInfo.total_cost)}
        </Text>
      </View>

      <Item
        name={orderInfo.product.type.name}
        price={orderInfo.product.price}
        style={{marginTop: 8}}
      />

      {orderInfo.product.options.map((item: any, index: number) => {
        return <Item key={index} name={item.name} price={item.price} />;
      })}
    </View>
  );
};
