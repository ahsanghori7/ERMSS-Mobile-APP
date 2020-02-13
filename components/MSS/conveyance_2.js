import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Text, View, ImageBackground, Image,
    TouchableWithoutFeedback, Dimensions, TextInput, BackHandler,ActivityIndicator
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { MonthPickerDialog, MonthSelectorCalendar } from 'react-native-month-selector'
//import {MonthSelectorCalender} from 'reac'
import moment, { months } from 'moment';
import b from '../Func'
import { StackNavigator, withNavigation } from 'react-navigation';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';

let user_id_dtl = '';
let user_earea_dtl = '';

// let tmng_view_background = require('../../img/ess_2_background.png')
let back_press = require('../../img/icon_back_1.png')
let tsheet_view_background = require('../../img/ess_1_background.png')
let dropdown_bar_img = require('../../img/dropdown_bar_2.png')
let submit_button_img = require('../../img/submit_button.png')
let text_field_img = require('../../img/text_fields_2.png')
let icon_back_1 = require('../../img/icon_back_1.png')
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
height2 = height - 100

class conveyanceReportMMS extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        DateText: '',
        DateHolder: null,
        user_id: '',
        user_earea: '',
        activity_loader: false,
        employee_data: [
            {
                id: '',
                name: ''
            }
        ],
        curDate: moment(new Date()).locale('en').format('MMMM YYYY'),
    }

    async componentDidMount() {
        user_id_dtl = await b.retrieveItem("user_id");
        user_earea_dtl = await b.retrieveItem("user_earea");
        this.setState({
            user_id: user_id_dtl,
            user_earea: user_earea_dtl
        })
    }

    async componentDidMount() {
        var abc = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.navigate('MssIndex')
            return true;
        });
    }

    async componentWillUnmount() {
        var that = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('Home')
            return true;
        });
    }

    back_to_home = () => {
       
        this.props.navigation.navigate('MssIndex')
    }

    _showDatePicker = () => {
        this.setState({
            isDatePickerVisible: true
        })
    }

    _handleDatePicked = (date) => {
        console.log(date)
        function_date = moment(date).format('MMMM')
        this.setState({
            isDatePickerVisible: false,
            curDate: moment(date).locale('en').format('MMMM YYYY')
        })
    };

    _hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    };

    async submit_press() {
        this.setState({
            activity_loader: true
        })

        let result = await b.getConveyanceReport(this.state.curDate, '02');
        
        if (result == 1) {

            this.props.navigation.navigate('ConveyanceReport')
            this.setState({
                activity_loader: false
            })
        }
        else if (result == 0) {
            ToastAndroid.show("No record found", ToastAndroid.SHORT);
            this.setState({
                activity_loader: false
            })
        }
        else {
            ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
            this.setState({
                activity_loader: false
            })
        }
    }
    updateUser = async (user) => {
        let temp_1 = user

        await this.setState({
            user_id: temp_1,
            // activity_loader: true,
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>

                
                <View style={{
                
                }}>
                   
                    <View
                        style={{
                            
                            width: this.state.width,
                            height: hp(9),
                            marginTop: hp(0),
                             backgroundColor: '#0077c7',
                            flexDirection: 'row',
                          
                        }}>
                        <View
                            style={{
                               

                            }}>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: 38,
                                    marginTop: hp(0.5),
                                    paddingLeft:wp(2),
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
                                Conveyance
                    </Text>
                        </View>
                    </View>
                </View>

                {/* <View style={{
                    //position: 'absolute' 
                    // backgroundColor:'red'
                }}>
                 
                    <View
                        style={{
                            // position: 'absolute',
                            width: this.state.width,
                            height: hp(9),
                            marginTop: hp(0),
                            backgroundColor: '#0077c7',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                            // marginLeft:wp(55),
                            //justifyContent: 'flex-start',
                        }}>

                        <View>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: 30,
                                    marginTop: hp(0.9),
                                    marginLeft: wp(-53),
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
                                //backgroundColor:'red',
                                // paddingTop: hp(3.2),
                                marginTop: hp(2.7),
                                marginLeft: wp(1.5),
                                width: this.state.width - wp(80),
                                marginLeft:wp(-38)
                                // justifyContent: 'flex-start',
                                // alignContent: 'flex-start',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    // marginLeft: 10,
                                    // textAlignVertical:'center',
                                    fontSize: 20,
                                    //fontStyle:'italic',
                                    fontWeight: 'bold',
                                    zIndex: 10,
                                    fontFamily: 'notoserif',
                                    color: 'white'

                                }}>
                                Conveyance
                    </Text>
                        </View>
                    </View>
                </View> */}


                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginTop: hp(2),
                }}>
                    <ScrollView>
                        <View
                            style={{
                                marginLeft: hp(1.75),
                                marginRight: hp(1.75),
                                // backgroundColor:'#d6d6d6'
                            }}>
                            {/* <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 0.75,
                                    borderBottomColor: 'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
                                    //backgroundColor:'red'
                                }}>
                                <View
                                    style={{
                                        marginLeft: wp(2),
                                        paddingTop: hp(2),
                                        // marginTop:hp(1.4),
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: hp(3.3),
                                        zIndex: 1000,
                                    }}>
                                    <View
                                        style={{
                                            // marginTop:hp(8.4),
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Employee
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // marginTop:wp(-1.2),
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            // marginLeft:hp(-1),
                                            marginTop: hp(-2)
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={dropdown_bar_img}
                                            style={{
                                                // marginLeft:wp(-0.1),
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'

                                            }} />
                                        <Picker
                                            style={{
                                                position: 'absolute',
                                                top: -5,
                                                left: -1,
                                                right: 0,
                                                bottom: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                                // fontWeight:'bold'
                                            }}
                                            mode="dropdown"
                                            enabled={false}
                                            selectedValue={this.state.user_id}
                                            onValueChange={this.updateUser}>
                                            {this.state.employee_data.map((emp) =>
                                                <Picker.Item
                                                    label={emp.name}
                                                    value={emp.id}
                                                    key={emp.id}
                                                />
                                            )}
                                        </Picker>
                                    </View>
                                </View>

                            </View> */}
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 0.75,
                                    // borderBottomColor:'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden',
                                    //backgroundColor:'red'
                                }}>
                                <View
                                    style={{
                                        marginLeft: wp(2),
                                        paddingTop: hp(2),
                                        // marginTop:hp(1.4),
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: hp(3.3),
                                        zIndex: 1000,
                                    }}>
                                    <View
                                        style={{
                                            // marginTop:hp(8.4),
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Month
                                </Text>
                                    </View>
                                </View>

                                <View style={{}}>
                                <View style={styles.datePickerBox}>
                                    {/* <Image
                                        source={text_field_img}
                                        style={styles.myimage} /> */}
                                    <Text
                                        style={{
                                            zIndex: 9999,
                                            fontSize: 13, position: 'absolute',
                                            top: 0, left: wp(-15), right: 0, bottom: 0,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            color: 'black',
                                        }}
                                        onPress={this._showDatePicker}
                                    >
                                        {this.state.curDate}
                                    </Text>
                                    <DateTimePicker
                                        isVisible={this.state.isDatePickerVisible}
                                        onConfirm={this._handleDatePicked}
                                        onCancel={this._hideDatePicker}
                                        mode={'date'}
                                    // is24Hour={false}
                                    />
                                </View>
                            </View>

                            </View>
                           
                        </View>


                    </ScrollView>
                    {this.state.activity_loader ?
                        <View
                            style={{
                                height: hp(8),
                                zIndex: 1000,
                                marginTop: hp(0.2),
                                // backgroundColor: 'blue'
                            }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: hp(5),
                                }}>
                                <View
                                    style={{
                                    }}>
                                    <View style={{}}>
                                        <ActivityIndicator
                                            size="large"
                                            color="#0077c7">
                                        </ActivityIndicator>
                                    </View>
                                </View>
                            </View>
                        </View>
                        : null}
                    <View
                        style={{
                            width: this.state.width,
                            height: hp(9),
                            marginTop: hp(0),
                            backgroundColor: '#0077c7',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                width: wp(100),
                                height: hp(7),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {/* <View></View> */}
                            <Text
                                style={{
                                    height: hp(7),
                                    marginTop: hp(2),
                                    width: wp(100),
                                    textAlign: 'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    zIndex: 10,
                                    fontFamily: 'notoserif',
                                    color: 'white'

                                }} onPress={() => this.submit_press()}>
                                Submit
                    </Text>
                        </View>
                    </View>
                </View>
                </View>



            
        )
    }
}
const styles = StyleSheet.create({
    firstbutton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    tm_container: {
        marginTop: 190,
        height: 300,
        marginLeft: 6,
        marginRight: 6,
        width: 356,
        opacity: 1,
    },
    tm_container_Image: {
        width: null,
        height: 300,
    },
    secondbutton: {
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    foregroundImage: {
        width: width,
        height: 50,
    },
    foregroundImage_2: {
        position: 'absolute',
        marginVertical: 100,
        width: width,
        height: 100,
        opacity: 1,
        zIndex: 100
    },
    button: {
        height: 40,
        width: 115,
        opacity: 1,
        resizeMode: 'stretch'
    },
    button_1: {
        height: 40,
        width: 115,
        opacity: 1,
        resizeMode: 'stretch'
    },
    datePickerBox: {
        width: 215,
        height: 38,
        //marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',

    },
    backicon: {
        height: 50,
        width: 30,
        position: 'absolute',
        zIndex: 100,
    },
    leftimg: {
        height: 50,
        width: 50,
        marginTop:hp(1)
    },
    btn: {
        height: 45,
        width: 100,
        marginTop: 15
    },
    img: {
        height: 45,
        width: 100,
        resizeMode: 'stretch'
    },
    myimage: {
        width: 205,
        height: 38,
        resizeMode: 'stretch'
    },
});

export default withNavigation(conveyanceReportMMS);