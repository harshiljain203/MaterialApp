// import 'react-native-gesture-handler';
import React, { Component } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Image } from "react-native";
import colors from "../../common/colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from "react-native-snackbar";

const COVER_1 = require ('../../assets/cover1.jpeg')
const COVER_2 = require ('../../assets/cover2.jpeg')
const COVER_3 = require ('../../assets/cover3.jpeg')
const COVER_4 = require ('../../assets/cover4.jpeg')
const COVER_5 = require ('../../assets/cover5.jpeg')
const COVER_6 = require ('../../assets/cover6.jpeg')

const COVER = [COVER_1, COVER_2, COVER_3, COVER_4, COVER_5, COVER_6]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  }
});

class ModalClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUnmount() {}

  render() {
    const { showModal, submitModal, data } = this.props;
    const { onShow } = this;
    const {closeModal} = this.props
    const { selectedFactory = {}, selectedDesign = {}, document = {}, quantity = 0, image = ''} = data
    console.log(document)
    return (
      <View style={styles.container}>
        <Modal
          isVisible={showModal}
          transparent={true}
          avoidKeyboard
          presentationStyle="overFullScreen"
          style={{ 
            margin: 0, 
            justifyContent:'center',
          }}
          onShow={onShow}
          animationType="none"
        >
          <View
            height='90%'
            flex={1}
            style={{
              margin: 40,
              padding:20
            }}
            backgroundColor={colors.$white}
            opacity={0.95}
          >
            <View            
              flex={1}
            >
              <View style={{
                flexDirection:'row',
                alignItems:'center',
              }}>
                <Icon onPress={closeModal} name={"arrow-left"} size={30}/>
                <Text style = {{ flex:1, fontWeight:'bold', fontSize: 18, textAlign: 'center', lineHeight: 26}} >
                  Assign to factory
                </Text>
              </View>
              <View 
                style={{
                  paddingTop:10,
                  paddingBottom:10,
                  marginTop:20,
                  borderWidth: 1,
                  backgroundColor: '#FFFEE5',
                  flexDirection:'row',
                  justifyContent:'center',
                  borderRadius:5
                }}
              >
                <Icon name={"exclamation-circle"} size = {16} color={"blue"} style={{padding:10}} />
                <Text style={{flex:1}}>
                  You wont be able to change the details later.
                </Text>
              </View>
              <Image 
                style={{borderRadius:10, marginTop:20, height:200, width:'100%',  alignSelf: "center"}} 
                source = {COVER[image]}
              />
              <Text style={{
                fontSize:14,
                color:'#676773',
                marginTop:20
              }}>
                Factory
              </Text>
              <Text style={{
                marginTop:5,
                fontSize:16
              }}>
                {selectedFactory.name}
              </Text>

              <Text style={{
                marginTop:15,
                fontSize:14,
                color:'#676773'
              }}>
                Assign for design
              </Text>
              <Text style={{
                marginTop:5,
                fontSize:16
              }}>
                {selectedDesign.name}
              </Text>

              <Text style={{
                marginTop:15,
                fontSize:14,
                color:'#676773'
              }}>
                Assign Quantity
              </Text>
              <Text style={{
                marginTop:5,
                fontSize:16,
              }}>
                {quantity} meter
              </Text>

              <Text style={{
                marginTop:15,
                color:'#676773',
                fontSize:14
              }}>
                Challan
              </Text>
              <Text style={{
                marginTop:5,
                borderWidth: 1,
                padding:10,
                borderRadius: 5,
                fontSize:16
              }}>
                {document.name}
              </Text>
            </View>

            <View style={{
         height:60,
         flexDirection: 'row',
      }}>
        <TouchableOpacity 
          onPress={closeModal}
          style={{borderWidth:1, marginRight:5, borderRadius: 10, width:'50%', alignItems:'center', justifyContent: 'center'}}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={submitModal}        
          style={{ borderRadius:10, marginRight:5, backgroundColor: colors.$greenBlue , borderWidth:1, width:'50%', alignItems:'center', justifyContent: 'center'}}>
          <Text style={{color: colors.$white}}>
            Assign To Factory
          </Text>
        </TouchableOpacity>
        
      </View>
          </View>
          
        </Modal>
      </View>
    );
  }
}

export default ModalClass;
