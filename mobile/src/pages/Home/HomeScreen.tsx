import React, {
  useEffect,
  useState,
} from 'react'

import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native'

import { styles } from './home.styles'

import { Challenge } from './home.types'

import { ChallengeCard } from './ChallengeCard'

import { getChallenges } from '../../services/home.service'

export function HomeScreen() {
  const [challenges, setChallenges] =
    useState<Challenge[]>([])

  useEffect(() => {
    loadChallenges()
  }, [])

  async function loadChallenges() {
    const data = (await getChallenges()) as Challenge[]

    setChallenges(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userRow}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?img=12',
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.greeting}>
                Olá de volta,
              </Text>

              <Text style={styles.username}>
                USUÁRIO
              </Text>
            </View>
          </View>

          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>
              🔥 7 dias
            </Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.levelText}>
              NÍVEL 8
            </Text>

            <Text style={styles.xpText}>
              1240 / 2000 XP
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Módulos de treino
        </Text>

        <FlatList
          data={challenges}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChallengeCard
              title={item.title}
              description={item.description}
              xp={item.xp}
              difficulty={item.difficulty}
              icon={item.icon}
              color={item.color}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}