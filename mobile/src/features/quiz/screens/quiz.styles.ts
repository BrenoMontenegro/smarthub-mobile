import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },

  progressText: {
    fontSize: 14,
    color: '#666',
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
    width: '40%',
    backgroundColor: '#58CC02',
    borderRadius: 999,
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  questionType: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
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
    gap: 16,
  },

  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionSelected: {
    borderColor: '#58CC02',
    backgroundColor: '#EFFFF0',
  },

  optionWrong: {
    borderColor: '#FF4D4D',
    backgroundColor: '#FFF0F0',
  },

  optionText: {
    fontSize: 18,
    color: '#1E1E1E',
    fontWeight: '500',
  },

  feedbackContainer: {
    marginTop: 24,
    backgroundColor: '#EFFFF0',
    borderRadius: 16,
    padding: 20,
  },

  feedbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },

  feedbackText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },

  nextButton: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
})