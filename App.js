import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, Dimensions} from 'react-native';

const App = () => {
  const windowWidth = Dimensions.get('window').width;

  let images = [
    'https://images.unsplash.com/photo-1596854372745-0906a0593bca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D', 
    'https://images.unsplash.com/photo-1584197176155-304c9a3c03ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D', 
    'https://images.unsplash.com/photo-1584197176155-304c9a3c03ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'
  ];

  const pan = useRef(new Animated.ValueXY()).current;
  const pan_width = useRef(new Animated.Value(300)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: Animated.event(
        [
          null, 
          {dx: pan.x, dy: pan.y}
        ]
      ), 
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState.moveX + " " + gestureState.moveY + gestureState.dx + " " + gestureState.dy);
        if (gestureState.moveX <= windowWidth * 3 / 4) {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 1,
            tension: 100,
            useNativeDriver: true
          }).start();
        } else {
          // Animated.spring(pan, {
          //   toValue: {x: windowWidth, y: 0},
          //   friction: 2,
          //   tension: 140,
          //   useNativeDriver: true
          // }).start();
          Animated.spring(pan_width, {
            toValue: 0,
            friction: 2,
            tension: 140,
            useNativeDriver: true
          }).start();
        }
      }
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: pan_width, 
          aspectRatio: 3 / 4, 
          transform: [
            {translateX: pan.x}, {translateY: pan.y}
          ],
        }}
        {...panResponder.panHandlers}
        source={{uri:'https://images.unsplash.com/photo-1584197176155-304c9a3c03ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}}
      >
      </Animated.Image>
      {/* <Animated.Image
        style={{
          width: 200, 
          aspectRatio: 3 / 4, 
          transform: [
            {translateX: pan.x}, {translateY: pan.y}
          ],
        }}
        {...panResponder.panHandlers}
        source={{uri:'https://images.unsplash.com/photo-1584197176155-304c9a3c03ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}}
      >
      </Animated.Image>
      <Animated.Image
        style={{
          width: 200, 
          aspectRatio: 3 / 4, 
          transform: [
            {translateX: pan.x}, {translateY: pan.y}
          ],
        }}
        {...panResponder.panHandlers}
        source={{uri:'https://images.unsplash.com/photo-1584197176155-304c9a3c03ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'}}
      >
      </Animated.Image> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    color: 'white', 
    userSelect: false
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;