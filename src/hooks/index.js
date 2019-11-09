import React from 'react'
import useGlobalHook from 'use-global-hook'

import initialState from './initialState'
import actions from './actions'

const useGlobal = useGlobalHook(React,initialState,actions)
export default useGlobal