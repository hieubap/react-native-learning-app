import AsyncStorage from '@react-native-async-storage/async-storage';
import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {_navigator} from '../..';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {Styles} from '../../navigation/styles';
import ListCourse from '../home/ListCourse';

const height = Dimensions.get('window').height;

const baseWidth = SIZES.width - 40;

const Instructor = ({connect, auth, navigation, route}) => {
  const {authorId} = route.params || {};
  const {
    auth: {onLogout, detailAuthor},
  } = useDispatch();
  const authorDetail = useSelector(state => state.auth.authorDetail) || {};
  console.log(authorDetail, 'authorDetail');
  const [state, _setState] = useState({onTop: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  useEffect(() => {
    connect();
    detailAuthor({id: authorId});
  }, []);

  const onScroll = event => {
    const onTop = event.nativeEvent.contentOffset.y === 0;
    if (onTop !== state.onTop) {
      setState({onTop});
    }
  };

  const listProfile = [
    {icon: icons.profile, title: 'Name', content: auth?.full_name},
    {
      icon: icons.email,
      title: 'Email',
      content: auth?.email,
    },
    {
      icon: icons.password,
      title: 'Password',
      content: 'Updated 2 weeks ago',
    },
    {icon: icons.call, title: 'Phone', content: auth?.phone},
  ];

  const listSetting = [
    {icon: icons.star, title: '', content: 'Pages'},
    // {
    //   icon: icons.new_icon,
    //   title: '',
    //   content: 'New Course Notification',
    // },
    {
      icon: icons.password,
      title: '',
      content: 'Logout',
      onClick: onLogout,
    },
  ];

  const renderSetting = (item, index) => {
    const styleView = {
      flexDirection: 'row',
      padding: 25,
      paddingRight: 0,
      alignItems: 'center',
      borderBottomWidth: index !== listSetting.length - 1 ? 1 : 0,
      borderBottomColor: COLORS.gray20,
    };
    return (
      <TouchableOpacity key={index} onPress={item.onClick}>
        <View key={index} style={styleView} onPress={() => {}}>
          <Image
            source={item.icon}
            style={styles.iconStyle}
            tintColor={COLORS.primary}></Image>
          <View style={Styles.flex1}>
            <MyText style={styles.contentText}>{item.content}</MyText>
          </View>
          <Image
            source={icons.right_arrow}
            style={styles.nextIconStyle}
            tintColor={COLORS.black}></Image>
        </View>
      </TouchableOpacity>
    );
  };

  const renderInfo = (item, index) => {
    const styleWrap = {
      flexDirection: 'row',
      padding: 20,
      paddingRight: 0,
      alignItems: 'center',
      borderBottomWidth: index !== listProfile.length - 1 ? 1 : 0,
      borderBottomColor: COLORS.gray20,
    };
    return (
      <View key={index} style={styleWrap}>
        <Image
          source={item.icon}
          style={styles.iconStyle}
          tintColor={COLORS.primary}></Image>
        <View style={Styles.flex1}>
          <MyText style={styles.titleText}>{item.title}</MyText>
          <MyText style={styles.contentText}>{item.content}</MyText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameScreenText}>
        <TouchableOpacity
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
        </TouchableOpacity>

        {/* <MyText type="h2" style={styles.profileText}>
          Profile
        </MyText> */}
      </View>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
          backgroundColor: COLORS.white,
          flex: 1,
        }}>
        <View style={styles.cardTopStyle}>
          <Image source={images.profile} style={styles.avatarStyle}></Image>
          {/* <View style={styles.wrapLeftStyle}>
            <View style={styles.changeAvatarStyle}>
              <Image source={icons.camera} style={styles.image16}></Image>
            </View>
          </View> */}
          <View style={styles.wrapRightStyle}>
            <MyText type="h2" style={styles.fullnameText}>
              {authorDetail?.fullName}
            </MyText>
            <MyText style={styles.descriptText}>
              {authorDetail?.description}
            </MyText>
            <MyButton style={styles.becomeBtn} styleText={styles.becomeText}>
              + Follow
            </MyButton>
          </View>
        </View>
        <ScrollView
          onScroll={onScroll}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <MyText type="h2" style={{color: COLORS.black, fontWeight: 'bold'}}>
            About me
          </MyText>
          <Text>{authorDetail.aboutMe}</Text>

          <MyText
            type="h2"
            style={{marginTop: 15, color: COLORS.black, fontWeight: 'bold'}}>
            Connect here
          </MyText>
          <TouchableOpacity
            onPress={() => {
              if (authorDetail.twitter) {
                Linking.openURL(authorDetail.twitter);
              }
            }}>
            <View
              style={{
                borderRadius: 8,
                height: 70,
                paddingLeft: 10,
                paddingVertical: 15,
                marginTop: 25,
                backgroundColor: COLORS.blue1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/124/124021.png',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>Twitter</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (authorDetail.linkedIn) {
                Linking.openURL(authorDetail.linkedIn);
              }
            }}>
            <View
              style={{
                borderRadius: 8,
                height: 70,
                paddingLeft: 10,
                paddingVertical: 15,
                marginTop: 15,
                backgroundColor: COLORS.blue1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>Linkedin</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (authorDetail.facebook) {
                Linking.openURL(authorDetail.facebook);
              }
            }}>
            <View
              style={{
                borderRadius: 8,
                height: 70,
                paddingLeft: 10,
                paddingVertical: 15,
                marginTop: 15,
                backgroundColor: COLORS.blue1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (authorDetail.github) {
                Linking.openURL(authorDetail.github);
              }
            }}>
            <View
              style={{
                borderRadius: 8,
                height: 70,
                paddingLeft: 10,
                paddingVertical: 15,
                marginTop: 15,
                backgroundColor: COLORS.blue1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              <Text style={{fontSize: 16, color: COLORS.black}}>Github</Text>
            </View>
          </TouchableOpacity>

          <MyText
            type="h2"
            style={{color: COLORS.black, fontWeight: 'bold', marginTop: 20}}>
            Other course
          </MyText>

          <ListCourse navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollView: {flex: 1, paddingHorizontal: 25},
  profileText: {fontWeight: 'bold', color: COLORS.black},
  titleText: {
    color: COLORS.gray30,
  },
  fullnameText: {textAlign: 'center', fontWeight: 'bold', color: COLORS.black},
  wrapLeftStyle: {
    alignItems: 'center',
    textAlign: 'center',
    width: baseWidth / 4,
  },
  wrapRightStyle: {paddingTop: 15, padding: 5, flex: 1, alignItems: 'center'},
  nameScreenText: {
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    padding: 10,
    paddingLeft: 24,
    // alignItems: 'center',
    backgroundColor: COLORS.green3,
  },
  descriptText: {},
  cardTopStyle: {
    width: baseWidth,
    height: 180,
    marginLeft: 20,
    // marginTop: 20,
    // width: baseWidth,
    borderRadius: 15,
    borderColor: COLORS.gray10,
    // flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: COLORS.primary3,
  },
  becomeText: {color: COLORS.primary},
  avatarStyle: {
    width: baseWidth / 4 - 20,
    height: baseWidth / 4 - 20,
    marginTop: -40,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'stretch',
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: baseWidth / 8 - 5,
  },
  changeAvatarStyle: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  wrapSetting: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: COLORS.gray20,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    borderColor: COLORS.gray20,
  },
  iconStyle: {
    width: 28,
    height: 28,
    resizeMode: 'stretch',
    marginRight: 15,
  },
  image16: {
    width: 16,
    height: 14,
    resizeMode: 'stretch',
  },
  becomeBtn: {
    marginTop: 10,
    width: 150,
    padding: 8,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  contentText: {
    marginTop: -5,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  nextIconStyle: {
    width: 14,
    height: 16,
    resizeMode: 'stretch',
    marginRight: 0,
  },
});

export default connect(
  ({socket: {listRoom}, auth: {auth}}) => ({listRoom, auth}),
  ({socket: {connect, getListMessage, updateData}}) => ({
    connect,
    getListMessage,
    updateData,
  }),
)(withNavigation(Instructor));
