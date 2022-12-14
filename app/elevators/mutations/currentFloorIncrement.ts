import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const ElevatorUp = z.object({
  currentFloor: z.number(),
})

export default resolver.pipe(
  resolver.zod(ElevatorUp),
  resolver.authorize(),
  async ({ currentFloor }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const elevator = await db.elevator.update({
      where: { id: 1 },
      data: { currentFloor: currentFloor + 1 },
    })

    return elevator
  }
)
