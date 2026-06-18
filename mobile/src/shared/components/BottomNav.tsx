import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../theme/ThemeContext'

type NavRoute = 'Home' | 'CameraExercises' | 'Profile'

interface BottomNavProps {
  navigation: any
  currentRoute: NavRoute
}

export function BottomNav({ navigation, currentRoute }: BottomNavProps) {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const items: { route: NavRoute; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
    { route: 'Home', icon: 'home', label: 'Home' },
    { route: 'CameraExercises', icon: 'camera', label: 'Câmera' },
    { route: 'Profile', icon: 'person', label: 'Perfil' },
  ]

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bottomNav,
          borderTopColor: colors.bottomNavBorder,
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      {items.map(item => {
        const active = currentRoute === item.route
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.navButton}
            onPress={() => navigation.navigate(item.route)}
          >
            <Ionicons
              name={item.icon}
              size={28}
              color={active ? colors.primary : colors.bottomNavInactive}
            />
            <Text
              style={[
                styles.navText,
                { color: active ? colors.primary : colors.bottomNavInactive },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
})
