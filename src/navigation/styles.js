import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  flex1: {flex: 1},
  flexCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mlAuto: {marginLeft: 'auto'},
  menuTitle: {
    marginLeft: 10,
    color: '#fff',
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
});
