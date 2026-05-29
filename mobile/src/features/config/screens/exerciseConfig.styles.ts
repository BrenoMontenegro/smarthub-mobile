import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: '#6C63FF',
  },

  icon: {
    fontSize: 40,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  description: {
    fontSize: 12,
    color: '#666',
  },

  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  difficultyButton: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  selectedDifficulty: {
    backgroundColor: '#6C63FF',
  },

  difficultyText: {
    fontWeight: 'bold',
  },

  selectedDifficultyText: {
    color: '#FFF',
  },

  startButton: {
    marginTop: 'auto',
    backgroundColor: '#7CFC72',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },

  startButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})