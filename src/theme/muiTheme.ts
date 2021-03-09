import { createMuiTheme } from '@material-ui/core'

import { theme } from './theme'

export const muiTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: theme.colors.primary,
            contrastText: theme.colors.fonts.light,
        },
        secondary: {
            main: theme.colors.secondary,
            contrastText: theme.colors.fonts.light,
        },
    },
})
