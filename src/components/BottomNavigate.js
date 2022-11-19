import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';
import MyText from './MyText';
import {withNavigation} from '@react-navigation/compat';
import {_navigator} from '..';
import {Routes} from '../utils/strings';

const routes = [
  {
    id: 1,
    name: Routes.Home,
    icon: icons.home,
  },
  {
    id: 2,
    name: Routes.Search,
    icon: icons.search,
  },
  {
    id: 3,
    name: Routes.Profile,
    icon: icons.profile,
  },
];

const w = SIZES.width - 40;

const BottomNavigate = ({state, navigation}) => {
  console.log(navigation, navigation.getState());

  return (
    <View
      style={{
        // paddingTop: 10,
        paddingLeft: 20,
        width: SIZES.width,
        height: 100,
      }}>
      <View
        style={{
          borderRadius: 10,
          width: w,
          height: 80,
          backgroundColor: COLORS.primary3,
          flexDirection: 'row',
        }}>
        {routes.map((item, key) => (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => {
              navigation.navigate(item.name);
            }}>
            <View
              key={key}
              style={{
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: w / 3,
                backgroundColor:
                  item.id - 1 === state.index
                    ? COLORS.primary
                    : COLORS.primary3,
              }}>
              <Image
                source={item.icon}
                style={{width: 24, height: 24, resizeMode: 'stretch'}}
                tintColor={COLORS.white}></Image>
              <MyText type="body5" style={{color: COLORS.white}}>
                {item.name}
              </MyText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

BottomNavigate.propTypes = {};

export default BottomNavigate;
