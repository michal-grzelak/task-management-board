import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string
            secondary: string
            fonts: {
                light: string
                dark: string
            }
        }
    }
}
