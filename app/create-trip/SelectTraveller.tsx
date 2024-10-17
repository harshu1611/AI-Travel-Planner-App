import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Traveller } from "@/constants/Traveller";
import { CreateTripContext } from "@/context/CreateTripContext";
import OptionCard from "@/components/OptionCard";

export default function SelectTraveller() {
  const [selected, setSelected] = useState<any>(null);
  const tripContext = useContext(CreateTripContext);
  const { tripData, setTripData } = tripContext;

  useEffect(() => {
    setTripData({ ...tripData, travellerInfo: selected });
  }, [selected]);

  useEffect(() => {
    console.log(tripData)
  }, [tripData]);
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%", padding: 25 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"black"} size={30} />
      </TouchableOpacity>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 32, marginTop: 20 }}>
        Who's Travelling{" "}
      </Text>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 28,
          marginTop: 10,
          color: "#808080",
        }}
      >
        Choose your travellers
      </Text>

      <FlatList
        data={Traveller}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelected(item)}>
            <OptionCard data={item} selected={selected} />
          </TouchableOpacity>
        )}
      />

      <View style={{ marginTop: 5 }}>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "black",
            height: "auto",
            padding: 18,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 1,
            alignSelf: "center",
          }}
          onPress={() => {
            router.push('/create-trip/SelectDates')
          }}
        >
          <Text
            style={{ color: "white", fontFamily: "outfit-bold", fontSize: 16 }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
