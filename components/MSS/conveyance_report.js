import React, { Component } from 'react'
import {
    Platform, StyleSheet, View, AppRegistry, Text, BackHandler,
    ScrollView, Image, Picker, TouchableOpacity, Dimensions, Alert
} from 'react-native'
import { StackNavigator, withNavigation } from 'react-navigation';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';

let dropdown_bar_img = require('../../img/dropdown_bar_2.png')
let back_press = require('../../img/icon_back_1.png')
import b from './../Func'
//import { Left } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

let ConveyanceRpt_data = '';


class conveyance_report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            border_trans: '#ababab',
            width: Dimensions.get('window').width,
        }
    }
    componentDidMount() {
        ConveyanceRpt_data = b.getConveyanceRptData();
        var abc = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.goBack()
            return true;
        });
    }

    async componentWillUnmount() {
        var abc = this;
        var pagetype = await b.retrieveItem('pagetype')
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.navigate(pagetype)
            return true;
        });
    }

    back_to_home = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <View style={styles.container}>
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
                                //backgroundColor: 'white',
                                backgroundColor: '#0077c7',
                                flexDirection: 'row',

                            }}>
                            <View
                                style={{
                                    // position: 'absolute'

                                }}>
                                <TouchableOpacity
                                    style={{
                                        height: 50,
                                        width: 38,
                                        marginTop: hp(0.5),
                                        paddingLeft: wp(2),
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

                                    marginTop: hp(2.2),
                                    width: this.state.width - wp(31),
                                    paddingLeft: wp(5)

                                }}>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        // marginLeft: 10,
                                        // textAlignVertical:'center',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        zIndex: 10,
                                        color: 'white'
                                        //color: '#0077c7'

                                    }}>
                                    Conveyance Report
                    </Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ backgroundColor: '#dbf1ff' }}>
                        <Text style={{
                            fontSize: 18,
                            padding: 10,
                            textAlign: 'left',
                            fontWeight: 'bold',
                            zIndex: 10,
                            fontFamily: 'notoserif',
                            color: 'black'
                        }}>
                            {DailyTSrpt_data[0].date} ({DailyTSrpt_data[0].day})
                            
                        </Text>

                    </View> */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            

                        }}>
                        <ScrollView style={{
                            marginTop: hp(2),
                            marginBottom: hp(2),
                            // backgroundColor: 'blue',

                        }}>
                            {
                                ConveyanceRpt_data.map((emp, i) => {
                                    if (i > 0) {

                                        this.state.border_trans = 'transparent'
                                    }
                                    else if (i == 0) {

                                    }

                                    return (

                                        <View
                                            style={{
                                                //backgroundColor:'red',

                                                marginLeft: hp(1.75),
                                                marginRight: hp(1.75),
                                                flexDirection: 'row',
                                                width:this.state.width,


                                            }}>

                                            <View
                                                style={{
                                                    width:this.state.width - wp(6.4),
                                                    //marginRight: hp(3),
                                                    zIndex: 1000,
                                                    backgroundColor: '#ffffff',
                                                    // marginBottom: hp(0.10),
                                                    borderWidth: 1,
                                                    borderTopColor: this.state.border_trans,
                                                    borderLeftColor: '#ababab',
                                                    borderRightColor: '#ababab',
                                                    borderBottomColor: '#dde0e5',
                                                    //borderColor: 'black',
                                                    overflow: 'hidden'
                                                }}>
                                                <LinearGradient colors={['#FFFFFF', '#F0F0F0', '#F0F0F0']} style={styles.linearGradient}>

                                                    <View
                                                        style={{
                                                            //marginLeft: wp(2),
                                                            paddingTop: hp(2),
                                                            // marginTop:hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'flex-end',
                                                            height: hp(3.3),
                                                            zIndex: 1000,
                                                            overflow: 'hidden',
                                                        }}>

                                                        <View
                                                            style={{
                                                                marginLeft: wp(2),
                                                                width: wp(80),
                                                                paddingTop: hp(2),
                                                                // marginTop:hp(1.4),
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-end',
                                                                height: hp(3.3),
                                                                zIndex: 1000,
                                                                overflow: 'hidden',
                                                            }}>
                                                            <View
                                                                style={{
                                                                    overflow: 'hidden'
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 15,
                                                                        fontFamily: 'notoserif',
                                                                        fontWeight: 'bold',
                                                                        color: 'black',
                                                                    }}>
                                                                    {emp.empname}
                                                                </Text>

                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginLeft: wp(2.1),
                                                            paddingTop: hp(2),
                                                            // marginTop:hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'flex-end',
                                                            height: hp(3.3),
                                                            zIndex: 1000,
                                                            overflow: 'hidden',
                                                            //marginRight:0
                                                            // backgroundColor:'blue'

                                                        }}>
                                                        <View
                                                            style={{
                                                                overflow: 'hidden'
                                                                // marginTop:hp(8.4),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 14,
                                                                    // fontStyle: 'italic',
                                                                    // color: 'black',
                                                                    fontFamily: 'notoserif',
                                                                    // fontWeight: 'bold'
                                                                    color: '#878c90'
                                                                }}>
                                                                {emp.clientname}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            //marginLeft: wp(2),
                                                            paddingTop: hp(2),
                                                            // marginTop:hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'flex-end',
                                                            height: hp(3.3),
                                                            zIndex: 1000,
                                                            overflow: 'hidden',
                                                        }}>

                                                        <View
                                                            style={{
                                                                marginLeft: wp(2.2),
                                                                width: wp(80),
                                                                paddingTop: hp(2),
                                                                // marginTop:hp(1.4),
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-end',
                                                                height: hp(3.3),
                                                                zIndex: 1000,
                                                                overflow: 'hidden',
                                                            }}>
                                                            <View
                                                                style={{
                                                                    overflow: 'hidden'
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontFamily: 'notoserif',
                                                                        // fontWeight: 'bold',
                                                                        color: '#878c90'
                                                                        // color: 'black',
                                                                    }}>
                                                                    {emp.no_of_visit}
                                                                </Text>

                                                            </View>
                                                        </View>
                                                    </View>

                                                </LinearGradient>
                                            </View>

                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </View>
            </View >
        )

    }

}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
            android: {}
        }),

        backgroundColor: 'white',
        flex: 1
    },
    linearGradient: {
        //flex: 1,
        //paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 5
    },
    title: {

        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        //fontStyle:'italic',
        fontWeight: 'bold',
        zIndex: 10,
        fontFamily: 'notoserif',
        color: 'white'
    },
});


export default conveyance_report;