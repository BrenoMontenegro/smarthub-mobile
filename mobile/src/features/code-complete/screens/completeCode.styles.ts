import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },

  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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
    backgroundColor: '#DDD',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#5B3FD8',
    borderRadius: 999,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
    color: '#999',
  },

  contextText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  codeCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    color: '#CDD6F4',
  },

  blankText: {
    fontFamily: 'monospace',
    fontWeight: '700',
  },

  blankEmpty: {
    color: '#888',
    textDecorationLine: 'underline',
  },

  blankFilled: {
    color: '#CBA6F7',
    textDecorationLine: 'underline',
  },

  blankCorrect: {
    color: '#A6E3A1',
  },

  blankWrong: {
    color: '#F38BA8',
    textDecorationLine: 'line-through',
  },

  availableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  optionButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
  },

  optionSelected: {
    backgroundColor: '#EDE9FF',
    borderColor: '#5B3FD8',
  },

  optionCorrect: {
    backgroundColor: '#EFFFF0',
    borderColor: '#27ae60',
  },

  optionWrong: {
    backgroundColor: '#FDECEC',
    borderColor: '#e74c3c',
  },

  optionText: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },

  optionTextSelected: {
    color: '#5B3FD8',
  },

  feedbackCorrect: {
    backgroundColor: '#E8F8EC',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },

  feedbackWrong: {
    backgroundColor: '#FDECEC',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },

  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  feedbackCorrectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
  },

  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e74c3c',
  },

  correctAnswerBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  correctAnswerLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },

  correctAnswerValue: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
  },

  explanationLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 6,
  },

  feedbackText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 16,
  },

  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#5B3FD8',
  },

  nextButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5B3FD8',
  },

  verifyButton: {
    backgroundColor: '#5B3FD8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },

  verifyButtonDisabled: {
    backgroundColor: '#C5BEF0',
  },

  verifyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  primaryButton: {
    backgroundColor: '#5B3FD8',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },

  resultSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 28,
  },

  resultScoreCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    elevation: 2,
  },

  resultScoreLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },

  resultScoreValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#5B3FD8',
  },

  xpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFFFF0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },

  xpText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#27ae60',
  },

  resultMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
})
