import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Alert, Text, View,
    ToastAndroid,
    ImageBackground, Image, TouchableWithoutFeedback, Dimensions,Picker
} from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native'
import { pickerValue, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
//import {MonthSelectorCalender} from 'reac'
import moment from 'moment';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigator, withNavigation } from 'react-navigation';
import b from '../Func'
// import { TimePicker } from 'react-time-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

let function_date
let tmng_view_background = require('../../img/ess_2_background.png')
let text_field_img = require('../../img/text_fields.png')
let time_in_button = require('../../img/time_in_button.png')
let time_out_button = require('../../img/time_out_button.png')
let dropdown_bar_img = require('../../img/dropdown_bar.png')
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
            curTime: moment(new Date()).locale('en').format('hh:mm A'),
            curDate: moment(new Date()).locale('en').format('MMMM Do YYYY'),
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
            // client_disable:true,
        }
        this.temp_time = false
    }
    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }


    async componentDidMount() {
        console.log('component will mount k ander')
        console.log(this.props.isCancelled)
        console.log(this.temp_time)

        if (this.temp_time == false) {

        }

        user_id_dtl = await b.retrieveItem("user_id");
        user_earea_dtl = await b.retrieveItem("user_earea");
        this.setState({
            user_id: user_id_dtl,
            user_emp_earea: user_earea_dtl,
            activity_loader: true,
        })
        this.get_clients_dtl()
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
    render() {
        return (
            <ImageBackground resizeMode={'stretch'} source={tmng_view_background}
                style={styles.tm_container_Image}>
                {/* <View style={{ flexDirection: "column", justifyContent: 'space-between' }}> */}
                <View style={styles.container}>
                    <View style={{ flex: 1, marginTop: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Employee
                    </Text>
                        </View>
                        {/* <View style={{ width: 220, height: 60 }}> */}
                        <View style={{ width: 220, height: 60 }}>
                            <View style={styles.datePickerBox} >
                                <Image source={dropdown_bar_img} style={styles.myimage} />
                                <Picker
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        left: 8,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
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
                    </View>

                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Client
                    </Text>
                        </View>
                        <View style={{ width: 220, height: 60 }}>
                            <View style={styles.datePickerBox} >
                                <Image source={dropdown_bar_img} style={styles.myimage} />
                                <Picker itemStyle={{ textAlign: 'center' }} style={{
                                    position: 'absolute', top: -5, left: 8, right: 0, bottom: 0,
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    mode="dropdown"
                                    enabled={this.state.client_disable}
                                    selectedValue={this.state.default_client}
                                    onValueChange={this.updateClient}
                                >
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

                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Department
                    </Text>
                        </View>
                        <View style={{ width: 220, height: 60 }}>
                            <View style={{}}>
                                <View style={styles.datePickerBox}>
                                    <Image source={text_field_img} style={styles.myimage} />
                                    <TextInput
                                        editable={false}
                                        value={this.state.department}
                                        underlineColorAndroid='transparent'
                                        style={{
                                            fontSize: 13, fontWeight: 'bold',
                                            color: 'black',
                                            position: 'absolute', top: 0, left: 10,
                                            right: 0, bottom: 0, justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Designation
                    </Text>
                        </View>
                        <View style={{ width: 220, height: 60 }}>
                            <View style={{}}>
                                <View style={styles.datePickerBox}>
                                    <Image source={text_field_img} style={styles.myimage} />
                                    <TextInput
                                        editable={false}
                                        value={this.state.designation}
                                        underlineColorAndroid='transparent'
                                        style={{
                                            fontSize: 13, position: 'absolute',
                                            top: 0, left: 10, right: 0, bottom: 0,
                                            justifyContent: 'center',
                                            color: 'black',
                                            alignItems: 'center'
                                        }}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Date
                    </Text>
                        </View>
                        <View style={{}}>
                            <View style={styles.datePickerBox}>
                                <Image
                                    source={text_field_img}
                                    style={styles.myimage} />
                                <Text
                                    style={{
                                        zIndex: 9999,
                                        fontSize: 13, position: 'absolute',
                                        top: 3, left: 10, right: 0, bottom: 0,
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
                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Time
                    </Text>
                        </View>
                        <View style={{ width: 220, height: 60 }}>
                            <View style={{}}>
                                <View style={styles.datePickerBox}>
                                    <Image
                                        source={text_field_img}
                                        style={styles.myimage}
                                    />
                                    <Text
                                        style={{
                                            zIndex: 9999,
                                            fontSize: 13, position: 'absolute',
                                            top: 3, left: 10, right: 0, bottom: 0,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            color: 'black'
                                        }}
                                        onPress={this._showTimePicker}
                                    >
                                        {this.state.curTime}
                                    </Text>
                                    <DateTimePicker
                                        isVisible={this.state.isTimePickerVisible}
                                        onConfirm={this._handleTimePicked}
                                        onCancel={this._hideTimePicker}
                                        mode={'time'}
                                        is24Hour={false}
                                    />
                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 100, height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                                Remarks
                    </Text>
                        </View>
                        <View style={{}}>
                            <View style={styles.datePickerBox}>
                                <Image source={text_field_img} style={styles.myimage} />
                                <TextInput
                                    value={this.state.txtremarks}
                                    onChangeText={remarks => this.setState({ txtremarks: remarks })}
                                    placeholder={'Enter Remarks'}
                                    underlineColorAndroid='transparent'
                                    style={{ fontSize: 13, position: 'absolute', top: 0, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                </TextInput>

                            </View>
                        </View>
                    </View>

                    <View style={{
                        flex: 1, marginTop: 50, flexDirection: 'row',
                        justifyContent: 'center', marginLeft: 0
                    }}>
                        {this.state.time_in_out_view ? <View>
                            <TouchableOpacity onPress={() => this.time_in_press()} style={styles.btn}>
                                <Image source={time_in_button} style={styles.img} />
                            </TouchableOpacity>
                        </View>
                            : <View style={{}}>
                                <TouchableOpacity onPress={() => this.time_out_press()} style={styles.btn}>
                                    <Image source={time_out_button} style={styles.img} />
                                </TouchableOpacity>
                            </View>}
                    </View>
                    {this.state.activity_loader ? <View style={{ alignContent: 'center' }} >
                        <ActivityIndicator size="large" color="#FF8000"></ActivityIndicator>
                    </View> : null}
                </View>
            </ImageBackground>
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