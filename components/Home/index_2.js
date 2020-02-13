import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    StyleSheet, Dimensions, Text, View,
    ImageBackground, BackHandler, Alert, ScrollView, Image, TouchableOpacity, RefreshControl
} from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { withNavigation } from 'react-navigation';
//import { DrawerNavigator } from 'native-base'
import TopBar from '../header/index';
//import { ListItem } from 'native-base';
import get_data from '../Func.js';
import ImageSlider from 'react-native-image-slider';
import Drawer from 'react-native-drawer'
//import { Drawer } from "native-base";
import SideBar from '../Sidebar/sidebar'
import BarChart from '../AbstractChart/BarChart'
import b from '../Func'
import moment, { months } from 'moment';
let text_field_img = require('../../img/text_fields.png')
let ess_icon = require('../../img/Color_Emp_2.png')
let mss_icon = require('../../img/Color_Mng_2.png')
//let background_image = require('../../img/bk.jpg')
let back_press = require('../../img/icon_back_2.png')
let toggle = require('../../img/nav_stripe_2.png')
let img_1 = require('../../img/backimage_1.jpg')
let img_2 = require('../../img/backimage_2.jpg')
let img_3 = require('../../img/backimage_3.jpg')
// let img_4 = require('../../img/backimage_4.jpg')
// let img_5 = require('../../img/backimage_5.jpg')
// let img_6 = require('../../img/backimage_6.jpg')


const chartConfigs = [
    {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        //color: (opacity = 1) => `rgba(0, 119, 199, ${opacity})`,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        //color: (opacity = 1) => 'black'
    }
]
class Home_list_View extends Component {
    
  
    
    constructor(props) {
        super(props)

        Dimensions.addEventListener('change', () => {
            // alert('Dimensions Changed');
            this.setState({
                width: Dimensions.get('window').width
            })
        });

        this.state = {
            // screen_background: background_image,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            user_emp_earea: '',
            is_allowed_mss: false,
            home_pressed: true,
            mail_pressed: false,
            notification_pressed: false,
            profile_pressed: false,
            is_allowed_mss: false,
            temp_image: '',
            AppAtt:[],
            LocalAtt:[],
            
            //varDate: moment(new Date()).format('YYYY-MM-DD'),
        }
    }
    // Sending mobile date to api
    // async componentDidMount() 
    // {
       
    // }
 
