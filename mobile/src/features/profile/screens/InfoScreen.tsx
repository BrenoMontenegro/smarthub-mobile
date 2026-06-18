import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../../shared/theme/ThemeContext'
import { profileScreenStyles as styles } from './profileScreens.styles'

const INFO_CONTENT: Record<string, { title: string; body: string }> = {
  HelpSupport: {
    title: 'Ajuda e suporte',
    body:
      'Para ajuda com o aplicativo entre em contato com suporte@smarthub.com.\n\n' +
      'Nossa equipe está disponível de segunda a sexta, das 9h às 18h, para auxiliar com dúvidas sobre exercícios, progresso de XP, níveis e funcionalidades da plataforma.',
  },
  Contact: {
    title: 'Entre em contato conosco',
    body:
      'Tem sugestões ou encontrou algum problema? Escreva para suporte@smarthub.com.\n\n' +
      'Inclua seu nome de usuário e uma descrição detalhada para que possamos ajudá-lo mais rapidamente.',
  },
  Privacy: {
    title: 'Políticas e privacidade',
    body:
      'Política de Privacidade — SmartHub\n\n' +
      '1. Coleta de dados: coletamos apenas informações necessárias para sua conta (nome de usuário, e-mail) e progresso nos exercícios (XP, nível, resultados de quizzes).\n\n' +
      '2. Uso dos dados: seus dados são utilizados exclusivamente para personalizar sua experiência de aprendizado em programação e acompanhar seu desempenho nos módulos de treino.\n\n' +
      '3. Armazenamento: as informações são armazenadas de forma segura em servidores protegidos. Não compartilhamos seus dados com terceiros.\n\n' +
      '4. Segurança: sua senha é criptografada e nunca armazenada em texto puro.\n\n' +
      '5. Seus direitos: você pode solicitar a exclusão da sua conta e dados a qualquer momento pelo e-mail suporte@smarthub.com.\n\n' +
      'Última atualização: junho de 2026.',
  },
}

export function InfoScreen({ navigation, route }: any) {
  const { colors } = useTheme()
  const type: string = route.params?.type ?? 'HelpSupport'
  const content = INFO_CONTENT[type] ?? INFO_CONTENT.HelpSupport

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{content.title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.text }]}>{content.body}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
