import React, {FunctionComponent} from 'react';
import {SvgXml} from 'react-native-svg';
import {Color} from '../styles';

interface Props {
  iconName: string;
  size?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export const Icon: FunctionComponent<Props> = props => {
  console.log(props.size, props.fill);
  return (
    <SvgXml
      xml={props.iconName}
      width={props.width || props.size || 24}
      height={props.height || props.size || 24}
      fill={props.fill}
      stroke={props.stroke}
    />
  );
};

//export default connect()(ExitButton);
