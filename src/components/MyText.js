import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {FONTS} from '../../constants/index';
const MyText = ({type = 'body4', style = {}, children}) => {
  return <Text style={{...FONTS[type], ...style}}>{children}</Text>;
};

MyText.propTypes = {};

export default MyText;
