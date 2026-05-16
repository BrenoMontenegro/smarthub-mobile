import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 999,
    marginRight: 12,
  },

  greeting: {
    color: '#DDD6FF',
    fontSize: 13,
  },

  username: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },

  streakBadge: {
    backgroundColor: '#8477F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  streakText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },

  progressCard: {
    backgroundColor: '#7D6CF0',
    borderRadius: 18,
    padding: 16,
    marginTop: 24,
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  levelText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
  },

  xpText: {
    color: '#FFF',
    fontSize: 12,
  },

  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#B4ABFF',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    width: '62%',
    height: '100%',
    backgroundColor: '#20E3B2',
    borderRadius: 999,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 20,
  },

  cardsContainer: {
    justifyContent: 'space-between',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
},

navButton: {
    alignItems: 'center',
    justifyContent: 'center',
},

navText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
},

})