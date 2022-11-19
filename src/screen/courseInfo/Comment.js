import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SIZES} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';

const baseWidth = SIZES.width - 40;
const {width} = Dimensions.get('screen');

const Comment = ({route}) => {
  const data = route.params.data || {};
  const listComment = useSelector(state => state.comment.listComment);
  const {
    comment: {submitComment, getListComment},
  } = useDispatch();
  const [state, _setState] = useState({onTop: true});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  useEffect(() => {
    if (data?.id) {
      getListComment({courseId: data.id});
    }
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.chapterItem}>
        <Image
          source={require('../../assets/icons/lock.png')}
          style={styles.chapterImage}></Image>
        <View style={styles.chapterInfo}>
          <Text style={styles.chapterTitle}>{item.user?.fullName}</Text>
          <Text style={styles.chapterTime}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapContainer}>
        <Text style={styles.headerText}>{data.name}</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{}}>{listComment?.length || 0} comments</Text>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={listComment}
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
    // borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
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

export default Comment;
