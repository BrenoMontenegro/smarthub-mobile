import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
    color: '#111',
  },

  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 24,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 999,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444',
    marginBottom: 8,
  },

  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  codeCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#CDD6F4',
    lineHeight: 22,
  },

  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },

  optionButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionCorrect: {
    borderColor: '#2ECC71',
    backgroundColor: '#EFFFF5',
  },

  optionWrong: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF0F0',
  },

  optionText: {
    fontSize: 16,
    color: '#1E1E1E',
    fontWeight: '500',
  },

  feedbackCorrect: {
    backgroundColor: '#EFFFF5',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
  },

  feedbackWrong: {
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
  },

  feedbackCorrectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 8,
  },

  feedbackWrongTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D63031',
    marginBottom: 8,
  },

  feedbackText: {
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },

  nextButton: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
})