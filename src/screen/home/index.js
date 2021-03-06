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

const Home = ({
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

  const selectCategory = () => () => {
    navigation.push('CourseList');
  };

  const selectCourse = () => () => {
    navigation.push('CourseInfo');
  };

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
        <View>
          <Avatar source={{uri: getImg(auth?.avatar)}} size={50}></Avatar>
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <MyText type="h3" style={{fontWeight: 'bold', color: COLORS.black}}>
            Hello, Ngô Hiếu
          </MyText>
          <MyText type="body5" style={{color: COLORS.gray30}}>
            Thursday, 9th step 2022
          </MyText>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push('Login');
          }}>
          <View>
            <Image
              source={icons.notification}
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
              width: SIZES.width,
              height: SIZES.width,
              padding: 40,
              position: 'relative',
            }}>
            <Image
              source={images.featured_bg_image}
              style={{
                top: 20,
                left: 20,
                position: 'absolute',
                width: SIZES.width - 40,
                height: SIZES.width - 40,
                borderRadius: 20,
              }}></Image>
            <MyText type="h3" style={{color: COLORS.white}}>
              HOW TO
            </MyText>
            <MyText type="h3" style={{fontWeight: 'bold', color: COLORS.white}}>
              Make your brand more visible with our checklist
            </MyText>
            <MyText
              type="body5"
              style={{marginTop: 10, fontWeight: '100', color: COLORS.white}}>
              by Scott Harris
            </MyText>
            <Image
              source={images.start_learning}
              style={{width: SIZES.width - 100, marginTop: 40}}></Image>
            <MyButton
              style={{
                position: 'absolute',
                bottom: 40,
                left: 40,
                backgroundColor: COLORS.white,
                padding: 12,
                width: 160,
              }}
              styleText={{fontWeight: 'bold', color: 'black'}}>
              Start learning
            </MyButton>
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
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderBottomColor: COLORS.gray20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  {dummyData.courses_list_1?.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={selectCourse()}>
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                        onPress={() => {}}>
                        <Image
                          source={item.thumbnail}
                          style={{
                            width: SIZES.width - 150,
                            height: SIZES.width - 250,
                            borderRadius: 15,
                            // marginLeft: 5,
                            // marginRight: 5,
                          }}></Image>
                        <View
                          style={{
                            display: 'flex',
                            // alignItems: 'center',
                            flexDirection: 'row',
                            width: SIZES.width - 170,
                            marginTop: 10,
                          }}>
                          <Image source={icons.play_1} style={{}}></Image>
                          <View style={{marginLeft: 10}}>
                            <MyText
                              type="body4"
                              style={{
                                width: SIZES.width - 220,
                                fontWeight: 'bold',
                                color: COLORS.black,
                                lineHeight: 18,
                              }}>
                              {item.title}
                            </MyText>
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
                              <MyText
                                type="body5"
                                style={{color: COLORS.gray30}}>
                                {item.duration}
                              </MyText>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
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
              Category
            </MyText>
            <MyButton
              styleText={{color: COLORS.white}}
              style={{width: 80, padding: 3, height: 30}}
              onClick={goto('Categories')}>
              See All
            </MyButton>
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
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderBottomColor: COLORS.gray20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  {dummyData.categories?.map((item, index) => (
                    <TouchableWithoutFeedback onPress={selectCategory()}>
                      <View
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                        onPress={() => {}}>
                        <Image
                          source={item.thumbnail}
                          style={{
                            width: (SIZES.width / 10) * 5,
                            height: (SIZES.width / 10) * 4,
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
                    </TouchableWithoutFeedback>
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
              Popular Courses
            </MyText>
            <MyButton
              styleText={{color: COLORS.white}}
              style={{width: 80, padding: 3, height: 30}}>
              See All
            </MyButton>
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
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderBottomColor: COLORS.gray20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  {dummyData.courses_list_2?.map((item, index) => (
                    <TouchableWithoutFeedback onPress={selectCourse()}>
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
                              <MyText
                                type="body5"
                                style={{color: COLORS.gray30}}>
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
                              style={{
                                fontWeight: 'bold',
                                color: COLORS.primary,
                              }}>
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
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <BottomNavigate current="Home"></BottomNavigate>
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
)(withNavigation(Home));
