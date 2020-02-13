import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, Text, View, Image, ImageBackground, ToastAndroid } from 'react-native'
import SignIn from './SignIn/index';
import b from './Func.js';
// import { Colors } from '../Themes';
let splash_logo = require('../img/ERManager-Logo.png')

export default class Splash extends Component {

    state = {
        currentScreen: 'Splash',
        status: 0,
        interval: 3000
    };

    constructor(props) {
        super(props);
        // if(this.state.status != 0)
        // {
        //     setTimeout(()=>{
        //         //console.log('Done some tasks for about 3 seconds')
        //         if(pass == null){
        //             this.props.navigation.navigate('Login')
        //         }
        //         else if(pass != null && this.state.status == 1){
        //             this.props.navigation.navigate('Home')
        //         }
        //         else if(pass != null && this.state.status == 2){
        //             ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
        //             this.props.navigation.navigate('Login')
        //         }
        //         else if(pass != null && this.state.status == 3){
        //             ToastAndroid.show("No or bad connection available", ToastAndroid.SHORT);
        //             this.props.navigation.navigate('Login')
        //         }
        //         else{
        //             ToastAndroid.show("Session expired", ToastAndroid.SHORT);
        //             this.props.navigation.navigate('Login')
        //         }            
        //     }, 3000)
        // }

    }

    async componentDidMount() {
        let pass = null;
        let userid = await b.retrieveItem("user_id");
        pass = await b.retrieveItem("user_pass");
        let earea = await b.retrieveItem("user_earea");
        if (userid != null && pass != null) {
            this.setState({
                status: await b.getUserDtl(userid, pass),
                interval: 500
            })
        }   

        setTimeout(() => {
            if (pass == null) {
                this.props.navigation.navigate('Login')
            }
            else if (pass != null && this.state.status == 1) {
                b.get_image()
                this.props.navigation.navigate('Home', {earea: earea})
            }
            else if (pass != null && this.state.status == 2) {
                ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            }
            else if (pass != null && this.state.status == 3) {
                ToastAndroid.show("No or bad connection available", ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            }
            else {
                ToastAndroid.show("Session expired", ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            }
        }, this.state.interval)

    }

    render() {
        return (
            // <ImageBackground source={require('../img/img_splash.gif')} style={styles.backgroundImage}>
            // </ImageBackground>
            <View style={styles.container}>
                <Image source={splash_logo} style={styles.logo} ></Image>
                <View style={{
                    marginTop: hp(2), alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 22, color: 'white', alignItems: 'center', justifyContent: 'center', }}>W E L C O M E   T O</Text>
                    <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 32, color: 'white', alignItems: 'center', justifyContent: 'center', }}>E R M S S</Text>
                </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    logo: {
        width: hp(20),
        height: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(-5)
    },
    container: {
        backgroundColor: '#0077c7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})