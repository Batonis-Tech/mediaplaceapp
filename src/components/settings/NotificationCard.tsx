import React, {FunctionComponent} from 'react';
import {Text, View, StyleProp, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// other deps
import {Switch} from 'react-native-gesture-handler';

interface Props {
  style?: StyleProp<ViewStyle>;
  active: boolean;
  onValueChange: () => void;
}

export const NotificationCard: FunctionComponent<Props> = props => {
  return (
    <View style={[styles.settingCard, styles.row_container, props.style]}>
      <Text style={[styles.text_Body1, {marginRight: 16, flex: 1}]}>
        Уведомления об изменении статуса заказа
      </Text>

      <Switch
        value={props.active}
        onValueChange={props.onValueChange}
        thumbColor={Color.primary_500}
        trackColor={{false: Color.secondary_300, true: Color.primary_200}}
      />
    </View>
  );
};
