import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const ElevatorUp = z.object({
  id: z.number(),
  currentFloor: z.number(),
})

export default resolver.pipe(
  resolver.zod(ElevatorUp),
  resolver.authorize(),
  async ({ id, currentFloor }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const floor = await db.floor.update({
      where: { id },
      data: { active: false },
    })

    return floor
  }
)
