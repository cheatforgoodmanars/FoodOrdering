// import { supabase } from '@/lib/supabase'
// import { View, Text, Button } from 'react-native'


// const ProfileScreen = () => {
//   return (
//     <View>
//       <Text>profile</Text>

//       <Button 
//         title='Sign Out'
//         onPress={ async () => await supabase.auth.signOut() }
//       />
//     </View>
//   )
// }

// export default ProfileScreen
// =================================================
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (session && session.user) {
          const userId = session.user.id

          // Fetch the profile from the 'profiles' table using the user's ID
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', userId)
            .single()

          if (profileError) {
            console.error('Error fetching profile:', profileError)
          } else {
            setUserName(profile?.full_name ?? 'User')
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    }

    fetchUserProfile()
  }, []) // Empty dependency array ensures this runs only once on mount

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    alert('You have signed out.')
  }

  return (
    <View style={styles.container}>
      <Icon name="person-circle-outline" size={100} color="#4F8EF7" />
      <Text style={styles.headerText}>Welcome, {userName}!</Text>
      
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f6fa',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    color: '#333',
  },
  signOutButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default ProfileScreen








// =================================================
// import React, { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'

// const ProfileScreen = () => {
//   const [userName, setUserName] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       // Get the current session
//       const { data: { session }, error } = await supabase.auth.getSession()

//       if (error) {
//         console.error('Error getting session:', error)
//         return
//       }

//       if (session && session.user) {
//         const userId = session.user.id

//         // Fetch the profile from the 'profiles' table using the user's ID
//         const { data: profile, error: profileError } = await supabase
//           .from('profiles')
//         //   .select('full_name')
//           .select('username')
//           .eq('id', userId)
//           .single()

//         if (profileError) {
//           console.error('Error fetching profile:', profileError)
//         } else {
//         //   setUserName(profile?.full_name ?? 'User')
//             setUserName(profile?.username ?? 'User')
//         }
//       }
//     }

//     fetchUserProfile()
//   }, [])

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//     alert('You have signed out.')
//   }

//   return (
//     <View style={styles.container}>
//       <Icon name="person-circle-outline" size={100} color="#4F8EF7" />
//       <Text style={styles.headerText}>Welcome, {userName}!</Text>
      
//       <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
//         <Text style={styles.signOutText}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f4f6fa',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginTop: 20,
//     color: '#333',
//   },
//   signOutButton: {
//     marginTop: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 8,
//   },
//   signOutText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// })

// export default ProfileScreen

