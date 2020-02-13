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
//import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

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
            profile_pressed: true,
            width: Dimensions.get('window').width,            
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
        return (
            <View style={{ flex: 1 }}>
                <View style={
                    {
                        height: hp(40),
                        width: this.state.width
                    }
                }>

                    <ImageBackground
                        source={
                            { uri: user_image }
                        }
                        style={{
                            height: hp(40),
                            resizeMode: 'stretch',
                            width: this.state.width
                        }}>
                        <View style={{
                            position: 'absolute',
                            backgroundColor: 'grey',
                            opacity: 0.5,
                            top: 0,
                            left: 0,
                            height: hp(40),
                            width: this.state.width
                        }}>

                        </View>
                        <View style={{
                            left: 5,
                            height: 50,
                            width: 38,
                            //backgroundColor: 'blue',
                            //borderRadius: 50/2
                        }}>
                            <TouchableOpacity onPress={this.back_to_home} style={{
                                height: 50,
                                width: 38,
                            }}>
                                <Image source={require('../../img/icon_back_1.png')}
                                    style={{
                                        position: 'absolute',
                                        height: 50,
                                        width: 38,
                                        resizeMode: 'stretch'
                                    }} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.unamestyle}>
                            <Text style={{ fontSize: 20, color: 'white', fontFamily: 'normal' }}>
                                    {this.state.name + ' ' + this.state.lastname}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView>


                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_id.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.user_id} </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_father.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.fathername} </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_dob.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.dob} </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_nic.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.cnic} </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_join.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.joindt} </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_gender.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.gender}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_designation.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.designation}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_phone.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.contact}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_address.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.mailadd}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_zip.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.zip}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_city.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.city}  </Text>
                        </View>
                    </View>

                    <View style={[styles.icontextview, { width: this.state.width }]}>
                        <View style={styles.iconviewstyle}>
                            <Image source={require('../../img/icon_ctry.png')} style={styles.iconstyle} />
                        </View>
                        <View style={styles.textviewstyle}>
                            <Text style={styles.textstyle}> {this.state.ctry}  </Text>
                        </View>
                    </View>

                </ScrollView>

            </View>

            // <ImageBackground source={require('../../img/img_profile_back.png')} style={styles.backgroundImage}>
            //     <View>
            //     <View
            //         style={{
            //             // position: 'absolute',
            //             width: this.state.width,
            //             height: hp(9),
            //             marginTop: hp(0),
            //             backgroundColor: 'white',
            //             //backgroundColor: '#0077c7',
            //             flexDirection: 'row',
            //             // alignContent: 'center',
            //             // // marginLeft:wp(55),
            //             // justifyContent: 'center',
            //         }}>
            //         <View
            //             style={{
            //                 // position: 'absolute'
            //             }}>
            //             <TouchableOpacity
            //                 style={{
            //                     height: 50,
            //                     width: 30,
            //                     marginTop: hp(0.7),
            //                     paddingLeft:wp(1),
            //                    // marginLeft: wp(-13.5),
            //                     // position: 'absolute',
            //                     zIndex: 100,
            //                 }} onPress={this.back_to_home}>
            //                 <Image source={back_press} style={{
            //                     height: 50,
            //                     width: 50
            //                 }}></Image>
            //             </TouchableOpacity>
            //         </View>
            //         <View
            //             style={{
            //                 marginTop: hp(2.4),
            //                 width: this.state.width - wp(31),
            //                // backgroundColor:'red',
            //                 paddingLeft:wp(5)
            //             }}>
            //             <Text
            //                 style={{
            //                     textAlign: 'left',
            //                     fontSize: 20,
            //                     fontWeight: 'bold',
            //                     zIndex: 10,
            //                     fontFamily: 'notoserif',
            //                     color: '#0077c7',
            //                 }}>
            //                 Profile
            //         </Text>
            //         </View>
            //     </View>
            //         <View style={styles.container}>
            //             <View style={styles.container_back}>
            //                 <Image source={require('../../img/img_profile_whiteback.png')} style={styles.container_back} />
            //                 <View style={[styles.profile_content, styles.container_back]}>
            //                     <View style={styles.profile_img_area}>
            //                         {
            //                             imagetag
            //                         }
            //                         {/* <Image source={{uri: this.state.user_img}} style={[styles.profile_img_area, styles.profile_img]} /> */}
            //                     </View>
            //                     <ScrollView contentContainerStyle={styles.userinfo}>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> ID </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.user_id} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Name </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.name} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Last Name </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.lastname} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Father Name </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.fathername} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> D.O.B </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.dob} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> CNIC </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.cnic} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Joining Date </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.joindt} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Gender </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.gender} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Designation </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.designation} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Contact Number </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.contact} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Mailing Address </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.mailadd} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Postal/Zip Code </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.zip} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> City </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.city} </Text>
            //                         </View>
            //                         <View style={styles.usrdtl_view}>
            //                             <Text style={[styles.detail_left, styles.textdesign]}> Country </Text>
            //                             <Text style={[styles.detail_right, styles.textdesign]}> {this.state.ctry} </Text>
            //                         </View>
            //                     </ScrollView>
            //                 </View>
            //             </View>
            //         </View>
            //     </View>
            // </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    textstyle: {
        fontSize: 16,
        color: 'black'
    },
    unamestyle: {
        height: hp(10),
        width: wp(90),
        zIndex: 100,
        position: 'absolute',
        left: 5,
        bottom: hp(2),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icontextview: {
        height: hp(9),
        marginBottom: hp(2),
        flexDirection: 'row'
    },
    iconstyle: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'stretch'
    },
    iconviewstyle: {
        marginLeft: 5,
        height: hp(9),
        width: wp(13),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textviewstyle: {
        marginLeft: wp(5),
        height: hp(9),
        width: wp(80),
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomColor: '#D0D0D0',
        borderBottomWidth: 1
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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