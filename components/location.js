import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitute: null,
            timestamp: null,
            region: {
                latitude:       null,
                longitude:      null,
                latitudeDelta:  0.00922*1.5,
                longitudeDelta: 0.00421*1.5
              },
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            // alert(position.coords.latitude);
            console.log('position->',position)           
            console.log('latitude->', position.coords.latitude) 
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
        })
        // console.log('watchid->',this.watchID)
        // console.log('watchID->longitude',this.watchID.coords.longitude)
       // alert(JSON.stringify(region));
    }

    render() {
        return (
            <View>
                <Text> Location </Text>
                <Text>{this.state.latitude}</Text>
                <Text>{this.state.longitude}</Text>
                <Text>{this.state.timestamp}</Text>
            </View>
        )
    }
}