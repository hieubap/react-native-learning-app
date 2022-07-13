import React from 'react';
import {
  Button,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const MyButton = ({
  children,
  source,
  style = {},
  styleIcon = {width: 24, height: 24},
  styleText = {},
  color = 'primary',
  onClick,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick && onClick}>
      <View
        style={{
          padding: SIZES.padding,
          borderRadius: 35,
          backgroundColor: COLORS[color],
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          ...style,
        }}>
        {source && (
          <Image source={source} style={{marginRight: 10, ...styleIcon}} />
        )}

        <Text style={{textAlign: 'center', ...styleText}}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

MyButton.propTypes = {};

export default MyButton;
