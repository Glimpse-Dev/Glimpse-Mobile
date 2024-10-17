import { Feather, Octicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import TabBar from '../../components/TabBar';
import Colors from '../../constants/Colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather | typeof Octicons>['name'];
  color: string;
  size?: number;
  IconComponent: any;  // Accept the icon library as a prop
}) {
  const { IconComponent, name, color, size = 28 } = props;
  return <IconComponent name={name} size={size} style={{ marginBottom: -3 }} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon IconComponent={Feather} name="home" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon IconComponent={Octicons} name="person" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}