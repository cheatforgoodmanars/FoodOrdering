import { View, FlatList } from 'react-native';

import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';

//import EditScreenInfo from '@/src/components/EditScreenInfo';



  

export default function MenuScreen() {
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

