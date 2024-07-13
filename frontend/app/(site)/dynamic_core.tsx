import React from 'react'


import dynamic from 'next/dynamic'
//@ts-ignore
const DynamicComponentWithNoSSR = dynamic(() => import('./Core'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />