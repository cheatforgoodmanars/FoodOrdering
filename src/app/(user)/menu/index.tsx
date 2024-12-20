import { View, FlatList, ActivityIndicator, Text } from 'react-native';

// import products from '@assets/data/products';  
import ProductListItem from '@/components/ProductListItem';
// import { useEffect } from 'react';  
// import { supabase } from '@/lib/supabase'; 
// import { useQuery } from '@tanstack/react-query'; 
import { useProductList } from '@/api/products';

//import EditScreenInfo from '@/src/components/EditScreenInfo';



  

export default function MenuScreen() {
  
//  const { data, error, isLoading} = useQuery({
//   const { data: products, error, isLoading} = useQuery({

//   queryKey: ['products'],
//   queryFn: async () => {
//     const { data, error } = await supabase.from('products').select('*')
//     if(error) {
//       throw new Error(error.message);
//     }
//     return data;
//   }
//  })
const { data: products, error, isLoading} = useProductList();

 if (isLoading) {
  return <ActivityIndicator />;
 }

 if (error) {
  return <Text>Failed to fetch products</Text>;
 }

  // useEffect(() => {
  //   const fetchProducts = async () => {  
  //     const {data, error} = await supabase.from('products').select('*')
  //     console.log(error);
  //     console.log(data);
  //  };
  //  fetchProducts();
  //  }, []) 
  
  
  
  return (
    // <View>
    //   <ProductListItem product={products[0]} />
    //   <ProductListItem product={products[1]} />

    // </View>
    <FlatList 
          // data={products} // هذا يجيب البيانات محليا من الأمثلة (\FoodOrdering\assets\data\products.ts)
          // data={data}
          data={products}
          renderItem={({item}) => <ProductListItem product={item}/>}
          numColumns={2}
          contentContainerStyle={{ gap:10, padding:10  }}
          columnWrapperStyle={{ gap:10 }}
        /> 


  );
}

