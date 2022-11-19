import {createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import Categories from '../screen/categories';
import Chat from '../screen/chat';
import CourseInfo from '../screen/courseInfo';
import CourseList from '../screen/courseList';
import Explore from '../screen/explore';
import Login from '../screen/login';
import register from '../screen/register';
import {Routes} from '../utils/strings';
import MainTab from './mainTab';

const Stack = createStackNavigator();

const StackNavigation = ({}) => {
  const initApp = useDispatch().auth.initApp;
  useEffect(() => {
    initApp();
  }, []);
  return (
    <Stack.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Login"
      headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={register} />
      <Stack.Screen name={Routes.MainTab} component={MainTab} />
      {/* <Stack.Screen name="Search" component={Search} /> */}
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Categories" component={Categories} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseInfo" component={CourseInfo} />
    </Stack.Navigator>
  );
};

export default connect(
  ({navigation: {mode}}) => ({mode}),
  // ({socket: {connect}}) => ({connect}),
)(StackNavigation);
