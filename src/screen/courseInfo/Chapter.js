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
import ImageCropPicker from 'react-native-image-crop-picker';
import fileProvider from '../../data-access/file-provider';
import {refModal} from '../..';

const baseWidth = SIZES.width - 40;
const {width} = Dimensions.get('screen');

const Chapter = ({data = {}, route, navigation}) => {
  // const data = route.params.data || {};
  const listChapter = useSelector(state => state.chapter.listChapter);
  const playItem = useSelector(state => state.chapter.playItem);
  const isRegister = useSelector(state => state.register.isRegister);
  const statusRegister = useSelector(state => state.register.statusRegister);

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
    refModal.current &&
      refModal.current.show(
        {
          type: 'ck',
          content: `Vui lòng chuyển khoản vào số tài khoản\n\nSố tài khoản: ${data?.stk} \n Ngân hàng: ${data?.nganHang}\n Chủ TK: ${data?.chuTaiKhoan}\n\n chọn ảnh xác nhận giao dịch thành công và chờ xác nhận`,
          okText: 'Chọn ảnh',
        },
        () => {
          ImageCropPicker.openPicker({
            // width: 500,
            // height: 500,
            // cropping: true,
          }).then(res => {
            return new Promise((resolve, reject) => {
              fileProvider
                .upload({
                  uri: res.path,
                  name: 'image.png',
                  fileName: 'image',
                  type: 'image/png',
                })
                .then(res => {
                  registerCourse({courseId: data.id, imgUrl: res.path, data});
                  // dispatch.auth.updateData({
                  //   auth: {...auth, avatar: prefixFile + res.slice(8)},
                  // });
                  // userProvider.update(auth?.userAddress, {
                  //   ...auth,
                  //   create_at: undefined,
                  //   avatar: prefixFile + res.slice(8),
                  // });
                  resolve(res);
                })
                .catch(reject);
            });
          });
        },
      );
  };
  const onPress = item => () => {
    if (statusRegister === 0) return;
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
              statusRegister === 2
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
          <Text style={{marginLeft: 20}}>
            price: {data.price?.formatPrice()} đ
          </Text>
        </View>

        <View style={styles.wrapAuthor}>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Instructor', {authorId: data?.createdBy});
            }}>
            <Image style={styles.profileImage} source={images.profile}></Image>
          </TouchableOpacity>

          <View>
            <Text style={styles.authorText}>{data.author}</Text>
            {/* <Text>{data.user?.description}</Text> */}
          </View>
          {statusRegister === 0 && (
            <View style={Styles.mlAuto}>
              <MyButton style={styles.regisBtn} onClick={onRegister}>
                Register
              </MyButton>
            </View>
          )}
          {statusRegister === 1 && (
            <View style={Styles.mlAuto}>
              <MyButton style={styles.regisBtn}>Waiting</MyButton>
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
