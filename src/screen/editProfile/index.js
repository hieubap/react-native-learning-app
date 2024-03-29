import AsyncStorage from '@react-native-async-storage/async-storage';
import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {_navigator} from '../..';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import MyButton from '../../components/MyButton';
import MyText from '../../components/MyText';
import {Styles} from '../../navigation/styles';
import {useRef} from 'react';
import img from '../../constants/images';

const screenSize = Dimensions.get('window');
const height = Dimensions.get('window').height;
const width = Dimensions.get('screen').width;

const baseWidth = SIZES.width - 40;

const EditProfile = ({connect, auth, navigation}) => {
  const {
    auth: {updateAccount},
  } = useDispatch();
  const refInput = useRef({});
  const [state, _setState] = useState({onTop: true, emptyInput: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  useEffect(() => {}, []);

  const onChangeText = key => inputData => {
    refInput.current[key] = inputData;

    const emptyInput = [
      'email',
      'fullName',
      'phone',
      'description',
      'facebook',
      'github',
      'linkedIn',
      'twitter',
      'aboutMe',
    ].every(i => !refInput.current[i]); // !refInput.current.email || !refInput.current.password;
    if (state.emptyInput !== emptyInput) {
      setState({emptyInput});
    }
  };

  const onSubmit = () => {
    updateAccount(refInput.current).then(() => {
      navigation.pop();
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={img.bg}
        style={{
          top: 0,
          left: 0,
          width: screenSize.width,
          height: screenSize.height / 3,
          position: 'absolute',
        }}
      />
      <View style={styles.nameScreenText}>
        <MyText type="h2" style={styles.profileText}>
          Profile
        </MyText>
      </View>
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
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={{marginVertical: 50}}>
          <View
            style={{
              //   paddingLeft: 30,
              width: (screenSize.width * 8) / 10,
              // height: (screenSize.width * 8) / 10,
              // backgroundColor: 'white',
              borderRadius: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
              // marginTop: 'auto',
              // marginBottom: 'auto',
              // alignItems:'center'
              // borderWidth: 1,
            }}>
            <MyText>Email</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 20,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.email}
              onChangeText={onChangeText('email')}
              value={state.email}
              placeholder="Enter email"
            />
            <MyText>Full name</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.fullName}
              onChangeText={onChangeText('fullName')}
              value={state.fullName}
              placeholder="Enter full name"
            />
            <MyText>Phone</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.phone}
              onChangeText={onChangeText('phone')}
              value={state.phone}
              placeholder="Enter phone"
            />
            <MyText>Description</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.description}
              onChangeText={onChangeText('description')}
              value={state.description}
              placeholder="Enter desctiption"
            />
            <MyText>Facebook</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.facebook}
              onChangeText={onChangeText('facebook')}
              value={state.facebook}
              placeholder="Enter facebook link"
            />
            <MyText>Github</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.github}
              onChangeText={onChangeText('github')}
              value={state.github}
              placeholder="Enter github link"
            />
            <MyText>Linkedin</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.linkedIn}
              onChangeText={onChangeText('linkedIn')}
              value={state.linkedIn}
              placeholder="Enter linkedIn link"
            />
            <MyText>Twitter</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.twitter}
              onChangeText={onChangeText('twitter')}
              value={state.twitter}
              placeholder="Enter twitter link"
            />

            <MyText>About me</MyText>
            <TextInput
              style={{
                backgroundColor: '#f2f3f5',
                height: 50,
                fontSize: 16,
                borderRadius: 8,
                paddingLeft: 20,
                marginBottom: 30,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              defaultValue={auth?.aboutMe}
              onChangeText={onChangeText('aboutMe')}
              value={state.aboutMe}
              placeholder="Enter about me"
            />
          </View>
        </ScrollView>
        <MyButton
          color={state.emptyInput ? 'gray30' : 'primary'}
          onClick={onSubmit}
          style={{marginVertical: 10, marginHorizontal: 30}}>
          Save
        </MyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollView: {height: height - 170, marginTop: -5},
  profileText: {
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: COLORS.black,
    textAlign: 'center',
  },
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
)(withNavigation(EditProfile));
