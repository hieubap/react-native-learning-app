import {withNavigation} from '@react-navigation/compat';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import InputTimeout from '../../components/InputTimeout';
import img from '../../constants/images';
import MyText from '../../components/MyText';
import MyButton from '../../components/MyButton';
import icon from '../../constants/icons';
import {COLORS} from '../../constants';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import authProvider from '../../data-access/auth-provider';
import {refModal} from '../..';

const screenSize = Dimensions.get('window');

const Register = ({
  navigation,
  onLogin,
  listMessage,
  sendMessage,
  currentRoom,
}) => {
  const [state, _setState] = useState({
    width: screenSize.width,
    height: screenSize.height,
    emptyInput: true,
    inputData: '',
  });
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };

  const refScroll = useRef();
  const refInput = useRef({});

  const onSubmit = () => {
    if (
      !refInput.current.username ||
      !refInput.current.full_name ||
      !refInput.current.email ||
      !refInput.current.password
    ) {
      return;
    }
    if (!(refInput.current.password === refInput.current.password2)) {
      refModal.current &&
        refModal.current.show({
          type: 'error',
          content: 'Password không đúng',
        });
      return;
    }
    authProvider.register(refInput.current).then(res => {
      console.log(res);

      if (res && res.code === 0) {
        refModal.current &&
          refModal.current.show(
            {
              type: 'success',
              content: 'Đăng nhập thành công.\n Vui lòng đăng nhập!',
            },
            () => {
              navigation.replace('Login');
            },
          );
      } else {
        refModal.current &&
          refModal.current.show({
            type: 'error',
            content: res.message,
          });
      }
    });
  };

  const scrollBottom = (payload = {animated: false}) => {
    if (refScroll.current) {
      refScroll.current.scrollToEnd(payload);
    }
  };

  useEffect(() => {
    scrollBottom({animated: true});
  }, [listMessage]);

  const eventKeyBoard = e => {
    setState({
      height: Dimensions.get('window').height - e.endCoordinates.height,
    });
    setTimeout(() => {
      scrollBottom({animated: true});
    }, 50);
  };

  useEffect(() => {
    scrollBottom();
    Keyboard.addListener('keyboardDidShow', eventKeyBoard);
    Keyboard.addListener('keyboardDidHide', eventKeyBoard);
  }, []);

  const onChangeText = key => inputData => {
    refInput.current[key] = inputData;
    // setState({[key]: inputData});
    const newStatus =
      !refInput.current.username ||
      !refInput.current.email ||
      !refInput.current.full_name ||
      !refInput.current.password ||
      !refInput.current.password2;

    if (state.emptyInput !== newStatus) {
      setState({emptyInput: newStatus});
    }
  };
  const onChangeInput = data => {};
  return (
    <View
      style={{
        // backgroundColor: '#dfe0e4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
      }}>
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
      <MyText
        type="h2"
        style={{position: 'absolute', top: 30, fontWeight: 'bold'}}>
        Register
      </MyText>
      {/* <View></View> */}
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: screenSize.width,
          height: screenSize.height / 2,
          backgroundColor: '#7972e5',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      /> */}
      <View
        style={{
          //   paddingLeft: 30,
          width: (screenSize.width * 8) / 10,
          // height: (screenSize.width * 9) / 10,
          // backgroundColor: 'white',
          borderRadius: 20,
          paddingHorizontal: 20,

          // paddingVertical: 10,
          // borderWidth: 1,
        }}>
        <MyText>Username</MyText>
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
          onChange={onChangeInput}
          onChangeText={onChangeText('username')}
          // value={state.username}
          // placeholder="Username"
        />
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
          onChange={onChangeInput}
          onChangeText={onChangeText('email')}
          // value={state.username}
          // placeholder="Username"
        />
        <MyText>Full name</MyText>
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
          onChange={onChangeInput}
          onChangeText={onChangeText('full_name')}
          // value={state.username}
          // placeholder="Username"
        />
        <MyText>Password</MyText>
        <TextInput
          secureTextEntry={true}
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
          onChange={onChangeInput}
          onChangeText={onChangeText('password')}
          value={state.password}
          // placeholder="Password"
        />
        <MyText>Password</MyText>
        <TextInput
          secureTextEntry={true}
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
          onChange={onChangeInput}
          onChangeText={onChangeText('password2')}
          // value={state.password}
          // placeholder="Password"
        />
        <MyButton
          color={state.emptyInput ? 'gray30' : 'primary'}
          onClick={onSubmit}>
          Register
        </MyButton>
        {/* <MyText style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>
          Or login with
        </MyText> */}
        {/* <View style={{display: 'flex', flexDirection: 'row'}}>
          <MyButton source={icon.google} color="gray10" style={{flex: 1}}>
            Google
          </MyButton>
          <MyButton
            source={icon.facebook}
            styleIcon={{width: 12, height: 24}}
            color="gray10"
            style={{flex: 1, marginLeft: 20}}>
            Facebook
          </MyButton>
        </View> */}

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <MyText>You are member?</MyText>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}>
            <MyText
              style={{
                color: COLORS.primary,
                marginLeft: 15,
                fontWeight: 'bold',
              }}>
              Login Now
            </MyText>
          </TouchableOpacity>
        </View>
        {/* <TouchableWithoutFeedback onPress={onSubmit}>
          <View
            style={{
              height: 40,
              backgroundColor: '#837ded',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Login</Text>
          </View>
        </TouchableWithoutFeedback> */}
      </View>
    </View>
  );
};

export default connect(
  ({socket: {listMessage, currentRoom}}) => ({listMessage, currentRoom}),
  ({socket: {sendMessage}, auth: {onLogin}}) => ({sendMessage, onLogin}),
)(withNavigation(Register));
