import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../theme/ThemeContext'

type NavRoute = 'Home' | 'Profile'

interface BottomNavProps {
  navigation: any
  currentRoute: NavRoute
}

export function BottomNav({ navigation, currentRoute }: BottomNavProps) {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const items: { route: NavRoute; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
    { route: 'Home', icon: 'home', label: 'Home' },
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
              size={30}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
})
