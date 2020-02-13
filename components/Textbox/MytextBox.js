import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class MytextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props}
    //this.state = { text: 'Username Placeholder' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:'white'}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}
