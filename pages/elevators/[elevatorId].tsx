import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getElevator from "app/elevators/queries/getElevator"
import deleteElevator from "app/elevators/mutations/deleteElevator"

export const Elevator = () => {
  const router = useRouter()
  const elevatorId = useParam("elevatorId", "number")
  const [deleteElevatorMutation] = useMutation(deleteElevator)
  const [elevator] = useQuery(getElevator, { id: elevatorId })

  return (
    <>
      <Head>
        <title>Elevator {elevator.id}</title>
      </Head>

      <div>
        <h1>Elevator {elevator.id}</h1>
        <pre>{JSON.stringify(elevator, null, 2)}</pre>

        <Link href={Routes.EditElevatorPage({ elevatorId: elevator.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteElevatorMutation({ id: elevator.id })
              await router.push(Routes.ElevatorsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowElevatorPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ElevatorsPage()}>
          <a>Elevators</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Elevator />
      </Suspense>
    </div>
  )
}

ShowElevatorPage.authenticate = true
ShowElevatorPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowElevatorPage
