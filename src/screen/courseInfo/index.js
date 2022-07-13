import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../../constants';
import MyText from '../../components/MyText';

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

const CourseInfo = ({
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
      <View style={{height: 280, overflow: 'hidden'}}>
        <Image
          source={images.thumbnail_1}
          style={{
            top: 0,
            left: 0,
            width: SIZES.width,
            height: 240,
          }}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            top: 10,
            left: 15,
            zIndex: 2,
            position: 'absolute',
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
)(withNavigation(CourseInfo));
