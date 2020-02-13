import React, { Component } from 'react'
//import { Container, Header, Content, Item, Input, Button, StyleProvider, Row, Picker } from 'native-base';
import {
  AppRegistry, BackHandler, Alert, StyleSheet, ScrollView, Text, View, ImageBackground,
  Image, TouchableWithoutFeedback, Dimensions, 
} from 'react-native'
import NetInfo from "@react-native-community/netinfo"
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { MonthPickerDialog, MonthSelectorCalendar } from 'react-native-month-selector'
import grid from './Grid';

let statuscode = 3;
let pgtype = '';
let myimage = ''

class B extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [
        {
          id: '',
          name: ''
        }
      ],
      timesheetdata: [
        {
          empname: null,
          clientname: null,
          timein: null,
          timeout: null,
          date: null,
          day: null,
          tin_remarks: null,
          tout_remarks: null
        }
      ],

      dailytimesheetdata: [
        {
          empid: null,
          empname: null,
          clientname: null,
          timein: null,
          timeout: null,
          date: null,
          day: null,
        }
      ],
      conveyancedata:[{
        empname: null,
        clientname: null,
        no_of_visit : null
      }],
      dept:[
        {
          id: '',
          name: ''
        }
      ]

    }

  }

  exit_from_app() {
    Alert.alert(
      "Quit App?",
      "Are you sure you want to exit App?",
      [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => true }
      ],
      { cancelable: true }
    );
    return true;
  }

  async saveUserSession(userid, pass, userearea, userimage, user_fullname, desig) {
    this.storeItem("user_id", userid);
    this.storeItem("user_pass", pass);
    this.storeItem("user_earea", userearea);
    this.storeItem("user_image", userimage);
    this.storeItem("user_name", user_fullname)
    this.storeItem("user_desig", desig)

  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveItem(key) {
    var item = null;
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      item = JSON.parse(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    return item;
  }

  clearAsyncStorage= async() =>{
    AsyncStorage.clear();
  }

  getUserDtl = async (username, password) => {
    // if (await this.checkNetworkStat() == false) {
    //   return 3;
    // }
    
    await fetch('http://snova786-002-site6.etempurl.com/api/Login/Post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": username,
        "userPassword": password
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (JSON.stringify(responseJson) === '[]') {
          statuscode = 0;
        }
        else {
          if (responseJson[0].loginstatus == true) {
            statuscode = 1;
            this.saveUserSession(responseJson[0].user_id, password, responseJson[0].user_earea, responseJson[0].user_image, responseJson[0].user_fullname, responseJson[0].desig);
          }
          else {
            statuscode = 0;
          }
        }
      })
      .catch((error) => {
        statuscode = 2;
        alert(error);
      });
      // alert(statuscode);
    return statuscode;
  };

  getEmpDtl = async () => {
    if (await this.checkNetworkStat() == false) {
      return 3;
    }
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
        // alert(JSON.stringify(responseJson))
        if (JSON.stringify(responseJson) === '[]') {
          statuscode = 0;
        }
        else {
          statuscode = 0
        }
      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  };

  time_in_time_out =  (empid, userid, clientid, date, time, type, remarks, lattd, lngtd) => {
 
    if (this.checkNetworkStat() == false) {
 
      return 3;
    }

    fetch('http://snova786-002-site6.etempurl.com/api/TM/insertattendancerecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "empid": empid,
        "user_id": userid,
        "clientid": clientid,
        "date": date,
        "time": time,
        "type": type,
        "remarks": remarks,
        "lattd": lattd,
        "lngtd": lngtd
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
      
        if (JSON.stringify(responseJson) == "true") {
          statuscode = 1;
        }
        else {
          statuscode = 0
        }
      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  };

  fillAllEmployees(allemployees) {
    this.state.employees.splice(0, allemployees.length)
    allemployees.forEach(element => {
      this.state.employees.push({
        id: element.Value,
        name: element.Text
      })
    });
  }

  getAllEmployees() {
    //alert(JSON.stringify(this.state.employees))
    return this.state.employees;
  }

  FillAllDept = async()=>{
    if (await this.checkNetworkStat() == false) {
      return 3;
    }
    await fetch('http://snova786-002-site6.etempurl.com/api/TM/FillSNSDept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        if (JSON.stringify(responseJson) === '[]' || JSON.stringify(responseJson) === "null") {
          statuscode = 0;
        }
        else {
          statuscode = 1;
          this.state.dept.splice(0, this.state.dept.length);
          responseJson.forEach(element => {
            this.state.dept.push({
              id: element.Value,
              name: element.Text,
            })
          });
        }
      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  }

  getAllDept(){
    return this.state.dept;
  }

  // Conveyance Report Work

  getConveyanceReport = async (empdate, pagetype) => {
    pgtype = pagetype;
    if (await this.checkNetworkStat() == false) {
      return 3;
    }
    await fetch('http://snova786-002-site6.etempurl.com/api/TM/EmpConRpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "date": empdate
      })
    })

      .then((response) => response.json())
      .then((responseJson) => {
       
        if (JSON.stringify(responseJson) === '[]' || JSON.stringify(responseJson) === "null") {
          statuscode = 0;
        }
        else {
          statuscode = 1;
          this.fill_Conveyance_Data(responseJson);
        }

      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  }

  fill_Conveyance_Data(responseJson) {
    this.state.conveyancedata.splice(0, this.state.conveyancedata.length);
    responseJson.forEach(element => {
      this.state.conveyancedata.push({
        empname: element.Name,
        clientname: element.client,
        no_of_visit : element.noofvisit
        
      })
    });
  }

  getConveyanceRptData() {
    return this.state.conveyancedata;
  }

 // Daily Time Sheet Report Work 

  fillDailyTSrpt_data(responseJson) {
    this.state.dailytimesheetdata.splice(0, this.state.dailytimesheetdata.length);
    responseJson.forEach(element => {
      this.state.dailytimesheetdata.push({
        empid : element.empid,
        empname: element.employeename,
        clientname: element.client,
        timein: element.checkintime,
        timeout: element.checkouttime,
        date: element.begdate,
        day: element.day,
      })
    });
  }

  getDailyTSrpt_data() {
    return this.state.dailytimesheetdata;
  }

  getDailyTimeSheetReport = async (empdate, dept, pagetype) => {
    pgtype = pagetype;
    if (await this.checkNetworkStat() == false) {
      return 3;
    }
    await fetch('http://snova786-002-site6.etempurl.com/api/TM/DailytimeSheetRpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "date": empdate,
        "costctr": dept
      })
    })

      .then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson))
        if (JSON.stringify(responseJson) === '[]' || JSON.stringify(responseJson) === "null") {
          statuscode = 0;
        }
        else {
          statuscode = 1;
          this.fillDailyTSrpt_data(responseJson);
        }

      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  }

  getTimeSheetReport = async (empid, month, pagetype) => {
    pgtype = pagetype;
    if (await this.checkNetworkStat() == false) {
      return 3;
    }
    await fetch('http://snova786-002-site6.etempurl.com/api/TM/timeSheetRpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "empid": empid,
        "date": month
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (JSON.stringify(responseJson) === '[]') {
          statuscode = 0;
        }
        else {
          statuscode = 1;
          this.fillTSrpt_data(responseJson);
        }

      })
      .catch((error) => {
        statuscode = 2;
      });
    return statuscode;
  }

  fillTSrpt_data(responseJson) {
    this.state.timesheetdata.splice(0, this.state.timesheetdata.length);
    responseJson.forEach(element => {
      this.state.timesheetdata.push({
        empname: element.employeename,
        clientname: element.client,
        timein: element.checkintime,
        timeout: element.checkouttime,
        date: element.begdate,
        day: element.day,
        tin_remarks: element.remarks,
        tout_remarks: element.remarkstout
      })
    });
  }

  getTSrpt_data() {
    return this.state.timesheetdata;
  }

  getPagetype() {
    return pgtype;
  }

  downloadPDFfile = async (empid, month) => {
    await fetch('http://snova786-002-site6.etempurl.com/api/TM/timeSheetRpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "empid": empid,
        "date": month
      })
    })
      .then((response) => response.blob())
      .then((blob) => {
        alert('success');
      })
      .catch((error) => {
        alert('Error');
      });
  }


  async checkNetworkStat() {
    var isNetConnected = await NetInfo.isConnected.fetch().then((isConnected) => {
      return isConnected;
    });
    return isNetConnected;
  }

  get_image() {
    let min_no = 1;
    let max_no = 3;
    let random_no = 0;
    let image_des = ''

    //random_no = min_no + Math.round(Math.random()) * (max_no - min_no);
    
    // This will generate random number between min_no and max_no
    random_no = Math.floor(Math.random() * max_no) + min_no;
    myimage = random_no
  }


  get_my_image() {
    return myimage
  }
}


const b = new B();
export default b;