import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 16,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 25,
  },

  avatarInitial: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 18,
  },

  email: {
    fontSize: 13,
    marginTop: 6,
  },

  card: {
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 4,
    elevation: 3,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  optionText: {
    fontSize: 15,
  },

  logoutText: {
    fontWeight: '600',
  },
})
