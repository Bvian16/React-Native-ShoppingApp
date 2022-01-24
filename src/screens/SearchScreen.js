/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors';
import {connect} from 'react-redux';
import {addItemsToCart, removeFromCart} from '../redux/products/action';

const SearchScreen = props => {
  const {route, navigation} = props;
  const {searchTitle} = route.params;

  const [items, setItems] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = () => {
    const products = props.products;
    let filteredProducts = products.filter(item => {
      return item.Title.toLowerCase().includes(searchTitle.toLowerCase());
    });
    const filteredProductsDescription = products.filter(item => {
      return item.Description.toLowerCase().includes(searchTitle.toLowerCase());
    });
    const filteredProductsCategory = products.filter(item => {
      return item.Category.toLowerCase().includes(searchTitle.toLowerCase());
    });
    filteredProducts = [
      ...filteredProducts,
      ...filteredProductsDescription,
      ...filteredProductsCategory,
    ];
    filteredProducts = filteredProducts.filter(
      (item, index) => filteredProducts.indexOf(item) === index,
    );

    setItems(filteredProducts);
  };

  const CartCard = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('Details', item);
        }}>
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
            <Text style={{fontSize: 17, fontWeight: 'bold', paddingTop: 5}}>
              &#8377; {item.Price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon
          name="arrow-back"
          size={28}
          onPress={() => props.navigation.goBack()}
          color={COLORS.light}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingLeft: 10,
            color: COLORS.light,
          }}>
          {searchTitle}
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={items}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products,
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
    paddingHorizontal: 20,
    backgroundColor: '#9bdae4',
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
