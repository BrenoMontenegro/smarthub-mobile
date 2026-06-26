import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../../shared/theme/ThemeContext'

interface Props {
  title: string
  description: string
  xp: number
  difficulty: string
  icon: any
  color: string
  type: string
  onPress?: () => void
}

export function ChallengeCard({
  title,
  description,
  xp,
  difficulty,
  icon,
  color,
  onPress,
}: Props) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color="#111" />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>

        <View style={styles.footer}>
          <View style={[styles.badge, { backgroundColor: colors.border }]}>
            <Text style={[styles.badgeText, { color: colors.textSecondary }]}>{difficulty}</Text>
          </View>
          <Text style={[styles.xp, { color: colors.primary }]}>+{xp} XP</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    elevation: 0,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 17,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  xp: {
    fontWeight: '700',
    fontSize: 12,
  },
})
