/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors';
import {connect} from 'react-redux';
import {FilledButton} from '../components/FilledButton';
import {
  asyncfetchcart,
  addItemsToCart,
  removeFromCart,
} from '../redux/products/action';
import {asyncAddOrders} from '../redux/orders/action';

const CartScreen = props => {
  const getPrice = () => {
    let total = 0;
    props.cart.forEach(item => {
      total += item.Price * item.Quantity;
    });
    return total;
  };

  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    const get = async () => {
      let asyncCart = await AsyncStorage.getItem('cart');
      asyncCart = asyncCart ? JSON.parse(asyncCart) : [];
      if (!props.cart.length && asyncCart.length) {
        props.asyncfetchcart();
      }
      setTotalPrice(getPrice());
    };
    get();
  }, [props.cart]);

  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{uri: item.Image.name}}
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
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.Title}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            &#8377; {item.Price}
          </Text>
        </View>
        <View style={style.iconContainer}>
          <View style={style.actionBtn}>
            <Icon
              name="remove-circle-outline"
              size={25}
              onPress={() => {
                if (item.Quantity > 1) {
                  const newProduct = {
                    ...item,
                    Quantity: -1,
                  };
                  props.addItemsToCart(newProduct, props.cart);
                }
              }}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 4,
                paddingRight: 4,
              }}>
              {item.Quantity}
            </Text>
            <Icon
              name="add-circle-outline"
              size={25}
              onPress={() => {
                const newProduct = {
                  ...item,
                  Quantity: 1,
                };
                props.addItemsToCart(newProduct, props.cart);
              }}
              color={COLORS.grey}
            />
          </View>

          <View style={style.actionBtn}>
            <Icon
              name="delete"
              size={25}
              onPress={() => {
                props.removeFromCart(item, props.cart);
                setTotalPrice(getPrice());
              }}
              color={COLORS.grey}
            />
          </View>
        </View>
      </View>
    );
  };

  const handleCheckOut = () => {
    Alert.alert('Checkout', 'Are you sure you want to checkout?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          let OrderItems = [];
          props.cart.map(item => {
            OrderItems.push({
              product: item,
              Price: item.Price,
            });
          });
          console.log('line');
          const order = {
            user: props.user.user,
            OrderItems: OrderItems,
          };
          console.log(order);
          console.log('line');
          props.asyncAddOrders(props.user.jwt, order);
          Alert.alert('Success', 'Your order has been placed');
          props.cart.forEach(item => {
            props.removeFromCart(item, props.cart);
          });
          props.navigation.navigate('Order');
        },
      },
    ]);
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
            fontSize: 23,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingLeft: 10,
            color: COLORS.white,
          }}>
          Cart
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={props.cart}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                &#8377; {totalPrice}
              </Text>
            </View>
            <View style={{marginHorizontal: 30, marginTop: 10}}>
              <FilledButton
                title="Checkout"
                onPress={() => {
                  handleCheckOut();
                }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    asyncfetchcart: () => dispatch(asyncfetchcart()),
    addItemsToCart: (item, cart) => dispatch(addItemsToCart(item, cart)),
    removeFromCart: (item, cart) => dispatch(removeFromCart(item, cart)),
    asyncAddOrders: async (key, order) => {
      await dispatch(asyncAddOrders(key, order));
    },
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
    width: 80,
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
    height: 80,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
