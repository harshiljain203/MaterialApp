import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

// import { Fragment } from 'react';
import HomeScreen from '../Components/HomeScreen';
import DetailsPage from '../Components/DetailsPage';
import { NAVIGATE } from '../constants';
import { SafeAreaView, StyleSheet, Block } from 'react-native';

const navigationRef = React.createRef();


enableScreens();
const AppStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    borderWidth: 0
  }
});

export default class NavWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <NavigationContainer ref={navigationRef}>
          <AppStack.Navigator
            initialRouteName={NAVIGATE.HOME_SCREEN}
            screenOptions={{
              headerShown: false,
              title: '',
            }}
          >
            <AppStack.Screen
              name={NAVIGATE.HOME_SCREEN}
              component={HomeScreen}
            />
            <AppStack.Screen
              name={NAVIGATE.DETAILS_PAGE}
              component={DetailsPage}
            />
            {/* <AppStack.Screen
              name={NAVIGATE.AUTH_STACK}
              component={AuthRouter}
              initialParams = {
                { allow_alerts }
              }
            />
            <AppStack.Screen
              name={NAVIGATE.VIDEO_PLAYER}
              component={VideoPlayer}
            /> */}
          </AppStack.Navigator>
        </NavigationContainer>
    );
  }
}
