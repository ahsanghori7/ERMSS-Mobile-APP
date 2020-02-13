import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import { Container, Header, Content, Item, Input, Button, StyleProvider } from 'native-base';
import {
    PermissionsAndroid, Alert, StyleSheet, Text, View, BackHandler,  ToastAndroid,
    ImageBackground, Image, TextInput, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//import { StackNavigator } from 'react-navigation';
import MytextBox from '../Textbox/MytextBox';
import { StackNavigator } from 'react-navigation';
import { ProgressBarAndroid, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
//import { Spinner } from 'react-native-spinkit'
import b from '../Func.js';
var status = 0;
// import { Colors } from '../Themes';

// const MytextBox = StackNavigator({
//     Home: { screen: MytextBox },

// });

// var ActivityIndicator_boolean = false


export default class SignIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isloginValidated: false,
            ActivityIndicator_boolean: false,
            latitude: null,
            longitude: null,
            error: null,
        }
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                //alert(position);
            },
            (error) => {
                this.setState({ error: error.message }); //alert(JSON.stringify(error)) 
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        //alert("location: "+this.state.latitude);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }

    downloadPDF = async () => {
        //await b.downloadPDFfile('0230', 'November 2018');
    }

    validateLogin = async () => {
        const { username, password } = this.state;
        const { navigate } = this.props.navigation;

        this.setState({
            ActivityIndicator_boolean: true
        })

        b.clearAsyncStorage(
            console.log('hello')
        )

        status = await b.getUserDtl(username, password);
        // alert('2');
        console.log('testing_log',status);
        let earea = await b.retrieveItem("user_earea")
        if (status == 0) {
            this.setState({
                ActivityIndicator_boolean: false
            })
            alert("Invalid Username or Password");
        }
        else if (status == 1) {
            // alert('1 chala')
            this.setState({
                ActivityIndicator_boolean: false,
            })
            navigate('Home', {earea: earea});
        }
        else if (status == 3) {
            this.setState({
                ActivityIndicator_boolean: false
            })
            ToastAndroid.show("No or bad connection available", ToastAndroid.SHORT);
        }
        else {
            this.setState({
                ActivityIndicator_boolean: false
            })
            ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
        }
    }

    render() {
        const username = "";
        const password = "";

        return (
            // <ImageBackground source={require('../../img/img_login_back.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: wp(90)}}>
                    
                    <Image style={styles.logo} source={require('../../img/ERManager-Logo-2.png')} />

                    {/* <View style={[styles.myview, styles.username]}>
                        <Image source={require('../../img/img_username_login.png')} style={styles.myimage} />
                        <TextInput underlineColorAndroid='transparent' onChangeText={username => this.setState({ username })} placeholder='Username...' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} />
                    </View> */}

                    <View style={[styles.myview, styles.username]}>
                        <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 24, color: '#2a2a2a', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}>Welcome, </Text>
                        <Text style={{ fontStyle: 'normal', fontWeight: '600', fontSize: 18, color: '#838383', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}>Sign in to continue </Text>
                    </View>

                    <View style={[styles.myview, styles.username]}>
                        <Text style={{ fontStyle: 'normal', fontWeight: '600', color: '#3b3b3b', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}>Username</Text>
                        <TextInput style={{ width: wp(90), color: '#858585', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', marginLeft: wp(-1) }} underlineColorAndroid='#3b3b3b' onChangeText={username => this.setState({ username })} placeholder='Username...' />
                    </View>

                    <View style={[styles.myview, styles.username]}>
                        <Text style={{ fontStyle: 'normal', fontWeight: '600', color: '#3b3b3b', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}>Password</Text>
                        <TextInput secureTextEntry={true} style={{ width: wp(90), color: '#858585', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', marginLeft: wp(-1) }} underlineColorAndroid='#3b3b3b' onChangeText={password => this.setState({ password })} placeholder='Password...' />
                    </View>

                    {/* <View style={[styles.myview, styles.password]}>
                        <Image source={require('../../img/img_username_login.png')} style={styles.myimage} />
                        <TextInput secureTextEntry={true} underlineColorAndroid='transparent' onChangeText={password => this.setState({ password })} placeholder='Password...' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} />
                    </View> */}

                    {/* <TouchableOpacity onPress={() => this.validateLogin()} style={styles.btn}>
                    <View style={styles.absoluteView}>
                        <Text style={{ color: 'black' }}>Login</Text>
                    </View>
                    <Image source={require('../../img/img_username_login.png')} style={styles.img} />
                </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => this.validateLogin()} style={styles.btn}>
                        <Text style={{ fontStyle: 'normal', fontWeight: '600', color: 'white' }}>Login</Text>
                    </TouchableOpacity>

                    {this.state.ActivityIndicator_boolean ? <View>
                        <ActivityIndicator size="large" color="#0077c7"></ActivityIndicator>
                    </View>
                        : null}
                        </View>
                </ScrollView>
            </View>
            //</ImageBackground> 
        )
    }

}
const styles = StyleSheet.create({
    absoluteView: {
        zIndex: 100,
        height: 50,
        width: 280,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    img: {
        height: 50,
        width: 280,
        resizeMode: 'stretch'
    },
    btn: {
        height: hp(8),
        width: wp(90),
        marginTop: hp(10),
        backgroundColor: '#0077c7',
        alignItems: 'center',
        justifyContent: 'center'
    },

    myview: {
        height: 50,
        width: wp(90),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    username: {
        marginTop: hp(5),
    },
    password: {
        marginTop: 20
    },
    logo: {
        height: wp(25),
        width: wp(35),
        resizeMode: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    myimage: {
        width: 280,
        height: 50,
        resizeMode: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})