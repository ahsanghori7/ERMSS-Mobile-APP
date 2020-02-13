import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import { AppRegistry, BackHandler, StyleSheet, ScrollView, Text, View, ImageBackground, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { MonthPickerDialog, MonthSelectorCalendar } from 'react-native-month-selector'
//import {MonthSelectorCalender} from 'reac'
import moment, { months } from 'moment';
import TimeManagement from '../ESS/timemanagement'
import TimeSheet from "../ESS/timesheet";
import PaySlip from "../ESS/payslip";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
height2 = height - 100

var tmngview = true;
var tsheetview = false;
var payslipview = false;

var tmng_state_1 = require('../../img/time_management.png')
var tmng_state_2 = require('../../img/time_management_2.png')

var tsheet_state_1 = require('../../img/time_sheet_report.png')
var tsheet_state_2 = require('../../img/time_sheet_report_2.png')

var payslip_state_1 = require('../../img/time_sheet_report.png')
var payslip_state_2 = require('../../img/time_sheet_report_2.png')

var ess_home_background = require('../../img/ess_background.png')
var blue_for_screen = require('../../img/blue_bar_for_every_screen.png')
var back_press = require('../../img/icon_back.png')
var ess_bar = require('../../img/ess_bar.png')
var tsheet_view_background = require('../../img/ess_1_background.png')
var payslip_view_background = require('../../img/ess_1_background.png')

export default class ESSMain extends Component {

    constructor(props) {
        super(props);
        isCancelled = false
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

    state = {
        tmng: tmng_state_2,
        tsheet: tsheet_state_1,
        payslip: payslip_state_1
    }

    tmng_pressin = () => {
        if (tmngview == true) {
            this.setState({
                tmng: tmng_state_1
            });
        }
        else {
            this.setState({
                tmng: tmng_state_2
            });
        }
    }
    tmng_pressout = () => {
        if (tmngview == true) {
            this.setState({
                tmng: tmng_state_2
            });
        }
        else {
            this.setState({
                tmng: tmng_state_1
            });
        }
    }

    tsheet_pressin = () => {
        if (tsheetview == true) {
            this.setState({
                tsheet: tsheet_state_1,
            });
        }
        else {
            this.setState({
                tsheet: tsheet_state_2,
            });
        }
    }
    tsheet_pressout = () => {
        if (tsheetview == true) {
            this.setState({
                tsheet: tsheet_state_2,
            });
        }
        else {
            this.setState({
                tsheet: tsheet_state_1,
            });
        }
    }

    payslip_pressin = () => {
        if (payslipview == true) {
            this.setState({
                payslip: payslip_state_1,
            });
        }
        else {
            this.setState({
                payslip: payslip_state_2,
            });
        }
    }
    payslip_pressout = () => {
        if (payslipview == true) {
            this.setState({
                payslip: payslip_state_2,
            });
        }
        else {
            this.setState({
                payslip: payslip_state_1,
            });
        }
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

        });

    }

    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            // DateText: moment(date).format('DD-MMM-YYYY')
            DateText: moment(date).month()
        });
    }

    tmng_press = () => {
        this.setState({
            tmng: tmng_state_2,
            tsheet: tsheet_state_1,
            payslip: payslip_state_1,
        })
        tmngview = true
        tsheetview = false
        payslipview = false
    }
    tsheet_press = () => {
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_2,
            payslip: payslip_state_1,

        })
        tmngview = false
        tsheetview = true
        payslipview = false
    }
    payslip_press = () => {
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_1,
            payslip: payslip_state_2,

        })

        tmngview = false
        tsheetview = false
        payslipview = true
    }
    back_to_home = () => {
        tmng = true
        tsheetview = false
        payslipview = false
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <ImageBackground source={ess_home_background}
                style={styles.backgroundImage} >
                <View style={{ position: 'absolute' }}>
                    <TouchableOpacity style={styles.backicon} onPress={this.back_to_home}>
                        <Image source={back_press} style={styles.leftimg}></Image>
                    </TouchableOpacity>
                    <Image source={ess_bar}
                        style={styles.foregroundImage} >
                    </Image>
                </View>

                <View style={styles.container}>
                    <View style={{ position: 'relative', left: 0, top: 20, height: 30 }}>
                        <ImageBackground source={blue_for_screen}
                            style={styles.foregroundImage_2} >
                            <View style={{ padding: 10, flexDirection: 'row' }} >
                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.tmng_press} onPressIn={this.tmng_pressin} onPressOut={this.tmng_pressout}>
                                        <Image
                                            style={styles.button}
                                            source={this.state.tmng}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.tsheet_press} onPressIn={this.tsheet_pressin} onPressOut={this.tsheet_pressout}>
                                        <Image
                                            style={styles.button_1}
                                            source={this.state.tsheet}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.payslip_press} onPressIn={this.payslip_pressin} onPressOut={this.payslip_pressout}>
                                        <Image
                                            style={styles.button_1}
                                            source={this.state.payslip}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    {tsheetview ? <View style={styles.tm_container} >
                        <TimeSheet>

                        </TimeSheet>
                    </View>
                        : null}
                    {tmngview ? <View style={styles.tm_container}>
                        <TimeManagement isCancelled={this.isCancelled ? true : false}>

                        </TimeManagement>
                    </View>
                        : null}
                    {payslipview ? <View style={styles.tm_container} >
                        <PaySlip>

                        </PaySlip>
                    </View >
                        : null
                    }
                </View >
            </ImageBackground >
        );
    }
}
const styles = StyleSheet.create({
    firstbutton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
        // flex: 1
    },
    tm_container: {
        //marginTop: 190,
        position: 'relative',
        top: height * 27 / 100,
        height: 600,
        marginLeft: 6,
        marginRight: 6,
        width: 356,
        opacity: 1,
    },
    tm_container_Image: {
        flex: 1,
        width: null,
        height: null,
    },
    secondbutton: {
        justifyContent: "center",
        alignItems: "center",
        // flex: 2
    },
    backgroundImage: {
        flex: 1,
        // resizeMode: 'cover',
        //marginVertical:10,
        width: null,
        height: null,
        // resizeMode: 'cover'
    },
    foregroundImage: {
        // flex: 1,
        // resizeMode: 'cover',
        // alignSelf: "stretch",
        width: width,
        height: 50,

        // resizeMode: 'cover'
    },
    foregroundImage_2: {
        // flex: 1,
        // resizeMode: 'cover',
        // alignSelf: "stretch",
        position: 'absolute',
        // paddingTop:100,
        marginVertical: 100,
        width: width,
        opacity: 1,
        zIndex: 100,
        //resizeMode: 'cover'
    },
    button: {
        // flex:2,
        height: 40,
        width: 115,
        opacity: 1,
        // marginVertical: 33,
        // // alignItems:'center',
        // marginLeft: 40,
        // marginRight: 20,
        // alignItems: 'center',
        // paddingVertical:15,
        // paddingHorizontal:10,
        resizeMode: 'stretch'
    },
    button_1: {
        height: 40,
        width: 115,
        opacity: 1,
        // marginVertical: 33,
        // // alignItems:'center',
        // marginLeft: 200,
        // alignItems: 'center',
        // paddingVertical:15,
        // paddingHorizontal:10,
        resizeMode: 'stretch'
    },
    datePickerBox: {
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center'
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
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});