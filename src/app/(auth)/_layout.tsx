import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";


export default function AuthLayout() {
    const { session } = useAuth();  

    if (session) {    //  ذا الشي عبارة عن حماية وما يخلي الناس الغير مصرح لهم التنقل اذا سجلوا الدخول خاصة رعاة المتصفح
        return <Redirect href={'/'} />
    }
    return <Stack />;
}