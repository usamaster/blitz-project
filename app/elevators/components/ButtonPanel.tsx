import React from "react"
import Button from "./Button"
import getElevator from "app/elevators/queries/getElevator"
import { useQuery } from "@blitzjs/rpc"

const ButtonPanel = ({ elevator }) => {
  // const { floors } = useAppSelector((state) => state.elevator)

  return (
    <div className="buttonPanel">
      {elevator.floors.map((floor: any) => {
        return <Button key={floor.level} level={floor.level} elevator={elevator} />
      })}
    </div>
  )
}

export default ButtonPanel
