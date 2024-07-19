import { Animated, Easing } from "react-native"

const easeOutAnimation = (properties, duration, delay, toValue) => {
  Animated.timing(properties, {
    toValue: toValue,
    duration: duration,
    delay: delay,
    easing: Easing.bezier(0.2, 0.52, 0, 0.99),
    useNativeDriver: true,
  }).start();
}

module.exports = {
  easeOutAnimation
}