import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {FONTS} from '../constants/index';
const MyText = ({type = 'body4', style = {}, children, ...rest}) => {
  return (
    <Text style={{...FONTS[type], ...style}} {...rest}>
      {children}
    </Text>
  );
};

MyText.propTypes = {};

export default MyText;
