import React, { useState, useEffect, useMemo } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const COLORS = [
  'tomato', 'skyblue', 'gold', 'limegreen', 
  'orchid', 'navy', 'coral', 'olive', 
  'teal', 'sienna'
];

export default function App() {
  const [counter, setCounter] = useState(0);

  const animatedValues = useMemo(
    () => Array.from({ length: 500 }, () => new Animated.Value(0)),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  }, [animatedValues]);

  const squares = animatedValues.map((animatedValue, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const animatedStyle = {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100 * direction],
          }),
        },
      ],
    };

    return (
      <Animated.View
        key={index}
        style={[
          styles.box,
          { backgroundColor: COLORS[index % COLORS.length] },
          animatedStyle,
        ]}
      />
    );
  });

  return <View style={styles.container}>{squares}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 50,
    height: 50,
    margin: 10,
  },
});