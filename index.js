/**
 * @format
 */

import {AppRegistry, Platform, PermissionsAndroid, Alert, ToastAndroid} from 'react-native';
import App from './App';
import Splash from './components/Splash';
import SignIn from './components/SignIn/index';
import AppNavigator from './route';
// import Router from './App/Navigation/AppNavigation';
import React, { Component } from 'react'
import {name as appName} from './app.json';


export async function request_runtime_permission() {
    
        //var permissions = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
        //const islocationgranted = await PermissionsAndroid.check(permissions);
        const islocationgranted = await PermissionsAndroid.check(
                                                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                                                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                                                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE                                                    
                                                );
        //const islocationgranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!islocationgranted)
        {
            try 
            {
                const perm = await PermissionsAndroid.requestMultiple(
                                                            [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                                                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, 
                                                            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
                                                        );
                const isgranted = await PermissionsAndroid.check(
                                                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE                                                    
                                            );

                if (isgranted)
                {    
                    ToastAndroid.show('Special permissions granted', ToastAndroid.SHORT);
                }
                else 
                {    
                    ToastAndroid.show('Permissions not granted', ToastAndroid.SHORT);
                }
            }
            catch (err)
            {
                console.warn(err)
            }
        }
     
   }


class Main extends Component {

    async componentDidMount() {
            await request_runtime_permission()        
          }
    
    render() {
        return(            
            <AppNavigator/>
        );
    }
}

AppRegistry.registerComponent(appName, () => Main);
