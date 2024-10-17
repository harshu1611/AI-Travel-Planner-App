import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "@firebase/auth";
import { app } from "@/config/FirebaseConfig";



export default function index() {
  const navigation = useNavigation();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const auth= getAuth(app)
  const signUp=()=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    if(user){
        router.replace('/MyTrip')
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", height: "100%", padding: 20 }}
    >
        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back" color={'black'} size={24}/>
        </TouchableOpacity>
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 36, marginTop: 10 }}
        >
          Welcome to Trippify!
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 36,
            marginTop: 10,
            color: "#808080",
          }}
        >
          Let's Create
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 36,
            marginTop: 10,
            color: "#808080",
          }}
        >
          Your Way to Smart Travel
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 20,
          gap: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Enter Email"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "#808080",
            width: "100%",
          }}
          placeholderTextColor={"#808080"}
          value={email}
          onChangeText={(e)=>{
            setEmail(e)
          }}
        ></TextInput>
        <TextInput
          placeholder="Enter Email"
          keyboardType="email-address"
          secureTextEntry={true}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "#808080",
            width: "100%",
          }}
          placeholderTextColor={"#808080"}
          value={password}
          onChangeText={(e)=>{
            setPassword(e)
          }}
        ></TextInput>
      </View>
      <TouchableOpacity style={{width:'100%', backgroundColor:'black', height:'auto', padding:18, borderRadius:28, justifyContent:'center', alignItems:'center', marginTop:30}} onPress={()=>{
         signUp()
        }}>
            <Text style={{color:'white', fontFamily:'outfit-bold', fontSize:16}}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{color:'#808080', fontFamily:'outfit', textAlign:'center', marginTop:30, fontSize:20}}>OR</Text>
        <TouchableOpacity style={{display:'flex', flexDirection:'row',width:'100%', backgroundColor:'black', height:'auto', padding:18, borderRadius:28, justifyContent:'center', alignItems:'center', marginTop:30}} onPress={()=>{
           router.replace('/auth/sign-in')
        }}>
            <AntDesign name="google" size={24} color="white" />
            <Text style={{color:'white', fontFamily:'outfit-bold', fontSize:16, marginLeft:10}}>Already have an account?</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
