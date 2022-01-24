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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors';
import {connect} from 'react-redux';
import {FilledButton} from '../components/FilledButton';
import {addItemsToCart, removeFromCart} from '../redux/products/action';

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
    setTotalPrice(getPrice());
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
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
          color={COLORS.blue}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingLeft: 10,
            color: COLORS.blue,
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
              <FilledButton title="Checkout" onPress={() => {}} />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, cart) => dispatch(removeFromCart(item, cart)),
    addItemsToCart: (item, cart) => dispatch(addItemsToCart(item, cart)),
  };
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
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
