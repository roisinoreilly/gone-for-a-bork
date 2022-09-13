import React, { useEffect,useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Breeds from '../public/breeds.js';
import Common from '../public/common.js';
import {auth} from "../firebase.js"
import { getAllImageURLsByUser } from '../storage-api.js';
import GalleryCard from '../components/GalleryCard.js';
import UnmatchedCard from "./UnmatchedCard";


const GalleryScreen = () => {
  const [allCardsLoaded, setAllCardsLoaded] = useState(false);
  const [unmatchedLoaded, setUnmatchedLoaded] = useState(false);
  const [unmatchedFull, setUnmatchedFull] = useState(false);
  const [dogCardFull, setdogCardFull] = useState(false);
  const [userPhotosArray, setUserPhotosArray] = useState([]);
  
  useEffect(()=>{
    getAllImageURLsByUser(auth.currentUser.uid).then(arrayOfUrls=>{
      setUserPhotosArray(arrayOfUrls);
    })
  },[])

  const GalleryNine = () => (
    <View style={styles.list}>
      {Breeds.breeds.map((dog)=>{
        if (Common.common.indexOf(dog.breed) !== -1) {
          const dogUpperCase = dog.breed.toUpperCase();
          return (
            <GalleryCard 
              key={dogUpperCase}
              breed={dogUpperCase}
            />
          )
        }
      })}
    </View>
  )

  const GalleryPlus = () => (
    <View style={styles.list}>
      {Breeds.breeds.map((dog)=>{
          const dogUpperCase = dog.breed.toUpperCase();
          return (
            <GalleryCard 
              key={dogUpperCase}
              breed={dogUpperCase}
            />
          )
      })}
    </View>
  )

  const fullView = () => {
    setUnmatchedFull(true)
  }

  const GalleryUnmatched = () => (
    <View style={styles.list}>
      {userPhotosArray.map((photoUrl)=>{
        const key = userPhotosArray.indexOf(photoUrl)
        if (/(.+com\/o\/__.+)\w+/.test(photoUrl)) {
          return (
            <>
              <ImageBackground
                key={key}
                resizeMode="stretch" 
                source={{uri: photoUrl}}
                style={styles.photo}
              >
                <View style={styles.overPic}>
                  <TouchableOpacity onPress={fullView} style={styles.press}/>
                </View>
              </ImageBackground>
              
            </>
          )
        }
      })}
    </View>
  )

  const loadAllCards = () => {
    setAllCardsLoaded(true);
  };

  const hideAllCards = () => {
    setAllCardsLoaded(false);
  };

  const loadUnmatched = () => {
    setUnmatchedLoaded(true);
  }

  const hideUnmatched = () => {
    setUnmatchedLoaded(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {!unmatchedFull ? (
         <ScrollView style={styles.scrollView}>
         <Text style={styles.titleText}>Matched Dogs!</Text>
         <Text style={styles.subtitleText}>How many will you collect?</Text>
         <Text style={styles.mainText}>Nine most popular breeds...</Text>
         <GalleryNine />
         <Text style={styles.mainText}>All breeds...</Text>
         {!allCardsLoaded? (
           <TouchableOpacity onPress={loadAllCards}>
             <Text style={styles.button}>View All</Text>
           </TouchableOpacity>
         ) : (
           <TouchableOpacity onPress={hideAllCards}>
             <Text style={styles.button}>Hide All</Text>
           </TouchableOpacity>
         )}
         {allCardsLoaded? (
           <>
           <GalleryPlus />
           <TouchableOpacity onPress={hideAllCards}>
             <Text style={styles.button}>Hide All</Text>
           </TouchableOpacity>
           </>
         ) : (
           <></>
         )}
         <Text style={styles.titleText}>Unmatched Snaps</Text>
         <Text style={styles.mainText}>(Possibly not a dog)</Text>
         {!unmatchedLoaded? (
           <TouchableOpacity onPress={loadUnmatched}>
             <Text style={styles.button}>View All</Text>
           </TouchableOpacity>
         ) : (
           <TouchableOpacity onPress={hideUnmatched}>
             <Text style={styles.button}>Hide All</Text>
           </TouchableOpacity>
         )}
         {unmatchedLoaded? (
           <>
           <GalleryUnmatched />
           <TouchableOpacity onPress={hideUnmatched}>
             <Text style={styles.button}>Hide All</Text>
           </TouchableOpacity>
           </>
         ) : (
           <></>
         )}
         </ScrollView>
      ) : (
        <UnmatchedCard />
      )
      }
     
    </SafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7a4815", 
    color: "#fff", 
    fontSize: 20, 
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    width: 82
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: "#f6d186",
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  list: {
    marginHorizontal: "auto",
    width: 360,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainText: { 
    color: "#a45c5c", 
    fontSize: 16, 
  },
  overPic: {
    alignItems: 'stretch',
    bottom: 0, 
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,   
  }, 
  photo: {
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    height: 150,
    margin: 10,
    width: 100, 
  },
  press: {
    flex: 1,
  },
  subtitleText: { 
    color: "#a45c5c", 
    fontWeight: "700", 
    fontSize: 16, 
  },
  titleText: { 
    color: "#a45c5c", 
    fontWeight: "900", 
    fontSize: 24, 
  }
});
