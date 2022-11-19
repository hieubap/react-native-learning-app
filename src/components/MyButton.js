import React from 'react';
import {
  Button,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, SIZES} from '../constants';

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
    <TouchableOpacity onPress={onClick && onClick}>
      <View
        style={{
          padding: SIZES.padding16,
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

        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            ...styleText,
          }}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

MyButton.propTypes = {};

export default MyButton;
