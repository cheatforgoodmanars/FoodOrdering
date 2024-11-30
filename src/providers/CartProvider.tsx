import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';


// export const CartContext = createContext({});

type CartType = {
    items: CartItem[];
    addItem: (Product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) =>void;
    total: number;
};


const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {} ,
    total: 0,
});


const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) =>{
        // console.log(product);

        // if already in cart,increment quantity
        const existingItem = items.find(
            (item) => item.product == product && item.size == size
        );

        if ( existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }



        const newCartItem: CartItem = {
            id: randomUUID(), //generate
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };


        setItems([newCartItem, ...items]);
    };

        //updateQuantity
        const updateQuantity = (itemId: string, amount: -1 | 1) =>{
            // console.log(itemId, amount);
        //     const updatedItems = items.map((item) =>
        //         item.id !== itemId ? item : { ...item, quantity: item.quantity + amount}
        //     );
        //     setItems(updatedItems);
        // };



            const updatedItems = 
            setItems(items.map((item) =>
                item.id !== itemId ? item : { ...item, quantity: item.quantity + amount}
            )
            .filter((item) => item.quantity > 0)
        );
        };

        // console.log(items);

        const total =  items.reduce(
            (sum, item) => (sum += item.product.price * item.quantity),
            0  // الصفر عبارة عن الرقم البدائي للحسبة 
        ) ;

    return (
        
        <CartContext.Provider value={{  items, addItem, updateQuantity, total }}>
            { children }
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);