import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./account";
import Header from "@/components/navigation/Header";
import Profile from "./profile";
import Setting from "./setting";

export type StackParamList = {
    index: undefined;
    profile: undefined;
    setting: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AccountStack() {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen
                name="index"
                component={Account}
                options={{ title: "Account", header: (props) => <Header {...props} showBackButton={false} /> }}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{ title: "Profile", header: (props) => <Header {...props}/> }}
            />
            <Stack.Screen
                name="setting"
                component={Setting}
                options={{ title: "Setting", header: (props) => <Header {...props}/> }}
            />
        </Stack.Navigator>
    );
}
