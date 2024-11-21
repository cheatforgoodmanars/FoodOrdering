import {Text, View, StyleSheet, Image } from 'react-native';
import Colors from '@/src/constants/Colors';
// import products from '@/assets/data/products';

//import EditScreenInfo from '@/src/components/EditScreenInfo';

// const product = products[0] // كل مرة تزيد هنا بيزيد بيأخذ من قائمة الابرودكتس الي تحتها 

const ProductListItem = ({ product }) => {
  //  console.log(props);
    return (
      <View style={styles.container}>
        <Image source={{ uri: product.image}} style={styles.image} ></Image>
        <Text style={styles.title}>أرحبوا تراحيب المرباخ وقت المحل </Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    )
  }
  
export default ProductListItem;


const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, */

  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius:20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },

  title: {fontSize:20, fontWeight:"bold", marginVertical: 10},
  price1: {fontSize:18, fontWeight:500},
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },



  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
