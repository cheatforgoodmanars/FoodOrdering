import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, UpdateTables } from '@/types';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useAdminOrderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error} = await supabase.from('orders').select('*')
                // .in('status', ['New', 'Cooking', 'Delivering']); 
                .in('status', statuses)
                .order('created_at', { ascending: false });
            if(error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useMyOrderList = () => {
    const { session } = useAuth();
    const id = session?.user.id;

    return useQuery({
        queryKey: ['orders', { userId: id }], // على اساس ما يختلط بين بيانات ذا الاوردر مع الاوردر بالكود الي فوق 
        queryFn: async () => {
            if (!id) return null;

            const { data, error} = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', id)
            .order('created_at', { ascending: false });
            if(error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useOrdersDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase
            .from('orders')
            .select('* , order_items(*, products(*))' )  // This line retrieves all columns from the orders table, along with related order_items, and for each item, the corresponding products details.
            // Get all the columns from the orders table (* means "all columns").
            // Also fetch related order_items (another table) for that order.
            // From each order_item, fetch related products data.
            .eq('id', id)
            .single();

            if(error) {
                throw new Error(error.message)
            }
            return data;
        },
    });
};

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session} = useAuth();
    const userId = session?.user.id;


    return useMutation({
        // async mutationFn(data:any) {
        async mutationFn(data: InsertTables<'orders'> ) {
            const { error, data: newProduct } = await supabase
            .from('orders')
            // .insert(data)
            .insert({  ...data, user_id: userId})
            .select()
            .single();

            if(error) {
                throw new Error(error.message)
            }
            return newProduct;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['orders']);
        },


    });
    
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();


    return useMutation({
        async mutationFn( { id, updatedFields, } : { 
            id: number;
             updatedField: UpdateTables<'orders'>;} )
              {
            const { error, data: updatedOrder } = await supabase.from('orders')
            .update(
                updatedFields
            )
            .eq("id", id)
            .select()
            .single();

            if(error) {
                throw new Error(error.message)
            }
            return updatedOrder;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['orders']);
            await queryClient.invalidateQueries(['orders', id]);
        },
        
        // async onSuccess(_, data) {
        //     await queryClient.invalidateQueries(['products']);
        //     await queryClient.invalidateQueries(['products', data.id]);
        // },
    
    });
};