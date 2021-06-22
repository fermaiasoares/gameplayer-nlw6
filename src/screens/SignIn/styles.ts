import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 360
  },
  content: {
    marginTop: -40,
    paddingHorizontal: 50
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700,
    textAlign: 'center',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 25,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    textAlign: 'center',
    marginBottom: 64
  }
})