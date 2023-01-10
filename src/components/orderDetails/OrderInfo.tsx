import React, {FunctionComponent} from 'react';
import {Text, View, SectionList} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// helpers
import {touchOpacity} from '../../helpers';

interface Props {}

const DATA = [
  {
    // title: 'Оплачено',
    data: [
      {title: 'Оплачено', price: '4 000 ₽'},
      {title: 'Размещение', price: '2 500 ₽'},
      {title: 'Анонс на главной', price: '0 ₽'},
      {title: 'Страховка', price: '1 500 ₽'},
    ],
  },
];

const Item = ({item, index}) => {
  const titleStyle =
    index === 0
      ? styles.text_Subtitle2
      : [styles.text_Body2, {color: Color.secondary_600}];

  const priceStyle =
    index === 0 ? {color: Color.secondary_800} : {color: Color.secondary_900};

  return (
    <View style={styles.between_container}>
      <Text style={titleStyle}>{item.title}</Text>
      <Text style={[styles.text_Body2, priceStyle]}>{item.price}</Text>
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

  return (
    <View style={orderCard}>
      <View style={between_container}>
        <Text style={text_Caption1}>11.04.22</Text>
        <Text style={text_Caption1}>000003243</Text>
      </View>

      <View style={{marginTop: 2}}>
        <Text style={[text_Body2, {color: Color.secondary_600}]}>Оплачен</Text>
        <Text style={text_Subtitle1}>Удивительный мир бабочек</Text>

        <View style={between_container}>
          <Text style={[text_Body2, {color: Color.secondary_600}]}>
            Тип публикации
          </Text>

          <Text style={text_Body2}>Статья</Text>
        </View>
      </View>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        // renderSectionHeader={({section: {title}}) => (
        //   <Text style={styles.text_Subtitle1}>{title}</Text>
        // )}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        style={{marginTop: 8}}
      />
    </View>
  );
};
