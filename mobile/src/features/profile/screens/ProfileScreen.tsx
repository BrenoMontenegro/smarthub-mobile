import React from 'react'

import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { styles } from './profile.style'

export function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/300?img=32',
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={styles.editButton}
            >
              <Ionicons
                name="pencil"
                size={16}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.username}>
            Username 12345
          </Text>

          <Text style={styles.email}>
            username@gmail.com | +01 (55)
            5555-5555
          </Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Editar informações do perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Notificações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Linguagem e idioma
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Segurança
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Tema
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Ajuda e suporte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Entre em contato conosco
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text style={styles.optionText}>
              Políticas e privacidade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
          >
            <Text
              style={[
                styles.optionText,
                styles.logoutText,
              ]}
            >
              Sair da conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}