import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Categories from '../screen/categories';
import Chat from '../screen/chat';
import CourseInfo from '../screen/courseInfo';
import CourseList from '../screen/courseList';
import Explore from '../screen/explore';
import Home from '../screen/home';
import Login from '../screen/login';
import Profile from '../screen/profile';
import Search from '../screen/search';

const Stack = createStackNavigator();

const StackNavigation = ({}) => {
  // useEffect(() => {
  //   connect();
  // }, []);
  return (
    <Stack.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseInfo" component={CourseInfo} />
    </Stack.Navigator>
  );
};

export default connect(
  ({navigation: {mode}}) => ({mode}),
  // ({socket: {connect}}) => ({connect}),
)(StackNavigation);
