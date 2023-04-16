import React from 'react'
import { Input, Text, type InputLabelProps } from '@mantine/core'

const AsteriskOverriden = ({ color = 'red' }: { color?: string }) => {
  return (
    <Text
      component="span"
      c={color}
      fz={9}
      sx={{ position: 'relative', bottom: '1.5px' }}
    >
      {' '}
      ●
    </Text>
  )
}

export const LabelOverriden = (props: InputLabelProps) => {
  const childrenOverriden =
    React.Children.count(props.children) === 2
      ? React.Children.map(props.children, (child, index) => {
        if (child == null) return null
        if (index === 1) return <AsteriskOverriden />
        return child
      })
      : props.children

  return (
    <Input.Label {...{ ...props, required: false }}>
      {childrenOverriden}
    </Input.Label>
  )
}
