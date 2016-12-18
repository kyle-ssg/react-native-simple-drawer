const React = require('react');
const SideMenu = require('./Menu');

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
        const MENU_WIDTH = 250;
        const BAR_WIDTH = 44;
        const width = this.state.animation.interpolate({
            inputRange: [0, MENU_WIDTH * .8, MENU_WIDTH],
            outputRange: [0, 0, BAR_WIDTH],
        });
        const menu = (
            <View style={{flex:1,flexDirection:'row'}}>
                <View
                    style={{elevation:25, padding:10,backgroundColor:'white',flex:1,marginLeft:-BAR_WIDTH,paddingLeft:BAR_WIDTH+10}}>
                    <Text>react-native-simple-drawer</Text>
                </View>
                <Animated.View style={{elevation:5, width,backgroundColor:'#f1f1f1'}}>
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