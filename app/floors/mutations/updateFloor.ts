import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateFloor = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateFloor),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const floor = await db.floor.update({ where: { id }, data })

    return floor
  }
)
