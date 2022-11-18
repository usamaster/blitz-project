import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateElevator = z.object({
  id: z.number(),
  destinations: z.number().array(),
})

export default resolver.pipe(
  resolver.zod(UpdateElevator),
  resolver.authorize(),
  async ({ id, destinations, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const elevator = await db.elevator.update({
      where: { id },
      data: {
        ...data,
        destinations: destinations,
      },
    })

    return elevator
  }
)
