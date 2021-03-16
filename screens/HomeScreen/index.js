import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image } from 'react-native'
import * as firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import MoviesHomeScreen from '../MoviesHomeScreen'



export default class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: '',
        url : null,
    }

    async componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser
        const ref = firebase.storage().ref(`/profileImages/${email}`);
        const url = await ref.getDownloadURL();
        this.setState({ email, displayName, url })  
        this.props.navigation.setParams({
            emai: this.state.email,
            displayName: this.state.displayName,
            url: this.state.url
          }); 
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    async componentDidUpdate() {
        
    }

     

    

    static navigationOptions = ({ navigation })=>{
        const { navigate } = navigation
        const { email, displayName } = firebase.auth().currentUser
        const url = navigation.getParam('url')
        console.log(url,'from here')
        return{
        headerRight: (
                    <View style={{flexDirection:"row", textAlign:"center", alignItems: "center"}}>
                        <View  style={{marginRight: 10,textAlign:"center", alignItems: "center"}} 
                        onPress={() => navigate('Profile',{email: email, displayName: displayName})}>
                        <Image style={{ width: 40, height: 40, borderRadius: 40/2 }}
                            source={{uri:(url)}}
                            />
                        </View>
                        <View  style={{marginRight: 10,textAlign:"center", alignItems: "center"}} onPress={() => firebase.auth().signOut()}>
                            <MaterialIcons name="logout" size={24} color="black" onPress={() => firebase.auth().signOut()} />
                        </View>
                    </View>
                  ),
                  headerTitle: (
                    <View  onPress={() => {
                        console.log('clicked')
                        navigate('Profile',{email: email, displayName: displayName})}}>
                        <Image source={require('../../assets/images/logo.jpg')} style={{ width: 40, height: 40 }}/>
                    </View>
                  )
        } 
    }
    

    render() {
        
        return (
            <View style={styles.container}>
                <MoviesHomeScreen />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        // overflow: 'hidden',
        // alignSelf: 'center',
    },
})