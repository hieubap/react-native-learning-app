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

const Profile = ({
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 70,
          padding: 10,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingLeft: 10}}>
          <MyText type="h2" style={{fontWeight: 'bold', color: COLORS.black}}>
            Profile
          </MyText>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push('Login');
          }}>
          <View>
            <Image
              source={icons.sun}
              style={{
                width: 24,
                height: 27,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <ScrollView
          onScroll={onScroll}
          style={{height: height - 170, marginTop: -5}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: baseWidth,
              height: 200,
              marginLeft: 20,
              marginTop: 20,
              //   alignItems: 'center',
              width: baseWidth,
              borderRadius: 15,
              borderColor: COLORS.gray10,
              flexDirection: 'row',
              display: 'flex',
              backgroundColor: COLORS.primary3,
            }}>
            <View
              style={{
                alignItems: 'center',
                width: baseWidth / 4,
              }}>
              <Image
                source={images.profile}
                style={{
                  width: baseWidth / 4 - 20,
                  height: baseWidth / 4 - 20,
                  marginTop: 20,
                  resizeMode: 'stretch',
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  borderRadius: baseWidth / 8 - 5,
                }}></Image>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: COLORS.primary,
                  borderRadius: 15,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                <Image
                  source={icons.camera}
                  style={{
                    width: 16,
                    height: 14,
                    resizeMode: 'stretch',
                  }}></Image>
              </View>
            </View>
            <View style={{paddingTop: 15, padding: 5, flex: 1}}>
              <MyText
                type="h2"
                style={{fontWeight: 'bold', color: COLORS.white}}>
                ByProgrammers
              </MyText>
              <MyText style={{color: COLORS.white}}>Fullstack developer</MyText>
              <MyButton
                style={{
                  marginTop: 10,
                  width: 150,
                  padding: 8,
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                styleText={{color: COLORS.primary}}>
                + Become member
              </MyButton>
            </View>
          </View>

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              paddingRight: 20,
              borderBottomColor: COLORS.gray20,
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              borderColor: COLORS.gray20,
            }}>
            {listProfile?.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  padding: 20,
                  paddingRight: 0,
                  alignItems: 'center',
                  borderBottomWidth: index !== listProfile.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.gray20,
                }}
                onPress={() => {}}>
                <Image
                  source={item.icon}
                  style={{
                    width: 28,
                    height: 28,
                    resizeMode: 'stretch',
                    marginRight: 15,
                  }}
                  tintColor={COLORS.primary}></Image>
                <View style={{flex: 1}}>
                  <MyText
                    // type="body3"
                    style={{
                      //   fontWeight: 'bold',
                      color: COLORS.gray30,
                    }}>
                    {item.title}
                  </MyText>
                  <MyText
                    style={{
                      marginTop: -5,
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    {item.content}
                  </MyText>
                </View>
                <Image
                  source={icons.right_arrow}
                  style={{
                    width: 14,
                    height: 16,
                    resizeMode: 'stretch',
                    marginRight: 0,
                  }}
                  tintColor={COLORS.black}></Image>
              </View>
            ))}
          </View>

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              paddingRight: 20,
              borderBottomColor: COLORS.gray20,
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 10,
              borderColor: COLORS.gray20,
            }}>
            {listSetting?.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  padding: 25,
                  paddingRight: 0,
                  alignItems: 'center',
                  borderBottomWidth: index !== listSetting.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.gray20,
                }}
                onPress={() => {}}>
                <Image
                  source={item.icon}
                  style={{
                    width: 28,
                    height: 28,
                    resizeMode: 'stretch',
                    marginRight: 15,
                  }}
                  tintColor={COLORS.primary}></Image>
                <View style={{flex: 1}}>
                  {/* <MyText
                    // type="body3"
                    style={{
                      //   fontWeight: 'bold',
                      color: COLORS.gray30,
                    }}>
                    {item.title}
                  </MyText> */}
                  <MyText
                    style={{
                      marginTop: -5,
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    {item.content}
                  </MyText>
                </View>
                <Image
                  source={icons.right_arrow}
                  style={{
                    width: 14,
                    height: 16,
                    resizeMode: 'stretch',
                    marginRight: 0,
                  }}
                  tintColor={COLORS.black}></Image>
              </View>
            ))}
          </View>
        </ScrollView>
        <BottomNavigate current="Profile"></BottomNavigate>
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
)(withNavigation(Profile));
