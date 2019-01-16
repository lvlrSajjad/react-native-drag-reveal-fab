/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Animated, View, PanResponder, Dimensions, TouchableOpacity} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class DragReveal extends Component<Props> {
    constructor(props) {
        super(props);

    }

    _animatedValue = new Animated.Value(0);
    _animatedValue2 = new Animated.Value(32);
    _animatedValue3 = new Animated.Value(0);
    _animatedValue4 = new Animated.Value(0);
    _collapsed = true;
    _expanded = false;

    _panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {

            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            const moveX = Math.round(width - gestureState.moveX);
            if (moveX <= width) {
                this._animatedValue.setValue(moveX);
                this._animatedValue3.setValue(2 * moveX);
                this._animatedValue4.setValue(1 / -moveX);
                if (moveX <= 32 && moveX >0) {
                    if (moveX > width / 2) {
                        this._animatedValue2.setValue(gestureState.moveX);
                    } else {
                        this._animatedValue2.setValue(width - gestureState.moveX);
                    }
                }
            }
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            const moveX = width - gestureState.moveX;
            if (moveX > width / 2) {
                this.expand();
            } else {
                this.collapse();
            }
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {

            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {

            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        },
    });

    expand = () => {
        Animated.parallel([
            Animated.spring(this._animatedValue, {
                toValue: width,
                duration: 200,
            }),
            Animated.spring(this._animatedValue2, {
                toValue: 4,
                duration: 200,

            }),
            Animated.spring(this._animatedValue3, {
                toValue: height,
                duration: 200,

            }),
            Animated.spring(this._animatedValue4, {
                toValue: 1,
                duration: 200,

            })
        ]).start()
    };
    collapse = () => {

        Animated.parallel([
            Animated.spring(this._animatedValue, {
                toValue: 0,
                duration: 200,

            }),
            Animated.spring(this._animatedValue2, {
                toValue: 32,
                duration: 200,

            }),
            Animated.spring(this._animatedValue3, {
                toValue: 0,
                duration: 200,

            }),
            Animated.spring(this._animatedValue4, {
                toValue: 0,
                duration: 200,

            })
        ]).start()
    };

    render() {
        return (
            <Animated.View  {...this._panResponder.panHandlers} style={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                marginTop: 16,
                marginLeft: 16,
                backgroundColor: this.props.backgroundColor,
                minWidth: 56,
                borderRadius: this._animatedValue2,
                width: this._animatedValue,
                maxWidth: width - 32,
                maxHeight: height - 56,
                height: this._animatedValue3,
                minHeight: 56,
                alignItems: 'center',
                justifyContent: 'center',
                elevation:16,
                shadowColor:'black',
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowRadius: 16,
                shadowOpacity: 0.24,
                zIndex:100
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (this._collapsed) {
                            this.expand();
                            this.props.onExpand();
                        }
                    }}
                    style={{width: '100%', height: '100%'}}>
                    <Animated.View style={{width: '100%', height: '100%', opacity: this._animatedValue4}}>
                        {this._collapsed && this.props.icon}
                        {this.props.children}
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
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
