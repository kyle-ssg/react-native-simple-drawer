const React = require('react');
const SideMenu = require('react-native-simple-drawer');

const {
    StyleSheet,
    Dimensions,
    Animated,
    Text,
    View,
    TouchableOpacity,
} = require('react-native');
const {Component} = React;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {animation: new Animated.Value(0)}
    }

    render() {
        const DEVICE_WIDTH = Dimensions.get("window").width;
        const MENU_WIDTH = 250;
        const BAR_WIDTH = 44;
        const width = this.state.animation.interpolate({
            inputRange: [0, DEVICE_WIDTH * .8, DEVICE_WIDTH],
            outputRange: [0, 0, 44],
        });
        const menu = (
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{elevation:25, padding:10,backgroundColor:'white',width:MENU_WIDTH-BAR_WIDTH}}>
                    <Text>react-native-simple-drawer</Text>
                </View>
                <Animated.View style={{elevation:16, width,backgroundColor:'#f1f1f1'}}>
                </Animated.View>
            </View>
        );
        return (
            <SideMenu
                backdropStyle={{backgroundColor:'rgba(25,0,75,.5)'}}
                ref="menu"
                value={this.state.animation}
                width={MENU_WIDTH}
                menu={menu}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.refs.menu.open()}>
                        <Text style={styles.welcome}>Toggle Menu</Text>
                    </TouchableOpacity>
                </View>
            </SideMenu>
        );
    }
};