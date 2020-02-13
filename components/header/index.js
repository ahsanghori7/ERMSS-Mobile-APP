import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider } from 'native-base';
import {
    Alert, Dimensions, StyleSheet, Text, View,
    BackHandler, ImageBackground, Image, TextInput,
    TouchableHighlight, TouchableOpacity
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';
//import { StackNavigator } from 'react-navigation';
import MytextBox from '../Textbox/MytextBox';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {withNavigation } from 'react-navigation';
// import View from '../Notification/index'
import b from '../Func.js';
// const { navigate } = this.props.navigation;

let mss_state_1 = require('../../img/mss.png')
let mss_state_2 = require('../../img/mss2.png')
let ess_state_1 = require('../../img/ess2.png')
let ess_state_2 = require('../../img/ess.png')
let profile_state_1 = require('../../img/profile.png')
let profile_state_2 = require('../../img/profile_2.png')
let notification_state_1 = require('../../img/notification.png')
let notification_state_2 = require('../../img/notification_2.png')
let mail_state_1 = require('../../img/mail_icon.png')
let mail_state_2 = require('../../img/mail_icon_2.png')
let home_state_1 = require('../../img/home.png')
let home_state_2 = require('../../img/home_2.png')
let logout_state_1 = require('../../img/logout.png')
let logout_state_2 = require('../../img/logout_2.png')
let header_img = require('../../img/test_1.png')

class TopBar extends Component {

    constructor(props) {
        super(props)

        Dimensions.addEventListener('change', () => {
            // alert('Dimensions Changed');
            this.setState({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,

            })
        });

        this.state = {
            profile: profile_state_1,
            mail: mail_state_1,
            notification: notification_state_1,
            logout: logout_state_1,
            home: home_state_1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

        }
    }

    componentDidMount() {

        console.log('props-home->', this.props.home)
        console.log('props-mail->', this.props.mail)
        console.log('props-notfication->', this.props.notification)
        console.log('props-profile->', this.props.profile)

        if (this.props.home_state == true) {
            this.setState({
                home: home_state_2,
                mail: mail_state_1,
                notification: notification_state_1,
                profile: profile_state_1,
            })
        }
        else if (this.props.mail_state == true) {
            this.setState({
                home: home_state_1,
                mail: mail_state_2,
                notification: notification_state_1,
                profile: profile_state_1,
            })
        }
        else if (this.props.notification_state == true) {
            this.setState({
                home: home_state_1,
                mail: mail_state_1,
                notification: notification_state_2,
                profile: profile_state_1,
            })
        }
        else if (this.props.profile_state == true) {
            this.setState({
                home: home_state_1,
                mail: mail_state_1,
                notification: notification_state_1,
                profile: profile_state_2,
            })
        }
    }

    home_pressin = () => {
        if (this.props.home_state == true) {
            this.setState({
                home: home_state_1
            })
        }
        else {
            this.setState({
                home: home_state_2
            })
        }
    }
    home_pressout = () => {
        if (this.props.home_state == true) {
            this.setState({
                home: home_state_2
            })
        }
        else {
            this.setState({
                home: home_state_1
            })
        }
    }
    logout_pressin = () => {
        this.setState({
            logout: logout_state_2
        });
    }
    logout_pressout = () => {
        this.setState({
            logout: logout_state_1
        });
    }
    notification_pressin = () => {
        if (this.props.notification_state == true) {
            this.setState({
                notification: notification_state_1
            })
        }
        else {
            this.setState({
                notification: notification_state_2
            })
        }
    }
    notification_pressout = () => {
        if (this.props.notification_state == true) {
            this.setState({
                notification: notification_state_2
            })
        }
        else {
            this.setState({
                notification: notification_state_1
            })
        }
    }
    setting_pressin = () => {
        this.setState({
            setting: require('../../img/settings_2.png')
        });
    }
    setting_pressout = () => {
        this.setState({
            setting: require('../../img/settings.png')
        });
    }
    profile_pressin = () => {
        if (this.props.profile_state == true) {
            this.setState({
                profile: profile_state_1
            })
        }
        else {
            this.setState({
                profile: profile_state_2
            })
        }
    }
    profile_pressout = () => {
        if (this.props.profile_state == true) {
            this.setState({
                profile: profile_state_2
            })
        }
        else {
            this.setState({
                profile: profile_state_1
            })
        }
    }

    mail_pressin = () => {
        if (this.props.mail_state == true) {
            this.setState({
                mail: mail_state_1
            })
        }
        else {
            this.setState({
                mail: mail_state_2
            })
        }
    }
    mail_pressout = () => {
        if (this.props.mail_state == true) {
            this.setState({
                mail: mail_state_2
            })
        }
        else {
            this.setState({
                mail: mail_state_1
            })
        }
    }

    tonotification = () => {
        //  navigate('page3')
        this.props.navigation.navigate('notification');
    }

    tomail = () => {
        //  navigate('page3')
        this.props.navigation.navigate('mail');
    }

    toprofile = () => {
        //  navigate('page3')
        this.props.navigation.navigate('Profile');
    }
    tohome_1 = () => {
        //  navigate('page3')
        this.props.navigation.navigate('Home');
        // this.setState({
        //     // home: require('../../img/mail_icon.png')
        // });
    }
    tosignin = () => {
        //  navigate('page3')
        b.clearAsyncStorage();
        this.props.navigation.replace('Login')
        // this.props.navigation.navigate('Login');

    }
    render() {
        return (
            <View style={{
                backgroundColor: '#0077c7',
                width: this.state.width,
                height: hp(9),
                marginTop: hp('0')
            }}>
                {/* <ImageBackground source={header_img}
                    style={styles.foregroundImage} > */}
                <View
                    style={{
                        //marginTop: hp('1.75'),
                        padding: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <View style={{}}>
                        <TouchableWithoutFeedback onPress={this.tohome_1} onPressIn={this.home_pressin} onPressOut={this.home_pressout}>
                            <Image
                                style={styles.button_header}
                                source={this.state.home}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{}}>
                        <TouchableWithoutFeedback onPress={this.tomail} onPressIn={this.mail_pressin} onPressOut={this.mail_pressout}>
                            <Image
                                style={styles.button_header}
                                source={this.state.mail}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{}}>
                        <TouchableWithoutFeedback onPress={this.tonotification} onPressIn={this.notification_pressin} onPressOut={this.notification_pressout}>

                            <Image
                                style={styles.button_header}
                                source={this.state.notification}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{}}>
                        <TouchableWithoutFeedback onPress={this.toprofile} onPressIn={this.profile_pressin} onPressOut={this.profile_pressout}>
                            <Image
                                style={styles.button_header}
                                source={this.state.profile}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{}}>
                        <TouchableWithoutFeedback
                            onPress={this.tosignin}
                            onPressIn={this.logout_pressin}
                            onPressOut={this.logout_pressout}>
                            <Image
                                style={styles.button_header}
                                source={this.state.logout}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {/* </ImageBackground> */}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    // foregroundImage: {
    //     width: this.state.width,
    //     height: 70,
    //     opacity: 0.1,
    // },
    button_header: {
        height: 25,
        width: 30,
        alignItems: 'center',
        // paddingVertical:15,
        // paddingHorizontal:10,
        resizeMode: 'stretch'
    },

});

export default withNavigation(TopBar);