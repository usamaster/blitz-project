import ButtonPanel from "./ButtonPanel"
import { ChevronDown, ChevronUp } from "./icons"

interface floor {
  level: number
  active: boolean
  elevator: Object
}

const Floor = ({ level, active, elevator }: floor) => {
  const upCalls: Array<number> = [2, 1]
  const downCalls: Array<number> = [3]

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      event.preventDefault()
    }
  }

  const UpButton = () => {
    return (
      <>
        {upCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronUp />
          </div>
        ) : (
          <div className="chevron" onClick={clickHandler}>
            <ChevronUp />
          </div>
        )}
      </>
    )
  }
  const DownButton = () => {
    return (
      <>
        {downCalls.indexOf(level) !== -1 ? (
          <div className="chevron c-active">
            <ChevronDown />
          </div>
        ) : (
          <div className="chevron" onClick={clickHandler}>
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
