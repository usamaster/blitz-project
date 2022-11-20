import React from "react"
import Floor from "./Floor"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import getElevator from "app/elevators/queries/getElevator"
import updateElevator from "../mutations/updateElevator"
import { data } from "autoprefixer"

const Button = ({ level, elevator }) => {
  // const dispatch = useAppDispatch()
  // const { currentFloor, destinations } = useAppSelector((state) => state.elevator)

  const [updateElevatorMutation, { isLoading }] = useMutation(updateElevator, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })

  // const moveElevator = async () => {
  //   if (currentFloor !== level) {
  //     dispatch(addDestination(level))
  //   }
  // }

  const handleDest = async (id: number, destinations: Array<number>) => {
    try {
      await updateElevatorMutation({ id, destinations })
    } catch (error) {
      alert("Error updating elevators " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <div>
      {elevator.destinations.indexOf(level) !== -1 ? (
        <div className="button active">{level}</div>
      ) : elevator.currentFloor === level ? (
        <div className="button">{level}</div>
      ) : (
        <div
          className="button"
          onClick={async () => {
            await handleDest(elevator.id, [...elevator.destinations, level])
          }}
        >
          {level}
        </div>
      )}
    </div>
  )
}

export default Button
