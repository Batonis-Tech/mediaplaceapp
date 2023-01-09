import {StyleSheet} from 'react-native';
import {Color, Fonts} from '.';

export const styles = StyleSheet.create({
  // fonts
  text_H4: {
    fontFamily: Fonts.bold,
    size: 20,
    lineHeight: 26,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Subtitle1: {
    fontFamily: Fonts.semiBold,
    size: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Subtitle2: {
    fontFamily: Fonts.semiBold,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Body1: {
    fontFamily: Fonts.medium,
    size: 16,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: Color.secondary_900,
  },
  text_Body2: {
    fontFamily: Fonts.medium,
    size: 14,
    lineHeight: 20,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Button: {
    fontFamily: Fonts.semiBold,
    size: 20,
    lineHeight: 22,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Caption1: {
    fontFamily: Fonts.regular,
    size: 12,
    lineHeight: 16,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Caption2: {
    fontFamily: Fonts.regular,
    size: 11,
    lineHeight: 14,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },

  // general
  row_container: {flexDirection: 'row', alignItems: 'center'},
  between_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerPosition: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // orders
  orderCard: {
    width: '100%',
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },

  // settings
  settingCard: {
    width: '100%',
    backgroundColor: Color.white,
    padding: 16,
    borderRadius: 8,
  },
  accountIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.secondary_100,
  },
});
