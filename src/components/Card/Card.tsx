import React from 'react'
import { Card as MuiCard, CardProps } from '@material-ui/core'
import styled from 'styled-components'

export const Card = styled((props: CardProps) => <MuiCard {...props} />)``

Card.defaultProps = {
    variant: 'outlined',
}
