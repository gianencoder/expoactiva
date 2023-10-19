import React, { forwardRef } from 'react'
import { View } from 'react-native'

export const DividerComponent = forwardRef(({ style, enableSpacing = true }, ref) => {
    return (
        <View
            ref={ref}
            style={
                [
                    {
                        height: 1,
                        backgroundColor: 'lightgray',
                        marginHorizontal: enableSpacing ? 20 : 0
                    },
                    style
                ]}
        />
    )
})
