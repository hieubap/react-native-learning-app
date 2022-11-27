import AsyncStorage from '@react-native-async-storage/async-storage';
import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {_navigator} from '../..';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {Styles} from '../../navigation/styles';

const height = Dimensions.get('window').height;

const baseWidth = SIZES.width - 40;

const Profile = ({connect, auth}) => {
  const {
    auth: {onLogout},
  } = useDispatch();
  const [state, _setState] = useState({onTop: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
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
    {icon: icons.call, title: 'Name', content: auth?.phone},
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
        <MyText type="h2" style={styles.profileText}>
          Profile
        </MyText>
      </View>
      <View>
        <ScrollView
          onScroll={onScroll}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardTopStyle}>
            <View style={styles.wrapLeftStyle}>
              <Image source={images.profile} style={styles.avatarStyle}></Image>
              <View style={styles.changeAvatarStyle}>
                <Image source={icons.camera} style={styles.image16}></Image>
              </View>
            </View>
            <View style={styles.wrapRightStyle}>
              <MyText type="h2" style={styles.fullnameText}>
                {auth?.full_name}
              </MyText>
              <MyText style={styles.descriptText}>{auth?.description}</MyText>
              <MyButton style={styles.becomeBtn} styleText={styles.becomeText}>
                + Become member
              </MyButton>
            </View>
          </View>

          <View style={styles.wrapSetting}>{listProfile?.map(renderInfo)}</View>

          <View style={styles.wrapSetting}>
            {listSetting?.map(renderSetting)}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {height: height - 170, marginTop: -5},
  profileText: {fontWeight: 'bold', color: COLORS.black},
  titleText: {
    color: COLORS.gray30,
  },
  fullnameText: {fontWeight: 'bold', color: COLORS.white},
  wrapLeftStyle: {
    alignItems: 'center',
    width: baseWidth / 4,
  },
  wrapRightStyle: {paddingTop: 15, padding: 5, flex: 1},
  nameScreenText: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    padding: 10,
    paddingLeft: 24,
    alignItems: 'center',
  },
  descriptText: {color: COLORS.white},
  cardTopStyle: {
    width: baseWidth,
    height: 200,
    marginLeft: 20,
    marginTop: 20,
    width: baseWidth,
    borderRadius: 15,
    borderColor: COLORS.gray10,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: COLORS.primary3,
  },
  becomeText: {color: COLORS.primary},
  avatarStyle: {
    width: baseWidth / 4 - 20,
    height: baseWidth / 4 - 20,
    marginTop: 20,
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
)(withNavigation(Profile));
