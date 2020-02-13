import React, { Component } from 'react'
import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Alert, Text, View, Image,
    TouchableWithoutFeedback, Dimensions, ToastAndroid, BackHandler
} from 'react-native'
import { TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { pickerValue, KeyboardAvoidingView } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { MonthPickerDialog, MonthSelectorCalendar } from 'react-native-month-selector'
//import {MonthSelectorCalender} from 'reac'
import moment, { months } from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigator, withNavigation } from 'react-navigation';
import b from '../Func'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';

let tmng_view_background = require('../../img/ess_2_background.png')
let text_field_img = require('../../img/text_fields_2.png')
let time_in_button = require('../../img/time_in_button.png')
let time_out_button = require('../../img/time_out_button.png')
let dropdown_bar_img = require('../../img/dropdown_bar_2.png')
let dropdown_bar_img2 = require('../../img/dropdown_bar_4.png')

let user_id_dtl = '';
let user_earea_dtl = '';
let arr_client_id = ''
let arr_emp_id = ''
let time_checked
let longitude_data = ''
let latitude_data = ''
// let isCancelled = false
let back_press = require('../../img/icon_back_1.png')

class timeManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            // client: "agp",
            // employee: '',
            curTime: moment(new Date()).locale('en').format('hh:mm A'),
            curDate: moment(new Date()).locale('en').format('MMMM Do YYYY'),
            time_in_out_view: true,
            client_disable: true,
            user: '',
            user_designation: 'FI Consultant',
            user_id: '',
            user_emp_earea: '',
            designation: '',
            department: '',
            default_client: '150046',
            activity_loader: true,
            DateText: '',
            DateHolder: null,
            ontextfocus: false,
            client: [
                {

                }
            ],
            client_data: [
                {
                    id: '',
                    name: '',
                }
            ],
            employee_data: [
                {
                    id: '',
                    name: ''
                }
            ],
            employee_val: '',
            txtremarks: '',
            time_in_text: 'Time In',
            time_out_text: 'Time Out'
        }
        this.temp_time = false
    }
    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    async componentDidMount() {
        console.log('first time aya')
        if (this.temp_time == false) {
            // Alert.alert("isCancelled")
            setInterval(() => {
                this.setState({
                    curTime: moment(new Date()).locale('en').format('hh:mm A')
                })
            }, 1000)
        }

        user_id_dtl = await b.retrieveItem("user_id");
        user_earea_dtl = await b.retrieveItem("user_earea");
        this.setState({
            user_id: user_id_dtl,
            user_emp_earea: user_earea_dtl,
            activity_loader: true,
        })
        this.get_clients_dtl()
    }

    get_clients_dtl = async () => {
        console.log('first time aya idher in getting client details')

        await fetch('http://snova786-002-site6.etempurl.com/api/TM/essTimeMgmt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": this.state.user_id,
                "date": moment(new Date()).format('YYYY-MM-DD'),
                "user_role": this.user_emp_earea
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (JSON.stringify(responseJson) === '[]') {
                    Alert.alert("Invalid Entry");
                }
                else {
                    this.state.designation = responseJson[0].empdesignation
                    this.state.department = responseJson[0].empdepart
                    this.state.client = responseJson[0].clientname[0]
                    let cliend_id = responseJson[0].clientid
                    console.log('disabletimein', responseJson[0].disabletimein)
                    console.log('cliend_id', responseJson[0].clientid)
                    time_checked = responseJson[0].disabletimein
                    // element.splice(0,1)
                    responseJson[0].empname.forEach(element => {
                        this.state.employee_data.push({
                            id: element.Value,
                            name: element.Text
                        })
                    });
                    if (b.getAllEmployees().length <= 1) {
                        b.fillAllEmployees(responseJson[0].empname);
                    }
                    responseJson[0].clientname.forEach(element => {
                        this.state.client_data.push({
                            id: element.Value,
                            name: element.Text
                        })
                    });
                    if (time_checked == true) {
                        time_checked = false
                        this.setState({
                            default_client: cliend_id,
                            client_disable: false
                        })
                    }
                    else {
                        time_checked = true
                    }
                    console.log(time_checked)
                    this.setState({
                        activity_loader: false,
                        time_in_out_view: time_checked
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    async componentDidsMount() {

      tempID_out = navigator.geolocation.getCurrentPosition((position) => {
            latitude_data = position.coords.latitude
            longitude_data = position.coords.longitude
        },
            (error) => {
                latitude_data = '01'
                longitude_data = '01'
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })

        var that = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('EssMain')
            return true;
        });
    }

    async componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.interval = false;
        this.setState({
            curTime: ''
        })
        this.temp_time = true

        var that = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('Home')
            return true;
        });
    }


    async time_in_press() {

        this.setState({
            activity_loader: true
        })
        console.log('empid->', this.state.user_id)
        console.log('userid->', this.state.user_id)
        console.log('clientid->', this.state.default_client)
        console.log('date->', moment(new Date()).format('YYYY-MM-DD'))
        console.log('time->', moment(new Date()).format('hh:mm'))
        console.log('type->', '01')
        console.log('remarks->', this.state.txtremarks)
        console.log('lng->', longitude_data)
        console.log('lat->', latitude_data)

    //    alert("lng "  + longitude_data);
    //    alert("lat" + latitude_data)

        // await this.insertAttdData
        let result = await b.time_in_time_out(
        
            this.state.user_id,
            this.state.user_id,
            this.state.default_client,
            moment(new Date()).format('YYYY-MM-DD'),
            moment(new Date()).format('HH:mm'),
            this.state.txtremarks,
            latitude_data,
            longitude_data
        )
        this.setState({
            //  time_in_out_view: false,
            activity_loader: false,
            // client_disable: false
        })

             console.log(result);
        if (result == 1) {
            ToastAndroid.show("Successfully Timed In", ToastAndroid.SHORT);
            this.setState({
                time_in_out_view: false,
                client_disable: false
            })
        }
        else if (result == 3) {
            ToastAndroid.show("No or bad connection available", ToastAndroid.SHORT);
        }
        else {
            ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
        }
    }

    async  time_out_press() {
        console.log('time out main aya')

        console.log('empid->', this.state.user_id)
        console.log('userid->', this.state.user_id)
        console.log('clientid->', this.state.default_client)
        console.log('date->', moment(new Date()).format('YYYY-MM-DD'))
        console.log('time->', moment(new Date()).format('hh:mm'))
        console.log('type->', '02')
        console.log('remarks->', this.state.txtremarks)
        console.log('lng->', longitude_data)
        console.log('lat->', latitude_data)

        // alert("lng "  + longitude_data);
        // alert("lat" + latitude_data)
 
        this.setState({
            activity_loader: true
        })
        let result = await b.time_in_time_out(
            this.state.user_id,
            this.state.user_id,
            this.state.default_client,
            moment(new Date()).format('YYYY-MM-DD'),
            moment(new Date()).format('HH:mm'),
            '01',
            this.state.txtremarks,
            latitude_data,
            longitude_data
        )
        this.setState({
            activity_loader: false
        })
        if (result == 1) {
            ToastAndroid.show("Successfully Timed out", ToastAndroid.SHORT);
            this.setState({
                time_in_out_view: true,
                client_disable: true,
            })
        }
        else if (result == 3) {
            ToastAndroid.show("No or bad connection available", ToastAndroid.SHORT);
        }
        else {
            ToastAndroid.show("Found some error please try again", ToastAndroid.SHORT);
        }
        console.log(this.state.time_in_out_view)
    }

    updateClient = (client) => {
        this.setState({
            user: client,
            default_client: client
        })
    }
    updateUser = (user) => {
        this.setState({
            user: user,
            user_id: user
        })
    }
    back_to_home = () => {
        this.props.navigation.navigate('EssMain')
    }
    // a = () =>{
    //     alert('a')
    // }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignContent: 'center',
                    backgroundColor: 'white'
                }}>
                <View
                    style={{
                        // position:'absolute'
                    }}>
                    {/* <View
                        style={{
                            width: this.state.width,
                            height: hp(11),
                            marginTop: hp(0),
                            backgroundColor: '#0077c7',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                marginTop: hp(0.5),
                                width: this.state.width - wp(80),
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    zIndex: 10,
                                    fontFamily: 'notoserif',
                                    color: 'white'
                                }}>
                                ESS
                    </Text>
                        </View>
                    </View> */}
                    <View
    style={{
      //  width: this.state.width,
      width:'100%',
        height: hp(9),
        // flex:1,
        marginTop: hp(0),
        // backgroundColor: '#d5e6f2',
        backgroundColor: '#0077c7',
        flexDirection: 'row',
        // alignContent: 'flex-start',
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
                marginTop: hp(0.8),
                marginLeft: wp(-34),
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
            // marginLeft: wp(3),
            // marginTop: hp(1.5),
            width: wp(80),
            alignContent: 'center',
            justifyContent: 'center',
            marginLeft: wp(-51)
        }}>
        <View
            style={{
                alignContent: 'center',
                justifyContent: 'center',

            }}>
            <Text
                style={{

                    left:wp(31),
                    top:-0.9,
                    fontSize: 20,
                    // fontStyle: 'italic',
                    fontWeight: 'bold',
                    zIndex: 10,
                    fontFamily: 'notoserif',
                    color: 'white'
                }}>
                {this.state.time_in_out_view ? this.state.time_in_text : this.state.time_out_text}
            </Text>
        </View>
    </View>
