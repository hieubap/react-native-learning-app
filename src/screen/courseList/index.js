import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../../constants';
import Avatar from '../../components/Avatar';
import BottomNavigate from '../../components/BottomNavigate';
import InputTimeout from '../../components/InputTimeout';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {getImg} from '../../utils/common';
import {imgDefault} from '../../variable';

const height = Dimensions.get('window').height;

const testData = () => {
  const output = ['Tạo cuộc gọi thoại'];
  for (let i = 0; i < 50; i++) {
    output.push(`Linh Vũ Hương (${i})`);
  }
  return output;
};
const userActive = testData();

const baseWidth = SIZES.width - 40;

const CourseList = ({
  connect,
  auth,
  navigation,
  listRoom,
  updateData,
  getListMessage,
}) => {
  const [state, _setState] = useState({onTop: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  const gotoChat = () => {
    navigation.push('Chat');
  };
  const goto = name => () => {
    navigation.push(name);
  };
  useEffect(() => {
    connect();
  }, []);

  const onScroll = event => {
    const onTop = event.nativeEvent.contentOffset.y === 0;
    if (onTop !== state.onTop) {
      setState({onTop});
    }
  };

  const selectRoom = room => () => {
    console.log('click select room');
    updateData({currentRoomId: room?.id, currentRoom: room});
    getListMessage(room?.id);
    gotoChat();
  };

  console.log(listRoom, 'list room');

  const listProfile = [
    {icon: icons.profile, title: 'Name', content: 'Ngô Hiếu'},
    {
      icon: icons.email,
      title: 'Email',
      content: 'ngohieu1811"gmail.com',
    },
    {
      icon: icons.password,
      title: 'Password',
      content: 'Updated 2 weeks ago',
    },
    {icon: icons.call, title: 'Name', content: '0961745160'},
  ];

  const listSetting = [
    {icon: icons.star, title: '', content: 'Pages'},
    {
      icon: icons.new_icon,
      title: '',
      content: 'New Course Notification',
    },
    {
      icon: icons.reminder,
      title: '',
      content: 'Updated 2 weeks ago',
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <View style={{height: 280, overflow: 'hidden'}}>
        <Image
          source={images.bg_1}
          style={{
            top: 0,
            left: 0,
            width: SIZES.width,
            height: 280,
            position: 'absolute',
            borderBottomLeftRadius: 40,
          }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            zIndex: 2,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.pop();
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
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
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <MyText
            type="h2"
            style={{
              height: 80,
              width: 250,
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.white,
              //   alignSelf: 'center',
            }}>
            Mobile Design
          </MyText>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              source={images.mobile_image}
              style={{
                width: 110,
                height: 150,
                resizeMode: 'stretch',
                // position: 'absolute',
                right: 40,
                top: 30,
                flex: 1,
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 70,
          padding: 10,
          //   marginTop: 210,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingLeft: 10}}>
          <MyText type="body3" style={{color: COLORS.black}}>
            5,678 Result
          </MyText>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push('Login');
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 32,
              backgroundColor: COLORS.primary,
              borderRadius: 5,
            }}>
            <Image
              source={icons.filter}
              style={{
                width: 18,
                height: 18,
                resizeMode: 'stretch',
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View>
        <ScrollView
          onScroll={onScroll}
          style={{height: height - 330, marginTop: -5}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              overflow: 'hidden',
              // height: 105,
              paddingBottom: 5,
            }}>
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                borderBottomColor: COLORS.gray20,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              {dummyData.courses_list_2?.map((item, index) => (
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
                    source={item.thumbnail}
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
                      {item.title}
                    </MyText>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}>
                      <MyText type="body5">By {item.instructor}</MyText>
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
                          {item.duration}
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
                        style={{fontWeight: 'bold', color: COLORS.primary}}>
                        ${item.price?.toFixed(2)}
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
                          style={{color: COLORS.black, fontWeight: 'bold'}}>
                          {item.ratings}
                        </MyText>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default connect(
  ({socket: {listRoom}, auth: {auth}}) => ({listRoom, auth}),
  ({socket: {connect, getListMessage, updateData}}) => ({
    connect,
    getListMessage,
    updateData,
  }),
)(withNavigation(CourseList));
