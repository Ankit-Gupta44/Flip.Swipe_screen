// on swipe screen chnages

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Flipcart = () => {
  const [isFlipped, setisFlipped] = useState(false);
  const translationX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX > 50 || event.translationX < -50) {
        runOnJS(handleSwipe)();
      } else {
        translationX.value = withSpring(0);
      }
    },
  });

  const handleSwipe = () => {
    translationX.value = withTiming(0, { duration: 300 }, () => {
      setisFlipped(!isFlipped);
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${translationX.value}deg` }],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${180 + translationX.value}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={Styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[Styles.cardContainer, frontStyle]}>
          <Text style={Styles.cardText}>Front Screen</Text>
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[Styles.cardContainer, backCardStyle, Styles.cardBack]}
        >
          <Text style={Styles.cardText}>Back Screen</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 200,
    height: 300,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: 'lightcoral',
    position: 'absolute',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Flipcart;



// ontap screen changes

// import React,{useState} from 'react';

// import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
// import Animated, {Easing,
//     interpolate,
//     useAnimatedStyle,
// useSharedValue,
// withSpring,
// withTiming,
// runOnJS,
// useDerivedValue} from 'react-native-reanimated';


// import {TapGestureHandler,State,} from  'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Flipcart = () => {

//     const [isFlipped,setisFlipped] = useState(false);
//     const rotation = useSharedValue(0);

//     // const toggleFlip = () => {
//     //     rotation.value = withTiming(
//     //         isFlipped ? 0 : 180,
//     //         {
//     //             duration : 500,
//     //             easing : Easing.ease,
//     //         },
//     //         () => {
//     //             runOnJS(setisFlipped(!isFlipped));
//     //         },
//     //     );
//     // };

//     const toggleFlip = () => {
//         rotation.value = withTiming(
//           isFlipped ? 0 : 180,
//           {
//             duration: 500,
//             easing: Easing.ease,
//           },
//           () => {
//             runOnJS(handleFlip)();
//           }
//         );
//       };
    
//       const handleFlip = () => {
//         setisFlipped(!isFlipped);
//       };

//     const frontStyle = useAnimatedStyle(() => {
//         return{
//             transform : [
//                 {perspective: 1000},
//                 {rotateY : `${rotation.value}deg`},
                
//             ],
//         };
//     })
//     const backCardStyle = useAnimatedStyle(() => {
//         return{
//             transform : [
//                 {perspective: 1000},
//                 {rotateY : `${rotation.value+180}deg`}
//             ],
//         };
//     });

//     return(
//         <GestureHandlerRootView style = {Styles.container} >
//             <TapGestureHandler
//                 onHandlerStateChange = {({nativeEvent}) => {
//                 if( nativeEvent.state === State.END )
//                     toggleFlip();
//                 }
//             }>                                                                                                          
//             <Animated.View style = {[Styles.cardContainer, frontStyle]}>
//                 <Text style  = {Styles.cardText}>Front Screen</Text>    
//             </Animated.View>    
//             </TapGestureHandler>
//             <TapGestureHandler
//                 onHandlerStateChange = {({nativeEvent}) => {
//                 if( nativeEvent.state === State.END )
//                     toggleFlip();
//                 }
//             }>
//             <Animated.View style = {[Styles.cardContainer, backCardStyle,Styles.cardBack]}>
//                 <Text style  = {Styles.cardText}>Back Screen</Text>    
//             </Animated.View>    
//             </TapGestureHandler>

//             {/* <TapGestureHandler>
                
//             </TapGestureHandler> */}

//         </GestureHandlerRootView>
//     )

// }

// const Styles = StyleSheet.create({
//     container:{
//         flex : 1,
//         justifyContent : 'center',
//         alignItems : 'center',
//     },
//     cardContainer:{
//         width:200,
//         height : 300,
//         backgroundColor : 'lightblue',
//         justifyContent:'center',
//         alignItems : 'center',
//         borderRadius : 10,
//         backfaceVisibility : 'hidden'
//     },
//     cardBack:{
//         backgroundColor: 'lightcoral',
//         position : 'absolute',
//     },
//     cardText:{
//         fontSize:24,
//         fontWeight:'bold',
//     }
// })

// export default Flipcart;