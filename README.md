
<img src="./screen.gif"/>

*** Required Props ***
- menu: The menu component

*** Optional Props (See ./example for usage) ***
- direction: "left" or "right"
- style: The style of the menu
- width: The width of the menu
- value: Optional ```Animated.Value(0)``` used to link animations inline with menu

*** Functions / util ***
- ref.close()
- ref.open()
- ref.state.isVisible

***Minimal Example***

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