import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    Alert,
    ScrollView,
    Image
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';
import get_data from '../Func.js';
import ImageSlider from 'react-native-image-slider';
let ess_icon = require('../../img/employee.png')
let back_press = require('../../img/icon_back_2.png')
//let background_image = require('../../img/bk.jpg')
let img_1 = require('../../img/backimage_1.jpg')
let img_2 = require('../../img/backimage_2.jpg')
let img_3 = require('../../img/backimage_3.jpg')
// let img_4 = require('../../img/backimage_4.jpg')
// let img_5 = require('../../img/backimage_5.jpg')
// let img_6 = require('../../img/backimage_6.jpg')


class ESSMain_2 extends Component {
    constructor(props) {
        super(props)

        isCancelled = false
        this.state = {
            // tmng: tmng_state_2,
            // tsheet: tsheet_state_1,
            // payslip: payslip_state_1

            //screen_background: background_image,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            image_no: '',
            temp_image: ''
        }
        Dimensions.addEventListener('change', () => {
            // alert('Dimensions Changed');
            this.setState({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            })
        });
    }

    componentDidMount() {
        var that = this;
        tmngview = true;
        tsheetview = false;
        payslipview = false;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('Home')
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
        tmngview = true;
        tsheetview = false;
        payslipview = false;
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }
    totimemng = () => {
        this.props.navigation.push('Ess_timemng')
    }
    totimesheetrpt = () => {
        this.props.navigation.push('Ess_timesheet')
    }
    topaysliprpt = () => {
        this.props.navigation.push('Ess_payslip_2')
    }
    back_to_home = () => {
        tmng = true
        tsheetview = false
        payslipview = false
        this.props.navigation.navigate('Home')
    }
    render() {


        // const images = [
        //     require('../../img/bk.jpg'),
        //     // require('../../img/backimage_2.jpg'),
        //     // require('../../img/backimage_5.jpg'),
        //     // require('../../img/backimage_6.jpg')
        // ];
        return (
            <View style={{
                flex: 1,
                // alignContent:'center',
                // justifyContent: 'center',
                backgroundColor: 'white'
            }}>
                <View
                    style={{
                        // position: 'absolute',
                        width: this.state.width,
                        height: hp(9),
                        marginTop: hp(0),
                        backgroundColor: 'white',
                        //backgroundColor: '#0077c7',
                        flexDirection: 'row',
                        alignContent: 'center',
                        // marginLeft:wp(55),
                        justifyContent: 'center',
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
                                marginLeft: wp(-13.5),
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
                            //backgroundColor:'red'
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
                            Employee Self Service
                    </Text>
                    </View>
                </View>

                <View style={
                    {
                        height: hp(22),
                        width: this.state.width
                    }
                }>
                    <Image source={this.state.temp_image}
                        style={{
                            resizeMode: 'stretch',
                            height: hp(22),
                            width: this.state.width

                        }}></Image>
                </View>

                <View
                    style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                    }}>
                    <View>
                        <ScrollView
                            contentContainerStyle={
                                styles.userinfo
                            }>
                            <View
                                style={{
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
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }}>
                                        <Text
                                            onPress={this.totimemng}
                                            style={{
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }}>
                                            Time In/Out
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
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
                                            source={require('../../img/icon_timesheetrpt.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }}>
                                        <Text
                                            onPress={this.totimesheetrpt}
                                            style={{
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }}>
                                            Time Sheet
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
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
                                            source={require('../../img/icon_payslip.png')}
                                            style={{
                                                width: wp(8),
                                                height: wp(8),
                                                resizeMode: 'stretch',
                                            }} />
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            width: this.state.width - wp(20),
                                            borderBottomWidth: 1,
                                            height: hp(10),
                                            justifyContent: 'center',
                                        }}>
                                        <Text
                                            onPress={this.topaysliprpt}
                                            style={{
                                                textAlign: 'left',
                                                marginLeft: 3,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                zIndex: 10
                                            }}>
                                            PaySlip
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    userinfo: {
        // height: hp(100),
        // marginTop: wp(45),
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor:'red'
    },
    myimage: {
        height: hp(20),
        width: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    }
});
export default withNavigation(ESSMain_2);
