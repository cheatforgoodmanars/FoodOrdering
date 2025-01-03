import { CartItem,  Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";


// export const CartContext = createContext({});

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    // addItem: (Product: Tables<'products'>, size: CartItem['size']) => void;
    addItem: (Product: Tables<'products'>, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) =>void;
    total: number;
    checkout: () => void;
};


const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {} ,
    total: 0,
    checkout: () => {},
});


const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const { mutate: insertOrder } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();

    const router = useRouter();

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

    
    const clearCart = () => {
        setItems([]);
    }
    
    // const checkout = () => {
    //     // console.warn('Checkout');

    //     insertOrder({ total }, {
    //         onSuccess: (data) => {
    //             console.log(data);
    //             clearCart();
    //             // router.back();
    //             // Navigate to the new order page (using the order id)
    //             // router.push(`/(user)/orders/(user)/orders/14`); 
    //             router.push(`/(user)/orders/${data.id}`);  
    //         },
    //     });
    // };

    const checkout = () => {
        
        insertOrder({ total }, {
            onSuccess:  saveOrderItems,
            },
        );
    };

    const saveOrderItems = (order: Tables<'orders'>) => {
        // const item1 = items [0];

        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
        }) );

        insertOrderItems( orderItems,
            // {
        //     order_id: order.id,
        //     product_id: item1.product_id,
        //     quantity: item1.quantity,
        //     size: item1.size,
        // },
        // 
        {
            onSuccess() {
                clearCart();
                // router.back();
                // Navigate to the new order page (using the order id)
                // router.push(`/(user)/orders/(user)/orders/14`); 
                router.push(`/(user)/orders/${order.id}`); 
            },
        });
        
        //
        // console.log(order);
                // clearCart();
                // // router.back();
                // // Navigate to the new order page (using the order id)
                // // router.push(`/(user)/orders/(user)/orders/14`); 
                // router.push(`/(user)/orders/${order.id}`); 
    };

    return (
        
        <CartContext.Provider value={{  items, addItem, updateQuantity, total, checkout }}>
            { children }
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);