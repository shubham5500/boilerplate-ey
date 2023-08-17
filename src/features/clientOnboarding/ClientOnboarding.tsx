import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../../app/store"
import Table, { column } from "../../components/Table"
import { getClientList } from "./asyncThunks"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"

const ClientOnboarding = () => {
  const dispatch = useDispatch<AppDispatch>()
  const clients = useAppSelector((state) => state.clientOnboarding.clientList)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const getClients = async () => {
    setLoading(true)
    try {
      await dispatch(getClientList()).unwrap()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getClients()
  }, [])

  const columns: column[] = [
    {
      columnLabel: "Logo",
      key: "logo",
      render: (data) => <img src={data} width={32} height={32} />,
    },
    {
      columnLabel: "Organization name",
      key: "organization_name",
    },
    {
      columnLabel: "Description",
      key: "description",
    },
    {
      columnLabel: "Sub domain",
      key: "subdomain",
    },
    {
      columnLabel: "Website",
      key: "website",
    },
  ]

  const actions = (
    <Button classes="ml-auto text-sm" color="primary" onClick={() => navigate('/onboard')}>
      Create
    </Button>
  )

  return (
    <div>
      <Table
        heading="Clients"
        idKey={"organization_id"}
        columns={columns}
        gridData={clients.results}
        actions={actions}
      />
      {/* <CreateClient/> */}
    </div>
  )
}

export default ClientOnboarding
