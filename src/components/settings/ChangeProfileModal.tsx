import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
  SectionList,
} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// components
import {MainButton, Spinner, HeaderModal} from '../';

// api
import {ApiService, StorageService} from '../../services';
import {useTypedSelector} from '../../hooks/useTypeSelector';
import {AppState} from '../../models';
import {useActions} from '../../hooks/useAction';

// helpers
import {statusIndicatorColor, touchOpacity} from '../../helpers';

// icon
import {Icon} from '../../utils/Icon';
import {Account, Newspaper} from '../../assets/IconSvg';

// other deps
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface Props {
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ChangeProfileModal: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [current, setCurrent] = useState<{}>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [initialIndex, setInitialIndex] = useState<number>(-1);

  const snapPoints = React.useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const {providers, userData, currentAccount} = useTypedSelector(
    (state: AppState) => state.user,
  );
  const {getProviders, saveProfileInfo} = useActions();

  const DATA = [{data: [userData, ...(providers?.results || [])]}];

  const {
    root,
    rowContainer,
    centerPosition,
    paddingDefault,
    paddingHorizontalDefault,
    bottomDefault,
    separator,
    accountIcon,
    text_Subtitle1,
    text_Body2,
  } = styles;

  const initialCurrentIndex = () => {
    let num = DATA[0]?.data.findIndex(
      (elem: any) => elem.name === currentAccount.data.name,
    );
    setInitialIndex(num);
    setCurrentIndex(num);
  };

  useEffect(() => {
    setLoading(true);

    ApiService.INSTANCE.getProviders()
      .then(resp => {
        getProviders(resp);
        initialCurrentIndex();
      })
      .finally(() => setLoading(false));
  }, [currentAccount?.data?.id]);

  const submitChange = () => {
    let role = () => (currentIndex === 0 ? 'user' : 'platform');

    saveProfileInfo({data: current, role: role()});
    StorageService.INSTANCE.setProfileInfo(current, role());
    props.close();
  };

  const Item = ({item, index, onPress}) => {
    return (
      <TouchableOpacity
        style={[
          rowContainer,
          paddingDefault,
          {
            backgroundColor:
              currentIndex === index ? Color.secondary_050 : undefined,
          },
        ]}
        activeOpacity={touchOpacity}
        onPress={onPress}>
        <View style={[centerPosition, accountIcon]}>
          <Icon
            iconName={index === 0 ? Account : Newspaper}
            size={20}
            fill={Color.secondary_900}
          />
        </View>

        <View>
          <Text style={text_Subtitle1}>{item.name}</Text>
          {item.status && item.status !== 'Активно' && (
            <Text
              style={[text_Body2, {color: statusIndicatorColor(item.status)}]}>
              {item.status}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      snapPoints={animatedSnapPoints}
      handleIndicatorStyle={{height: 0}}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      onChange={index => {
        if (index === -1) {
          initialCurrentIndex();
        }
      }}>
      <BottomSheetView onLayout={handleContentLayout}>
        {loading ? (
          <Spinner />
        ) : (
          <View style={[bottomDefault, root]}>
            <HeaderModal title="Смена профиля" close={props.close} />

            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              style={[root, {marginVertical: 16}]}
              renderItem={({item, index}) => (
                <Item
                  item={item}
                  index={index}
                  onPress={() => {
                    setCurrent(item);
                    setCurrentIndex(index);
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={separator} />}
            />

            <View style={paddingHorizontalDefault}>
              <MainButton
                title="Сменить профиль"
                onPress={submitChange}
                disabled={currentIndex === initialIndex}
                color={
                  currentIndex !== initialIndex
                    ? Color.primary_500
                    : Color.primary_050
                }
              />
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};
