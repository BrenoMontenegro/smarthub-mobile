import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 18,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 25,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  username: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: 18,
  },

  email: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    elevation: 3,
  },

  option: {
    paddingVertical: 14,
  },

  optionText: {
    fontSize: 15,
    color: '#222',
  },

  logoutText: {
    color: '#D11A2A',
    fontWeight: '600',
  },
})