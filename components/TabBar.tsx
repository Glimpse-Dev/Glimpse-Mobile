import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { line, curveBasis, curveBasisClosed, curveLinear } from 'd3-shape';
import { Svg, Path, Circle, LinearGradient } from 'react-native-svg';


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
  //   //top left
  //   { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.4 },
  //   { x: tabWidth * .25, y: 0 },
  //   { x: tabWidth, y: 0 },


  //   { x: tabWidth * 1.4, y: 0 },                          // Start left
  //   { x: tabWidth * 1.8, y: 0 },                          // Slight right from start
  //   { x: tabWidth * 2 + 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak of the curve
  //   { x: tabWidth * 3 - 10, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.5 },  // Peak mirrored on the right
  //   { x: tabWidth * 3.2, y: 0 },                          // Symmetrical point on the right
  //   { x: tabWidth * 3.6, y: 0 },                          // End right              

  //   //top right
  //   { x: wWidth - tabWidth, y: 0 },
  //   { x: wWidth - tabWidth * .25, y: 0 },
  //   { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .4 },
  //   { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .6 },

  //   //bottom right 
  //   { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  //   { x: wWidth - tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  //   { x: tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  //   { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
  //   { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.6 },
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
      { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * .6 },

      //bottom right 
      { x: wWidth - tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: wWidth - tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: tabWidth * .25, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.6 },
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

// Actual Tab/ Navbar Component
const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / 5;

  return (
    <View style={{ position: 'absolute', bottom: 16, width: wWidth, height: NAVIGATION_BOTTOM_TABS_HEIGHT }}>
      {/* Loading in the shape */}
      <TabsShape tabWidth={tabWidth} />

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const icon = options.tabBarIcon
            ? options.tabBarIcon({ focused: isFocused, color: isFocused ? '#673ab7' : '#fff', size: 28 })
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
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                onPress={() => navigation.navigate('add')}
                className="
                  absolute 
                  bottom-16
                  h-20 
                  w-20 
                  rounded-full 
                  bg-purple-700 
                  items-center 
                  justify-center 
                  shadow-lg
                "
                style={{
                  left: screenWidth / 2 - 40, // Center the button horizontally (the add button width is 80px)
                }}
              >
                <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
              </TouchableOpacity>
            );
          }

          if (route.name === 'index') {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className='flex-1 justify-center items-center mb-6 mr-8'
              >
                {icon}
                <Text style={{ color: isFocused ? '#673ab7' : '#fff' }} className='mt-2'>
                  Home
                </Text>
              </TouchableOpacity>
            );
          }

          if (route.name === 'profile') {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className='flex-1 justify-center items-center mb-6 ml-8'
              >
                {icon}
                <Text style={{ color: isFocused ? '#673ab7' : '#fff' }} className='mt-2'>
                  Profile
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <>
            </>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
