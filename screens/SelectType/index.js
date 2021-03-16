import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet,Pressable} from 'react-native'
import MoviesHomeScreen from '../MoviesHomeScreen'
import TvShowsHomeScreen from '../TvShowsHomeScreen'
import { withNavigation } from 'react-navigation';

export default function SelectType(props) {
    console.log(props.navigation.navigate)
    const onMovies = () => {
        props.navigation.navigate('MoviesHomeScreen')
    }
    const onTvShows = () => {
        props.navigation.navigate('TvShowsHomeScreen')
    }
    const onMyList = () => {
        props.navigation.navigate('MoviesHomeScreen')
    }
    return (
        <View style={styles.container}>
                    <Pressable style={styles.pressable}
                            onPress={onTvShows}>
                        <Text>Tv Shows</Text>
                    </Pressable>
                    <Pressable 
                            style={styles.pressable}
                            onPress={onMovies}>
                        <Text>Movies</Text>
                    </Pressable>
                    <Pressable style={styles.pressable}
                            onPress={onMyList}>
                        <Text>My List</Text>
                    </Pressable>
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        textAlign:"center",
        alignItems: "center", 
        justifyContent: 'space-around',
        marginVertical: 5
    },
    pressable: {
        backgroundColor: 'red',
        borderRadius: 20,
        width: 80,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
