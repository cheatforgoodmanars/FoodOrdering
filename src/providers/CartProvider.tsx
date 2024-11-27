import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";


// export const CartContext = createContext({});

type CartType = {
    items: CartItem[];
    addItem: (Product: Product, size: CartItem['size']) => void;
};


const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
});


const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) =>{
        // console.log(product);

        // if already in cart,increment quantity
        const newCartItem: CartItem = {
            id: '1', //generate
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };


        setItems([newCartItem, ...items]);
    };

        //updateQuantity

        console.log(items);

    return (
        
        <CartContext.Provider value={{  items, addItem }}>
            { children }
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);