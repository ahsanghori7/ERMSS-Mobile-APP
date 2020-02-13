import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Icon, Button, StyleProvider, Picker } from 'native-base';
import { Alert, Dimensions, StyleSheet, Text, View, BackHandler, ImageBackground, Image, TextInput, TouchableHighlight, TouchableOpacity, ScrollView,Picker } from 'react-native'
//import { StackNavigator } from 'react-navigation';
import MytextBox from '../Textbox/MytextBox';
import { StackNavigator } from 'react-navigation';
import TopBar from '../header/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let back_press = require('../../img/icon_back_2.png')
let dropdown_bar_img = require('../../img/dropdown_bar_2.png')
let text_field_img = require('../../img/text_fields_2.png')
let dropdown_bar_img2 = require('../../img/dropdown_bar_4.png')
var width = Dimensions.get('window').width;
let usr = ''
let usrid = ''
import b from '../Func'

export default class Mails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home_pressed: false,
            mail_pressed: true,
            notification_pressed: false,
            profile_pressed: false,
            user_id: '',
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
            txttitle: '',
            txtmessage: '',
        }
    }
    async componentDidMount() {
        var abc = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            abc.props.navigation.navigate('Home')
            return true;
        });

        usr = await b.retrieveItem("user_name")
        usrid = await b.retrieveItem("user_id")

        this.state.employee_data.splice(0, this.state.employee_data.length)

        this.setState({
            employee_data: [{
                id: usrid,
                name: usr
            }
            ]
        }

        )


        //alert(JSON.stringify(this.state.employee_data))
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }
    _changeStyle() {
        //var color = colors[Math.floor(Math.random()*colors.length)];
        //var backgroundColor = backgroundcolors[Math.floor(Math.random()*backgroundcolors.length)];
        this.setState({

        })
    }
    mail_pressin_1 = () => {
        this.setState({
            mail: require('../../img/mail_icon_2.png')
        });
    }
    mail_pressout_1 = () => {
        this.setState({
            mail: require('../../img/mail_icon.png')
        });
    }
    back_to_home = () => {

        this.props.navigation.navigate('Home')
    }
    updateUser = async (user) => {
        var temp_1 = user

        await this.setState({
            user_id: temp_1,
            // activity_loader: true,
        })
    }
    render() {
        const username = "";
        const password = "";


        return (
            // <ImageBackground source={require('../../img/img_login_back.png')} style={styles.backgroundImage}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                <View
                    style={{
                        // position: 'absolute',
                       // width: this.state.width,
                        height: hp(9),
                        marginTop: hp(0),
                        backgroundColor: 'white',
                        //backgroundColor: '#0077c7',
                        flexDirection: 'row',
                        // alignContent: 'center',
                        // // marginLeft:wp(55),
                        // justifyContent: 'center',
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
                                paddingLeft: wp(1),
                                // marginLeft: wp(-13.5),
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
                            width:wp(31),
                            // backgroundColor:'red',
                            paddingLeft: wp(5)
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
                            Messages
                    </Text>
                    </View>
                </View>

                {/* <View style={{ justifyContent: 'center', marginTop: 100 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Verdana' }}>
                        No Design Provided For Mails/Messages
                        </Text>
                </View> */}


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
                                selectedValue={usr}
                            >
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
                                            Receiver
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
                                                color: 'black',  // fontWeight:'bold'
                                            }}
                                            mode="dropdown"
                                            //enabled={false}
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
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                // fontStyle: 'italic',
                                                fontFamily: 'normal'
                                            }}>
                                            Title
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
                                            Title
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
                                            onChangeText={title => this.setState({ txttitle: title })}
                                            value={this.state.txttitle}
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
                                            Message
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
                                            onChangeText={message => this.setState({ txtmessage: message })}
                                            value={this.state.txtmessage}
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

                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        // position: 'absolute',
                       // width: this.state.width,
                        height: hp(9),
                        marginTop: hp(0),
                        backgroundColor: '#0077c7',
                        // flexDirection: 'row',
                        alignItems: 'center',
                        // marginLeft:wp(55),
                        justifyContent: 'center',
                        // backgroundColor:'red'
                    }}>
                    <View
                        style={{
                            //backgroundColor:'red',
                            // paddingTop: hp(3.2),
                            // marginTop: hp(2.5),
                            // marginLeft: wp(35),
                            width: wp(100),
                            height: hp(7),
                            justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor:'red'
                        }}>
                        {/* <View></View> */}
                        <Text
                            style={{
                                textAlign: 'center',
                                // marginLeft: 10,
                                // textAlignVertical:'center',
                                fontSize: 20,
                                //fontStyle:'italic',
                                fontWeight: 'bold',
                                zIndex: 10,
                                fontFamily: 'notoserif',
                                color: 'white'

                            }} >
                            Message
        </Text>
                    </View>
                </View>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
})