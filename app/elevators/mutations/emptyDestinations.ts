import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const elevator = await db.elevator.update({
    where: { id: 1 },
    data: {
      destinations: [],
    },
  })

  return elevator
})
