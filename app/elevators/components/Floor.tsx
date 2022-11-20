import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import addUpCall from "../mutations/addUpCall"
import getElevator from "../queries/getElevator"
import ButtonPanel from "./ButtonPanel"
import { ChevronDown, ChevronUp } from "./icons"

interface floor {
  level: number
  active: boolean
  elevator: {
    upCalls: Array<number>
    downCalls: Array<number>
  }
}

const Floor = ({ level, active, elevator }: floor) => {
  const [addUpCallMutation] = useMutation(addUpCall, {
    onSuccess: async () => {
      await invalidateQuery(getElevator)
    },
  })

  const clickHandler = async (id: number, level: number) => {
    try {
      await addUpCallMutation({ id, level })
    } catch (error) {}
  }
  const UpButton = () => {
    return (
      <>
        {elevator.upCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronUp />
          </div>
        ) : (
          <div className="chevron" onClick={() => clickHandler(1, level)}>
            <ChevronUp />
          </div>
        )}
      </>
    )
  }
  const DownButton = () => {
    return (
      <>
        {elevator.downCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronDown />
          </div>
        ) : (
          <div className="chevron" onClick={() => clickHandler(1, level)}>
            <ChevronDown />
          </div>
        )}
      </>
    )
  }
  return (
    <div>
      {active ? (
        <div className="floor-container">
          <div className="chevron-panel">
            <UpButton />
            <div className="chevron">
              <DownButton />
            </div>
          </div>
          <div className="floor active">{level}</div>
          <ButtonPanel elevator={elevator} />
        </div>
      ) : (
        <div className="floor-container">
          <div className="chevron-panel">
            <UpButton />
            <div className="chevron">
              <DownButton />
            </div>
          </div>
          <div className="floor">{level}</div>
        </div>
      )}
    </div>
  )
}

export default Floor
