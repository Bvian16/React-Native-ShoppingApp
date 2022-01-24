import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Error} from '../components/Error';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {asynclogin} from '../redux/users/action';
import {connect} from 'react-redux';

const image = require('../components/images/backgroundimg.jpg');

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, navigation} = props;

  useEffect(() => {
    if (user) {
      navigation.navigate('ShoppingApp');
    }
  }, [user, navigation]);

  const handleLogin = () => {
    props.asyncLogin(email, password);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={image} resizeMode={'cover'} style={styles.image}>
        <View style={styles.brandView}>
          <Text style={styles.brandViewText}>Shopping App</Text>
        </View>
      </ImageBackground>
      <Error error={''} />
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
            Welcome
          </Text>
          <Input
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          <FilledButton
            title={'Login'}
            style={styles.loginButton}
            onPress={() => handleLogin()}
          />
          <Text style={{textAlign: 'center'}}>
            Don't have an account?
            <Text
              style={{
                color: 'red',
                fontStyle: 'italic',
              }}
              onPress={() => {
                navigation.navigate('Registration');
              }}>
              {' '}
              Register now
            </Text>
          </Text>
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
    asyncLogin: (email, password) => {
      dispatch(asynclogin(email, password));
    },
  };
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  image: {
    height: Dimensions.get('window').height / 3,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
