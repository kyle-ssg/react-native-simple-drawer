```
import SideMenu = from 'react-native-simple-drawer';
```


```
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
                <View>
                    <TouchableOpacity onPress={() => this.refs.menu.open()}>
                        <Text>Toggle Menu</Text>
                    </TouchableOpacity>
                </View>
            </SideMenu>
        );
    }
    };
```