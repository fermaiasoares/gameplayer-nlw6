import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    lineHeight: 23,
    color: theme.colors.heading,
    marginBottom: 4,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  nameStatus: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    lineHeight: 17,
    color: theme.colors.highlight
  }
}) 