import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteFloor = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteFloor), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const floor = await db.floor.deleteMany({ where: { id } })

  return floor
})
