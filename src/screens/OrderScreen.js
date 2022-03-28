/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors';
import {connect} from 'react-redux';
import {asyncGetOrders} from '../redux/orders/action';

const OrderScreen = props => {
  useEffect(() => {
    // console.log('useeffect');
    if (props.user) {
      props.asyncGetOrders(props.user.jwt);
    }
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const CartCard = ({item, key}) => {
    // console.log(item);
    return (
      <View style={style.cartCard} key={key}>
        <Image
          source={{uri: item.product.Image.name}}
          style={{height: 80, width: 80}}
          resizeMode="contain"
        />
        <View
          style={{
            height: 100,
            marginHorizontal: 10,
            paddingVertical: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {item.product.Title}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            &#8377; {item.product.Price}
          </Text>
        </View>
        <View style={style.iconContainer}>
          <View style={style.actionBtn}>
            <Icon name="chevron-right" size={30} color={COLORS.grey} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
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
          My Orders
        </Text>
      </View>
      <ScrollView scrollEnabled={true}>
        {props.orders.reverse().map((order, key) => {
          // console.log('from', props.user.user.email);
          // console.log('from order', order.user.email);
          if (props.user && props.user.user.email === order.user.email) {
            return (
              <View key={key}>
                <Text style={style.OrderItems}>
                  Order Date: {new Date(order.updated_at).toDateString()}
                </Text>
                <FlatList
                  scrollEnabled={false}
                  contentContainerStyle={{paddingBottom: 10}}
                  data={order.OrderItems}
                  renderItem={({item}) => <CartCard item={item} />}
                />
              </View>
            );
          }
        })}
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
    asyncGetOrders: key => dispatch(asyncGetOrders(key)),
  };
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.blue,
    marginBottom: 10,
  },
  cartCard: {
    height: 120,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    // width: 80,
    height: 30,
    marginVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconContainer: {
    // height: 80,
    alignItems: 'center',
  },
  OrderItems: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
    color: COLORS.blue,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
