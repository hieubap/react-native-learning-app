import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import Avatar from '../../components/Avatar';
import BottomNavigate from '../../components/BottomNavigate';
import InputTimeout from '../../components/InputTimeout';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {getImg, minuteToHour} from '../../utils/common';
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
  const {listCourseSearch} = useSelector(state => state.course);
  const {searchCourse} = useDispatch().course;
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

  const onChangeText = text => {
    searchCourse({name: text?.toLowerCase()});
  };

  const selectCourse = item => () => {
    navigation.push('CourseInfo', {item});
  };

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
              onChangeText={onChangeText}
              placeholder="Search for Topics, Courses & Educators"></InputTimeout>
          </View>

          {/* <View
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
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              alignItems: 'center',
            }}>
            <MyText type="h2" style={{color: COLORS.black, fontWeight: 'bold'}}>
              Result
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
              <View
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderBottomColor: COLORS.gray20,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                {listCourseSearch?.map((item, index) => (
                  <TouchableOpacity onPress={selectCourse(item)}>
                    <View
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingBottom: 20,
                        paddingTop: 20,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderBottomColor: COLORS.gray10,
                        borderBottomWidth: 1,
                      }}
                      onPress={() => {}}>
                      <Image
                        source={item.imageUrl || images.thumbnail_1}
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
              {/* <ScrollView showsVerticalScrollIndicator={false}>
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
              </ScrollView> */}
            </View>
          </View>
        </ScrollView>
        {/* <BottomNavigate current="Search"></BottomNavigate> */}
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
