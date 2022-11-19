import {View, Text, Image} from 'react-native';
import React from 'react';
import {COLORS, icons, SIZES} from '../constants';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MyText from './MyText';

const ListCourse = ({data, selectCourse}) => {
  return (
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
        {data?.map((item, index) => (
          <TouchableOpacity key={index} onPress={selectCourse(index)}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <Image
                source={item.thumbnail}
                style={{
                  width: SIZES.width - 150,
                  height: SIZES.width - 250,
                  borderRadius: 15,
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
                    <MyText type="body5" style={{color: COLORS.gray30}}>
                      {item.duration}
                    </MyText>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ListCourse;
