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

  header: {
    marginBottom: 16,
  },

  backButton: {
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
  },

  progressText: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    marginBottom: 6,
  },

  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 999,
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    elevation: 2,
  },

  questionType: {
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
    fontWeight: '700',
    letterSpacing: 1,
  },

  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 12,
    lineHeight: 22,
  },

  codeContainer: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 12,
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#CDD6F4',
    lineHeight: 20,
  },

  optionsContainer: {
    marginTop: 16,
    gap: 10,
  },

  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F0EEFF',
  },

  optionCorrect: {
    borderColor: '#58CC02',
    backgroundColor: '#EFFFF0',
  },

  optionWrong: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF0F0',
  },

  optionText: {
    fontSize: 16,
    color: '#1E1E1E',
    fontWeight: '500',
    flex: 1,
  },

  optionIcon: {
    marginLeft: 8,
  },

  feedbackContainer: {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },

  feedbackCorrect: {
    backgroundColor: '#F0FFF4',
    borderColor: '#58CC02',
  },

  feedbackWrong: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF4D4D',
  },

  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  correctAnswerBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#58CC02',
  },

  correctAnswerLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },

  correctAnswerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },

  feedbackExplanationLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
    marginBottom: 6,
  },

  feedbackText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C5CE7',
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 32,
  },

  resultTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },

  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
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
    fontSize: 14,
    color: '#666',
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
    marginBottom: 16,
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

  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
})
