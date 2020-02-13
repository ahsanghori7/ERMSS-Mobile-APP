import React, { Component } from 'react'
import { AppRegistry, Image, StatusBar, View, StyleSheet} from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { withNavigation } from 'react-navigation';
import b from '../Func';

let usr_name = '';
let usr_desig = '';
let usr_img = '';
let user_image = require('../../img/img_profile_userimg.png')

const routes = [
    {
        Name: "Home",
        routename: "Home",
        iconpath: require('../../img/home_2.png')
    },
    {
        Name: "ESS",
        routename: "EssMain",
        iconpath: require('../../img/home_2.png')
    },
    {
        Name: "MSS",
        routename: "MssIndex",
        iconpath: require('../../img/home_2.png')
    },
    {
        Name: "Notifications",
        routename: "notification",
        iconpath: require('../../img/notification_2.png')
    },
    {
        Name: "Messages",
        routename: "mail",
        iconpath: require('../../img/mail_icon_2.png')
    },
    {
        Name: "Profile",
        routename: "Profile",
        iconpath: require('../../img/profile_2.png')
    },
    {
        Name: "Sign Out",
        routename: "Login",
        iconpath: require('../../img/logout_2.png')
    },
];

class SideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            empname: '',
            empdesig: '',
            empimg: ''
        }

    }

    async componentDidMount() {
        usr_name = await b.retrieveItem("user_name")
        usr_desig = await b.retrieveItem("user_desig")
        usr_img = await b.retrieveItem("user_image")

        this.setState({
            empdesig: usr_desig,
            empname: usr_name,

        })

    }

    render() {
        let imagetag;
        if (usr_img == '') {
            imagetag = <Image source={user_image} style={styles.image_style} />

        }
        else {
            imagetag = <Image source={{ uri: usr_img }} style={styles.image_style} />
        }

        return (
                <View>
                
                     <View
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            backgroundColor: '#0077c7'
                        }}>
                        <View style={{
                            flexDirection: 'row', height: 120, alignSelf: "stretch",
                            justifyContent: "flex-start", alignItems: "flex-start"
                        }}>
                            {imagetag}
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginLeft: 10, fontSize: 12,
                                    color: 'white',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} >
                                <Text
                                    style={{ fontSize: 16, color: 'white' }}>

                                    {this.state.empname}
                                </Text>
                                {"\n"}
                                {this.state.empdesig}
                            </Text>

                        </View>

                    </View>
                    <List dataArray={routes} renderRow={data => {
                        //alert(this.props.earea)
                        if(this.props.earea == '3000' && data.routename == 'MssIndex'){
                            return(
                                <View></View>
                            );
                        }
                        else{
                            return (
                            
                                <ListItem button onPress={() => {
                                    if (data.routename == 'Login') {
                                        b.clearAsyncStorage()
                                        this.props.navigation.replace(data.routename)
                                    }
                                    else{
                                       // this.props.closeDrawer()
                                        this.props.navigation.navigate(data.routename);
                                    }                                    
                                }
                                }>
                                    <View style={{ flexDirection: 'row', padding: 10 }}>
                                        <Image source={data.iconpath} style={{ position: 'absolute', left: 0, top: 2, height: 18, width: 18, resizeMode: 'stretch', alignItems: 'baseline', justifyContent: 'flex-end', alignSelf: 'baseline' }} />
                                        <Text style={{ position: 'absolute', left: 45, height: 25, alignItems: 'baseline', justifyContent: 'flex-end', alignSelf: 'baseline' }}>{data.Name} </Text>
                                    </View>
                                </ListItem>
                            );
                        }
                        
                    }} />  
               
               </View>
        );
    }
}

const styles = StyleSheet.create({
    image_style: {
        resizeMode: 'stretch',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        top: 0,
        height: 70,
        width: 70,
        borderRadius: 75,
        overflow: 'visible',
        zIndex: 100
    }
})
export default withNavigation(SideBar);