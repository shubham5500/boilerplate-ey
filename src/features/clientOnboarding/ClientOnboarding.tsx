import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import CreateClient from './CreateClient'

const ClientOnboarding = () => {
  return (
    <div>
      {/* <Table gridData={[]}/> */}
      <CreateClient/>
    </div>
  )
}

export default ClientOnboarding