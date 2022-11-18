import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getElevator from "app/elevators/queries/getElevator"
import updateElevator from "app/elevators/mutations/updateElevator"
import { ElevatorForm, FORM_ERROR } from "app/elevators/components/ElevatorForm"

export const EditElevator = () => {
  const router = useRouter()
  const elevatorId = useParam("elevatorId", "number")
  const [elevator, { setQueryData }] = useQuery(
    getElevator,
    { id: elevatorId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateElevatorMutation] = useMutation(updateElevator)

  return (
    <>
      <Head>
        <title>Edit Elevator {elevator.id}</title>
      </Head>

      <div>
        <h1>Edit Elevator {elevator.id}</h1>
        <pre>{JSON.stringify(elevator, null, 2)}</pre>

        <ElevatorForm
          submitText="Update Elevator"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateElevator}
          initialValues={elevator}
          onSubmit={async (values) => {
            try {
              const updated = await updateElevatorMutation({
                id: elevator.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowElevatorPage({ elevatorId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditElevatorPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditElevator />
      </Suspense>

      <p>
        <Link href={Routes.ElevatorsPage()}>
          <a>Elevators</a>
        </Link>
      </p>
    </div>
  )
}

EditElevatorPage.authenticate = true
EditElevatorPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditElevatorPage
