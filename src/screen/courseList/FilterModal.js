import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants';
import {forwardRef} from 'react';
import MyText from '../../components/MyText';
import {levelCourse} from '../../constants/constants';
import RnRangeSlider from 'rn-range-slider';
import RangeSlider from './RangeSlider';
import {useRef} from 'react';
import React, {useState, useImperativeHandle} from 'react';

const {width, height} = Dimensions.get('screen');

const createWithin = [
  {
    name: 'All time',
  },
  {
    name: 'This Month',
  },
  {
    name: 'This Week',
  },
  {
    name: 'This day',
  },
  {
    name: '2 Months',
  },
  {
    name: '4 Months',
  },
];

const FilterModal = (props, ref) => {
  const [state, _setState] = useState({active: 0, level: 1});
  const setState = data => {
    _setState(pre => ({...pre, ...data}));
  };
  const refRangeValue = useRef({});
  const refAnimated = useRef(new Animated.Value(height));
  console.log(refRangeValue, 'refRangeValue');

  const onClose = () => {
    setState({open: false});
    Animated.spring(refAnimated.current, {
      toValue: height,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      console.log('running.....');
      setState({open: true});
      Animated.spring(refAnimated.current, {
        toValue: 200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    },
  }));

  return (
    <>
      <View
        style={{
          display: state.open ? 'flex' : 'none',
          position: 'absolute',
          backgroundColor: COLORS.black,
          opacity: 0.5,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          height: height,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: COLORS.white,
          overflow: 'hidden',
          transform: [{translateY: refAnimated.current}],
        }}>
        <View
          style={{
            height: height - 270,
            paddingHorizontal: 15,
            paddingTop: 15,
          }}>
          <ScrollView>
            <MyText
              type="h2"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Filter
            </MyText>

            <MyText
              type="h3"
              style={{
                fontWeight: 'bold',
                color: COLORS.black,
                marginBottom: 15,
              }}>
              Class Level
            </MyText>
            {levelCourse.map(item => {
              return (
                <TouchableOpacity
                  key={item.type}
                  onPress={() => {
                    setState({level: item.type});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray20,
                      backgroundColor:
                        state.level == item.type ? COLORS.green3 : undefined,
                    }}>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <MyText
              type="h3"
              style={{
                fontWeight: 'bold',
                color: COLORS.black,
                marginTop: 20,
              }}>
              Created Within
            </MyText>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {createWithin.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      setState({active: idx});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginVertical: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: COLORS.gray20,
                        ...(state.active === idx
                          ? {
                              backgroundColor: COLORS.primary3,
                            }
                          : {}),
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          ...(state.active === idx
                            ? {color: COLORS.white}
                            : {}),
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <MyText
              type="h3"
              style={{
                fontWeight: 'bold',
                color: COLORS.black,
                marginTop: 20,
              }}>
              Class length
            </MyText>
            <View style={{marginHorizontal: 20, marginTop: 8}}>
              <RangeSlider
                from={30}
                to={180}
                onChangeValue={(from, to) => {
                  refRangeValue.current = {from, to};
                }}
              />
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 'auto',
              paddingBottom: 30,
            }}>
            <TouchableOpacity
              style={{flex: 1, marginHorizontal: 10}}
              onPress={() => {
                onClose();
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingVertical: 15,
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: COLORS.black}}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, marginHorizontal: 10}}
              onPress={() => {}}>
              <View
                style={{
                  borderRadius: 15,
                  paddingVertical: 15,
                  alignItems: 'center',
                  backgroundColor: COLORS.green2,
                }}>
                <Text style={{fontWeight: 'bold', color: COLORS.white}}>
                  Apply
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default forwardRef(FilterModal);

const styles = StyleSheet.create({});
