import { theme } from "../../../styles/theme"

// Added 2 to each to account for border
const AVATAR_SIZES_STYLE = {
  sm: {
    width: 34,
    height: 34
  },
  md: {
    width: 50,
    height: 50
  },
  lg: {
    width: 66,
    height: 66
  },
  xl: {
    width: 82,
    height: 82
  },
  '2xl': {
    width: 98,
    height: 98
  },
  'profile': {
    width: 220,
    height: 160
  }
}

const AVATAR_TEXT_STYLE = {
  sm: {
    ...theme.typeography.body.mdBold
  },
  md: {
    ...theme.typeography.title.sm
  },
  lg: {
    ...theme.typeography.title.md
  },
  xl: {
    ...theme.typeography.title.lg
  },
  '2xl': {
    ...theme.typeography.display.md
  }
}

export default { AVATAR_SIZES_STYLE, AVATAR_TEXT_STYLE }