/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {logout} from '../redux/users/action';
import {connect} from 'react-redux';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/colors';
import {asyncgetProducts} from '../redux/products/action';
const width = Dimensions.get('window').width / 2 - 30;

const image = require('../components/images/backgroundimg.jpg');

const HomeScreen = props => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    props.asyncgetProducts();
  }, []);

  const categories = ['All', 'Electronics', 'Clothes', 'Footwear', 'Watches'];

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                categoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({product}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate('Details', product)}>
        <View style={style.card}>
          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: product.Image.name}}
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
            {product.Title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              &#8377; {product.Price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const allProducts = () => {
    if (categoryIndex === 0) {
      return props.products;
    }
    return props.products.filter(
      product => product.Category === categories[categoryIndex],
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}>
      <ImageBackground source={image} resizeMode={'cover'} style={style.image}>
        <View style={{paddingHorizontal: 20}}>
          <View style={style.header}>
            <Text
              style={{fontSize: 30, color: COLORS.blue, fontWeight: 'bold'}}>
              Shopping App
            </Text>
          </View>
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <View style={style.searchContainer}>
              <Icon
                name="search"
                size={25}
                onPress={() =>
                  props.navigation.navigate('Search', {
                    searchTitle: searchTitle,
                  })
                }
                style={{marginLeft: 20}}
              />
              <TextInput
                placeholder="Search"
                style={style.input}
                autoCapitalize="none"
                onChangeText={text => setSearchTitle(text)}
                returnKeyType="search"
                onSubmitEditing={() =>
                  props.navigation.navigate('Search', {
                    searchTitle: searchTitle,
                  })
                }
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={{paddingHorizontal: 20}}>
        <CategoryList />
      </View>
      <FlatList
        style={{paddingHorizontal: 20}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        numColumns={2}
        data={allProducts()}
        renderItem={({item}) => {
          return <Card product={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
    asyncgetProducts: () => {
      dispatch(asyncgetProducts());
    },
  };
};

const style = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height / 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.blue,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.blue,
  },
  card: {
    flex: 1,
    height: 250,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