</View>
                </View>


                <View
                    style={{
                        height: hp(8),
                        zIndex: 1000,
                        backgroundColor: '#d5e6f2',
                        // marginBottom: hp(0.10),
                        //borderWidth: 1,
                        //borderBottomColor: 'transparent',
                        // borderColor: 'black',
                        overflow: 'hidden'
                    }}>
                    {/* <View
                        style={{
                            marginLeft: wp(2),
                            paddingTop: hp(2),
                            // marginTop:hp(1.4),
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                            height: hp(3.3),
                            zIndex: 1000,
                            overflow: 'hidden',
                            //marginRight:0

                        }}>
                        <View
                            style={{
                                overflow: 'hidden'
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
                    </View> */}
                    <View
                        style={{
                            flex: 1,
                            // marginTop:wp(-1.2),
                            //marginRight:0,
                            height: hp(7.7),
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#d5e6f2',
                        }}
                    >
                        <View
                            style={{
                                // marginLeft:hp(-1),
                                // marginTop: hp(-2),
                                backgroundColor: '#d5e6f2',
                                // backgroundColor: 'green'
                            }}>
                            <Image source={dropdown_bar_img2}
                                style={{
                                    // marginLeft:wp(-0.1),
                                    width: wp(100) - wp(6.35),
                                    height: 38,
                                    resizeMode: 'stretch',
                                    backgroundColor: '#d5e6f2'
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
                                    color: 'black',  // fontWeight:'bold'
                                }}
                                textStyle={{
                                    fontWeight: 'bold',
                                    fontSize: '20'
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
                </View>



                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: hp(2),
                        // backgroundColor:'red'
                    }}>
                    <ScrollView>
                        <View
                            style={{
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                marginLeft: hp(1.75),
                                marginRight: hp(1.75),
                                // backgroundColor: 'red'
                            }}>

                            {/* Input Fields */}

                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderBottomColor: 'transparent',
                                    overflow: 'hidden'
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Client
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            // backgroundColor: 'green'
                                            marginTop: hp(-2)
                                        }}>
                                        <Image source={dropdown_bar_img}
                                            style={{
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
                                                //fontWeight:'bold'
                                            }}
                                            mode="dropdown"
                                            enabled={this.state.client_disable}
                                            selectedValue={this.state.default_client}
                                            onValueChange={this.updateClient}>
                                            {this.state.client_data.map((client) =>
                                                <Picker.Item
                                                    label={client.name}
                                                    value={client.id}
                                                    key={client.id}
                                                />
                                            )}
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    borderBottomColor: 'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Department
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            //marginTop: hp(-2)
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <TextInput
                                            editable={false}
                                            value={this.state.department}
                                            underlineColorAndroid='transparent'
                                            style={{
                                                fontSize: 15,
                                                // fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 3,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    borderBottomColor: 'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Designation
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            // marginTop: hp(-2)
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <TextInput
                                            editable={false}
                                            value={this.state.designation}
                                            underlineColorAndroid='transparent'
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 3,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    borderBottomColor: 'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
                                }}>
                                <View
                                    style={{
                                        marginLeft: wp(2),
                                        paddingTop: hp(2),
                                        //overflow: 'hidden',
                                        // marginTop:hp(1.4),
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: hp(3.3),
                                        zIndex: 1000,
                                    }}>
                                    <View
                                        style={{
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Date
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        overflow: 'hidden'
                                    }}>
                                    <View
                                        style={{
                                            //marginTop: hp(-2),

                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                //overflow: 'hidden',
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch',
                                            }} />
                                        <TextInput
                                            editable={false}
                                            value={ this.state.activity_loader ?  null : this.state.curDate }
                                            underlineColorAndroid='transparent'
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 3,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    borderBottomColor: 'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Time
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            // marginTop: hp(-2)
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <TextInput
                                            editable={false}
                                            value={ this.state.activity_loader ?  null : this.state.curTime }
                                            underlineColorAndroid='transparent'
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 3,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: hp(8),
                                    zIndex: 1000,
                                    backgroundColor: '#ffffff',
                                    // marginBottom: hp(0.10),
                                    borderWidth: 1,
                                    // borderBottomColor:'transparent',
                                    borderColor: 'black',
                                    overflow: 'hidden'
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Remarks
                                </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        // marginTop:hp(20),
                                        flex: 1,
                                        height: hp(7.7),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            marginTop: hp(-2)
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <TextInput
                                            // editable={false}
                                            onChangeText={remarks => this.setState({ txtremarks: remarks })}
                                            value={this.state.txtremarks}
                                            underlineColorAndroid='grey'
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 3,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            
                            <View>

                            </View>

                            {/* time in / out button */}
                            <View>
                                {this.state.activity_loader ?
                                    <View
                                        style={{
                                            alignContent: 'center'
                                        }}>
                                        <ActivityIndicator
                                            size="large"
                                            color="#0077c7">
                                        </ActivityIndicator>
                                    </View>
                                    :
                                    <View
                                        style={{
                                            // marginTop: hp(50),
                                            // paddingTop:hp(20),
                                            height: hp(7),
                                            zIndex: 1000,
                                            marginTop: hp(21.4),
                                            marginBottom: 0
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                height: hp(7),
                                                backgroundColor: '#0077c7',
                                            }}>
                                            <View
                                                style={{
                                                }}>
                                                {this.state.time_in_out_view ?
                                                    <View
                                                        style={{
                                                            width: wp(100),
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <View
                                                            style={{
                                                                width: wp(100),
                                                                height: hp(7),
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                            <Text
                                                                onPress={() => this.time_in_press()}
                                                                style={{
                                                                    textAlign: 'center',
                                                                    fontSize: 20,
                                                                    fontWeight: 'bold',
                                                                    zIndex: 10,
                                                                    fontFamily: 'notoserif',
                                                                    color: 'white',
                                                                    width: wp(100),
                                                                    height: hp(7),
                                                                    marginTop: hp(2)
                                                                }}>
                                                                Time In
                                                    </Text>
                                                        </View>
                                                    </View>
                                                    : <View
                                                        style={{
                                                            width: wp(100),
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <View
                                                            style={{
                                                                width: wp(100),
                                                                height: hp(7),
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                // backgroundColor: 'green',
                                                            }}>
                                                            <Text
                                                                onPress={() => this.time_out_press()}
                                                                style={{
                                                                    width: wp(100),
                                                                    height: hp(7),
                                                                    marginTop: hp(2),
                                                                    textAlign: 'center',
                                                                    fontSize: 20,
                                                                    fontWeight: 'bold',
                                                                    zIndex: 10,
                                                                    fontFamily: 'notoserif',
                                                                    // backgroundColor: 'red',
                                                                    color: 'white'
                                                                }}>
                                                                Time Out
                                                    </Text>
                                                        </View>
                                                    </View>
                                                }
                                            </View>

                                        </View>
                                    </View>}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    tm_container: {
        marginTop: 190,
        height: 300,
        marginLeft: 6,
        marginRight: 6,
        width: 356,
        opacity: 1,
    },
    tm_container_Image: {
        // flex: 1,
        width: null,
        height: 430,
    },
    datePickerBox: {
        width: 215,
        height: 38,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    datePickerBox_1: {
        width: 205,
        height: 38,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    datePickerBox_2: {
        marginRight: 16,
        marginTop: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: 205,
        height: 38,
        justifyContent: 'center'
    },
    img: {
        height: 45,
        width: wp(100),
        resizeMode: 'stretch'
    },
    btn: {
        height: 45,
        width: wp(100),
        marginTop: 15
    },
    myimage: {
        width: 205,
        height: 38,
        resizeMode: 'stretch'
    },
    myimage_1: {
        top: 20,
        width: 205,
        height: 38,
        resizeMode: 'stretch'
    },
});

export default withNavigation(timeManagement);