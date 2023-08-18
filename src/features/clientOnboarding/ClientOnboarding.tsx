import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../../app/store"
import Table from "../../components/Table"
import { getClientList } from "./asyncThunks"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { clientListSelector } from "./clientOnboardingSlice"
import { TableColumn } from "../../interfaces/utilsInterface"

const ClientOnboarding = () => {
  const navigate = useNavigate();

  const columns: TableColumn[] = [
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
        actions={actions}
        dataSelector={clientListSelector}
        apiFunc={getClientList}
      />
    </div>
  )
}

export default ClientOnboarding
