import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  AppRegistry,
  Text, BackHandler
} from 'react-native'
//import { StackNavigator, withNavigation } from 'react-navigation';
import Table from 'react-native-simple-table'
import b from './Func'
let TSrpt_data = '';
let data = '';

const columns = [
  {
    title: 'Employee Name',
    dataIndex: 'empname',
    width: 140
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 140
  },
  {
    title: 'Day',
    dataIndex: 'day',
    width: 100
  },
  {
    title: 'Time in',
    dataIndex: 'timein',
    width: 100
  },
  {
    title: 'Time Out',
    dataIndex: 'timeout',
    width: 100
  },
  {
    title: 'Client',
    dataIndex: 'clientname',
    width: 200
  },
  {
    title: 'Remarks (Time in)',
    dataIndex: 'tin_remarks',
    width: 200
  },
  {
    title: 'Remarks (Time out)',
    dataIndex: 'tout_remarks',
    width: 200
  }

];

class Grid extends Component {

  componentDidMount() {

    TSrpt_data = b.getTSrpt_data();

    this.state = {
      timesheetdata: [
        {
          empname: '',
          clientname: '',
          timein: '',
          timeout: '',
          date: '',
          day: '',
          tin_remarks: '',
          tout_remarks: ''
        }
      ],
    }

    this.state.timesheetdata.splice(0, this.state.timesheetdata.length);
    TSrpt_data.forEach(element => {
      this.state.timesheetdata.push({
        empname: element.empname,
        clientname: element.clientname,
        timein: element.timein,
        timeout: element.timeout,
        date: element.date,
        day: element.day,
        tin_remarks: element.tin_remarks,
        tout_remarks: element.tout_remarks,
      })
    })

    let pagetype = b.getPagetype();
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      if (pagetype == '01') {
        that.props.navigation.navigate('EssMain')
      }
      else if (pagetype == '02') {
        that.props.navigation.navigate('MssIndex')
      }
      else {
        //that.props.navigation.navigate('MssMain')
      }

      return true;
    });
  }

  componentWillUnmount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Home')
      return true;
    });
  }

  generateRpt = async() => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Time Sheet Report</Text>
        <Table
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
          height={500}
          columnWidth={60}
          columns={columns}
          dataSource={this.state.timesheetdata} />
        {/* <View>
          <TouchableOpacity onPress={() => this.generateRpt()} style={styles.btn}>
            <Image source={require('../../img/submit_button.png')} style={styles.img} />
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    }),
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
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
});

export default Grid;