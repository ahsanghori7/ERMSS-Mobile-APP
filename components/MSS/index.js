import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Row, Picker } from 'native-base';
import {
    AppRegistry, StyleSheet, ScrollView, Text, View, ImageBackground,
    Image, TouchableWithoutFeedback, Dimensions, BackHandler, Alert
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { MonthPickerDialog } from 'react-native-month-selector'
import moment, { months } from 'moment';
import TimeManagement from '../MSS/timemanagement';
import TimeSheetReport from '../MSS/timesheetmss';
import DailyTimeSheet from '../MSS/dailytimesheet';
import MonthlyTimeSheet from '../MSS/monthlytimesheet';
import ConveyanceReportMMS from './conveyance';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
height2 = height - 100

let tmng_view_bool = true;
let tsheet_view_bool = false
let dtsheet_view_bool = false
let mtsheet_view_bool = false
let convrpt_view_bool = false

let tmng_state_1 = require('../../img/time_management.png')
let tmng_state_2 = require('../../img/time_management_2.png')
let tsheet_state_1 = require('../../img/time_sheet_report.png')
let tsheet_state_2 = require('../../img/time_sheet_report_2.png')
let dtsheet_state_1 = require('../../img/daily_time_sheet_report_mss.png')
let dtsheet_state_2 = require('../../img/daily_time_sheet_report_mss_2.png')
let mtsheet_state_1 = require('../../img/monthly_time_sheet_report_mss.png')
let mtsheet_state_2 = require('../../img/monthly_time_sheet_report_mss_2.png')
let convrpt_state_1 = require('../../img/conveyance_report_mss.png')
let convrpt_state_2 = require('../../img/conveyance_report_mss_2.png')


let mss_home_background = require('../../img/ess_background.png')
let blue_for_screen = require('../../img/blue_bar_for_every_screen.png')
let back_press = require('../../img/icon_back.png')
let mss_bar = require('../../img/mss_bar.png')
let tsheet_mss_view_background = require('../../img/ess_1_background.png')
let general_view_background = require('../../img/ess_1_background.png')

export default class MSSMain extends Component {

    state = {
        tmng: tmng_state_2,
        tsheet: tsheet_state_1,
        dtsheet: dtsheet_state_1,
        mtsheet: mtsheet_state_1,
        convrpt: convrpt_state_1,
    }

    componentDidMount() {
        let that = this;
        tmng_view_bool = true
        tsheet_view_bool = false
        dtsheet_view_bool = false
        mtsheet_view_bool = false
        convrpt_view_bool = false
        BackHandler.addEventListener('hardwareBackPress', function () {
            that.props.navigation.navigate('Home')
            return true;
        });
    }

    componentWillUnmount() {
        tmng_view_bool = true
        tsheet_view_bool = false
        dtsheet_view_bool = false
        mtsheet_view_bool = false
        convrpt_view_bool = false
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }

    tmng_pressin = () => {
        if (tmng_view_bool == true) {
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
        if (tmng_view_bool == true) {
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
        if (tsheet_view_bool == true) {
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
        if (tsheet_view_bool == true) {
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

    dtsheet_pressin = () => {
        if (dtsheet_view_bool == true) {
            this.setState({
                dtsheet: dtsheet_state_1,
            });
        }
        else {
            this.setState({
                dtsheet: dtsheet_state_2,
            });
        }
    }
    dtsheet_pressout = () => {
        if (dtsheet_view_bool == true) {
            this.setState({
                dtsheet: dtsheet_state_2,
            });
        }
        else {
            this.setState({
                dtsheet: dtsheet_state_1,
            });
        }
    }

    mtsheet_pressin = () => {
        if (mtsheet_view_bool == true) {
            this.setState({
                mtsheet: mtsheet_state_1,
            });
        }
        else {
            this.setState({
                mtsheet: mtsheet_state_2,
            });
        }
    }
    mtsheet_pressout = () => {
        if (mtsheet_view_bool == true) {
            this.setState({
                mtsheet: mtsheet_state_2,
            });
        }
        else {
            this.setState({
                mtsheet: mtsheet_state_1
            });
        }
    }

    convrpt_pressin = () => {
        if (convrpt_view_bool == true) {
            this.setState({
                convrpt: convrpt_state_1,
            });
        }
        else {
            this.setState({
                convrpt: convrpt_state_2,
            });
        }
    }
    convrpt_pressout = () => {
        if (convrpt_view_bool == true) {
            this.setState({
                convrpt: convrpt_state_2,
            });
        }
        else {
            this.setState({
                convrpt: convrpt_state_1,
            });
        }
    }

    tmng_press = () => {
        this.setState({
            tmng: tmng_state_2,
            tsheet: tsheet_state_1,
            dtsheet: dtsheet_state_1,
            mtsheet: mtsheet_state_1,
            convrpt: convrpt_state_1
        })
        tmng_view_bool = true
        tsheet_view_bool = false
        dtsheet_view_bool = false
        mtsheet_view_bool = false
        convrpt_view_bool = false

    }
    tsheet_press = () => {
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_2,
            dtsheet: dtsheet_state_1,
            mtsheet: mtsheet_state_1,
            convrpt: convrpt_state_1
        })
        tmng_view_bool = false
        tsheet_view_bool = true
        dtsheet_view_bool = false
        mtsheet_view_bool = false
        convrpt_view_bool = false
    }
    dtsheet_press = () => {
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_1,
            dtsheet: dtsheet_state_2,
            mtsheet: mtsheet_state_1,
            convrpt: convrpt_state_1
        })
        tmng_view_bool = false
        tsheet_view_bool = false
        dtsheet_view_bool = true
        mtsheet_view_bool = false
        convrpt_view_bool = false
    }
    mtsheet_press = () => {
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_1,
            dtsheet: dtsheet_state_1,
            mtsheet: mtsheet_state_2,
            convrpt: convrpt_state_1
        })
        tmng_view_bool = false
        tsheet_view_bool = false
        dtsheet_view_bool = false
        mtsheet_view_bool = true
        convrpt_view_bool = false
    }
    convrpt_press = () => {
        // alert('show idher')
        this.setState({
            tmng: tmng_state_1,
            tsheet: tsheet_state_1,
            dtsheet: dtsheet_state_1,
            mtsheet: mtsheet_state_1,
            convrpt: convrpt_state_2
        })
        tmng_view_bool = false
        tsheet_view_bool = false
        dtsheet_view_bool = false
        mtsheet_view_bool = false
        convrpt_view_bool = true
    }


    render() {
        return (
            <ImageBackground source={mss_home_background}
                style={styles.backgroundImage} >

                <View style={{ position: 'absolute' }}>
                    <TouchableOpacity style={styles.backicon} onPress={() => { this.props.navigation.navigate('Home') }}>
                        <Image source={back_press} style={styles.leftimg}></Image>
                    </TouchableOpacity>
                    <Image source={mss_bar}
                        style={styles.foregroundImage} >
                    </Image>
                </View>

                <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
                    <View style={{ position: 'relative', left: 0, top: 20, height: 30 }}>
                        <ImageBackground source={blue_for_screen}
                            style={styles.foregroundImage_2} >
                            <View style={{ padding: 10, flexDirection: 'row' }} >
                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.tmng_press} onPressIn={this.tmng_pressin} onPressOut={this.tmng_pressout}>
                                        <Image
                                            style={styles.button_1}
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
                                    <TouchableWithoutFeedback onPress={this.dtsheet_press} onPressIn={this.dtsheet_pressin} onPressOut={this.dtsheet_pressout}>
                                        <Image
                                            style={styles.button_1}
                                            source={this.state.dtsheet}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.mtsheet_press} onPressIn={this.mtsheet_pressin} onPressOut={this.mtsheet_pressout}>
                                        <Image
                                            style={styles.button_1}
                                            source={this.state.mtsheet}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{}}>
                                    <TouchableWithoutFeedback onPress={this.convrpt_press} onPressIn={this.convrpt_pressin} onPressOut={this.convrpt_pressout}>
                                        <Image
                                            style={styles.button_1}
                                            source={this.state.convrpt}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    {tmng_view_bool ? <View style={styles.tm_container} >
                        <TimeManagement />
                    </View> : null}
                    {tsheet_view_bool ? <View style={styles.tm_container} >
                        <TimeSheetReport />
                    </View> : null}
                    {dtsheet_view_bool ? <View style={styles.tm_container} >
                        <DailyTimeSheet />
                    </View> : null}
                    {mtsheet_view_bool ? <View style={styles.tm_container} >
                        <MonthlyTimeSheet />
                    </View> : null}
                    {convrpt_view_bool ? <View style={styles.tm_container} >
                        <ConveyanceReportMMS />
                    </View> : null}

                </View>
            </ImageBackground>

            // {/* </ScrollView> */}
        );
    }
}
const styles = StyleSheet.create({
    buttonnav: {
        //width:50,
    },
    firstbutton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
        // flex: 1
    },
    tm_container: {
        position: 'relative',
        top: 160,
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
        // position: 'absolute'

        // resizeMode: 'cover'
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
    foregroundImage_2: {
        // flex: 1,
        // resizeMode: 'cover',
        // alignSelf: "stretch",
        position: 'absolute',
        // paddingTop:100,
        marginVertical: 100,
        width: width,
        // height: 100,
        opacity: 1,
        zIndex: 100
        // resizeMode: 'cover'
    },
    button: {
        // flex:2,
        height: 40,
        width: 115,
        opacity: 1.0,
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
        width: 70,
        opacity: 1.0,
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
});