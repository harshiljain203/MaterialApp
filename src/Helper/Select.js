import React from "react";
import { TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import BottomSheet from "./RbSheet";
import colors from "../common/colors";
import {
  TextInput,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const IMG = require('../assets/material1.jpeg')
const COVER_1 = require ('../assets/design1.jpeg')
const COVER_2 = require ('../assets/design2.jpeg')
const COVER_3 = require ('../assets/design3.jpeg')
const COVER_4 = require ('../assets/design4.jpeg')
const COVER_5 = require ('../assets/design5.jpeg')
const COVER_6 = require ('../assets/design6.jpeg')
const COVER_7 = require ('../assets/design7.jpeg')
const COVER_8 = require ('../assets/design8.jpeg')

const COVER = [COVER_1, COVER_2, COVER_3, COVER_4, COVER_5, COVER_6, COVER_7, COVER_8]

const styles = StyleSheet.create({
  textInput: {
    marginBottom:2, 
    marginTop: 2,
    marginLeft: 10,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black'
  },
});


export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = null;
    this.state = {
      isFocused: false,
      searchVal: ''
    };
  }

  onSelect = val => () => {
    const { onChange, value } = this.props;
    if (onChange) {
      if (val !== value) {
        onChange(val);
      }
      if (this.sheetRef) {
        this.sheetRef.close();
        this.setState({ isFocused: false });
      }
    }
  };

  sortObject = obj => {
    var arr = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          key: prop,
          value: obj[prop]
        });
      }
    }
    const {sort = true} = this.props
    if(sort){
      arr.sort(function(a, b) {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })
    }
    return arr;
  };

  renderOption = () => {
    const {searchVal = ''} = this.state
    const { data = {}, showIcon = false} = this.props;
    const options = [];
    var arr = this.sortObject(data);
    const keys = Object.keys(data);
    console.log("ARRAY " ,arr)
    arr.forEach(item => {
      const { key, value } = item;
      // const label = data[key] || "";
      if((value.toLowerCase().includes(searchVal.toLowerCase())))
      {   
        options.push(
          <View
            key={key}
            // h={40}
            style={{
              alignItems:'flex-start',
              padding: 5,
              borderRadius: 5,
              borderWidth: 1,
              marginBottom: 4,
              marginTop: 4,
              flexDirection:'row'
            }}
          >
            {showIcon && <Image source = {COVER[key]} style={{marginRight:15, height:40, width:40, borderRadius: 50}}/>}
            <TouchableOpacity onPress={this.onSelect(key)} style={{width:'100%'}}>
              <Text style={{padding:8}}>
                {value}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    });

    if (options.length === 0) {
      options.push(
        <View aI={"center"} jC={"center"}>
          <Text>No data Found</Text>
        </View>
      );
    }

    return options;
  };

  setSheetRef = ref => {
    this.sheetRef = ref;
  };

  openBs = () => {
    if (this.sheetRef) {
      this.sheetRef.open();
      this.setState({ isFocused: true });
    }
  };

  searchHandler = (val) =>{
    this.setState({
      searchVal: val
    })
  }
  renderRbSheet = () => {
    const {searchVal = ''} = this.state
    return (
      <BottomSheet compRef={this.setSheetRef} h={400}>
        <View
          style = {{
            justifyContent:'center',
            backgroundColor: colors.$white,
            borderRadius: 12,
            borderWidth: 1,
            marginTop:20,
            marginLeft: 16,
            marginRight: 16
          }}
        > 
          <TextInput
            style={{
              ...styles.textInput
            }}
            value={searchVal}
            onChangeText={this.searchHandler}
            placeholder={'Search'}
            placeholderTextColor = "black"
          />

        </View>
        <ScrollView style={{margin:16}}>
          {this.renderOption()}
        </ScrollView>
      </BottomSheet>
    );
  };

  render() {
    const { value = '', placeholder = '', data = {}, defaultValue = '' } = this.props;
    // let arr = this.sortObject(data);
    return (
      <View>
        <Text style={{ marginBottom: placeholder ? 10 : 0, color:'#676773', fontSize:14}} >
          {placeholder}
        </Text>
        <TouchableOpacity
          onPress={this.openBs}
        >
        <View 
          style = {{
            padding:15,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius:5,
            borderWidth: 1
          }}
        >
          { 
            value ?
            <View >
              <Text fs={14} medium color={colors.$white}>
                {value}
              </Text>
            </View>
            : 
            <View >
              <Text fs={14} medium color={colors.$white}>
                {defaultValue}
              </Text>
            </View>
          }
            <Icon name={"angle-right"} size={20}/>

          {/* <Image source={IMG} style = {{width:25, height:25}}/> */}
        </View>
      </TouchableOpacity>
      {this.renderRbSheet()}
      </View>
    );
  }
}
