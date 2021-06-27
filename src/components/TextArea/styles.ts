import { StyleSheet } from "react-native";
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.secondary50,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    padding: 16,
    textAlignVertical: 'top'
  }
})