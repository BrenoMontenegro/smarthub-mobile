import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
} from 'react-native'

import { styles } from './camera.styles'

export function CameraExerciseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Exercícios com câmera
        </Text>

        <Text style={styles.description}>
          Em breve você poderá resolver desafios
          usando a câmera do celular.
        </Text>
      </View>
    </SafeAreaView>
  )
}