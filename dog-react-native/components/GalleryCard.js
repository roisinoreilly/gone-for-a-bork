import React, { useEffect,useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDogImageUrls } from '../storage-api.js';


const GalleryCard = ({ breed }) => {
    const [userPhotosObj, setUserPhotosObj] = useState({});

    useEffect(()=>{
        getDogImageUrls().then((obj)=>{
          setUserPhotosObj(obj)
        })
    },[])


    if (userPhotosObj.hasOwnProperty(breed)) {
        const dogUrl = userPhotosObj[breed][0];
        return (
          <Image
            source={{uri: dogUrl}}  
            style={styles.photo}
          />
        )
      } else {
        return (
          <ImageBackground 
            resizeMode="center" 
            source={require("../public/assets/mystery-dog.jpg")} 
            style={styles.photo}    
          />
        )
    }

}

export default GalleryCard;

const styles = StyleSheet.create({
  mainText: { 
    color: "#a45c5c", 
    fontSize: 16, 
  },
  photo: {
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    height: 150,
    margin: 10,
    width: 100, 
  }
});