import {StatusBar, StyleSheet} from 'react-native';
import {Color, Fonts} from '.';

export const styles = StyleSheet.create({
  // fonts
  text_H4: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Subtitle1: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Subtitle2: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
    color: Color.secondary_900,
  },
  text_Body1: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: Color.secondary_900,
  },
  text_Body2: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Button: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Button2: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.35,
    color: Color.secondary_900,
  },
  text_Caption1: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.35,
    color: Color.secondary_600,
  },
  text_Caption2: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.35,
    color: Color.secondary_600,
  },
  text_Input: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.35,
    color: Color.secondary_500,
  },

  // general
  root: {flex: 1},
  screen: {flex: 1, paddingHorizontal: 16},
  bottomDefault: {marginBottom: 16},
  paddingDefault: {padding: 16},
  paddingHorizontalDefault: {paddingHorizontal: 16},
  topWithoutHeader: {paddingTop: StatusBar.currentHeight + 16},
  rowContainer: {flexDirection: 'row', alignItems: 'center'},
  betweenContainer: {
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
  buttonOnKeyboard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    marginRight: 16,
  },
  separator: {
    marginLeft: 64,
    borderBottomWidth: 1,
    borderBottomColor: Color.secondary_200,
  },

  // input
  inputContainer: {
    width: '100%',
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  errorContainer: {
    borderColor: Color.danger_500,
    borderWidth: 1,
  },
  errorText: {marginTop: 2, color: Color.danger_500},
});
