import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';

import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

const RangeSlider = ({from, to, onChangeValue}) => {
  // const RangeSlider = () => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      onChangeValue(newLow, newHigh);
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh],
  );

  return (
    <>
      <RangeSliderRN
        // style={styles.slider}
        min={from}
        max={to}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   marginVertical: 5,
        }}>
        <View>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 14, color: '#000000'}]}>
            {low}
          </Text>
        </View>
        <View>
          <Text
            style={[{fontWeight: 'bold'}, {fontSize: 14, color: '#000000'}]}>
            {high}
          </Text>
        </View>
      </View>
    </>
  );
};

export default RangeSlider;
