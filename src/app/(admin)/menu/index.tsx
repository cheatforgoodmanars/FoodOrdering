import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';

//import EditScreenInfo from '@/src/components/EditScreenInfo';



  

export default function MenuScreen() {
  const { data: products, error, isLoading} = useProductList();

 if (isLoading) {
  return <ActivityIndicator />;
 }

 if (error) {
  return <Text>Failed to fetch products</Text>;
 }
  
  return (
    // <View>
    //   <ProductListItem product={products[0]} />
    //   <ProductListItem product={products[1]} />

    // </View>
    <FlatList 
          data={products}
          renderItem={({item}) => <ProductListItem product={item}/>}
          numColumns={2}
          contentContainerStyle={{ gap:10, padding:10  }}
          columnWrapperStyle={{ gap:10 }}
        /> 


  );
}

