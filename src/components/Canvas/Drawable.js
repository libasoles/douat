import React, { Component } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

class Drawable extends Component {
  constructor(props) {
    super(props);

    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) =>
        this.isSingleTouch(gestureState),
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        this.isSingleTouch(gestureState),

      onPanResponderMove: (evt, gestureState) => {
        this.props.onDrag({
          posX: gestureState.moveX.toFixed(2),
          posY: gestureState.moveY.toFixed(2)
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true
    });
  }

  isSingleTouch = gestureState => gestureState.numberActiveTouches === 1;

  render() {
    return (
      <View
        {...this.gestureHandlers.panHandlers}
        style={[styles.container, this.props.style]}
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Drawable;
