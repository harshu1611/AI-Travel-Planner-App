import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import FlightDetails from "@/components/FlightDetails";
import HotelDetails from "@/components/HotelDetails";
import Itinerary from "@/components/Itinerary";

export default function index() {
  const { tripData } = useLocalSearchParams();
  const [trip, setTrip] = useState<any>();
  const [photo, setPhoto] = useState<any>(null);
  // console.log((tripData + typeof(tripData)))
  useEffect(() => {
    if (typeof tripData === "string") {
      setTrip(JSON.parse(tripData));
    }
   
      getPlaceImage();
    console.log('us 3')

    return()=>{}
  }, []);
  const getPlaceImage = async () => {
    if (typeof tripData === "string") {
      try {
        const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
          JSON.parse(tripData).trip.destination.split(",")[0]
        }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      console.log(response.data.results[0].photos[0].photo_reference);
      setPhoto(response.data.results[0].photos[0].photo_reference);
      } catch (error) {
        setPhoto('random')
      }
      
    }
  };
  // console.log("trip d", trip);
  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 50, left: 25, zIndex: 9999 }}
      >
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      {photo ? 
    <>
    {photo &&  <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        }}
        style={{ width: "100%", height: 330 }}
      />}
     
      {trip && (
        <View
          style={{
            height: "100%",
            padding: 25,
            borderRadius: 20,
            marginTop: -30,
            backgroundColor: "white",
          }}
        >
          <View style={{ display: "flex", justifyContent: "space-evenly", gap:6 }}>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>{trip.trip.destination}</Text>
            {/* <Text style={{fontFamily:'outfit', fontSize:16, color:'#808080'}}>{moment(trip.trip.date.split(' - ')[0]).format('DD MMM YYYY')} - {moment(trip.trip.date.split(' - ')[1]).format('DD MMM YYYY')}</Text> */}
            <Text style={{fontFamily:'outfit', fontSize:16, color:'#808080'}}>🚌 {trip.trip.traveler}</Text>
            <Text style={{fontFamily:'outfit', fontSize:16, color:'#808080'}}>💰 {trip.trip.budget}</Text>
          </View>
          
          {photo && trip.trip.flight && <FlightDetails flight={trip.trip.flight}/>}
          {photo && trip.trip.hotel && <HotelDetails hotel={trip.trip.hotel}/>}
          {photo && trip.trip.itinerary && <Itinerary itinerary={trip.trip.itinerary}/>}
        </View>
      )}
    </>  
    :
   (
    <View style={{height:'100%', justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
   )
      }
    </ScrollView>
  )

}