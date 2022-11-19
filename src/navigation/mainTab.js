import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from '../utils/strings';
import profile from '../screen/profile';
import search from '../screen/search';
import home from '../screen/home';
import BottomNavigate from '../components/BottomNavigate';
import {useDispatch} from 'react-redux';

const BottomTab = createBottomTabNavigator();
const Icons = {};

const screenOptions = [
  {
    name: Routes.Home,
    icon: Icons.favoriteChart,
    iconActive: Icons.favoriteChart,
    component: home,
    title: 'Home',
  },
  {
    name: Routes.Search,
    icon: Icons.happyEmoji,
    iconActive: Icons.happyEmoji,
    component: search,
    title: 'Search',
  },
  {
    name: Routes.Profile,
    icon: Icons.profile,
    iconActive: Icons.profile,
    component: profile,
    title: 'Profile',
  },
];

const MainTab = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <BottomNavigate {...props} />}
      screenOptions={{headerShown: false}}>
      {screenOptions.map((item, index) => (
        <BottomTab.Screen
          key={index + 1}
          name={item.name}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default MainTab;
