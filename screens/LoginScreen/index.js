import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, StatusBar } from 'react-native'
import * as firebase from 'firebase'

export default class LoaginScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }


    state = {
        email: '',
        password: '',
        errorMessage: null,
        carModel: 'Audi'
    }

    async componentDidMount() {
        const where = encodeURIComponent(JSON.stringify({
            "Make": this.state.carModel,
            
          }));
          const response = await fetch(
            `https://parseapi.back4app.com/classes/Car_Model_List?limit=10&where=${where}`,
            {
              headers: {
                'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z', // This is the fake app's application id
                'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW', // This is the fake app's readonly master key
              }
            }
          );
          const data = await response.json(); // Here you have the data that you need
          console.log(JSON.stringify(data, null, 2));
    }

    handleLogin = () => {
        const { email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        LayoutAnimation.easeInEaseOut()
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Text style={styles.greeting}>Welcome Back</Text>
            <View style={styles.error}>
                <Text>{this.state.errorMessage && <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>}</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholder="Email" 
                    onChangeText={email => this.setState({ email })} 
                    value={this.state.email}
                    >
                    </TextInput>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholder="Password" 
                    secureTextEntry
                    onChangeText={password => this.setState({ password })} 
                    value={this.state.password}
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
                <Text style={{color: '#FFF', fontWeight:'500'}}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{marginTop: 32, alignSelf: 'center'}} 
                onPress={() => this.props.navigation.navigate('Register')} >
                <Text style={{color: '#414959', fontSize:13}}>
                New To App? <Text style={{fontWeight:'500', color: '#E9446A'}}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150
    },
    greeting: {
        marginTop:32,
        fontSize:18,
        fontWeight: '400',
        textAlign: 'center'
    },
    error: {
        height:72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        color: '#161F3D'
    },
    button: {
        alignItems: 'center',
        height: 52,
        borderRadius: 4,
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        justifyContent: 'center',
    },
    errorMessage: {
        fontSize: 13,
        color: '#E9446A',
        fontWeight:'600',
        textAlign: 'center'
    },
})