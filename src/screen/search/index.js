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

const Search = ({
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

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <View>
        <ScrollView
          onScroll={onScroll}
          style={{height: height - 100, marginTop: -5}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 55,
              marginLeft: 20,
              marginTop: 20,
              alignItems: 'center',
              width: baseWidth,
              // elevation: 1,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: COLORS.gray10,
              flexDirection: 'row',
              // ...(state.onTop
              //   ? {
              //       borderColor: COLORS.white,
              //     }
              //   : {
              //       shadowColor: '#000',
              //       shadowOffset: {width: 1, height: 1},
              //       shadowOpacity: 0.4,
              //       shadowRadius: 3,
              //       elevation: 3,
              //     }),
            }}>
            <Image
              source={icons.search}
              style={{
                width: 28,
                height: 28,
                marginLeft: 10,
                resizeMode: 'stretch',
              }}
              tintColor={COLORS.gray20}></Image>
            <InputTimeout
              style={{
                marginLeft: 10,
                // width: baseWidth,
                backgroundColor: COLORS.white,
                height: 50,
                fontSize: 14,
                borderRadius: 8,
                // paddingLeft: 20,
                // marginBottom: 20,
                // borderWidth: 1,
                // shadowOffset: {width: 1, height: 1},
                // elevation: 6,
              }}
              placeholder="Search for Topics, Courses & Educators"></InputTimeout>
          </View>

          <View
            style={{
              padding: 20,
            }}>
            <MyText type="h2" style={{color: COLORS.black, fontWeight: 'bold'}}>
              Top Search
            </MyText>
          </View>

          <View
            style={{
              overflow: 'hidden',
              // height: 105,
              paddingBottom: 5,
            }}>
            <View
              style={{
                // height: 100,
                backgroundColor: '#fff',
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 15,
                    borderBottomColor: COLORS.gray20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  {dummyData.top_searches?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // paddingLeft: 5,
                        // paddingRight: 5,
                        width: baseWidth / 3,
                        height: 60,
                        backgroundColor: COLORS.gray10,
                        borderRadius: 15,
                        marginLeft: 10,
                      }}
                      onPress={() => {}}>
                      <MyText
                        type="body3"
                        style={{
                          fontWeight: 'bold',
                          color: COLORS.gray60,
                          lineHeight: 18,
                        }}>
                        {item.label}
                      </MyText>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              alignItems: 'center',
            }}>
            <MyText type="h2" style={{color: COLORS.black, fontWeight: 'bold'}}>
              Browse Categories
            </MyText>
          </View>

          <View
            style={{
              overflow: 'hidden',
              // height: 105,
              paddingBottom: 5,
            }}>
            <View
              style={{
                // height: 100,
                backgroundColor: '#fff',
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderBottomColor: COLORS.gray20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    flexWrap: 'wrap',
                  }}>
                  {dummyData.categories?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: baseWidth / 2,
                        marginBottom: 10,
                      }}
                      onPress={() => {}}>
                      <Image
                        source={item.thumbnail}
                        style={{
                          width: baseWidth / 2 - 10,
                          height: (baseWidth / 5) * 2 - 10,
                          borderRadius: 15,
                          // marginLeft: 5,
                          // marginRight: 5,
                        }}></Image>
                      <MyText
                        type="body3"
                        style={{
                          position: 'absolute',
                          bottom: 15,
                          left: 20,
                          fontWeight: 'bold',
                          color: COLORS.white,
                          lineHeight: 18,
                        }}>
                        {item.title}
                      </MyText>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <BottomNavigate current="Search"></BottomNavigate>
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
)(withNavigation(Search));
