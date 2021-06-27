import { StyleSheet } from "react-native";
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 234,
    marginBottom: 24
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 28,
    lineHeight: 36,
    color: theme.colors.heading,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    lineHeight: 21,
    color: theme.colors.heading,
  },
  members: {
    marginLeft: 24,
    marginTop: 27,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: getBottomSpace() + 40
  }
})