import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Alert, Text, View,
    ToastAndroid, BackHandler,
    ImageBackground, Image, TouchableWithoutFeedback, Dimensions,Picker
} from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native'
import { pickerValue, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
//import {MonthSelectorCalender} from 'reac'
import moment from 'moment';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigator, withNavigation } from 'react-navigation';
import b from '../Func'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
}
    from 'react-native-responsive-screen';
// import { TimePicker } from 'react-time-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
let back_press = require('../../img/icon_back_1.png')
let function_date
let tmng_view_background = require('../../img/ess_2_background.png')
let text_field_img = require('../../img/text_fields_2.png')
let time_in_button = require('../../img/time_in_button.png')
let time_out_button = require('../../img/time_out_button.png')
let dropdown_bar_img = require('../../img/dropdown_bar_2.png')
let dropdown_bar_img2 = require('../../img/dropdown_bar_4.png')
let time_checked
let temp_bool_1 = false
let mss_temp_desg = ''
let mss_temp_dpt = ''
let user_id_dtl = ''
let user_earea_dtl = ''
// let isCancelled = false
let longitude_data = ''
let latitude_data = ''

class timeManagementMMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            client: "agp",
            employee: '',
            // curTime: moment(new Date()).locale('en').format('hh:mm A'),
            // curDate: moment(new Date()).locale('en').format('MMMM Do YYYY'),
            curTime_send: moment(new Date()).format('HH:mm'),
            curDate_send: moment(new Date()).format('YYYY-MM-DD'),
            time_in_out_view: true,
            user: '',
            user_id: '',
            user_emp_earea: '',
            user_designation: 'FI Consultant',
            designation: '',
            department: '',
            default_client: '150046',
            activity_loader: false,
            time_in_or_timeout: true,
            DateText: '',
            DateHolder: null,
            time_visable: false,
            txtremarks: '',
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
            isTimePickerVisible: false,
            isDatePickerVisible: false,
            time_in_text: 'Time In',
            time_out_text: 'Time Out'
            // client_disable:true,
        }
        this.temp_time = false
    }
    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }


    async componentDidMount() {


        user_id_dtl = await b.retrieveItem("user_id");
        user_earea_dtl = await b.retrieveItem("user_earea");
        this.setState({
            user_id: user_id_dtl,
            user_emp_earea: user_earea_dtl,
            activity_loader: true,
        })
        await this.get_clients_dtl()
        // temp_bool_1 = true
    }

    DatePickerMainFunctionCall = () => {

        let DateHolder = this.state.DateHolder;

        if (!DateHolder || DateHolder == null) {

            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder
            });
        }

        //To open the dialog
        this.refs.DatePickerDialog.open({

            date: DateHolder,
            mode: 'calendar'

        });

    }

    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            // DateText: moment(date).format('DD-MMM-YYYY')
            DateText: moment(date)
        });
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
                    this.setState({
                        designation: responseJson[0].empdesignation,
                        department: responseJson[0].empdepart,
                        client: responseJson[0].clientname[0],
                        curTime: moment(new Date()).locale('en').format('hh:mm A'),
                        curDate: moment(new Date()).locale('en').format('MMMM Do YYYY')
                    })

                    time_checked = responseJson[0].disabletimein
                    this.state.employee_data.splice(0, 1)
                    responseJson[0].empname.forEach(element => {
                        this.state.employee_data.push({
                            id: element.Value,
                            name: element.Text
                        })
                    });

                    if (b.getAllEmployees().length <= 1) {
                        b.fillAllEmployees(responseJson[0].empname);
                    }

                    console.log('designation ->', this.state.designation, 'department ->', this.state.department)

                    responseJson[0].clientname.forEach(element => {
                        this.state.client_data.push({
                            id: element.Value,
                            name: element.Text
                        })
                    });

                    console.log('disabletimein', responseJson[0].disabletimein)
                    let cliend_id = responseJson[0].clientid
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

                    this.setState({
                        activity_loader: false,
                        time_in_out_view: time_checked
                    })
                    responseJson = null
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    get_user_dtl = async () => {
        console.log('first time aya idher in getting user details')
        console.log('get user dtl main', this.state.user_id)
        await fetch('http://snova786-002-site6.etempurl.com/api/TM/essTimeMgmt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": this.state.user_id,
                "date": this.state.curDate_send,
                "user_role": this.user_emp_earea
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (JSON.stringify(responseJson) === '[]') {
                    Alert.alert("Invalid Entry");
                }
                else {
                    // console.log(responseJson)
                    mss_temp_desg = responseJson[0].empdesignation
                    mss_temp_dpt = responseJson[0].empdepart
                    time_checked = responseJson[0].disabletimein
                    let cliend_id = responseJson[0].clientid

                    if (time_checked == true) {
                        time_checked = false
                        this.setState({
                            default_client: cliend_id,
                            client_disable: false
                        })
                    }
                    else {
                        time_checked = true
                        this.setState({
                            client_disable: true
                        })
                    }
                    console.log('dpt->', mss_temp_dpt, 'desg->', mss_temp_desg)
                    this.setState({
                        activity_loader: false,
                        time_in_out_view: time_checked
                    })
                    responseJson = null
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // componentMount() {
    //     this.props.isCancelled = true;
    // }
    async componentDidMount() {
        // tempID_out = navigator.geolocation.getCurrentPosition((position) => {
        //     latitude_data = position.coords.latitude
        //     longitude_data = position.coords.longitude
        //     console.log('aya lat->', latitude_data)
        //     console.log('aya long->', longitude_data)
        // })

        tempID_out = navigator.geolocation.getCurrentPosition((position) => {
            latitude_data = position.coords.latitude
            longitude_data = position.coords.longitude
        },
            (error) => {
                latitude_data = '01'
                longitude_data = '01'
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 })

        var that = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('MssIndex')
            return true;
        });
    }

    async componentWillUnmount() {
        // Alert.alert(this.propssss.isCancelled)
        console.log('Yahan aya unmount honay')
        // let that = this;
        this.interval && clearInterval(this.interval);
        this.interval = false;
        this.setState({
            curTime: ''
        })
        console.log(this.temp_time)
        // this.props.isCancelled = true;

        this.temp_time = true
        var that = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('Home')
            return true;
        });
        console.log(this.temp_time)

        console.log(this.props.isCancelled)

    }
    async time_in_press() {
        // console.log('time in main aya')
        // this.setState({
        //     time_in_out_view: false,
        //     client_disable:false
        // })
        this.setState({
            activity_loader: true
        })
        console.log('empid->', this.state.user_id)
        console.log('userid->', this.state.user_id_dtl)
        console.log('clientid->', this.state.default_client)
        console.log('date->', this.state.curDate_send)
        console.log('time->', this.state.curTime_send)
        console.log('type->', '01')
        console.log('remarks->', this.state.txtremarks)
        console.log('lng->', longitude_data)
        console.log('lat->', latitude_data)

        // await this.insertAttdData
        let result = await b.time_in_time_out(
            this.state.user_id,
            user_id_dtl,
            this.state.default_client,
            this.state.curDate_send,
            this.state.curTime_send,
            '02',
            this.state.txtremarks,
            latitude_data,
            longitude_data
        )
        this.setState({
            // time_in_out_view: false,
            activity_loader: false,
        })
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
    async time_out_press() {
        // console.log('time out main aya')

        // this.setState({
        //     time_in_out_view: true,
        //     client_disable:true
        // })
        // console.log(this.state.time_in_out_view)
        console.log('time out main aya')

        let time = moment(this.state.curTime);
        this.setState({
            activity_loader: true
        })
        console.log('empid->', this.state.user_id)
        console.log('userid->', this.state.user_id)
        console.log('clientid->', this.state.default_client)
        console.log('date->', moment(new Date()).format('YYYY-MM-DD'))
        console.log('time->', moment(new Date()).format('hh:mm'))
        console.log('type->', '02')
        console.log('remarks->', this.state.txtremarks)
        console.log('lng->', '0')
        console.log('lat->', '0')

        let result = await b.time_in_time_out(
            this.state.user_id,
            user_id_dtl,
            this.state.default_client,
            this.state.curDate_send,
            this.state.curTime_send,
            '02',
            this.state.txtremarks,
            latitude_data,
            longitude_data
        )
        this.setState({
            // time_in_out_view: true,

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

    updateUser = async (user) => {
        let temp_1 = user

        await this.setState({
            user_id: temp_1,
            activity_loader: true,
        })

        console.log('update user main', this.state.user_id, 'user ye aya', user)
        await this.get_user_dtl()
        this.setState({
            designation: mss_temp_desg,
            // user_emp_earea: user_earea_dtl,
            activity_loader: false,
            department: mss_temp_dpt,
        })
    }

    updateClient = (client) => {
        this.setState({
            user: client,
            default_client: client
        })
    }


    _handleTimePicked = (time) => {
        console.log(time)
        this.setState({
            isTimePickerVisible: false,
            curTime: moment(time).locale('en').format('hh:mm A'),
            curTime_send: moment(time).format('HH:mm')
        })


    };

    _hideTimePicker = () => {
        this.setState({
            isTimePickerVisible: false
        })
    };

    _showTimePicker = () => {
        this.setState({
            isTimePickerVisible: true
        })
    }

    _showDatePicker = () => {
        this.setState({
            isDatePickerVisible: true
        })
    }
    _handleDatePicked = async (date) => {
        console.log(date)
        function_date = moment(date).format('YYYY-MM-DD')
        await this.setState({
            isDatePickerVisible: false,
            curDate: moment(date).locale('en').format('MMMM Do YYYY'),
            curDate_send: moment(date).format('YYYY-MM-DD'),
            activity_loader: true
        })

        await this.get_user_dtl()
        this.setState({
            activity_loader: false,
        })
    };

    _hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    };

    back_to_home = () => {
        this.props.navigation.navigate('MssIndex')
    }
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
                            width: this.state.width,
                            height: hp(9),
                            // flex:1,
                            marginTop: hp(0),
                            // backgroundColor: '#d5e6f2',
                            backgroundColor: '#0077c7',
                            flexDirection: 'row',
                            // alignContent: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <View>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: 30,
                                    marginTop: hp(0.7),
                                    marginLeft: wp(-65),
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
                                width: this.state.width - wp(80),
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
                                        textAlign: 'center',
                                        fontSize: 20,
                                        top: -0.9,
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
                                //marginTop: hp(-2),
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
                                mode="dropdown"
                                //enabled={false}
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
                                                left: 8,
                                                right: 0,
                                                bottom: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                                // fontWeight:'bold'
                                            }}
                                            mode="dropdown"
                                            // enabled={false}
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
                                            marginTop: hp(-1.3)
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
                                            value={this.state.department}
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
                                            // marginTop: wp(3.4),
                                            marginLeft: 1.5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View 
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                            }}>
                                            <TextInput
                                            editable={false}
                                            value={this.state.designation}
                                            underlineColorAndroid='transparent'
                                                style={{
                                                    fontSize: 15, //fontWeight: 'bold',
                                                    position: 'absolute', top: 0, left: 4,
                                                    right: 0, bottom: 0, justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: 'black',
                                                }}>
                                            </TextInput>
                                        </View>
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
                                    }}>
                                    <View
                                        style={{
                                            marginTop: 2.8,
                                            marginLeft: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <Text
                                            onPress={this._showDatePicker}
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                fontSize: 15,
                                                position: 'absolute', top: 0, left: 4,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                            {this.state.activity_loader ? null : this.state.curDate}
                                        </Text>
                                        <DateTimePicker
                                              isVisible={this.state.isDatePickerVisible}
                                              onConfirm={this._handleDatePicked}
                                              onCancel={this._hideDatePicker}
                                              mode={'date'}
                                        />
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
                                            marginTop: 10,
                                            marginLeft:8
                                            // backgroundColor: 'green'
                                        }}>
                                        <Image source={text_field_img}
                                            style={{
                                                width: wp(100) - wp(6.35),
                                                height: 38,
                                                resizeMode: 'stretch'
                                            }} />
                                        <Text
                                            // value={this.state.curTime}
                                            onPress={this._showTimePicker}
                                            style={{
                                                fontSize: 15, //fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 4,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                            {this.state.activity_loader ? null : this.state.curTime}
                                        </Text>
                                        <DateTimePicker
                                         isVisible={this.state.isTimePickerVisible}
                                         onConfirm={this._handleTimePicked}
                                         onCancel={this._hideTimePicker}
                                         mode={'time'}
                                         is24Hour={false}/>
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
                                                fontSize: 15,// fontWeight: 'bold',
                                                position: 'absolute', top: 0, left: 4,
                                                right: 0, bottom: 0, justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            {this.state.activity_loader ? <View
                                style={{
                                    alignContent: 'center'
                                }}>
                                <ActivityIndicator
                                    size="large"
                                    color="#0077c7">
                                </ActivityIndicator>
                            </View> :
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
                                                            alignItems: 'center'
                                                        }}>
                                                        <Text
                                                            onPress={() => this.time_out_press()}
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
                                                            Time Out
                                                    </Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>}
                        </View>
                    </ScrollView>
                </View>
            </View>
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
        width: 100,
        resizeMode: 'stretch'
    },
    btn: {
        height: 45,
        width: 100,
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

export default withNavigation(timeManagementMMS);