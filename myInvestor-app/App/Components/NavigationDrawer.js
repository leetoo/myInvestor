import I18n from "react-native-i18n";
import React, { Component } from "react";
import { Button, DrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView, Image } from "react-native";
import {
  getNavigationOptionsWithAction,
  getDrawerNavigationOptions,
  getDrawerConfig
} from "../Lib/Navigation";
import NavBarItem from "./NavBarItem";
import NavigationToolbar from "./NavigationToolbar";
import { Fonts, Colors, Metrics } from "../Themes/";
import styles from "./Styles/NavigationDrawerStyles";
import HomeScreen from "../Containers/HomeScreen";
import AnalyticsScreen from "../Containers/AnalyticsScreen";
import StockDetailsScreen from "../Containers/StockDetailsScreen";
import LaunchScreen from "../Containers/LaunchScreen";
import PortfolioScreen from "../Containers/PortfolioScreen";

const getDrawerItem = navigation =>
  <NavBarItem
    iconName="bars"
    onPress={() => {
      if (navigation.state.index === 0) {
        // check if drawer is not open, then only open it
        navigation.navigate("DrawerOpen");
      } else {
        // else close the drawer
        navigation.navigate("DrawerClose");
      }
    }}
  />;

const getDrawerIcon = (iconName, tintColor) =>
  <Icon name={iconName} size={Metrics.icons.small} color={tintColor} />;

const homeDrawerIcon = ({ tintColor }) => getDrawerIcon("home", tintColor);
const analyticsDrawerIcon = ({ tintColor }) => getDrawerIcon("trending-up", tintColor);
const portfolioDrawerIcon = ({ tintColor }) => getDrawerIcon("briefcase", tintColor);
const launchDrawerIcon = ({ tintColor }) => getDrawerIcon("android", tintColor);

const homeNavOptions = getDrawerNavigationOptions(
  I18n.t("homeScreen"),
  Colors.background,
  Colors.text,
  homeDrawerIcon,
  <NavigationToolbar />
);

const analyticsNavOptions = getDrawerNavigationOptions(
  I18n.t("analyticsScreen"),
  Colors.background,
  Colors.text,
  analyticsDrawerIcon
);

const portfolioNavOptions = getDrawerNavigationOptions(
  I18n.t("portfolioScreen"),
  Colors.background,
  Colors.text,
  portfolioDrawerIcon
);

const launchNavOptions = getDrawerNavigationOptions(
  I18n.t("launchScreen"),
  Colors.background,
  Colors.text,
  launchDrawerIcon
);

const ScrollDrawerContentComponent = props =>
  <ScrollView style={styles.scrollView}>
    <SafeAreaView style={styles.drawerContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>;

const navigationDrawerContentOptions = {
  activeBackgroundColor: Colors.cloud,
  activeTintColor: Colors.snow,
  inactiveTintColor: Colors.snow,
  inactiveBackgroundColor: Colors.background,
  style: styles.drawerContent
};

const NavigationDrawer = DrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
    AnalyticsScreen: {
      screen: AnalyticsScreen,
      navigationOptions: analyticsNavOptions
    },
    PortfolioScreen: {
      screen: PortfolioScreen,
      navigationOptions: portfolioNavOptions
    },
    LaunchScreen: { screen: LaunchScreen, navigationOptions: launchNavOptions }
  },
  getDrawerConfig(
    300,
    "left",
    "HomeScreen",
    ScrollDrawerContentComponent,
    navigationDrawerContentOptions
  )
);

NavigationDrawer.navigationOptions = ({ navigation }) =>
  getNavigationOptionsWithAction(
    I18n.t("appName"),
    Colors.background,
    Colors.snow,
    getDrawerItem(navigation)
  );

export default NavigationDrawer;
