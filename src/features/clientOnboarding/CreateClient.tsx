import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"
import BackButton from "../../components/BackButton"
import Button from "../../components/Button"
import Dropzone from "../../components/Dropzone"
import Input from "../../components/Input"
import { Spinner } from "../../components/Utils"
import { fileToBase64 } from "../../utils/utilFunctions"
import { postCreateClient } from "./asyncThunks"
import { useNavigate } from "react-router-dom"
import { validWebsiteRegex } from "../../utils/constants"



export type CreateClientFormInputs = {
  email: string
  description: string
  password: string
  confirmPassword: string
  subdomain: string
  userName: string
  website: string
}

const CreateClient = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateClientFormInputs>()

  const dispatch = useDispatch<AppDispatch>()

  const [selectedLogo, setSelectedLogo] = useState({})
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const passwordType = passwordVisible ? "text" : "password"

  const onSubmit: SubmitHandler<CreateClientFormInputs> = async (data) => {
    console.log({ data, selectedLogo, errors })
    const payload = {
      ...data,
      logo: selectedLogo,
    }
    try {
      setLoading(true)
      const response = await dispatch(postCreateClient(payload)).unwrap()
      setLoading(false)
      reset()
      navigate("/")
    } catch (error) {
      setLoading(false)
    }
  }

  const onFileSelect = async (selectedFiles: File[]) => {
    const base64Promises = selectedFiles.map((file) => fileToBase64(file))
    try {
      const base64Strings = await Promise.all(base64Promises)
      setSelectedLogo(base64Strings[0])
    } catch (error) {
      console.error("Error converting files to base64:", error)
    }
  }

  return (
    <div className="w-2/4 mx-auto mb-6">
      <BackButton />
      <h2 className="text-2xl uppercase text-center text-primary mb-6 font-semibold">
        Create client
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropzone multiple={false} onSelect={onFileSelect} />
        <Input
          label="Email"
          id="email"
          register={register}
          errors={errors}
          validations={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <Input
          label="Description"
          id="description"
          register={register}
          errors={errors}
        />
        <Input
          label="Organization name"
          id="organizationName"
          register={register}
          validations={{
            required: "Organization name is required",
          }}
          errors={errors}
        />
        <Input
          label="Password"
          id="password"
          type={passwordType}
          register={register}
          validations={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character",
            },
          }}
          errors={errors}
        >
          <small
            className="absolute text-grey right-6 top-5 cursor-pointer"
            onMouseDown={() => setPasswordVisible(true)}
            onMouseUp={() => setPasswordVisible(false)}
            onMouseLeave={() => setPasswordVisible(false)}
          >
            Show
          </small>
        </Input>
        {/* <Input
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          errors={errors}
        /> */}
        <Input
          label="Subdomain"
          id="subdomain"
          register={register}
          errors={errors}
        />
        <Input
          label="User Name"
          id="userName"
          register={register}
          errors={errors}
        />
        <Input
          label="Website (e.g http://www.example.com)"
          id="website"
          validations={{
            required: "Website URL is required",
            pattern: {
              value: validWebsiteRegex,
              message: "Please enter a valid website URL",
            },
          }}
          register={register}
          errors={errors}
        />
        <Button
          classes="w-full py-3 flex justify-center"
          color="primary"
          disabled={loading}
        >
          {loading && <Spinner />}
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CreateClient
