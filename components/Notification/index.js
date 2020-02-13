import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider } from 'native-base';
import {
    Alert, Dimensions, StyleSheet, Text, View, BackHandler, ImageBackground,
    Image, TextInput, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native'
import MytextBox from '../Textbox/MytextBox';
import { StackNavigator } from 'react-navigation';
import TopBar from '../header/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let back_press = require('../../img/icon_back_2.png')

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: require('../../img/profile.png'),
            mail: require('../../img/mail_icon.png'),
            setting: require('../../img/settings.png'),
            notification: require('../../img/notification.png'),
            logout: require('../../img/logout.png'),
            home: require('../../img/home.png'),
            impressed: false,
            names: [
                { 'name': 'Test Notification', 'id': 1 },
                { 'name': 'Test Notification', 'id': 2 },
                { 'name': 'Test Notification', 'id': 3 },
                { 'name': 'Test Notification', 'id': 4 },
                { 'name': 'Test Notification', 'id': 5 },
                { 'name': 'Test Notification', 'id': 6 },
                { 'name': 'Test Notification', 'id': 7 },
                { 'name': 'Test Notification', 'id': 8 },
                { 'name': 'Test Notification', 'id': 9 },
                { 'name': 'Test Notification', 'id': 10 },
                { 'name': 'Test Notification', 'id': 11 },
                { 'name': 'Test Notification', 'id': 12 }
            ],
            home_pressed: false,
            mail_pressed: false,
            notification_pressed: true,
            profile_pressed: false
        }
    }
    componentDidMount() {
        var abc = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.navigate('Home')
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }
    home_pressin = () => {
        this.setState({
            home: require('../../img/home_2.png')
        });
    }
    home_pressout = () => {
        this.setState({
            home: require('../../img/home.png')
        });
    }
    logout_pressin = () => {
        this.setState({
            logout: require('../../img/logout_2.png')
        });
    }
    logout_pressout = () => {
        this.setState({
            logout: require('../../img/logout.png')
        });
    }
    notification_pressin = () => {
        this.setState({
            notification: require('../../img/notification_2.png')
        });
    }
    notification_pressout = () => {
        this.setState({
            notification: require('../../img/notification.png')
        });
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
        this.setState({
            profile: require('../../img/profile_2.png')
        });
    }
    profile_pressout = () => {
        this.setState({
            profile: require('../../img/profile.png')
        });
    }

    mail_pressin = () => {
        this.setState({
            mail: require('../../img/mail_icon_2.png')
        });
    }
    mail_pressout = () => {
        this.setState({
            mail: require('../../img/mail_icon.png')
        });
    }

    tonotification = () => {
        this.props.navigation.navigate('notification');
    }

    tomail = () => {
        this.props.navigation.navigate('mail');
    }

    toprofile = () => {
        this.props.navigation.navigate('profile');
    }
    tohome_1 = () => {
        this.props.navigation.navigate('Home');
    }
    tosignin = () => {
        this.props.navigation.navigate('Login');
    }
    tonotification_1 = () => {
        this.setState({
            notification: require('../../img/profile_2.png'),
            pressed: true
        })
    }
    back_to_home = () => {

        this.props.navigation.navigate('Home')
    }

    render() {
        const username = "";
        const password = "";


        return (
            <ImageBackground source={require('../../img/img_login_back.png')} style={styles.backgroundImage}>
                <View style={{ height: height, flex: 1 }}>
                <View
                    style={{
                        // position: 'absolute',
                        //width: this.state.width,
                        height: hp(9),
                        marginTop: hp(0),
                        backgroundColor: 'white',
                        //backgroundColor: '#0077c7',
                        flexDirection: 'row',
                        // alignContent: 'center',
                        // // marginLeft:wp(55),
                        // justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            // position: 'absolute'

                        }}>
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: 30,
                                marginTop: hp(0.7),
                                paddingLeft:wp(1),
                               // marginLeft: wp(-13.5),
                                // position: 'absolute',
                                zIndex: 100,
                            }} onPress={this.back_to_home}>
                            <Image source={back_press} style={{
                                height: 50,
                                width: 50

                            }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: hp(2.4),
                            width:wp(31),
                           // backgroundColor:'red',
                            paddingLeft:wp(5)
                        }}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 20,
                                fontWeight: 'bold',
                                zIndex: 10,
                                fontFamily: 'notoserif',
                                color: '#0077c7',
                            }}>
                            Notification
                    </Text>
                    </View>
                </View>

                    <ScrollView>
                        {
                            this.state.names.map((item, index) => (
                                <View key={item.id} style={styles.item}>
                                    <Text>{item.name}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    userinfo: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    text: {
        justifyContent: 'center',
        height: 20
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
})