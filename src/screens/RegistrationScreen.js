/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton} from '../components/IconButton';
import {asyncRegister} from '../redux/users/action';
import {connect} from 'react-redux';

const image = require('../components/images/backgroundimg.jpg');

const RegistrationScreen = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, navigation} = props;
  const [isPress, setIsPress] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (user) {
      setResponse('');
      navigation.navigate('ShoppingApp');
    }
  }, [user, navigation]);

  const handleRegistration = () => {
    if (username === '' || email === '' || password === '') {
      setIsPress(true);
      setResponse('');
    } else {
      props.asyncRegister(username, email, password);
      setResponse('Email is already taken');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={image} resizeMode={'cover'} style={styles.image}>
        <IconButton
          name={'arrow-back-circle-outline'}
          style={styles.closeIcon}
          onPress={() => {
            props.navigation.pop();
          }}
        />
        <View style={styles.brandView}>
          <Text style={styles.brandViewText}>Shopping App</Text>
        </View>
      </ImageBackground>
      {/* Bottom View */}
      <View style={'styles.bottomView'}>
        <View style={{padding: 20}}>
          <Text
            style={{
              color: 'blue',
              fontSize: 34,
              paddingBottom: 20,
              fontFamily: 'Lato-Regular',
            }}>
            REGISTER
          </Text>
          <Input
            style={styles.input}
            placeholder="Username"
            required
            onChangeText={text => setUsername(text)}
          />
          {isPress && !username ? (
            <Error error={'Username is required'} />
          ) : null}
          <Input
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          {isPress && !email ? <Error error={'Email is required'} /> : null}
          <Input
            style={styles.input}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          {isPress && !password ? (
            <Error error={'Password is required'} />
          ) : null}
          {response ? <Error error={response} /> : null}
          <FilledButton
            title={'Register'}
            style={styles.loginButton}
            onPress={() => handleRegistration()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    asyncRegister: (username, email, password) => {
      dispatch(asyncRegister(username, email, password));
    },
  };
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  image: {
    height: Dimensions.get('window').height / 3.5,
  },
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    right: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
