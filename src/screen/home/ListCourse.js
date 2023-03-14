import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import Avatar from '../../components/Avatar';
import BottomNavigate from '../../components/BottomNavigate';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {getImg, minuteToHour} from '../../utils/common';
import clientUtils from '../../utils/client-utils';

const baseWidth = SIZES.width - 40;

const ListCourse = ({navigation}) => {
  const [state, _setState] = useState({onTop: true});
  const listCourseHome = useSelector(state => state.course.listCourseHome);
  const {getListHome} = useDispatch().course;

  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };

  const goto = name => () => {
    navigation.push(name);
  };

  const selectCourse = item => () => {
    if (item.id) {
      navigation.push('CourseInfo', {item});
    }
  };

  useEffect(() => {
    getListHome();
  }, []);
  return (
    <View
      style={{
        // paddingLeft: 15,
        // paddingRight: 15,
        borderBottomColor: COLORS.gray20,
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}>
      {listCourseHome?.map((item, index) => (
        <TouchableOpacity key={index} onPress={selectCourse(item)}>
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              // alignItems: 'center',
              paddingBottom: 20,
              paddingTop: 20,
              paddingLeft: 5,
              paddingRight: 5,
              borderBottomColor: COLORS.gray10,
              borderBottomWidth: 1,
            }}
            onPress={() => {}}>
            <Image
              source={
                item.imageUrl
                  ? {
                      uri: clientUtils.fileURL + item.imageUrl,
                    }
                  : require('../../assets/images/thumbnail_1.png')
              }
              style={{
                width: (baseWidth * 2) / 5,
                height: (baseWidth * 2) / 5,
                borderRadius: 15,
                // marginLeft: 5,
                // marginRight: 5,
              }}></Image>
            <View
              style={{
                width: (baseWidth * 3) / 5,
                padding: 10,
                // marginLeft: 5,
                // marginRight: 5,
              }}>
              <MyText
                type="body3"
                style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                  lineHeight: 18,
                }}>
                {item.name}
              </MyText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <MyText type="body5">By {item.author}</MyText>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={icons.time}
                    style={{
                      marginRight: 8,
                      width: 18,
                      height: 18,
                    }}></Image>
                  <MyText type="body5" style={{color: COLORS.gray30}}>
                    {minuteToHour(item.duration || 0)}
                  </MyText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <MyText
                  type="h3"
                  style={{
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {item.price?.formatPrice()} đ
                </MyText>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={icons.star}
                    style={{
                      marginRight: 4,
                      width: 14,
                      height: 14,
                    }}></Image>
                  <MyText
                    type="body5"
                    style={{
                      color: COLORS.black,
                      fontWeight: 'bold',
                    }}>
                    {item.ratings}
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListCourse;

const styles = StyleSheet.create({});
