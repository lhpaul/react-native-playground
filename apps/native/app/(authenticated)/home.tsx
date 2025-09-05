import { getAuth, signOut } from '@react-native-firebase/auth';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Page = () => {
	const firebaseAuth = getAuth();
	const user = firebaseAuth.currentUser;
	const [idToken, setIdToken] = useState<string | null>(null);
	console.log('TOKEN', idToken);

	const getToken = async () => {
		const idToken = await user?.getIdToken(true);
		setIdToken(idToken as string);
	}

	return (
		<View>
			<Text>Welcome back back {user?.email}</Text>
			<Button title="Sign out" onPress={() => signOut(firebaseAuth)} />
			<Button title="Get token" onPress={() => getToken()} />
			<Text>{idToken}</Text>
		</View>
	);
};
export default Page;