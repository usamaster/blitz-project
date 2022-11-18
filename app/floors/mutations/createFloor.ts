import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateFloor = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateFloor), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const floor = await db.floor.create({ data: input })

  return floor
})
