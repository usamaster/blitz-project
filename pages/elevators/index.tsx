import { Suspense, useEffect } from "react"
import Head from "next/head"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import Floor from "app/elevators/components/Floor"
import getElevator from "app/elevators/queries/getElevator"
import elevatorUp from "app/elevators/mutations/elevatorUp"
import elevatorUp2 from "app/elevators/mutations/elevatorUp2"
import currentFloorIncrement from "app/elevators/mutations/currentFloorIncrement"
import elevatorDown2 from "app/elevators/mutations/elevatorDown2"
import currentFloorDecrement from "app/elevators/mutations/currentFloorDecrement"
import emptyDestinations from "app/elevators/mutations/emptyDestinations"
import resetElevator from "app/elevators/mutations/resetElevator"
import { BlitzPage } from "@blitzjs/auth"

const ElevatorsPage: BlitzPage = () => {
  const [elevator] = useQuery(getElevator, { id: 1 })

  const [clearRoute] = useMutation(emptyDestinations, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })
  const [resetElevatorMutation] = useMutation(resetElevator, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })
  const [deactivateFloor] = useMutation(elevatorUp)
  const [activateFloorAbove] = useMutation(elevatorUp2)
  const [incrementFloor] = useMutation(currentFloorIncrement, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })

  const [activateFloorBelow] = useMutation(elevatorDown2)
  const [decrementFloor] = useMutation(currentFloorDecrement, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })

  function delay(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds)
    })
  }

  const moveElevatorUp = async (id: number, currentFloor: number) => {
    try {
      await deactivateFloor({ id, currentFloor })
      await activateFloorAbove({ currentFloor })
      await delay(1000)
      await incrementFloor({ currentFloor })
    } catch (error) {}
  }

  const moveElevatorDown = async (id: number, currentFloor: number) => {
    try {
      await deactivateFloor({ id, currentFloor })
      await activateFloorBelow({ currentFloor })
      await delay(1000)
      await decrementFloor({ currentFloor })
    } catch (error) {}
  }

  useEffect(() => {
    if (elevator.destinations[0] && elevator.destinations[0] > elevator.currentFloor) {
      moveElevatorUp(elevator.currentFloor + 1, elevator.currentFloor).catch
    } else if (elevator.destinations[0] && elevator.destinations[0] < elevator.currentFloor) {
      moveElevatorDown(elevator.currentFloor + 1, elevator.currentFloor).catch
    }
  }, [elevator])

  return (
    <div className="elevator-menu">
      <Head>
        <title>Elevator</title>
      </Head>
      <h1>Elevator</h1>
      <button
        onClick={async () => {
          await moveElevatorUp(elevator.currentFloor + 1, elevator.currentFloor)
        }}
      >
        Elevator up
      </button>
      <br></br>
      <button
        onClick={async () => {
          await moveElevatorDown(elevator.currentFloor + 1, elevator.currentFloor)
        }}
      >
        Elevator down
      </button>
      <br></br>
      <button
        onClick={async () => {
          await resetElevatorMutation()
        }}
      >
        reset elevator
      </button>
      <br></br>

      <div>
        <Suspense fallback="Loading...">
          <div className="elevator">
            {elevator &&
              elevator.floors.map((floor: any) => {
                return (
                  <Floor
                    key={floor.level}
                    level={floor.level}
                    active={floor.active}
                    elevator={elevator}
                  />
                )
              })}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

ElevatorsPage.getLayout = (page) => <Layout title="Elevator">{page}</Layout>

export default ElevatorsPage
