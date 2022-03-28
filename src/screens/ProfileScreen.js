/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {asynclogout} from '../redux/users/action';
import {asyncGetOrders} from '../redux/orders/action';
import COLORS from '../utils/colors';

const ProfileScreen = props => {
  useEffect(() => {
    if (props.user) {
      props.asyncGetOrders(props.user.jwt);
    }
  }, []);

  const countOrders = () => {
    const orders = props.orders;
    let count = 0;
    orders.forEach(order => {
      if (props.user.user.email === order.user.email) {
        count++;
      }
    });
    return count;
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to Logout?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          props.navigation.dispatch(StackActions.popToTop());
          props.asynclogout();
          console.log('Logout success');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={30}
          onPress={() => props.navigation.goBack()}
          color={COLORS.white}
        />
        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingLeft: 10,
            color: COLORS.white,
          }}>
          My Account
        </Text>
        <View style={{marginLeft: 160}}>
          <Icon
            name="logout"
            size={30}
            color={COLORS.white}
            onPress={() => handleLogout()}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                margin: 8,
                borderWidth: 4,
                borderRadius: 100,
                borderColor: 'white',
                backgroundColor: 'white',
              }}>
              <Icon name="person" size={90} color={COLORS.blue} />
            </View>
            <Text style={{padding: 5, fontSize: 21, color: 'white'}}>
              {props.user.user.username}{' '}
            </Text>
            <Text style={{padding: 3, fontSize: 21, color: 'white'}}>
              {props.user.user.email}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.cartCard}>
          <View
            style={{
              height: 40,
              paddingTop: 8,
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, width: '35%'}}>
              Name
            </Text>
            <Text style={{fontSize: 18, width: '50%'}}>
              {props.user.user.username.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.cartCard}>
          <View
            style={{
              height: 40,
              paddingTop: 8,
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, width: '35%'}}>
              User Name
            </Text>
            <Text style={{fontSize: 18, width: '70%'}}>
              {props.user.user.username}
            </Text>
          </View>
        </View>
        <View style={styles.cartCard}>
          <View
            style={{
              height: 40,
              paddingTop: 8,
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, width: '35%'}}>
              Email
            </Text>
            <Text style={{fontSize: 18, width: '70%'}}>
              {props.user.user.email}
            </Text>
          </View>
        </View>
        <View style={styles.cartCard}>
          <View
            style={{
              height: 40,
              paddingTop: 8,
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, width: '35%'}}>
              Total Orders
            </Text>
            <Text style={{fontSize: 18, width: '70%'}}>{countOrders()}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    asynclogout: () => dispatch(asynclogout()),
    asyncGetOrders: jwt => dispatch(asyncGetOrders(jwt)),
  };
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.blue,
  },
  container: {
    backgroundColor: COLORS.blue,
    height: 250,
    padding: 20,
    marginBottom: 20,
  },
  cartCard: {
    height: 50,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
