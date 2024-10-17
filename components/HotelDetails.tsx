import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import HotelCard from './HotelCard'

export default function HotelDetails({hotel}:any) {
  console.log(hotel)
  return (
    <View>
      <Text style={{fontFamily:'outfit-bold', fontSize:18, marginTop:20}}>🏨  Hotel Recommendation</Text>
        
        {hotel.length===1 ?
      <HotelCard hotel={hotel}/>
      :
      <FlatList data={hotel} horizontal={true} renderItem={({item,index})=>(
        <HotelCard hotel={item}/>
      )}/>
      }
    
    </View>
  )
}