    async componentDidMount() {
        fetch('http://snova786-002-site30.etempurl.com/Api/MainScreen/', {  
            method: 'POST',
                headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            date: moment(new Date()).format('YYYY-MM-DD'),
            
            })
            }).then((response) => response.json())  
            .then((responseJson) => {
  
 
                this.setState({
                  isLoading: true,
                  AppAtt: responseJson[0].AppAtt,
                  LocalAtt: responseJson[0].LocalAtt,
                  
                }, function(){
                 
                });
        
              })

        // return fetch('http://snova786-002-site30.etempurl.com/Api/MainScreen/' , {
        //     method: 'GET',
           
        //  }).then((response) => response.json())
        // .then((responseJson) => {
  
 
        //   this.setState({
        //     isLoading: true,
        //     AppAtt: responseJson[0].AppAtt,
        //     LocalAtt: responseJson[0].LocalAtt,
            
        //   }, function(){
           
        //   });
  
        // })
        // .catch((error) =>{
            
        //   console.error(error);
        // });


        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;

        });



        user_earea_dtl = await get_data.retrieveItem("user_earea");
        console.log(user_earea_dtl)
        if (user_earea_dtl == '1000') {
            this.setState({
                user_emp_earea: user_earea_dtl,
                is_allowed_mss: true
            })
            // console.log(this.state.user_emp_earea)
        }
        else {
            this.setState({
                user_emp_earea: user_earea_dtl,
                is_allowed_mss: false
            })
        }
        if (get_data.getAllEmployees().length <= 1) {
            console.log(
                'employee ka data dalnay aya'
            )
            await fetch('http://snova786-002-site6.etempurl.com/api/TM/fillSNSEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (JSON.stringify(responseJson) === '[]') {
                        statuscode = 0;
                    }
                    else {
                        if (get_data.getAllEmployees().length <= 1) {
                            get_data.fillAllEmployees(responseJson);
                            temp_29 = get_data.getAllEmployees()
                        }
                    }
                })
                .catch((error) => {
                    statuscode = 2;
                });
        }
        random_no = get_data.get_my_image()

        if (random_no == 1) {
            this.setState({
                temp_image: img_1
            })
            // myimage_5 = img_1
        }
        else if (random_no == 2) {
            this.setState({
                temp_image: img_2
            })
            // myimage_5 = img_2
        }
        else if (random_no == 3) {
            this.setState({
                temp_image: img_3
            })
            // myimage_5 = img_3
        }
        // else if (random_no == 4) {
        //     this.setState({
        //         temp_image: img_4
        //     })
        //     // myimage_5 = img_3
        // }
        // else if (random_no == 5) {
        //     this.setState({
        //         temp_image: img_5
        //     })
        //     // myimage_5 = img_3
        // }
        // else if (random_no == 6) {
        //     this.setState({
        //         temp_image: img_6
        //     })
        //     // myimage_5 = img_3
        // }
    }

    async componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }

    /////////// Swipe to open drawer ///////////

    onSwipeLeft(gestureState) {
        this.closeDrawer();
    }

    onSwipeRight(gestureState) {
        this.openDrawer();
    }

    //////////////////// End /////////////////////

    toesspage = () => {
        this.props.navigation.push('EssMain')
    }

    tomsspage = () => {
        this.props.navigation.push('MssIndex')
    }

      closeDrawer = () => {
        this.drawer.close()
      };
      openDrawer = () => {
        this.drawer.open()
      };
     
    


    render() {
        const earea = this.props.navigation.state.params.earea;
        //alert(earea)
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        const data = {
            minValue: 0,
            maxValue: 31, 
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                // {
                //     data: [
                //         50,
                //         20,
                //         2,
                //         86,
                //         71,
                //         100
                //     ]
                // },
                // {
                //     data: [
                //         4,
                //         8,
                //         12,
                //         16,
                //         20,
                //         24
                //     ]
                // },
                {
                    data: [
                        20,
                        10,
                        4,
                        9,
                        1,
                        22
                    ]
                },
                {
                    data: [
                        30,
                        90,
                        67,
                        54,
                        10,
                        2
                    ]
                }
            ]
        }

        return (
            <GestureRecognizer
                //onSwipe={(direction, state) => this.onSwipe(direction, state)}
                //onSwipeUp={(state) => this.onSwipeUp(state)}
                //onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: this.state.backgroundColor
                }}>
                <Drawer type="displace" ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar
                        navigator={
                            this.navigator
                        }
                        earea={earea}
                        drawerclose={() => this.closeDrawer()}
                    />}
                    openDrawerOffset={0.20}
                    panCloseMask={0.20}
                    onClose={() => this.closeDrawer()} >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}>
                        <View style={{}}>
                            <View
                                style={{
                                    width: this.state.width,
                                    height: hp(9),
                                    backgroundColor: '#0077c7',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 5,
                                        width: wp(10),
                                        height: wp(10),
                                        alignSelf: 'center',
                                    }}>

                                    <TouchableOpacity
                                        style={{
                                            width: wp(10),
                                            height: wp(10),
                                            alignItems: 'center',
                                            justifyContent: 'center'

                                        }}
                                        onPress={() => this.openDrawer()}>

                                        <Image source={toggle} style={{
                                            position: 'absolute',
                                            zIndex: 100,
                                            height: wp(35),
                                            width: wp(35),
                                        }} />

                                    </TouchableOpacity>

                                </View>
                                <View
                                    style={{
                                        width: this.state.width - wp(31),
                                        height: wp(10),
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            textAlign: 'left',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            zIndex: 10,
                                            fontFamily: 'notoserif',
                                            color: 'white',
                                        }}>
                                        ERMSS
                            </Text>

                                </View>
                            </View>
                        </View>

                        {/* <View style={
                        {
                            height: hp(22),
                            width: this.state.width
                        }
                    }>
                        <Image
                            source={
                                this.state.temp_image
                            }
                            style={{
                                height: hp(22),
                                resizeMode: 'stretch',
                                width: this.state.width
                            }} />
                    </View> */}

                        <View style={{
                            width: this.state.width,
                        }}>
                            <ScrollView contentContainerStyle={styles.userinfo}>
                                <View style={{
                                    zIndex: 100,
                                    width: this.state.width - wp(3),
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}>
                                    <View>
                                        {/* Start of Numeric Chart */}
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                alignSelf: 'flex-start',
                                                height: hp(16),
                                                width: this.state.width,
                                                flexDirection: 'row',
                                                position: 'relative',
                                                top: hp(2),
                                                marginLeft: 0,
                                            }}>

                                            <View style={{
                                                width: wp(50),
                                                height: hp(14),
                                                paddingLeft: 10,
                                                alignItems: 'flex-start',
                                                alignSelf: 'flex-start',
                                                flexDirection: 'column',
                                                borderRightColor: 'grey',
                                                borderRightWidth: 1,
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Image style={{
                                                        height: wp(4),
                                                        width: wp(4),
                                                        resizeMode: 'stretch'
                                                    }}
                                                        source={require('../../img/home_3.png')} />
                                                    <Text style={{ fontSize: 14, color: '#0077c7' }}> Total Users </Text>
                                                </View>

                                                <Text style={{
                                                    fontSize: 36,
                                                    fontWeight: "bold",
                                                    textAlign: 'left',
                                                    color: '#0077c7'
                                                }} >
                                                    2500
                                            </Text>

                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#0077c7'
                                                }}>
                                                    4% From last Week
                                            </Text>

                                            </View>

                                            <View style={{
                                                width: wp(50),
                                                height: hp(14),
                                                paddingLeft: 10,
                                                alignItems: 'flex-start',
                                                alignSelf: 'flex-start',
                                                flexDirection: 'column'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Image style={{
                                                        height: wp(4),
                                                        width: wp(4),
                                                        resizeMode: 'stretch'
                                                    }}
                                                        source={require('../../img/home_3.png')} />
                                                    <Text style={{ fontSize: 14, color: '#0077c7' }}> Total Users </Text>
                                                </View>

                                                <Text style={{
                                                    fontSize: 38,
                                                    fontWeight: "bold",
                                                    textAlign: 'left',
                                                    color: '#0077c7'
                                                }} >
                                                    2500
                                            </Text>

                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#0077c7'
                                                }}>
                                                    4% From last Week
                                            </Text>

                                            </View>

                                        </View>

                                        {/* End of Numeric Chart */}

                                    </View>
                                </View>
                                <View style={{
                                    position: 'relative',
                                    top: hp(2),
                                    borderColor: 'grey',
                                    borderWidth: 1,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    marginBottom: hp(5),
                                    alignItems: 'center',
                                    height: (this.state.height / 100) * 35
                                }}>
                                    {chartConfigs.map(chartConfig => {
                                        const labelStyle = {
                                            color: '#0077c7',
                                            marginVertical: 5,
                                            textAlign: 'center',
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }
                                        const graphStyle = {
                                            //marginVertical: 3,
                                            //color: 'blue',
                                            ...chartConfig.style
                                        }
                                        return (
                                            <ScrollView
                                                key={Math.random()}
                                                style={{
                                                    backgroundColor: chartConfig.backgroundColor
                                                }}
                                            >

                                                <Text style={labelStyle}>Attendance</Text>
                                                <BarChart
                                                    width={((this.state.width / 100) * 95)}
                                                    height={((this.state.height / 100) * 27)}
                                                    data={data}
                                                    //svg = {{ fill }}
                                                    chartConfig={chartConfig}
                                                    style={graphStyle}
                                                />
                                            </ScrollView>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Drawer>
             
            </GestureRecognizer>
        )
    }
}

const styles = StyleSheet.create({
    userinfo: {
        //height: hp(100),
        //backgroundColor: 'red'
    },
    myimage: {
        height: hp(20),
        width: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    }
});

export default withNavigation(Home_list_View);