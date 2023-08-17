import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../../components/Input"
import Dropzone from "../../components/Dropzone"
import Button from "../../components/Button"
import { fileToBase64 } from "../../utils/utilFunctions"
import { postCreateClient } from "./clientOnboardingSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"

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
    reset
  } = useForm<CreateClientFormInputs>();

  const dispatch = useDispatch<AppDispatch>();

  const [selectedLogo, setSelectedLogo] = useState({})

  const onSubmit: SubmitHandler<CreateClientFormInputs> = async (data) => {
    console.log({ data, selectedLogo })
    const payload = {
        ...data,
        logo: selectedLogo,
    }
    try {
        const response = await dispatch(postCreateClient(payload)).unwrap();
        reset();
    } catch (error) {
        
    }
  }

  const onFileSelect = async (selectedFiles: File[]) => {
    const base64Promises = selectedFiles.map(file => fileToBase64(file));
    try {
      const base64Strings = await Promise.all(base64Promises);
      setSelectedLogo(base64Strings[0])
    } catch (error) {
      console.error('Error converting files to base64:', error);
    }
  }

  return (
    <div className="w-2/4 mx-auto mb-6">
      <h2 className="text-2xl uppercase text-center text-primary mb-6 font-semibold">
        Create client
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropzone multiple={false} onSelect={onFileSelect} />
        <Input label="Email" id="email" register={register} errors={errors} />
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
          errors={errors}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          errors={errors}
        />
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
          label="Website"
          id="website"
          register={register}
          errors={errors}
        />
        <Button classes="w-full py-3" color="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CreateClient
