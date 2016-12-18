const React = require('react');
const SideMenu = require('react-native-simple-drawer');

const {
    StyleSheet,
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
    render() {
        const menu = (
            <View style={{padding:10}}>
                <Text>react-native-simple-drawer</Text>
            </View>
        )
        return (
            <SideMenu
                ref="menu"
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