import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
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
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },

  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#DDD',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progressBarFill: {
    width: '55%',
    height: '100%',
    backgroundColor: '#2ECC71',
  },

  categoryText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    color: '#444',
  },

  contextText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  codeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
    color: '#222',
  },

  availableText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },

  optionButton: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  optionSelected: {
    backgroundColor: '#5B3FD8',
  },

  optionText: {
    color: '#FFF',
    fontWeight: '700',
  },

  feedbackWrong: {
    backgroundColor: '#FDECEC',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
  },

  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D63031',
    marginBottom: 8,
  },

  feedbackText: {
    color: '#555',
    lineHeight: 20,
  },

  verifyButton: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },

  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  feedbackCorrect: {
    backgroundColor: '#E8F8EC',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
  },

  feedbackCorrectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 8,
  },
})