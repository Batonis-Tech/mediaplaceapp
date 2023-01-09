import React, {FunctionComponent} from 'react';
import {SvgXml} from 'react-native-svg';

interface Props {
  iconName: string;
  size: number;
  fill?: string;
  stroke?: string;
}

export const Icon: FunctionComponent<Props> = props => {
  return (
    <SvgXml
      xml={props.iconName}
      width={props.size}
      height={props.size}
      fill={props.fill}
      stroke={props.stroke}
    />
  );
};

//export default connect()(ExitButton);
