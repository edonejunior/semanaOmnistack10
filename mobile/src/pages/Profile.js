import React from 'react';
import {View} from 'react-native';
import { WebView} from 'react-native-webview'

function Profile({navigation}){
    //To pegando o que recebe do main pelo navigation e passando por parametro para o 
    //Usernamegit
    const githubUsername = navigation.getParam('github_username')
    return <WebView style={{flex:1}} source={{uri:`https://github.com/${githubUsername}`}} />
} 

export default Profile