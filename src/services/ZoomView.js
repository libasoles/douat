import React, { Component } from "react";

import * as PropTypes from "prop-types";
import { View, StyleSheet, PanResponder, ViewPropTypes } from "react-native";

// Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes;

export default class ZoomView extends Component {
  static propTypes = {
    ...viewPropTypes,
    scalable: PropTypes.bool,
    minScale: PropTypes.number,
    maxScale: PropTypes.number,
    defaultScale: PropTypes.number
  };

  static defaultProps = {
    scalable: true,
    minScale: 0.5,
    maxScale: 2,
    defaultScale: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: props.defaultScale,
      lastScale: 1,
      offsetX: 0,
      offsetY: 0,
      lastX: 0,
      lastY: 0,
      lastMovePinch: false
    };
    this.distant = 150;

    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminationRequest: evt => true,
      onShouldBlockNativeResponder: evt => false
    });

    this.selector = React.createRef();
  }

  handleStartShouldSetPanResponder = (e, gestureState) => {
    // don't respond to single touch to avoid shielding click on child components
    return false;
  };

  handleMoveShouldSetPanResponder = (e, gestureState) => {
    return (
      this.props.scalable &&
      (Math.abs(gestureState.dx) > 2 ||
        Math.abs(gestureState.dy) > 2 ||
        gestureState.numberActiveTouches === 2)
    );
  };

  static calculateDelta(e) {
    const dx = Math.abs(
      e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
    );
    const dy = Math.abs(
      e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
    );

    return { dx, dy };
  }

  handlePanResponderGrant = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 2) {
      const { dx, dy } = ZoomView.calculateDelta(e);
      const distant = Math.sqrt(dx * dx + dy * dy);
      this.distant = distant;
    }
  };

  handlePanResponderEnd = (e, gestureState) => {
    this.setState({
      lastX: this.state.offsetX,
      lastY: this.state.offsetY,
      lastScale: this.state.scale
    });
  };

  handlePanResponderMove = (e, gestureState) => {
    const isZoomGesture = gestureState.numberActiveTouches === 2;

    if (isZoomGesture) {
      this.zoom(e);
    }

    this.translate(e, gestureState);
  };

  zoom = e => {
    const { dx, dy } = ZoomView.calculateDelta(e);
    const distant = Math.sqrt(dx * dx + dy * dy);
    const scale = (distant / this.distant) * this.state.lastScale;

    if (scale < this.props.maxScale && scale > this.props.minScale) {
      this.setState({ scale, lastMovePinch: true });
    }
  };

  translate = (e, gestureState) => {
    const { offsetX, offsetY } = this.getOffset(gestureState);

    if (this.state.scale > 1) {
      this.constraintToBoundaries(offsetX, offsetY);
    }
  };

  getOffset = gestureState => {
    const { scale } = this.state;
    if (this.state.lastMovePinch) {
      gestureState.dx = 0;
      gestureState.dy = 0;
    }

    return {
      offsetX: this.state.lastX + gestureState.dx / scale,
      offsetY: this.state.lastY + gestureState.dy / scale
    };
  };

  getBoundaries = () => {
    const { scale } = this.state;
    const { width, height } = this.dimensions;
    const overflowXArea = width * scale - width;
    const overflowYArea = height * scale - height;

    return {
      boundaryX: overflowXArea / 2 / scale,
      boundaryY: overflowYArea / 2 / scale
    };
  };

  constraintToBoundaries = (offsetX, offsetY) => {
    const { boundaryX, boundaryY } = this.getBoundaries();

    const overflowsLeft = offsetX > boundaryX;
    const overflowsRight = offsetX < -boundaryX;
    const overflowsTop = offsetY > boundaryY;
    const overflowsBottom = offsetY < -boundaryY;

    if (overflowsLeft || overflowsRight) {
      offsetX = boundaryX * Math.sign(offsetX);
    }

    if (overflowsTop || overflowsBottom) {
      offsetY = boundaryY * Math.sign(offsetY);
    }

    this.setState({ offsetX, offsetY, lastMovePinch: false });
  };

  getViewDimensions = element => {
    if (element && element.nativeEvent) {
      this.dimensions = element.nativeEvent.layout;
    }
  };

  render() {
    return (
      <View
        {...this.gestureHandlers.panHandlers}
        style={[
          styles.container,
          this.props.style,
          {
            transform: [
              { scaleX: this.state.scale },
              { scaleY: this.state.scale },
              { translateX: this.state.offsetX },
              { translateY: this.state.offsetY }
            ]
          }
        ]}
        onLayout={this.getViewDimensions}
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
