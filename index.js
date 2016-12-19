'use strict';

const ReactNative = require('react-native');
const React = require('react');
const {Dimensions, StyleSheet, Animated, Easing} = ReactNative;
const deviceScreen = Dimensions.get('window');

const {
    PanResponder,
    View,
    TouchableWithoutFeedback,
} = ReactNative;


const Menu = class extends React.Component {
    constructor(props) {
        super(props);
        const pan = props.value;
        this.state = {
            pan,
            value: new Animated.Value(0),
            isVisible: false
        };   // if ()
        pan.addListener(this.onChange);
    }

    componentWillUpdate(newProps, newState) {
        if(newState.isVisible !== this.state.isVisible) {
            newProps.onChange && newProps.onChange(newState.isVisible)
        }
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
            toValue: this.props.width
        }).start();
    };

    shouldAllowPan = (x,dx) => {

        if (this.props.disableGestures)
            return false;

        if ((dx <10 && dx >10) || (dx < 10 && dx>-10)) {
            return false;
        }


        var offset = this.props.targetOffset;
        var direction = this.props.direction;
        var width = this.props.width;
        var isVisible = this.state.isVisible;


        if (direction == 'left') {
            if (isVisible) { //closing by swiping right
                return x < width
            } else {
                return x <=  offset
            }
        } else {
            if (isVisible) { //closing by swiping left
                return deviceScreen.width - x > width
            } else {
                return deviceScreen.width - x <=  offset
            }
        }

    }

    render() {
        const {isVisible, pan} = this.state;
        const {direction, width, backdropStyle, style, children, menu} = this.props;

        const left = direction == 'left' ?
            pan.interpolate({
                inputRange: [0, this.props.width],
                outputRange: [-width, 0],
            }) :
            pan.interpolate({
                inputRange: [0, this.props.width],
                outputRange: [deviceScreen.width, deviceScreen.width - width],
            });

        const opacity = pan.interpolate({
            inputRange: [0, this.props.width],
            outputRange: [0, 1.5],
        });

        return (
            <View style={styles.container} {...this._panResponder.panHandlers}>
                {children}
                {isVisible ? (
                    <TouchableWithoutFeedback onPress={this.close}>
                        <Animated.View style={[styles.backdrop, {opacity}, backdropStyle]}>
                            <View style={{width:width}}>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ) : null}
                <Animated.View style={[styles.menuStyle,  {left, width:width }, style]}>
                    {menu}
                </Animated.View>
            </View>
        );
    }

    onChange = (e)=> {
        const val = e.value / this.props.width;
        const isVisible = val > 0;
        if (this.state.isVisible !== isVisible) {
            this.setState({isVisible});
        }
    };

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: (e, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (e, gestureState) => this.shouldAllowPan(gestureState.moveX, gestureState.dx),
            onPanResponderTerminationRequest: () => false,

            // Initially, set the value of x to 0 (the center of the screen)
            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state
                this.state.pan.setOffset(this.state.pan._value);
                this.state.pan.setValue(0);
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: (e, gestureState) => {
                const {dx} = gestureState;
                const position = this.props.direction == 'left' ? dx : -dx;

                const x = Math.min(Math.max(0 - this.state.pan._offset, position), this.props.width - this.state.pan._offset);
                if (x !== this.state.pan._value)
                    this.state.pan.setValue(x);
            },

            onPanResponderRelease: (e, x) => {
                this.state.pan.flattenOffset();
                const velocity = this.props.direction == 'left' ? x.vx : -x.vx;
                const percent = (this.props.direction == 'left' ? x.dx : -x.dx) / this.props.width;
                if (velocity > .5|| (velocity>0 && percent >.33)) {
                    this.open();
                } else {
                    this.close();
                }
            }
        });
    };
};

Menu.propTypes = {
    disableGestures: React.PropTypes.any,
    onChange: React.PropTypes.any,
    menu: React.PropTypes.any,
    style: React.PropTypes.any,
    backdropStyle: React.PropTypes.any,
    value: React.PropTypes.any,
}

Menu.defaultProps = {
    targetOffset: 44,
    direction: 'left',
    value: new Animated.Value(0),
    width: deviceScreen.width * .66
};


const styles = StyleSheet.create({
    container: {flex: 1},
    menuStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 100,
        backgroundColor: 'transparent'
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