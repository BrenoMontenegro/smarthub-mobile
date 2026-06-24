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

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    flex: 1,
  },

  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEE9FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  timerBadgeWarning: {
    backgroundColor: '#FDECEC',
  },

  timer: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  timerWarning: {
    color: '#e74c3c',
  },

  progressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },

  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 16,
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
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#999',
    marginBottom: 6,
  },

  questionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    lineHeight: 20,
  },

  codeCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#CDD6F4',
    lineHeight: 20,
  },

  optionsContainer: {
    gap: 8,
    marginBottom: 16,
  },

  optionButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F0EEFF',
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
    fontSize: 15,
    color: '#1E1E1E',
    fontWeight: '500',
    flex: 1,
  },

  optionTextCorrect: {
    color: '#27ae60',
    fontWeight: '700',
  },

  optionTextWrong: {
    color: '#e74c3c',
  },

  feedbackCorrect: {
    backgroundColor: '#EFFFF5',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },

  feedbackWrong: {
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4D4D',
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

  feedbackWrongTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D63031',
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
    fontSize: 15,
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
    borderColor: '#6C5CE7',
  },

  nextButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  primaryButton: {
    backgroundColor: '#6C5CE7',
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
    backgroundColor: '#F5F5F5',
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
    color: '#6C5CE7',
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
