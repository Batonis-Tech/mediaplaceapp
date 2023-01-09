import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View, StyleProp, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// icons
import {Icon} from '../../utils/Icon';
import {Notes, Account, Newspaper, DownArrow} from '../../assets/IconSvg';

// helpers
import {touchOpacity} from '../../helpers';

interface Props {
  style?: StyleProp<ViewStyle>;
  status?: string;
}

export const AccountCard: FunctionComponent<Props> = props => {
  return (
    <View style={[styles.settingCard, styles.row_container]}>
      <View style={[styles.centerPosition, styles.accountIcon]}>
        <Icon iconName={Newspaper} size={20} fill={Color.secondary_900} />
      </View>

      <View style={{marginLeft: 16}}>
        <TouchableOpacity
          style={styles.row_container}
          activeOpacity={touchOpacity}>
          <Text style={styles.text_Subtitle1}>Мария</Text>
          <Icon iconName={DownArrow} size={20} fill={Color.secondary_900} />
        </TouchableOpacity>

        <Text style={[styles.text_Body2, {color: Color.secondary_600}]}>
          На счете
          <Text style={{color: Color.secondary_900}}> 5 000 ₽</Text>
        </Text>
      </View>
    </View>
  );
};
