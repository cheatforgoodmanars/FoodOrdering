import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Text } from "react-native";


type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // console.log('Auth provider is mounted');

         const fetchSession = async () => {
            // const { data, error} = await supabase.auth.getSession();
            const { data: { session } } = await supabase.auth.getSession();

            // console.log(data);
            setSession(session);
            

            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)  // only look for 'id'
                    .single();
                setProfile(data || null);
            }


            setLoading(false);
         };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
          });

    }, [])

    // console.log(profile)    // هذا يأكد من بيانات المستخدم ومن اي مجموعة 

    return <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group == 'ADMIN' }}>{ children }</AuthContext.Provider>;

    // return (
    //     <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>
    //       {typeof children === 'string' ? <Text>{children}</Text> : children}
    //     </AuthContext.Provider>
    //   );
}


export const useAuth = () => useContext(AuthContext);