import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CalculateRoute = z.object({
  id: z.number(),
  destinations: z.number().array(),
})

export default resolver.pipe(
  resolver.zod(CalculateRoute),
  resolver.authorize(),

  async ({ id, destinations, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const newRoute = destinations.sort()
    const elevator = await db.elevator.update({
      where: { id },
      data: {
        ...data,

        route: newRoute,
      },
    })

    return elevator
  }
)
