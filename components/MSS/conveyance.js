import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Text, View, ImageBackground, Image,
    TouchableWithoutFeedback, Dimensions, TextInput,Picker
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { MonthPickerDialog, MonthSelectorCalendar } from 'react-native-month-selector'
//import {MonthSelectorCalender} from 'reac'
import moment, { months } from 'moment';
import b from '../Func'
import { StackNavigator, withNavigation } from 'react-navigation';
let user_id_dtl = '';
let user_earea_dtl = '';

// let tmng_view_background = require('../../img/ess_2_background.png')

let tsheet_view_background = require('../../img/ess_1_background.png')
let dropdown_bar_img = require('../../img/dropdown_bar.png')
let submit_button_img = require('../../img/submit_button.png')
let text_field_img = require('../../img/text_fields.png')
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
        curDate: moment(new Date()).locale('en').format('MMMM'),
    }

    async componentDidMount() {
        user_id_dtl = await b.retrieveItem("user_id");
        user_earea_dtl = await b.retrieveItem("user_earea");
        this.setState({
            user_id: user_id_dtl,
            user_earea: user_earea_dtl
        })
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
            curDate: moment(date).locale('en').format('MMMM')
        })
    };

    _hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    };

    submit_press() {
        //this.props.navigation.navigate('Grid')
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
            <View style={{}}>
                <ImageBackground resizeMode={'stretch'} source={tsheet_view_background}
                    style={styles.tm_container_Image}>
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
                                            color: 'black',
                                        }}
                                        mode="dropdown"
                                        // enabled={false}
                                        selectedValue={this.state.user_id}
                                        onValueChange={this.updateUser}>
                                        {b.getAllEmployees().map((emp) =>
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
                                    Month
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

                        <View style={{
                            flex: 1, marginTop: 50, flexDirection: 'row',
                            justifyContent: 'center', marginLeft: 0
                        }}>
                            <View>
                                <TouchableOpacity onPress={() => this.submit_press()} style={styles.btn}>
                                    <Image source={submit_button_img} style={styles.img} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.activity_loader ? <View style={{ alignContent: 'center' }} >
                            <ActivityIndicator size="large" color="#FF8000"></ActivityIndicator>
                        </View> : null}
                    </View>
                </ImageBackground>
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
        marginTop: 10,
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
        width: 50
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