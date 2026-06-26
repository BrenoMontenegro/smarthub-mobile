import React, { useCallback, useState } from 'react'

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { styles } from './home.styles'
import { Challenge } from './home.types'
import { ChallengeCard } from '../components/ChallengeCard'
import { getChallenges } from '../../../shared/services/home.service'
import { getUserProfile, UserProfile } from '../../../shared/services/user.service'
import { BottomNav } from '../../../shared/components/BottomNav'
import { useTheme } from '../../../shared/theme/ThemeContext'

function xpToReachLevel(n: number): number {
  return 250 * n * (n - 1)
}

function calcXpProgress(totalXp: number, level: number) {
  const xpCurrentLevel = xpToReachLevel(level)
  const xpNextLevel = xpToReachLevel(level + 1)
  const progress = (totalXp - xpCurrentLevel) / (xpNextLevel - xpCurrentLevel)
  return {
    xpProgress: totalXp - xpCurrentLevel,
    xpNeeded: xpNextLevel - xpCurrentLevel,
    xpNextLevel,
    percent: Math.min(Math.max(progress, 0), 1),
  }
}

export function HomeScreen({ navigation }: any) {
  const { colors } = useTheme()
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, []),
  )

  async function loadData() {
    try {
      const [challengeData, profileData] = await Promise.all([
        getChallenges(),
        getUserProfile(),
      ])
      setChallenges(challengeData)
      setUserProfile(profileData)
      setError('')
    } catch {
      setError('Não foi possível carregar os dados.')
    }
  }

  const level = userProfile?.level ?? 1
  const totalXp = userProfile?.totalXp ?? 0
  const { xpProgress, xpNeeded, percent } = calcXpProgress(totalXp, level)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <View style={styles.userRow}>
          <View style={styles.userInfo}>
            <View style={[styles.avatarInitial, { backgroundColor: colors.avatarBg }]}>
              <Ionicons name="person" size={28} color={colors.avatarIcon} />
            </View>

            <View>
              <Text style={[styles.greeting, { color: colors.headerSubtext }]}>Olá de volta,</Text>
              <Text style={[styles.username, { color: colors.headerText }]}>
                {userProfile?.username ?? '...'}
              </Text>
            </View>
          </View>

          <View style={[styles.streakBadge, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="flame" size={14} color="#FFF" />
            <Text style={styles.streakText}>
              {userProfile?.streakDays ?? 0} dias
            </Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.levelText}>NÍVEL {level}</Text>
            <Text style={styles.xpText}>
              {xpProgress} / {xpNeeded} XP
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percent * 100}%` as any }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Módulos de treino</Text>

        {error ? (
          <Text style={{ color: colors.error, textAlign: 'center', marginTop: 20 }}>{error}</Text>
        ) : null}

        <FlatList
          data={challenges}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChallengeCard
              title={item.title}
              description={item.description}
              xp={item.xp}
              difficulty={item.difficulty}
              icon={item.icon}
              color={item.color}
              type={item.type}
              onPress={() => {
                navigation.navigate('ExerciseConfig', {
                  activityType: item.type,
                  challenge: item,
                })
              }}
            />
          )}
        />
      </View>

      <BottomNav navigation={navigation} currentRoute="Home" />
    </SafeAreaView>
  )
}
