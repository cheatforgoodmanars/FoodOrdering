import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useAdminOrderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error} = await supabase.from('orders').select('*')
                // .in('status', ['New', 'Cooking', 'Delivering']); 
                .in('status', statuses);
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

            const { data, error} = await supabase.from('orders').select('*').eq('user_id', id);
            if(error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};