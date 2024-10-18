import { Feather, Octicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import TabBar from '../../components/TabBar';
import Colors from '../../constants/Colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather | typeof Octicons>['name'];
  color: string;
  size?: number;
  IconComponent: any;
  isFocused?: boolean;
  title: string;
}) {
  const { IconComponent, name, color, size = 28, isFocused, title } = props;
  // If focused, wrap the icon with the gradient background
  if (isFocused && title === "profile") {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={['#D372E5', '#5731D6']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: size / 2,
          }}
        >
          <IconComponent name={name} size={size - 8} color={color} style={{ marginTop: 1 }} />
        </LinearGradient>
      </View>

    );
  }

  // Default icon without the gradient
  return (
    <View style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',

    }}>
      <IconComponent name={name} size={size - 4} color={color} />
    </View>
  );
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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={Feather} name="home" color={color} size={40} isFocused={focused} title="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={Octicons} name="feed-person" color={color} size={44} isFocused={focused} title="profile" />
          ),
        }}
      />
    </Tabs>
  );
}