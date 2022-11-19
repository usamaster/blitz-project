import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Arrived = z.object({
  id: z.number(),
  currentFloor: z.number(),
  destinations: z.number().array(),
})

export default resolver.pipe(
  resolver.zod(Arrived),
  resolver.authorize(),
  async ({ id, currentFloor, destinations }) => {
    const newDestinations = destinations.filter((dest) => dest !== currentFloor)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const elevator = await db.elevator.update({
      where: { id },
      data: { destinations: newDestinations },
    })

    return elevator
  }
)
