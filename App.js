import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCamPermisson: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions = async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCamPermisson: status === 'granted',
      buttonState: 'clicked',
      scanned: false
    })
  }
  handleBarCodeScanned = async({type, data}) => {
    this.setState({
      scanned: true,
      scannedData: data,
    })
  }

    render() {
      const hasCamPermisson = this.state.hasCamPermisson;
      const scanned = this.state.scanned;
      const scannedData = this.state.scannedData;
      const buttonState = this.state.buttonState
      if (buttonState === 'clicked' && hasCamPermisson){
        return(
          <BarCodeScanner
            onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject} />
        )
      }
      else if(buttonState === 'normal'){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./assets/barcode.png')} style = {style.Img} />
          <Text style={style.Font}> {
            hasCamPermisson === true ? this.state.scannedData : "requestCamPermission"
          } </Text>
          <TouchableOpacity onPress={this.getCameraPermissions}><Text style={style.ButtonText}>Scan QR Code</Text></TouchableOpacity>
        </View>
      );
      }
    }
  }

const style = StyleSheet.create({
  ButtonText: {
    padding: 24,
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  Font: {
    fontSize: 20,
    marginBottom: 16,
  },
  Img: {
    width: 200,
    height: 200,
    marginTop: -130,
    marginBottom: 55
  },
})
