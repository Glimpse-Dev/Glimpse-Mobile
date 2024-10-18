import { View, Text, TouchableOpacity, Dimensions, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { line, curveBasis, curveBasisClosed, curveLinear } from 'd3-shape';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';


// Setup for the tab drawing
const NAVIGATION_BOTTOM_TABS_HEIGHT = 90;
const { width: wWidth } = Dimensions.get('window');
const lineGenerator = line<{ x: number, y: number }>()
  .x(({ x }) => x)
  .y(({ y }) => y);

interface TabsShapeProps {
  tabWidth: number;
}

// Drawing the tab shape
const TabsShape: React.FC<TabsShapeProps> = ({ tabWidth }) => {
  // const points = [
  //top left
  // { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.4 },
  // { x: tabWidth * .25, y: 0 },
  // { x: tabWidth, y: 0 },


  // { x: tabWidth * 1.4, y: 0 },                          // Start left
  // { x: tabWidth * 1.8, y: 0 },                          // Slight right from start
  // { x: tabWidth * 2 + 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak of the curve
  // { x: tabWidth * 3 - 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak mirrored on the right
  // { x: tabWidth * 3.2, y: 0 },                          // Symmetrical point on the right
  // { x: tabWidth * 3.6, y: 0 },                          // End right              

  // //top right
  // { x: wWidth - tabWidth, y: 0 },
  // { x: wWidth - tabWidth * .25, y: 0 },
  // { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .4 },
  // { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .5 },

  // //bottom right 
  // { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  // { x: wWidth - tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  // { x: tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  // { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  // { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .5 },
  // ];
  const d = useMemo(() => {
    const center = lineGenerator.curve(curveBasisClosed)([
      //top left
      { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.4 },
      { x: tabWidth * .25, y: 0 },
      { x: tabWidth, y: 0 },


      { x: tabWidth * 1.4, y: 0 },                          // Start left
      { x: tabWidth * 1.8, y: 0 },                          // Slight right from start
      { x: tabWidth * 2 + 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak of the curve
      { x: tabWidth * 3 - 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak mirrored on the right
      { x: tabWidth * 3.2, y: 0 },                          // Symmetrical point on the right
      { x: tabWidth * 3.6, y: 0 },                          // End right              

      //top right
      { x: wWidth - tabWidth, y: 0 },
      { x: wWidth - tabWidth * .25, y: 0 },
      { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .4 },
      { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .5 },

      //bottom right 
      { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: wWidth - tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .5 },
    ]);
    return `${center}`;
  }, [tabWidth]);
  return (
    <View>
      <Svg width={wWidth} height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
        {/* Render the path */}
        <Path
          d={d}
          fill="black"         // This ensures the interior is not filled
          stroke="black"       // The stroke color (you can customize it)
          strokeWidth={2}      // The width of the path outline
        />

        {/* Visualize the points as circles */}
        {/* {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={5} // Circle radius
            fill="red"
          />
        ))} */}

      </Svg>
    </View>
  );
};

// Tab component
interface TabComponentProps {
  isFocused: boolean;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  icon: React.ReactNode;
  label: string;
  extraStyle?: string | StyleProp<ViewStyle>;
}

const TabComponent: React.FC<TabComponentProps> = ({ isFocused, onPress, onLongPress, icon, label, extraStyle }) => {

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      className={`flex-1 justify-center items-center mb-7 ${extraStyle}`}
    >
      {icon}
    </TouchableOpacity>
  );
};


// Actual Tab/ Navbar Component
const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / 5;

  return (
    <View style={{ position: 'absolute', bottom: 18, width: wWidth, height: NAVIGATION_BOTTOM_TABS_HEIGHT }}>
      <TabsShape tabWidth={tabWidth} />

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const icon = options.tabBarIcon
            ? options.tabBarIcon({ focused: isFocused, color: isFocused ? '#fff' : '#A9A9AC', size: 32 })
            : null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Add button
          if (route.name === 'add') {
            return (
              <LinearGradient
                key={route.key}
                colors={['#D372E5', '#5731D6']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 64,
                  height: 72,
                  width: 72,
                  borderRadius: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: screenWidth / 2 - 36,
                }}
              >
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('add')}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AntDesign name="plus" size={50} color="white" />
                </TouchableOpacity>
              </LinearGradient>
            );
          }

          return (
            <TabComponent
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              icon={icon}
              label={route.name === 'index' ? 'Home' : 'Profile'}
              extraStyle={route.name === 'index' ? 'mr-8' : 'ml-8'}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
