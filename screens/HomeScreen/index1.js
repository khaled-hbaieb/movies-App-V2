import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image } from 'react-native'
import * as firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeScreen({navigation}) {
    const [user, setUser] = useState(null)
    const [url, setUrl] = useState(null)

    const setUserImageFunc = async() => {
        const ref = firebase.storage().ref(`/profileImages/${email}`);
        const url = await  ref.getDownloadURL();
        setUrl(url)
        console.log(url)
    }

    const setUserFunc = () => {
        const { email, displayName } = firebase.auth().currentUser
        setUser({ email, displayName })
    }
    
    useEffect(() => {
        setUserFunc()
        setUserImageFunc()
        console.log('run')
    },[])

    const signOutUser = () => {
        firebase.auth().signOut()
    }

    // HomeScreen.navigationOptions = ({ navigation }) => {
    //     return {
    //         headerTitle: 'Edit Data',
    //         headerRight: (
    //             <View><Text>Hello World</Text></View>
    //         ),
    //     }
    // }

    HomeScreen.navigationOptions = ({ navigation }) => ({
        
            headerTitle: 'khaled',
            headerRight: 
                <View  style={{marginRight: 10,textAlign:"center", alignItems: "center"}}>
                    <MaterialIcons name="logout" size={24} color="black" onPress={() => firebase.auth().signOut()} />
                    <Text onPress={() => firebase.auth().signOut()} style={{fontWeight:'bold'}} >Log out</Text>
                </View>
            
        
    })

    return (
        <View style={styles.container}>
        <Text>{url}</Text>
        <Text>Hola 3asba 2</Text>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        // overflow: 'hidden',
        // alignSelf: 'center',
    },
})