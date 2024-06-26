import { StyleSheet} from 'react-native'
import { theme } from '../../styles/theme'

export const searchListStyles = StyleSheet.create({
  container: {
    minWidth: 300,
    gap: theme.spacing['2xs'],
    marginTop: theme.spacing.md
  },
  title: {
    ...theme.typeography.title.sm,
    color: theme.color.surface.onBaseSecondary,
    textTransform: 'capitalize'
  }
})