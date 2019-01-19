import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import {Button, Header, Spinner} from "./components/common";
import LoginForm from "./components/LoginForm";



class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCSDDGBdzzvGSPkn9QhYq2v09zfJF_e6_A",
            authDomain: "authentication-demo-7ebc8.firebaseapp.com",
            databaseURL: "https://authentication-demo-7ebc8.firebaseio.com",
            projectId: "authentication-demo-7ebc8",
            storageBucket: "authentication-demo-7ebc8.appspot.com",
            messagingSenderId: "599853565333"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false})
            }
        })
    }

    renderContent() {
        const {
            logOutButtonStyle,
            spinnerStyle
        } = styles;
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={logOutButtonStyle}>
                        <Button>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <View style={spinnerStyle}>
                        <Spinner size={'large'}/>
                    </View>
                );
        }
    }

    render() {
        return (
            <View style={styles.appContainerStyle}>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    appContainerStyle: {
        flex: 1
    },
    logOutButtonStyle: {
        flexDirection: 'row',
        paddingTop: 10
    },
    spinnerStyle: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default App;
