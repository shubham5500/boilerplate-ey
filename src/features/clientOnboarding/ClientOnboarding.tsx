import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import CreateClient from './CreateClient'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { getClientList } from './clientOnboardingSlice'

const ClientOnboarding = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const getClients = async () => {

    setLoading(true);
    try {
      const res = await dispatch(getClientList());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClients()
  }, [])
  return (
    <div>
      <Table gridData={[]}/>
      {/* <CreateClient/> */}
    </div>
  )
}

export default ClientOnboarding