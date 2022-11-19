import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {COLORS, dummyData, icons, images, SIZES} from '../../constants';
import MyText from '../../components/MyText';
import {minuteToHour, secondToHour} from '../../utils/common';
import {useDispatch, useSelector} from 'react-redux';
import {Styles} from '../../navigation/styles';
import MyButton from '../../components/MyButton';

const baseWidth = SIZES.width - 40;
const {width} = Dimensions.get('screen');

const Chapter = ({route}) => {
  const data = route.params.data || {};
  const listChapter = useSelector(state => state.chapter.listChapter);
  const playItem = useSelector(state => state.chapter.playItem);
  const isRegister = useSelector(state => state.register.isRegister);
  const {
    register: {registerCourse, getCheckRegister},
    chapter: {getListChapter, updateData},
  } = useDispatch();
  const [state, _setState] = useState({onTop: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  useEffect(() => {
    if (data?.id) {
      getListChapter({courseId: data.id});
      getCheckRegister({courseId: data.id});
    }
    return () => {
      updateData({playItem: null});
    };
  }, []);
  const onRegister = () => {
    registerCourse({courseId: data.id});
  };
  const onPress = item => () => {
    if (!isRegister) return;
    updateData({playItem: item});
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={
          item.id === playItem?.id
            ? styles.chapterItemActive
            : styles.chapterItem
        }>
        <TouchableOpacity onPress={onPress(item)}>
          <Image
            source={
              isRegister
                ? require('../../assets/icons/play_1.png')
                : require('../../assets/icons/lock.png')
            }
            style={styles.chapterImage}></Image>
        </TouchableOpacity>
        <View style={styles.chapterInfo}>
          <Text style={styles.chapterTitle}>{item.name}</Text>
          <Text style={styles.chapterTime}>{secondToHour(item.duration)}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapContainer}>
        <Text style={styles.headerText}>{data.name}</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{}}>{data.numberStudent} students</Text>
          <Text style={{marginLeft: 20}}>{minuteToHour(data?.duration)}</Text>
        </View>

        <View style={styles.wrapAuthor}>
          <Image style={styles.profileImage} source={images.profile}></Image>
          <View>
            <Text style={styles.authorText}>{data.author}</Text>
            {/* <Text>{data.user?.description}</Text> */}
          </View>
          {!isRegister && (
            <View style={Styles.mlAuto}>
              <MyButton style={styles.regisBtn} onClick={onRegister}>
                Register
              </MyButton>
            </View>
          )}
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={listChapter}
        keyExtractor={(_, idx) => idx}
        renderItem={renderItem}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  wrapContainer: {paddingHorizontal: 25, paddingVertical: 10},
  headerText: {fontWeight: 'bold', fontSize: 20, color: '#000'},
  wrapAuthor: {flexDirection: 'row', alignItems: 'center'},
  authorText: {fontWeight: 'bold', fontSize: 18},
  regisBtn: {padding: 8},
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.1,
    resizeMode: 'stretch',
    marginRight: 20,
  },
  chapterItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  chapterItemActive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderColor: '#eee',
    borderBottomWidth: 3,
    backgroundColor: COLORS.green1,
    borderBottomColor: COLORS.green2,
  },
  chapterImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  chapterInfo: {},
  chapterTitle: {
    color: '#444',
    // fontSize: 18,
    fontWeight: 'bold',
  },
  chapterTime: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default Chapter;
