import React, {FunctionComponent, useState} from 'react';
import {
  ViewStyle,
  StyleProp,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {InputProps} from 'react-native-elements';

// styles
import {styles, Color} from '../styles';

// icon
import {Icon} from '../utils/Icon';
import {NoPreview, Preview} from '../assets/IconSvg';

// helpers
import {touchOpacity} from '../helpers';

interface Props extends InputProps {
  value: any;
  style?: StyleProp<ViewStyle>;
  textInput?: StyleProp<InputProps>;
  onChangeText: (arg: any) => void;
  onFocus: () => void;
  reset?: boolean;
  placeholder: string;
  autoFocus?: boolean;
  autoCorrect?: boolean;
  autoComplete?: string;
  textContentType?: string;
  errorMessage?: string;
}

export const InputForm: FunctionComponent<Props> = props => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const {
    inputContainer,
    between_container,
    errorContainer,
    errorText,
    // fonts
    text_Input,
    text_Caption1,
  } = styles;

  return (
    <>
      <View
        style={[
          inputContainer,
          between_container,
          props.errorMessage ? errorContainer : undefined,
          props.style,
        ]}>
        <TextInput
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          autoFocus={props.autoFocus}
          // autoCorrect={props.autoCorrect}
          //autoComplete={props.autoComplete}
          textContentType={props.textContentType}
          secureTextEntry={props.textContentType === 'password'}
          style={[text_Input, {flex: 1}]}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={Color.secondary_500}
          secureTextEntry={
            props.textContentType === 'password' && secureTextEntry
          }
        />

        {props.textContentType === 'password' && (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Icon
              iconName={secureTextEntry ? NoPreview : Preview}
              size={20}
              fill={Color.secondary_600}
            />
          </TouchableOpacity>
        )}
      </View>

      {props.errorMessage && (
        <Text style={[text_Caption1, errorText]}>{props.errorMessage}</Text>
      )}
    </>
  );
};
