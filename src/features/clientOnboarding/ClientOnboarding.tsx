import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Table from "../../components/Table"
import { TableColumn } from "../../interfaces/utilsInterface"
import { getClientList } from "./asyncThunks"
import { clientListSelector } from "./clientOnboardingSlice"

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
