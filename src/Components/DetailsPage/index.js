import react from "react";
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { NAVIGATE } from "../../constants";
import DropDown from "../../Helper/Select";
import colors from '../../common/colors'
import Modal from './Modal';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from "react-native-snackbar";

const IMG = require('../../assets/material1.jpeg')
const DATA = require ('../../content/data.json')
const FACTORY_DATA = require('../../content/factory.json')

const COVER_1 = require ('../../assets/cover1.jpeg')
const COVER_2 = require ('../../assets/cover2.jpeg')
const COVER_3 = require ('../../assets/cover3.jpeg')
const COVER_4 = require ('../../assets/cover4.jpeg')
const COVER_5 = require ('../../assets/cover5.jpeg')
const COVER_6 = require ('../../assets/cover6.jpeg')

const COVER = [COVER_1, COVER_2, COVER_3, COVER_4, COVER_5, COVER_6]

const styles = StyleSheet.create({
  blockStyle: {
    flexDirection:'row',
    flex:1,
    width:'100%'
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const {route : {params} = {}} = this.props
    const {product_id} = params
    const {image} = DATA[product_id]
    this.state=({
      product_id,
      data: {
        product_id,
        image
      }
    })
  }


  componentDidMount () {
  }

  handleProductsDropDown = (id) => {
    this.setState((prevState)=>{
      let {data} = prevState
      data.selectedFactory = {
        id,
        name: FACTORY_DATA[id]
      }
      return{
        data,
    }})
  } 

  handleQuantity = (quantity) => {
    quantity = quantity.replace(/[^0-9]/g, "")
    this.setState((prevState)=>{
      let {data} = prevState
      data.quantity = quantity
      return{
        data,
    }})
  } 

  handleDesignDropDown = (id) => {
    const designItems = this.displayDesigns()
    this.setState((prevState)=>{
      let {data} = prevState
      
      data.selectedDesign = {
        id,
        name: designItems[id]
      }
      return{
        data,
    }})
  }

  showDocs = () => {

  }
   
  uploadDocs = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const {uri, type, name, size} = res
      this.setState((prevState)=>{
        let {data} = prevState
        data.document =  {
          uri, 
          type, 
          name, 
          size
        }
        return {
          data
        }
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("DOCUMENT ERROR " , err)
      } else {
        throw err;
      }
    }
  }

  displayDesigns = () => {
    const {product_id } = this.state
    const {designs} = DATA[product_id]
    let result = []
    designs.forEach(element => {
      result.push(element.name)
    });
    return result;
  }

  goBack = () => {
    this.props.navigation.pop()
  }

  validateData = () => {

    const { product_id, data = {} } = this.state
    const { selectedDesign, quantity} = data
    const {id} = selectedDesign
    const {designs} = DATA[product_id]
    const {available_quantity = 0} = designs[id] || {}
    if(quantity>0 && quantity<=available_quantity)
      return {
        status: true,
        message:""
      };
    else{
      return{
        status: false,
        message: "Assign Qunatity should be less than available inventory and greater than 0."
      }
    }
  }

  openModal = () => {

    const validated = this.validateData()
    const {status = false, message = ""} = validated
    if(status){
      this.setState({
        showModal: true
      })
    }
    else{
      Snackbar.show({
        text: message,
        duration: 3000,
      });
    }
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  submitModal = () => {
    this.setState({
      showModal: false
    })
    // Snackbar.show({
    //   text: 'Design assigned to factory successfully',
    //   duration: 3000,
    //   backgroundColor: 'green',
    // });
    this.props.navigation.navigate(NAVIGATE.HOME_SCREEN)
  
  }

  render() {
    const { product_id, showModal = false , data = {} } = this.state
    const { selectedFactory = {}, selectedDesign = {}, document, quantity} = data
    const {id: selectedFactoryID, name: selectedFactoryName} = selectedFactory
    const {id: selectedDesignID, name: selectedDesignName} = selectedDesign
    const {designs, image} = DATA[product_id]
    const designItems = this.displayDesigns()
    const {available_quantity = 0} = designs[selectedDesignID] || {}
    let disable = true
    if(selectedFactoryID && selectedDesignID && document && quantity)
    {
      disable = false
    }
    return (
      <View style={{flex:1, margin: 20}}>
        <View
          style={{
            flexDirection:'row',
            marginBottom:20
          }}
        >
        <Icon onPress = {this.goBack} name={"arrow-left"} size={30}/>
          <Text style={{
            flex:1,
            alignSelf:'center',
            textAlign:'center',
            fontSize: 20,
            fontWeight: 'bold'
          }}>
            Assign to factory
          </Text>
        </View>
        
      <ScrollView 
        style={{ 
          flex:1,
          marginBottom:20
        }}
      >
        <Image 
          style={{borderRadius:10, height:300, width:'100%',  alignSelf: "center"}} 
          source = {COVER[image]}
        />
        <View style={{marginTop:30}}>
        <DropDown
          data={FACTORY_DATA}
          onChange={this.handleProductsDropDown}
          value={selectedFactoryName || "Select Factory"}
          sort = {true}
          placeholder = {"Factory *"}
        />
        </View>
        {
          selectedFactoryID && 
          <View style={{marginTop: 20}}>
            <DropDown
              data={designItems}
              onChange={this.handleDesignDropDown}
              value={selectedDesignName || "Select Design"}
              sort = {true}
              showIcon = {true}
              placeholder = {"Assign for Design *"}
            />
          </View>
        }
        {
          selectedFactoryID && selectedDesignID &&
          <View>
          <View style={{flexDirection:'row', justifyContent: "space-between"}}>
            <View style={{width:'50%'}}>
            <Text style={{marginTop:20,
                color:'#676773',
                fontSize:14}}>
              Assign Quantity *
            </Text>
            <TextInput
              style={{
                borderWidth:1,
                paddingLeft:10,
                marginTop:10,
                color: 'black',
                borderRadius:5
              }}
              value={quantity}
              keyboardType={"number-pad"}
              placeholderTextColor="black" 
              onChangeText = {this.handleQuantity}
              placeholder={"Enter Quantity"}
            >

            </TextInput>
            </View>
            <View style={{flex:1, paddingLeft:20}}>
              <Text style={{marginTop:20,
                color:'#676773',
                fontSize:14
              }}>
                Available Inventory
              </Text>
              <View style={{justifyContent:'center', marginTop:10, flex:1}}>
                <Text>
                  {available_quantity} meter
                </Text>
              </View>              
              </View>
          </View>
          <View style={{marginTop:20}}>
            <Text style={{
              color:'#676773',
              fontSize:14
            }}>
              Attach Challan *
            </Text>
            {
              document ? 
              <TouchableOpacity onPress={this.showDocs} style={{
                borderWidth:1,
                padding:16,
                marginTop:10,
                borderRadius:5,
              }}>
                <Text>
                  {document.name}
                </Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={this.uploadDocs} style={{
                borderWidth:1,
                padding:16,
                borderRadius:5,
                marginTop:10
              }}>
                <Text>
                  Select File
                </Text>
              </TouchableOpacity>
            }
          </View>
          </View>
        }
       
			</ScrollView>
      <View style={{
         height:60,
         flexDirection: 'row',
      }}>
        <TouchableOpacity 
          onPress={this.goBack}
          style={{borderRadius:10, marginRight:5 ,backgroundColor:'gray', borderWidth:1, width:'50%', alignItems:'center', justifyContent: 'center'}}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          disabled = {disable}
          onPress={this.openModal}        
          style={{ borderRadius:10, marginRight:5, backgroundColor: disable ? colors.$fadedBlue : colors.$greenBlue, borderWidth:1, width:'50%', alignItems:'center', justifyContent: 'center'}}>
          <Text style={{color: disable ? 'black' : 'white'}}>
            Assign To Factory
          </Text>
        </TouchableOpacity>
        
      </View>
      {
        showModal &&
        <Modal
          showModal = {showModal}
          closeModal = {this.closeModal}
          submitModal = {this.submitModal}
          data = {data}
        />
      }
      </View>
    );
  }
}

export default HomeScreen;
