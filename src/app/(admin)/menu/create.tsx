import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';


const CreateProductScreen = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    // const { id } = useLocalSearchParams();
    // const isUpdating = !!id;

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
    const isUpdating = !!id;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();

    const router = useRouter();

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    },  [updatingProduct]);


    const resetFiels = () => {
        setName('');
        setPrice('');
    };

    const validateInput = () => {
        setErrors('');
        if (!name){
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))){
            setErrors('Price is not a number');
            return false;
        }

        return true;

    };


    const onsubmit = () => {
        if (isUpdating) {
            // update 
            onUpdate();
        } else {
            onCreate();
        }
    };

    const onCreate = async () => {
        if (!validateInput()) {
            return;
        };

        const imagePath = await uploadImage();


        // console.warn('creating product', name);



        // save on Database

        insertProduct({ name, price: parseFloat(price), image: imagePath }, {
            onSuccess: () => {
                  resetFiels();
                  router.back();
            },
        });

    };

    const onUpdate = async () => {
        if (!validateInput()) {
            return;
        };

        const imagePath = await uploadImage();

        // console.warn('Updating product', name);

        // save on Database

        updateProduct({ id, name, price: parseFloat(price), image:imagePath }, {
            onSuccess: () => {
                resetFiels();
                router.back();
            }
        } );



        // resetFiels();
    };


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ['images', 'videos'],
        mediaTypes: ['images',],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };


      const onDelete = () => {
        // console.warn('DELETE!!!!!!!!'); 
        deleteProduct(id, {
            onSuccess: () => {
                resetFiels();
                router.replace('/(admin)');
                },
        });
      };

      const confirmDelete = () => {
        Alert.alert('Confirm', "Are you sure you want to delete this product?!" , [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ]);
      };


      const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
          return;
        }
      
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, decode(base64), { contentType });
        
        // console.log(error); 

        if (data) {
          return data.path;
        }
      };


  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product', headerTitleAlign: 'center', }} />


        <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
        <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>


        <Text style={styles.label}>Enter Name :</Text>
        <TextInput placeholder='Name' 
        value={name}
        onChangeText={setName}
        style={styles.input}/>

        <Text style={styles.label}>Enter Price ($) :</Text>
        <TextInput 
        placeholder='9.99' 
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType='numeric'
        />

        <Text style={{ color : 'red'}}> {errors} </Text>
        <Button onPress={onsubmit} text={ isUpdating ? 'Update' : 'Create'}/>

        {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input:{
        backgroundColor: 'white',
        padding:10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        color: Colors.light.tint,
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default CreateProductScreen