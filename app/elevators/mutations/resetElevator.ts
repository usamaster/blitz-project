import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

export default resolver.pipe(
  resolver.authorize(),

  async () => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const elevator = await db.elevator.update({
      where: { id: 1 },
      data: {
        currentFloor: 0,
        destinations: [],
      },
    })
    await db.floor.update({
      where: { id: 0 },
      data: {
        active: true,
      },
    })

    return elevator
  },
  async () => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const floor = await db.floor.update({
      where: { id: 1 },
      data: {
        active: false,
      },
    })
    await db.floor.update({
      where: { id: 2 },
      data: {
        active: false,
      },
    })
    await db.floor.update({
      where: { id: 3 },
      data: {
        active: false,
      },
    })
    await db.floor.update({
      where: { id: 4 },
      data: {
        active: false,
      },
    })
    await db.floor.update({
      where: { id: 5 },
      data: {
        active: false,
      },
    })
  }
)
