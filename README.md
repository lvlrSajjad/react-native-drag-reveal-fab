<h1 align="center">
<br>
 React Native Drag Reveal Fab
 </br>
 <br>

</h1>
<p align="center">

 <img  src="https://raw.githubusercontent.com/lvlrSajjad/react-native-drag-reveal-fab/master/gif.gif" width="30%">
</p>
<h2 align="center">Usage</h2>

A view can be revealed by dragging its fab

installation :  
 ```
 npm install react-native-drag-reveal-fab --save
```
import :
```jsx harmony
import DragReveal from 'react-native-drag-reveal-fab'
```
usage :
```jsx harmony
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions, Text} from 'react-native';
import DragReveal from "./DragReveal";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container} >
                <Text>
                    {instructions}
                </Text>
               <DragReveal
                  icon // this you can render a custom icon that will be shown when fab minimized
                  onExpand //this happens on reveal
                  backgroundColor {'#004D40'}>
                  {/* this content will reveal*/}
              </DragReveal>
            </View>
        );
    }

}

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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```


