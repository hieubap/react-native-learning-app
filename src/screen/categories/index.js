import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableWithoutFeedback, View, NativeModules} from 'react-native';
import {COLORS, constants, dummyData, icons, SIZES} from '../../../constants';
import MyText from '../../components/MyText';
import {withNavigation} from '@react-navigation/compat';
import MyButton from '../../components/MyButton';

const baseWidth = SIZES.width - 40;
const {CalendarModule} = NativeModules;

const Categories = ({navigation}) => {
  const [state, _setState] = useState({selectId: -1});

  const onSelect = selectId => () => {
    _setState({selectId});
  };

  const goBack = () => {
    navigation.pop();
  };

  CalendarModule.show("call to native module");

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        height: SIZES.height,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 70,
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={goBack}>
          <View
            style={{
              backgroundColor: COLORS.gray10,
              width: 40,
              height: 40,
              borderRadius: 20,
            }}>
            <Image
              source={icons.back}
              style={{
                marginTop: 12,
                marginLeft: 5,
                width: 30,
                height: 16,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <MyText
        type="h1"
        style={{fontWeight: 'bold', marginBottom: 40, color: COLORS.black}}>
        Choose Categories
      </MyText>

      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {constants.categories.map((item, key) => (
          <View
            key={key}
            style={{
              width: baseWidth / 3,
              //   height: 150,
              paddingLeft: 8,
              marginBottom: 10,
            }}>
            <TouchableWithoutFeedback onPress={onSelect(key)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: baseWidth / 3 - 16,
                  height: 130,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 10,
                  backgroundColor:
                    key === state.selectId
                      ? COLORS.primary3
                      : COLORS.additionalColor13,
                }}>
                <Image
                  source={item.icon}
                  style={{resizeMode: 'stretch', width: 40, height: 50}}
                  tintColor={
                    key === state.selectId ? COLORS.white : COLORS.gray50
                  }></Image>
                <MyText
                  style={{
                    fontWeight: 'bold',
                    color: key === state.selectId ? COLORS.white : COLORS.black,
                    textAlign: 'center',
                    width: 90,
                  }}>
                  {item.label}
                </MyText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>

      <MyButton
        style={{position: 'absolute', bottom: 10, width: baseWidth, left: 20}}
        styleText={{color: COLORS.white}}>
        CONTINUE
      </MyButton>
    </View>
  );
};

Categories.propTypes = {};

export default withNavigation(Categories);
