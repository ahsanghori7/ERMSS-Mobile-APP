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

let dropdown_bar_img = require('../img/dropdown_bar_2.png')
let back_press = require('../img/icon_back_1.png')
import b from './Func'
//import { Left } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

let TSrpt_data = '';
//let border_trans = 'black';

class Grid_2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            border_trans: '#ababab',
            width: Dimensions.get('window').width,
        }
    }
    componentDidMount() {
        TSrpt_data = b.getTSrpt_data();
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
                            // alignContent: 'center',
                            // // marginLeft:wp(55),
                            // justifyContent: 'center',
                            // backgroundColor: 'red',
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
                                    paddingLeft:wp(2),
                                   // marginLeft: wp(-13.5),
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
                                paddingLeft:wp(5)
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
                                    color:'white'
                                    //color: '#0077c7'

                                }}>
                                Time Sheet Report
                    </Text>
                        </View>
                    </View>
                </View>
                    <View style={{ backgroundColor: '#dbf1ff' }}>
                        <Text style={{
                            fontSize: 18,
                            padding: 10,
                            textAlign: 'left',
                            fontWeight: 'bold',
                            zIndex: 10,
                            fontFamily: 'notoserif',
                            color: 'black'
                        }}>
                            {TSrpt_data[0].empname}
                        </Text>

                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ScrollView style={{
                            marginTop: hp(2),
                            marginBottom: hp(2),
                        }}>
                            {
                                TSrpt_data.map((emp, i) => {
                                    if (i > 0) {
                                        // this.setState({
                                        //     border_trans: 'transparent'
                                        // })
                                        this.state.border_trans = 'transparent'
                                    }
                                    else if (i == 0) {
                                        //alert('called')
                                    }

                                    return (

                                        <View
                                            style={{
                                                marginLeft: hp(1.75),
                                                marginRight: hp(1.75),
                                                flexDirection: 'row',

                                            }}>

                                            <View
                                                style={{
                                                    //height: hp(18),
                                                    //paddingTop: hp(5),
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
                                                                    {emp.date} ({emp.day})
                                                            </Text>

                                                            </View>
                                                        </View>
                                                    </View>


                                                    <View
                                                        style={{
                                                            //marginLeft: wp(2),
                                                            paddingTop: hp(2),
                                                            // marginTop:hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-evenly',
                                                            alignItems: 'flex-end',
                                                            height: hp(3.3),
                                                            zIndex: 1000,
                                                            overflow: 'hidden',

                                                        }}>

                                                        <View
                                                            style={{
                                                                marginLeft: wp(4.5),
                                                                width: wp(50),
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
                                                                        marginLeft: wp(2),
                                                                        fontSize: 14,
                                                                        fontFamily: 'notoserif',
                                                                        color: '#878c90'
                                                                    }}>
                                                                    {emp.timein}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                width: wp(50),
                                                                marginLeft: wp(2),
                                                                paddingTop: hp(2),
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-evenly',
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
                                                                        marginLeft: wp(5),
                                                                        fontSize: 14,
                                                                        fontFamily: 'notoserif',
                                                                        color: '#878c90'
                                                                    }}>
                                                                    {emp.timeout}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            marginLeft: wp(2.3),
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
                                                            marginLeft: wp(-1.1),
                                                            paddingRight: hp(2),
                                                           // marginTop: hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                            zIndex: 1000,
                                                            overflow: 'hidden',
                                                            //backgroundColor:'red'
                                                        }}>
                                                        <View
                                                            style={{
                                                                overflow: 'hidden',
                                                                position: 'relative',
                                                                left: wp(1.5),
                                                                flex: 1,
                                                                flexWrap: 'wrap',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-start',
                                                                width: wp(80),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    marginLeft: wp(2),
                                                                    fontSize: 14,
                                                                    fontFamily: 'notoserif',
                                                                    color: '#878c90'
                                                                }}>
                                                                {emp.tin_remarks}
                                                            </Text>

                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: wp(-1.1),
                                                            paddingRight: hp(2),
                                                            //marginTop: hp(1.4),
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                            zIndex: 1000,
                                                            overflow: 'hidden',
                                                           // marginBottom: hp(1.4),
                                                           // backgroundColor:'green'
                                                        }}>
                                                        <View
                                                            style={{
                                                                overflow: 'hidden',
                                                                position: 'relative',
                                                                left: wp(1.5),
                                                                flex: 1,
                                                                flexWrap: 'wrap',
                                                                // flexDirection: 'row',
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-start',
                                                                width: wp(80),
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    marginLeft: wp(2),
                                                                    fontSize: 14,
                                                                    fontFamily: 'notoserif',
                                                                    color: '#878c90'
                                                                }}>
                                                                {emp.tout_remarks}
                                                            </Text>
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



export default Grid_2;