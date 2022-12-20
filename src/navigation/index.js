import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import { refFilter } from '..';
import firebase from '../firebase';
import Categories from '../screen/categories';
import Chat from '../screen/chat';
import CourseInfo from '../screen/courseInfo';
import CourseList from '../screen/courseList';
import EditProfile from '../screen/editProfile';
import Explore from '../screen/explore';
import Instructor from '../screen/instructor';
import Login from '../screen/login';
import register from '../screen/register';
import {Routes} from '../utils/strings';
import MainTab from './mainTab';
import {Styles} from './styles';

const Stack = createStackNavigator();

const StackNavigation = ({}) => {
  const init = useSelector(state => state.application.init);
  const initApp = useDispatch().application.initApp;
  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    firebase();
  }, []);

  if (!init)
    return (
      <View style={Styles.flexCenter}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );

  return (
    <Stack.Navigator
      headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={register} />
      <Stack.Screen name={Routes.MainTab} component={MainTab} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseInfo" component={CourseInfo} />
      <Stack.Screen name="Instructor" component={Instructor} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default connect(
  ({navigation: {mode}}) => ({mode}),
  // ({socket: {connect}}) => ({connect}),
)(StackNavigation);
