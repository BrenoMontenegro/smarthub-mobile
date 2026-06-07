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
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444',
    marginBottom: 8,
  },

  questionTitle: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },

  orderedContainer: {
    minHeight: 80,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    gap: 8,
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
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },

  lineNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lineNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  lineText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#FFF',
    flex: 1,
  },

  availableContainer: {
    gap: 8,
    marginBottom: 24,
  },

  availableLine: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  availableLineText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#333',
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
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
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