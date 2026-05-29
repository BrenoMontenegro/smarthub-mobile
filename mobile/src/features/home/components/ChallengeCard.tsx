import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

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
  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: color },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color="#111"
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {difficulty}
          </Text>
        </View>

        <Text style={styles.xp}>
          +{xp} XP
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 18,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  xp: {
    fontWeight: '700',
    color: '#6C5CE7',
    fontSize: 12,
  },
})