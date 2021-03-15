import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, StatusBar } from 'react-native'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    }

    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null,
    }

    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            })
        })
        .catch(err => {
            this.setState({ errorMessage: err.message})
        })
    }

    render() {      
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
            <View style={styles.error}>
                <Text>{this.state.errorMessage && <Text style={styles.errorMessage} >{this.state.errorMessage}</Text>}</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholder="Full Name" 
                    onChangeText={name => this.setState({ name })} 
                    value={this.state.name}
                    >
                    </TextInput>
                </View>
                <View style={{marginTop: 32}}>
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
                    secureTextEntry
                    style={styles.input} 
                    autoCapitalize='none' 
                    placeholder="Password" 
                    onChangeText={password => this.setState({ password })} 
                    value={this.state.password}
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp} >
                <Text style={{color: '#FFF', fontWeight:'500'}}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{marginTop: 32, alignSelf: 'center'}}
                onPress={() => this.props.navigation.navigate('Login')} >
                <Text style={{color: '#414959', fontSize:13}}>
                You have an account? <Text style={{fontWeight:'500', color: '#E9446A'}}>Log In</Text>
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
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