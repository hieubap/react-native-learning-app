import {withNavigation} from '@react-navigation/compat';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import MyText from '../../components/MyText';
import Chapter from './Chapter';
import Comment from './Comment';
import Video from 'react-native-video';
import clientUtils from '../../utils/client-utils';
import Orientation from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('screen');

const TopTab = createMaterialTopTabNavigator();
const tabOption = [
  {name: 'Chapter', title: 'Chapters', component: Chapter},
  // {name: 'File', title: 'Files', component: Chapter},
  {
    name: 'Discussion',
    title: 'Discussions',
    component: Comment,
  },
];

const CourseInfo = ({navigation, route}) => {
  const playItem = useSelector(state => state.chapter.playItem);
  const data = route.params?.item || {};
  const [state, _setState] = useState({fullscreen: false});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  const refPlayer = useRef();
  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const onChangeFullscreen = () => {
    setState({fullscreen: !state.fullscreen});
    if (state.fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscapeLeft();
    }
  };
  const screenStyle = state.fullscreen
    ? {
        width: height - 80,
        height: width,
      }
    : {
        width: width,
        height: 220,
      };

  console.log(data, 'fileURL???');

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View style={{overflow: 'hidden'}}>
        <View style={{alignItems: 'center', backgroundColor: '#333'}}>
          <TouchableOpacity
            style={styles.fullscreenTouch}
            onPress={onChangeFullscreen}>
            <Image
              source={state.fullscreen ? icons.minimize : icons.fullscreen}
              style={styles.fullscreenImage}></Image>
          </TouchableOpacity>
          {!!state.loading && (
            <View
              style={[
                screenStyle,
                {
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 11,
                  backgroundColor: '#000',
                  opacity: 0.7,
                },
              ]}>
              <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
          )}
          <Video
            thumbnail={images.thumbnail_1}
            autoPlay={false}
            controls={true}
            resizeMode="contain"
            // useNativeControls={true}
            autoplay={false}
            posterResizeMode={'stretch'}
            poster={
              'https://img.lovepik.com/photo/20211121/medium/lovepik-education-and-learning-background-training-picture_500617460.jpg'
            }
            // paused={true}
            onLoadStart={() => {
              if (!!playItem?.fileUrl) {
                setState({loading: true});
              }
            }}
            onLoad={() => {
              setState({loading: false});
            }}
            // onVideoEnd={(...arr) }
            source={{
              uri: clientUtils.fileURL + playItem?.fileUrl,
            }} // Can be a URL or a local file.
            ref={ref => {
              console.log(ref, 'refvideo...');
              refPlayer.current = ref;
            }} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
            style={[styles.backgroundVideo, screenStyle]}
          />
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

      <Chapter navigation={navigation} data={data} />

      {/* <TopTab.Navigator
        style={{zIndex: 5}}
        // screenOptions={{
        //   swipeEnabled: false,
        // }}
        // tabBar={customTabBar}
      >
        {tabOption.map(item => (
          <TopTab.Screen
            key={item.name}
            name={item.name}
            initialParams={{data}}
            component={item.component}></TopTab.Screen>
        ))}
      </TopTab.Navigator> */}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    width,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    zIndex: 9,
  },
  fullscreenTouch: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },
  fullscreenImage: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default connect(
  ({socket: {listRoom}, auth: {auth}}) => ({listRoom, auth}),
  ({socket: {connect, getListMessage, updateData}}) => ({
    connect,
    getListMessage,
    updateData,
  }),
)(withNavigation(CourseInfo));
