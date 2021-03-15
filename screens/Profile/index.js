import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons'; 


export default function Profile(props) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const email = props.navigation.state.params.email
    const displayName = props.navigation.state.params.displayName
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
          const ref = firebase.storage().ref(`/profileImages/${email}`);
          const url = await ref.getDownloadURL();
          setUrl(url)
          console.log(url, 'khaldaaaaaaaaaaaaa')
        })();
      }, [setUrl]);


      const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        
        var ref = firebase.storage().ref().child("profileImages/" + imageName);
        return ref.put(blob);
      }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          setUrl(result.uri);
        }
        uploadImage(result.uri, email)
      };
  
    return (
        <View style={{alignSelf: 'center', marginTop: 35}}>
            <View style={styles.profileImage}>
                <Image  source={url !== null ? {uri : url} :  require('../../assets/images/default.jpg')} style={styles.image}></Image>
            </View>
            <View style={styles.infoContainer} >
                <Text style={[styles.text, {fontWeight: "200"}]}>Email: {email}</Text>
                <Text style={styles.text}>Name: {displayName}</Text>
                <AntDesign style={styles.add} name="pluscircle" size={24} color="black" onPress={pickImage} size={48} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    infoContainer: {
      marginTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    text: {
        
        color: '#52575D'

    },
    add : {
      position: 'absolute',
      alignItems: 'center',
      // justifyContent: 'center',
      bottom: 60,
      right: 0,
      width: 48,
      height: 48,
      backgroundColor: '#41444B',
      borderRadius: 30,
    }
})