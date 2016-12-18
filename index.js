'use strict';

const ReactNative = require('react-native');
const React = require('react');
const {Dimensions, StyleSheet, Animated, Easing} = ReactNative;
const deviceScreen = Dimensions.get('window');
const max = deviceScreen.width;

const {
    PanResponder,
    View,
    TouchableWithoutFeedback,
} = ReactNative;


const Menu = class extends React.Component {
    constructor(props) {
        super(props);
        const pan = props.animatedValue;
        this.state = {
            pan,
            value: new Animated.Value(0),
            isVisible: false
        };   // if ()
        pan.addListener(this.onChange);
    }

    close = () => {
        Animated.timing(this.state.pan, {
            easing: Easing.inOut(Easing.ease),
            duration: 300,
            toValue: 0
        }).start();
    };

    open = () => {
        Animated.timing(this.state.pan, {
            easing: Easing.inOut(Easing.ease),
            duration: 270,
            toValue: max
        }).start();
    };

    render() {
        const {isVisible, value, pan} = this.state;
        const {menuWidth, backdropStyle} = this.props;

        const left = pan.interpolate({
            inputRange: [0, max],
            outputRange: [-menuWidth, 0],
        });

        const opacity = pan.interpolate({
            inputRange: [0, max],
            outputRange: [0, 1.5],
        });

        return (
            <View style={styles.container} {...this._panResponder.panHandlers}>
                {this.props.children}
                {isVisible ? (
                    <TouchableWithoutFeedback onPress={this.close}>
                        <Animated.View style={[styles.backdrop, {opacity}]}>
                            <View style={{width:menuWidth}}>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ) : null}
                <Animated.View style={[styles.menuStyle,  {left, width:menuWidth }]}>
                    {this.props.menu}
                </Animated.View>
            </View>
        );
    }

    onChange = (e)=> {
        console.log('change')
        const val = e.value / max;
        const isVisible = val > 0;
        this.props.onAnimationChange && this.props.onAnimationChange(val);
        if (this.state.isVisible !== isVisible) {
            this.setState({isVisible});
        }
    };

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            // Initially, set the value of x to 0 (the center of the screen)
            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state
                this.state.pan.setOffset(this.state.pan._value);
                this.state.pan.setValue(0);
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: (e, gestureState) => {
                const {dx} = gestureState;
                const x = Math.min(Math.max(0 - this.state.pan._offset, dx), max - this.state.pan._offset);
                if (x !== this.state.pan._value)
                    this.state.pan.setValue(x);
            },

            onPanResponderRelease: (e, x) => {
                this.state.pan.flattenOffset();

                if (x.vx < 0) {
                    this.close();
                } else {
                    this.open();
                }
            }
        });
    };
};

Menu.defaultProps = {
    animatedValue: new Animated.Value(0),
    menuWidth: deviceScreen.width * .66
};


const styles = StyleSheet.create({
    container: {flex: 1},
    menuStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 16
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.2)'
    }
});

module.exports = Menu;