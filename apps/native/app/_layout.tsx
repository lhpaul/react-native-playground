import { getAuth, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
	const [firebaseInitializing, setFirebaseInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
	const router = useRouter();
	const segments = useSegments();

	const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
		console.log('ON AUTH STATE CHANGED', user);
		setUser(user);
		if (firebaseInitializing) setFirebaseInitializing(false);
	};

	useEffect(() => {
		const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
		return subscriber;
	}, []);

	useEffect(() => {
    console.log('USER', user);
		if (firebaseInitializing) return;

		const inAuthenticatedGroup = segments[0] === '(authenticated)';
    if (user) {
			if (!inAuthenticatedGroup) {
        router.replace('/(authenticated)/home');
      }
      return;
    }
    if (inAuthenticatedGroup) {
      router.replace('/');
    }
	}, [user, firebaseInitializing]);

	if (firebaseInitializing)
		return (
			<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1
					}}
				>
					<ActivityIndicator size="large" />
				</View>
		);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Login' }} />
			<Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
		</Stack>
	);
}