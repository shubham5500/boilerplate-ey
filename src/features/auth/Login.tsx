import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../../app/store"
import Input from "../../components/Input"
import { LocalStorageService } from "../../utils/localStorageService"
import { postLogin } from "./authSlice"
import Button from "../../components/Button"
import { useState } from "react"
import { Spinner } from "../../components/Utils"

export type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true)
      const res = await dispatch(postLogin(data)).unwrap()

      LocalStorageService.set("auth", res)
      reset()
      if (res && res.access_token) {
        setTimeout(() => {
          setLoading(false)
          navigate("/")
        }, 400)
      }
    } catch (error) {
      setLoading(false)
      reset()
      console.log({ error })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        style={
          {
            //   clipPath: "polygon(10% 100%, 0% 100%, 0 0)",
          }
        }
        className="h-full w-full absolute left-0 top-0 bg-primary -z-10"
      ></div>
      <div
        style={{
          clipPath: "polygon(100% 70%, 0% 100%, 100% 100%)",
        }}
        className="h-full w-full absolute left-0 top-0 bg-secondary"
      ></div>
      <div className="max-w-md w-full p-6 bg-white shadow-md">
        <h1 className="text-xl font-semibold mb-6 text-center uppercase">
          Login
        </h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <Input
              type="text"
              id="email"
              label="Email"
              register={register}
              errors={errors}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              id="password"
              label="Password"
              register={register}
              errors={errors}
            />
          </div>
          <Button
            type="submit"
            classes="w-full flex items-center justify-center"
            color="primary"
            disabled={loading}
          >
            {loading && <Spinner />}
            Log In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
