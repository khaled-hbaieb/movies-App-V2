import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import * as firebase from 'firebase'
import Profile from './screens/Profile'
import MoviesHomeScreen from './screens/MoviesHomeScreen'
import TvShowsHomeScreen from './screens/TvShowsHomeScreen'



var firebaseConfig = {
  apiKey: "AIzaSyD5mHOXtApybzkN0UICWMEX3kMrQMFIurs",
  authDomain: "movies-v2.firebaseapp.com",
  projectId: "movies-v2",
  storageBucket: "movies-v2.appspot.com",
  messagingSenderId: "949676188769",
  appId: "1:949676188769:web:f44e7c71d6192210bff620"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




const AppStack = createStackNavigator({
  Home: HomeScreen,
  Profile: Profile,
  MoviesHomeScreen: MoviesHomeScreen,
  TvShowsHomeScreen: TvShowsHomeScreen
})

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen,
  
})




export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)