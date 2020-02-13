import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    StyleSheet, Dimensions, Text, View,
    ImageBackground, BackHandler, Alert, ScrollView, Image, TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation';
//import { Row } from 'native-base';
import ImageSlider from 'react-native-image-slider';
import get_data from '../Func.js';
let mss_home_background = require('../../img/ess_background.png')
let blue_for_screen = require('../../img/blue_bar_for_every_screen.png')
let back_press = require('../../img/icon_back_2.png')
let mss_bar = require('../../img/mss_bar.png')
let ess_icon = require('../../img/employee.png')
//let background_image = require('../../img/bk.jpg')
let img_1 = require('../../img/backimage_1.jpg')
let img_2 = require('../../img/backimage_2.jpg')
let img_3 = require('../../img/backimage_3.jpg')
// let img_4 = require('../../img/backimage_4.jpg')
// let img_5 = require('../../img/backimage_5.jpg')
// let img_6 = require('../../img/backimage_6.jpg')


class mss_home_view extends Component {
    constructor(props) {
        super(props)


        Dimensions.addEventListener('change', () => {
            this.setState({
                //screen_background:background_image,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            })
        });

        this.state = {
            //screen_background:background_image,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }

    }

    componentDidMount() {
        var abc = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.navigate('Home')
            return true;
        });

        random_no = get_data.get_my_image()

        if (random_no == 1) {
            this.setState({
                temp_image: img_1
            })
            // myimage_5 = img_1
        }
        else if (random_no == 2) {
            this.setState({
                temp_image: img_2
            })
            // myimage_5 = img_2
        }
        else if (random_no == 3) {
            this.setState({
                temp_image: img_3
            })
            // myimage_5 = img_3
        }
        // else if (random_no == 4) {
        //     this.setState({
        //         temp_image: img_4
        //     })
        //     // myimage_5 = img_3
        // }
        // else if (random_no == 5) {
        //     this.setState({
        //         temp_image: img_5
        //     })
        //     // myimage_5 = img_3
        // }
        // else if (random_no == 6) {
        //     this.setState({
        //         temp_image: img_6
        //     })
        //     // myimage_5 = img_3
        // }
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }

    back_to_home = () => {
        // tmng = true
        // tsheetview = false
        // payslipview = false
        this.props.navigation.navigate('Home')
    }
    time_management_press = () => {
        this.props.navigation.navigate('timemanagemnt')
    }

    time_sheet_press = () => {
        this.props.navigation.navigate('Msstimesheet')
    }

    conveyance_press = () => {
        this.props.navigation.navigate('conveyance')
    }

    Monthlytime_sheet_press = () => {
        this.props.navigation.navigate('monthlytimesheet')
    }

    Dailytime_sheet_press = () => {
        this.props.navigation.navigate('dailytimesheet')
    }
    render() {
        // const images = [
        //     require('../../img/bk.jpg'),
        //     // require('../../img/backimage_2.jpg'),
        //     // require('../../img/backimage_5.jpg'),
        //     // require('../../img/backimage_6.jpg')
        // ];
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <View style={{
                    //position: 'absolute' 
                }}>
                    {/* <TouchableOpacity style={styles.backicon} onPress={this.back_to_home}>
                        <Image source={back_press} style={styles.leftimg}></Image>
                    </TouchableOpacity> */}
                    <View
                        style={{
                            // position: 'absolute',
                            width: this.state.width,
                            height: hp(9),
                            marginTop: hp(0),
                            backgroundColor: 'white',
                            // backgroundColor: '#0077c7',
                            flexDirection: 'row',
                            alignContent: 'center',
                            // marginLeft:wp(55),
                            justifyContent: 'center',
                            // backgroundColor: 'red',
                        }}>
                        <View
                            style={{
                                // position: 'absolute'

                            }}>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: 30,
                                    marginTop: hp(0.5),
                                    marginLeft: wp(-13.5),
                                    // position: 'absolute',
                                    zIndex: 100,
                                    // backgroundColor: 'red',
                                }} onPress={this.back_to_home}>
                                <Image source={back_press} style={{
                                    height: 50,
                                    width: 50
                                }}></Image>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                //backgroundColor: 'red',
                                // paddingTop: hp(3.2),
                                marginTop: hp(2.2),
                                // marginLeft: wp(10),
                                width: this.state.width - wp(31),
                                //width: wp(40),
                                // justifyContent: 'space-around',
                                // alignContent: 'center',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    // marginLeft: 10,
                                    // textAlignVertical:'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    zIndex: 10,
                                    color: '#0077c7'

                                }}>
                                Manager Self Service
                    </Text>
                        </View>
                    </View>
                </View>


                <View style={
                    {
                        height: hp(22),
                        width: this.state.width
                    }
                }>
                    <Image
                        source={
                            this.state.temp_image
                        }
                        style={{
                            resizeMode: 'stretch',
                            height: hp(22),
                            width: this.state.width
                        }} />
                </View>


                <View style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    justifyContent: 'flex-start'
                }}>
                    <View>
                        <ScrollView contentContainerStyle={styles.userinfo} >
                            <View style={{
                                zIndex: 100,
                                width: this.state.width - wp(3),
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: hp(10),
                                    flexDirection: 'row',
                                    position: 'relative',
                                    marginLeft: 0,
                                }}>
                                    <View
                                        style={{
                                            width: wp(13),
                                            height: wp(13),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={require('../../img/icon_timemanag.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View style={{
                                        marginLeft: 10,
                                        width: this.state.width - wp(20),
                                        borderBottomWidth: 1,
                                        height: hp(10),
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            textAlign: 'left',
                                            marginLeft: 3,
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            zIndex: 10
                                        }}
                                            onPress={this.time_management_press}>
                                            Time In/Out
                                        </Text>
                                    </View>

                                </View>
                                <View style={
                                    {
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        height: hp(10),
                                        flexDirection: 'row',
                                        position: 'relative',
                                        marginLeft: 0,
                                    }
                                }>
                                    <View style={
                                        {
                                            width: wp(13),
                                            height: wp(13),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }
                                    }>
                                        <Image source={require('../../img/icon_timesheetrpt.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }}>

                                        </Image>
                                    </View>

                                    <View style={{
                                        marginLeft: 10,
                                        width: this.state.width - wp(20),
                                        borderBottomWidth: 1,
                                        height: hp(10),
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={
                                            {
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }
                                        } onPress={this.time_sheet_press}>
                                            Time Sheet
                                        </Text>
                                    </View>

                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: hp(10),
                                    flexDirection: 'row',
                                    position: 'relative',
                                    marginLeft: 0,
                                }}>
                                    <View
                                        style={{
                                            width: wp(13),
                                            height: wp(13),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={require('../../img/icon_conveyance.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View style={{
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={
                                            {
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }
                                        } onPress={this.conveyance_press}>
                                            Conveyence Report
                                        </Text>
                                    </View>
                                </View>


                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: hp(10),
                                    flexDirection: 'row',
                                    position: 'relative',
                                    marginLeft: 0,
                                }}>
                                    <View
                                        style={{
                                            width: wp(13),
                                            height: wp(13),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={require('../../img/icon_dailytimesheet.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View style={
                                        {
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }

                                    }>
                                        <Text style={{
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }} 
                                            onPress={this.Dailytime_sheet_press}>
                                            Daily Time Sheet
                                        </Text>
                                    </View>

                                </View>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: hp(10),
                                    flexDirection: 'row',
                                    position: 'relative',
                                    marginLeft: 0,
                                }}>
                                    <View
                                        style={{
                                            width: wp(13),
                                            height: wp(13),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={require('../../img/icon_monthlytimesheet.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View style={{
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={{
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }} 
                                            onPress={this.Monthlytime_sheet_press}>
                                            Monthly Time Sheet
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userinfo: {
        //height: hp(150),
        justifyContent: 'center',
        alignContent: 'center',
    },
    myimage: {
        height: hp(20),
        width: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    },
    // foregroundImage: {
    //     // flex: 1,
    //     // resizeMode: 'cover',
    //     // alignSelf: "stretch",
    //     width: wp(100),
    //     height: 50,

    //     // resizeMode: 'cover'
    // },
    // backicon: {
    //     height: 50,
    //     width: 30,
    //     position: 'absolute',
    //     zIndex: 100,
    // },
    // leftimg: {
    //     height: 50,
    //     width: 50
    // },
});


export default withNavigation(mss_home_view);