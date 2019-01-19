import React, {Component} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Card, CardSection, Input, Spinner} from "./common";
import firebase from 'firebase';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onLoginSuccess() {
        this.setState({
            email: '',
            password:'',
            error: '',
            loading: false});
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed.',
            loading: false
        })

    }


    async onButtonPress() {
        this.setState({error: '', loading: true});
        const {email, password} = this.state;
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            this.onLoginSuccess();
        } catch (error) {
            console.log("Error logging in");
            console.log(error);

            // Attempt to make account for user
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                this.onLoginSuccess();
            } catch(error) {
                console.log("Error creating account");
                console.log(error);
                this.onLoginFail();
            }

        }



    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size={'small'}/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder={"user@gmail.com"}
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder={"password"}
                        label={"Password"}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
  errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color:'red'

  }
};
LoginForm.propTypes = {};

export default LoginForm;
