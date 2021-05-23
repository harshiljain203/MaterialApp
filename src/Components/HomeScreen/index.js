import react from "react";
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { NAVIGATE } from "../../constants";

const IMG = require('../../assets/material1.jpeg')
const DATA = require ('../../content/data.json')
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
  },
  text:{
    marginTop:10,
    fontStyle: 'normal',
    fontSize: 12
  },
  text1: {
    marginTop:10,
    fontStyle: 'normal',
    fontSize: 14
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

  }


  componentDidMount () {
  }

  _renderItem = ({item, index}) => {
    console.log(item, index, DATA[item])
    const {id = "", text = "" ,colours_quantity = 0 , image = ""} = DATA[item]
    return(
      <View style={{width:'50%', padding:5}}>
        <TouchableOpacity 
          style={{
            borderWidth:1,
            padding: 10,
            borderRadius:10
          }}
          onPress = {()=>{
            console.log(this.props.navigation.navigate(NAVIGATE.DETAILS_PAGE, {product_id:item}))
          }}
        >
        <Image style={{width:'100%', resizeMode: 'cover', height:250, width:"100%", borderRadius:10}} source = {COVER[image]}></Image>
        <Text style={styles.text}>
          {`ID: ${id}`}
        </Text>
        <Text style={styles.text1}>
          {text}
        </Text>
        <Text style={styles.text}>
          {`Also availabe in ${colours_quantity} more colors`}
        </Text>
        <View>
          <View
            style={{flexDirection: 'row', marginTop:5}}
          >
          <View
            style={{height:20, width:20, backgroundColor:'red',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'blue',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'green',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'black',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          </View>
          <View
            style={{flexDirection: 'row'}}
          >
          <View
            style={{height:20, width:20, backgroundColor:'grey',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'pink',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'violet',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          <View
            style={{height:20, width:20, backgroundColor:'yellow',marginRight:5, marginBottom:5, borderRadius:50}}
          />
          </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
  


  render() {
    console.log(Object.keys(DATA))
    const data = Object.keys(DATA)
    return (
      <ScrollView 
      >
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}     //has to be unique   
          renderItem={this._renderItem} //method to render the data in the way you want using styling u need
          numColumns={2}
        /> 
			</ScrollView>
    );
  }
}

export default HomeScreen;
