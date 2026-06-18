import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  header: {
    marginBottom: 24,
  },

  backButton: {
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },

  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
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
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  questionType: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
    fontWeight: '600',
  },

  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 16,
  },

  codeContainer: {
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    padding: 14,
  },

  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },

  optionsContainer: {
    marginTop: 24,
    gap: 12,
  },

  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
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
