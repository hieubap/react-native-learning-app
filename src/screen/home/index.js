import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import Avatar from '../../components/Avatar';
import BottomNavigate from '../../components/BottomNavigate';
import ListCourse from '../../components/ListCourse';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {getImg, minuteToHour} from '../../utils/common';
import {imgDefault} from '../../variable';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import {refModal} from '../..';

const height = Dimensions.get('window').height;

const baseWidth = SIZES.width - 40;

const Home = ({
  connect,
  auth,
  navigation,
  listRoom,
  updateData,
  getListMessage,
  updateAvatar,
}) => {
  const [state, _setState] = useState({onTop: true});
  const listCourseHome = useSelector(state => state.course.listCourseHome);
  const listCategory = useSelector(state => state.category.listCategory);
  const {getListHome} = useDispatch().course;
  const {getListCategory} = useDispatch().category;

  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  const goto = name => () => {
    navigation.push(name);
  };
  useEffect(() => {
    getListHome();
    getListCategory();
  }, []);

  const onScroll = event => {
    const onTop = event.nativeEvent.contentOffset.y === 0;
    if (onTop !== state.onTop) {
      setState({onTop});
    }
  };

  const selectCategory = (item, index) => () => {
    navigation.push('CourseList', {paramRoute: item, index});
  };

  const selectCourse = item => () => {
    if (item.id) {
      navigation.push('CourseInfo', {item});
    }
  };

  const onRefresh = () => {
    getListHome();
    getListCategory();
  };

  const onChangeAvatar = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(res => {
      updateAvatar(res).catch(() => {
        refModal.current &&
          refModal.current.show({
            type: 'error',
            content: 'Có lỗi xảy ra',
          });
      });
    });
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
        }}>
        <TouchableOpacity onPress={onChangeAvatar}>
          <Avatar
            source={auth?.avatar ? {uri: auth?.avatar} : images.profile}
            size={50}></Avatar>
        </TouchableOpacity>
        <View style={{flex: 1, paddingLeft: 10}}>
          <MyText type="h3" style={{fontWeight: 'bold', color: COLORS.black}}>
            Hello, {auth?.full_name}
          </MyText>
          <MyText type="body5" style={{color: COLORS.gray30}}>
            {moment().format('dddd, DD MMM yyyy')}
          </MyText>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            // navigation.push('Login');
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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}></RefreshControl>
          }>
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
            {/* <MyButton
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
            </MyButton> */}
          </View>

          {/* <View
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
              <ListCourse
                data={dummyData.courses_list_1}
                selectCourse={selectCourse}
              />
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
                  {listCategory?.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={selectCategory(item, index)}>
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
                          source={
                            item?.imageUrl
                              ? {uri: item?.imageUrl}
                              : dummyData.categories[index % 6].thumbnail
                          }
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
                            left: 12,
                            fontWeight: 'bold',
                            color: COLORS.white,
                            lineHeight: 18,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            padding: 3,
                            paddingHorizontal: 6,
                            borderRadius: 6,
                          }}>
                          {item.name}
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
            {/* <MyButton
              styleText={{color: COLORS.white}}
              style={{width: 80, padding: 3, height: 30}}>
              See All
            </MyButton> */}
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
                                  uri: item.imageUrl,
                                }
                              : require('../../assets/images/thumbnail_1.png')
                          }
                          style={{
                            width: (baseWidth * 2) / 5,
                            height: (baseWidth * 2) / 5,
                            borderRadius: 15,
                            resizeMode: 'cover',
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
                              <MyText
                                type="body5"
                                style={{color: COLORS.gray30}}>
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
                              {/* <Image
                                source={icons.star}
                                style={{
                                  marginRight: 4,
                                  width: 14,
                                  height: 14,
                                }}></Image> */}
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
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        {/* <BottomNavigate current="Home"></BottomNavigate> */}
      </View>
    </View>
  );
};

export default connect(
  ({socket: {listRoom}, auth: {auth}}) => ({listRoom, auth}),
  ({socket: {connect, getListMessage, updateData}, auth: {updateAvatar}}) => ({
    connect,
    getListMessage,
    updateData,
    updateAvatar,
  }),
)(withNavigation(Home));
