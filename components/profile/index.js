import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider } from 'native-base';
import {
    Alert, Dimensions, StyleSheet, Text, View, BackHandler, ImageBackground,
    Image, TextInput, TouchableHighlight, TouchableOpacity, ScrollView
} from 'react-native'
//import { StackNavigator } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MytextBox from '../Textbox/MytextBox';
import { StackNavigator } from 'react-navigation';
import TopBar from '../header/index';
import b from '../Func.js';

let back_press = require('../../img/icon_back_2.png')
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var user_image = '';
var id = '';

export default class profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
            screenHeight: 0,
            user_id: '',
            name: '',
            lastname: '',
            fathername: '',
            dob: '',
            cnic: '',
            joindt: '',
            gender: '',
            designation: '',
            contact: '',
            mailadd: '',
            zip: '',
            city: '',
            ctry: '',
            user_img: require('../../img/img_profile_userimg.png'),
            home_pressed: false,
            mail_pressed: false,
            notification_pressed: false,
            profile_pressed: true
        };
    }
    async componentDidMount() {
        user_image = '';
        user_image = await b.retrieveItem("user_image");
        id = await b.retrieveItem("user_id");
        await this.getUserProfile(id);

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
    
    back_to_home = () => {

        this.props.navigation.navigate('Home')
    }

    getUserProfile = async (username) => {
        await fetch('http://snova786-002-site6.etempurl.com/api/Home/essTimeMgmt?user_id=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (JSON.stringify(responseJson) === '[]') {
                    Alert.alert("Invalid Username or Password");
                }
                else {
                    this.setState({
                        user_id: id,
                        name: responseJson[0].firstname,
                        lastname: responseJson[0].lastname,
                        fathername: responseJson[0].fathername,
                        dob: responseJson[0].dob,
                        cnic: responseJson[0].cnic,
                        joindt: responseJson[0].joindate,
                        gender: responseJson[0].gender,
                        designation: responseJson[0].desg,
                        contact: responseJson[0].contact,
                        mailadd: responseJson[0].empadd,
                        zip: responseJson[0].zip,
                        city: responseJson[0].city,
                        ctry: responseJson[0].ctry,
                    });

                    if (this.state.gender.toUpperCase() == "F") {
                        this.setState({
                            gender: "Female",
                        });
                    }
                    else {
                        this.setState({
                            gender: "Male",
                        });
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const username = "";
        const password = "";
        let imagetag;
        if (user_image == '') {
            imagetag = <Image source={this.state.user_img} style={[styles.profile_img_area, styles.profile_img]} />
        } else {
            imagetag = <Image source={{ uri: user_image }} style={[styles.profile_img_area, styles.profile_img]} />
        }



        return (
            <ImageBackground source={require('../../img/img_profile_back.png')} style={styles.backgroundImage}>
                <View>
                  
                <View
                    style={{
                        // position: 'absolute',
                        width: this.state.width,
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
                            width: this.state.width - wp(31),
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
                            Profile
                    </Text>
                    </View>
                </View>



                    <View style={styles.container}>
                        <View style={styles.container_back}>
                            <Image source={require('../../img/img_profile_whiteback.png')} style={styles.container_back} />
                            <View style={[styles.profile_content, styles.container_back]}>
                                <View style={styles.profile_img_area}>
                                    {
                                        imagetag
                                    }
                                    {/* <Image source={{uri: this.state.user_img}} style={[styles.profile_img_area, styles.profile_img]} /> */}
                                </View>
                                <ScrollView contentContainerStyle={styles.userinfo}>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> ID </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.user_id} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Name </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.name} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Last Name </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.lastname} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Father Name </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.fathername} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> D.O.B </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.dob} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> CNIC </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.cnic} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Joining Date </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.joindt} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Gender </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.gender} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Designation </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.designation} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Contact Number </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.contact} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Mailing Address </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.mailadd} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Postal/Zip Code </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.zip} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> City </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.city} </Text>
                                    </View>
                                    <View style={styles.usrdtl_view}>
                                        <Text style={[styles.detail_left, styles.textdesign]}> Country </Text>
                                        <Text style={[styles.detail_right, styles.textdesign]}> {this.state.ctry} </Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: hp('50')
    },
    container_back: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('65'),
        width: wp('90')
    },
    profile_content: {
        position: 'absolute'
    },
    profile_img_area: {
        position: 'absolute',
        top: 0,
        height: 150,
        width: 150,
        borderRadius: 75,
        overflow: 'visible',
        marginTop: -75,
        zIndex: 100
    },
    profile_img: {
        marginTop: 0,
        resizeMode: 'cover'
    },
    userinfo: {
        top: 80,
        width: wp('90'),
        height: hp('90')
    },
    detail_left: {
        position: 'absolute',
        left: wp('5')
    },
    detail_right: {
        position: 'absolute',
        left: wp('45'),
    },
    textdesign: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#283061',
        flex: 1,
        flexWrap: 'wrap',
        width: wp('43'),
        textAlign: 'left'
    },
    usrdtl_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        margin: 2,
    }
})