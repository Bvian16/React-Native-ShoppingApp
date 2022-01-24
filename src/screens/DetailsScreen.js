/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import COLORS from '../utils/colors';
import {addItemsToCart} from '../redux/products/action';

const DetailsScreen = props => {
  const {navigation, route} = props;
  const product = route.params;
  const [productQuantity, setproductQuantity] = React.useState(1);

  const HandleCart = () => {
    props.addItemsToCart(
      {
        ...product,
        Quantity: productQuantity,
      },
      props.cart,
    );
    ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
        <Icon
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
          color={COLORS.blue}
        />
        {/* <Icon
          name="shopping-cart"
          size={28}
          onPress={() => navigation.navigate('Cart')}
          color={COLORS.blue}
        /> */}
      </View>
      <View style={style.imageContainer}>
        <Image
          source={{uri: product.Image.name}}
          style={{
            resizeMode: 'contain',
            flex: 1,
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <ScrollView style={style.detailsContainer}>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 22, fontWeight: 'bold', color: COLORS.blue}}>
              {product.Title}
            </Text>
          </View>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              &#8377;{product.Price}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            paddingBottom: 20,
            marginBottom: 30,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Description</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            {product.Description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="remove-circle-outline"
                size={35}
                onPress={() => {
                  if (productQuantity > 0) {
                    setproductQuantity(productQuantity - 1);
                  }
                }}
                color={COLORS.grey}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                {productQuantity}
              </Text>
              <Icon
                name="add-circle-outline"
                size={35}
                onPress={() => {
                  setproductQuantity(productQuantity + 1);
                }}
                color={COLORS.grey}
              />
              {/* <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View> */}
            </View>
            <TouchableOpacity
              style={style.buyBtn}
              onPress={() => {
                HandleCart();
              }}>
              <Text
                style={{color: COLORS.white, fontSize: 15, fontWeight: 'bold'}}>
                ADD TO CART
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    addItemsToCart: (product, cart) => {
      dispatch(addItemsToCart(product, cart));
    },
  };
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 20,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.blue,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
