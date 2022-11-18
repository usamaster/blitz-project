import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createElevator from "app/elevators/mutations/createElevator"
import { ElevatorForm, FORM_ERROR } from "app/elevators/components/ElevatorForm"

const NewElevatorPage = () => {
  const router = useRouter()
  const [createElevatorMutation] = useMutation(createElevator)

  return (
    <Layout title={"Create New Elevator"}>
      <h1>Create New Elevator</h1>

      <ElevatorForm
        submitText="Create Elevator"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateElevator}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const elevator = await createElevatorMutation(values)
            await router.push(Routes.ShowElevatorPage({ elevatorId: elevator.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ElevatorsPage()}>
          <a>Elevators</a>
        </Link>
      </p>
    </Layout>
  )
}

NewElevatorPage.authenticate = true

export default NewElevatorPage
