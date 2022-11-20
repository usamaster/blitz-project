import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const AddUpCall = z.object({
  id: z.number(),
  level: z.number(),
})

export default resolver.pipe(
  resolver.zod(AddUpCall),
  resolver.authorize(),
  async ({ id, level }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const elevator = await db.elevator.update({
      where: { id },
      data: {
        upCalls: {
          push: level,
        },
      },
    })

    return elevator
  }
)
