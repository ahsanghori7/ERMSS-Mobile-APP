import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider } from 'native-base';
import { StyleSheet, Dimensions, Text, View, ImageBackground, BackHandler, Alert } from 'react-native'
import { Image, TouchableWithoutFeedback, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
//import { StackNavigator } from 'react-navigation';
import MytextBox from '../Textbox/MytextBox';
import TopBar from '../header/index';
import b from '../Func.js';
// import { DefaultRenderer } from 'react-native-router-flux';

var width = Dimensions.get('window').width;

var mss_state_1 = require('../../img/mss.png')
var mss_state_2 = require('../../img/mss2.png')
var ess_state_1 = require('../../img/ess2.png')
var ess_state_2 = require('../../img/ess.png')
var profile_state_1 = require('../../img/profile.png')
var profile_state_2 = require('../../img/profile_2.png')
var notification_state_1 = require('../../img/notification.png')
var notification_state_2 = require('../../img/notification_2.png')
var mail_state_1 = require('../../img/mail_icon.png')
var mail_state_2 = require('../../img/mail_icon_2.png')
var home_state_1 = require('../../img/home.png')
var home_state_2 = require('../../img/home_2.png')
var scr_bckgrnd = require('../../img/ess_background.png')
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            screen_background: scr_bckgrnd,
            mss: mss_state_1,
            ess: ess_state_1,
            home_pressed: true,
            mail_pressed: false,
            notification_pressed: false,
            profile_pressed: false,
            is_allowed_mss: false,
            user_emp_earea: ''
        }
    }

    async componentWillMount() {
        //var id= await b.retrieveItem("user_id");
        //alert(id);
        console.log('will mount home')
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });

        user_earea_dtl = await b.retrieveItem("user_earea");
        console.log(user_earea_dtl)
        if (user_earea_dtl == '1000') {
            this.setState({
                user_emp_earea: user_earea_dtl,
                is_allowed_mss: true
            })
            console.log(this.state.user_emp_earea)
        }
        else {
            this.setState({
                user_emp_earea: user_earea_dtl,
                is_allowed_mss: false
            })
        }
    }

    componentWillUnmount() {
        console.log('unmount')
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }

    mss_pressin = () => {
        this.setState({
            mss: mss_state_2
        });
    }
    mss_pressout = () => {
        this.setState({
            mss: mss_state_1
        });
    }
    ess_pressin = () => {
        this.setState({
            ess: ess_state_2
        });
    }
    ess_pressout = () => {
        this.setState({
            ess: ess_state_1
        });
    }

    tonotification = () => {
        //  navigate('page3')
        this.props.navigation.navigate(`ROUTE_NAME`, { param: 'param value' });
        // this.props.navigation.navigate('notification')
    }

    toesspage = () => {
        //  navigate('page3')
        this.props.navigation.push('EssMain')
    }

    tomsspage = () => {
        this.props.navigation.push('MssIndex')
    }

    render() {
        const { navigate } = this.props;
        return (

            <ImageBackground source={this.state.screen_background}
                style={styles.backgroundImage} >
                <View style={{ justifyContent: 'space-evenly' }}>
                    <TopBar
                        home_state={this.state.home_pressed}
                        profile_state={this.state.profile_pressed}
                        mail_state={this.state.mail_pressed}
                        notification_state={this.state.notification_pressed}
                        navigate={navigate}
                    >
                    </TopBar>
                    <View style={{ marginTop: 200, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={styles.firstbutton}>
                            <TouchableWithoutFeedback onPress={this.toesspage} onPressIn={this.ess_pressin} onPressOut={this.ess_pressout}>
                                <Image
                                    style={styles.button}
                                    source={this.state.ess}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.secondbutton}>
                            {this.state.is_allowed_mss ? <TouchableWithoutFeedback onPress={this.tomsspage} onPressIn={this.mss_pressin} onPressOut={this.mss_pressout}>
                                <Image
                                    style={styles.button}
                                    source={this.state.mss}
                                />
                            </TouchableWithoutFeedback> : null}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    firstbutton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
        // flex: 1
    },
    secondbutton: {
        justifyContent: "center",
        alignItems: "center",
        // flex: 2
    },
    backgroundImage: {
        flex: 1,
        // resizeMode: 'cover',
        width: null,
        height: null,
        // resizeMode: 'cover'
    },
    button: {
        height: 35,
        width: 200,
        alignItems: 'center',
        // paddingVertical:15,
        // paddingHorizontal:10,
        resizeMode: 'stretch'
    },
    button_1: {
        height: 35,
        width: 200,
        alignItems: 'center',
        // paddingVertical:15,
        // paddingHorizontal:10,
        resizeMode: 'stretch',
        zIndex: 100,
    }
});