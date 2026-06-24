import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    color: '#111',
  },

  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },

  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 999,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 6,
  },

  questionTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },

  orderedContainer: {
    minHeight: 60,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDD',
    gap: 6,
  },

  placeholder: {
    color: '#AAA',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },

  orderedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C5CE7',
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },

  lineNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lineNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  lineText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#FFF',
    flex: 1,
  },

  availableContainer: {
    gap: 6,
    marginBottom: 16,
  },

  availableLine: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 11,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  availableLineText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },

  feedbackCorrect: {
    backgroundColor: '#EFFFF5',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },

  feedbackWrong: {
    backgroundColor: '#FFF0F0',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4D4D',
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
    lineHeight: 22,
    fontFamily: 'monospace',
    fontSize: 13,
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

  checkButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  checkButtonDisabled: {
    backgroundColor: '#C4C4C4',
  },

  checkButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
})