import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
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
import {touchOpacity} from '../../helpers';

// icon
import {Icon} from '../../utils/Icon';
import {Account, Newspaper} from '../../assets/IconSvg';

// other deps
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

interface Props {
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ChangeProfileModal: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [current, setCurrent] = useState<{}>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const snapPoints = useMemo(() => ['70%'], []);

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
    bottomDefault,
    separator,
    accountIcon,
    text_Subtitle1,
    text_Body2,
  } = styles;

  useEffect(() => {
    setLoading(true);

    ApiService.INSTANCE.getProviders()
      .then(resp => getProviders(resp))
      .finally(() => setLoading(false));
  }, [currentAccount.data?.id]);

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
          {
            padding: 16,
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
            <Text style={text_Body2}>{item.status}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{height: 0}}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      onChange={index => {
        if (index === 0) {
          setCurrentIndex(-1);
        }
      }}>
      {loading ? (
        <Spinner />
      ) : (
        <View style={[bottomDefault, root]}>
          <HeaderModal title="Смена профиля" close={props.close} />

          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            style={[root, {marginTop: 16}]}
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

          <View style={paddingDefault}>
            <MainButton
              title="Сменить профиль"
              onPress={() => submitChange()}
              color={
                currentIndex !== -1 ? Color.primary_500 : Color.primary_050
              }
            />
          </View>
        </View>
      )}
    </BottomSheetModal>
  );
};
