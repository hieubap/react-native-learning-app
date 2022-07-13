import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import MyText from '../../components/MyText';
import {COLORS, constants, images, SIZES} from '../../../constants';
import MyButton from '../../components/MyButton';
import {withNavigation} from '@react-navigation/compat';

const Explore = ({navigation}) => {
  const [state, _setState] = useState({current: 0});

  const onClickNext = () => {
    if (state.current === 4) {
      navigation.push('Home');
    } else {
      _setState({current: state.current + 1});
    }
  };

  return (
    <View
      style={{
        // backgroundColor: '#dfe0e4',
        display: 'flex',
        padding: 30,
        paddingTop: 80,
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        position: 'relative',
      }}>
      <Image
        source={images.bg}
        style={{
          top: 0,
          left: 0,
          width: SIZES.width,
          height: SIZES.height / 3,
          position: 'absolute',
        }}
      />
      <MyText type="largeTitle" style={{fontWeight: 'bold'}}>
        Explore Online Courses
      </MyText>
      <MyText type="body3" style={{marginTop: 10}}>
        {constants.walkthrough[0].sub_title}
      </MyText>
      <Image
        source={images.work}
        style={{
          width: SIZES.width,
          height: SIZES.width,
          marginTop: 20,
        }}></Image>
      <View
        style={{
          //   borderWidth: 1,
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            style={{
              width: index === state.current ? 20 : 10,
              height: 10,
              backgroundColor:
                index === state.current ? COLORS.gray80 : COLORS.gray20,
              marginLeft: 15,
              borderRadius: 5,
            }}></View>
        ))}
        <MyButton
          style={{
            right: -130,
            position: 'absolute',
            width: 200,
            color: 'white',
            justifyContent: 'flex-start',
          }}
          styleText={{color: 'white'}}
          onClick={onClickNext}>
          Next
        </MyButton>
      </View>
    </View>
  );
};

Explore.propTypes = {};

export default withNavigation(Explore);
