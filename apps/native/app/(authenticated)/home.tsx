import { getAuth, signOut } from '@react-native-firebase/auth';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Page = () => {
	const firebaseAuth = getAuth();
	const user = firebaseAuth.currentUser;
	const [token, setToken] = useState<string | null>(null);

	const getToken = async () => {
		const idToken = await user?.getIdToken();
		setToken(idToken as string);
	}

	return (
		<View>
			<Text>Welcome back back {user?.email}</Text>
			<Button title="Sign out" onPress={() => signOut(firebaseAuth)} />
			<Button title="Get token" onPress={() => getToken()} />
			<Text>{token}</Text>
		</View>
	);
};
export default Page;