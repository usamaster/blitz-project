import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetElevatorsInput
  extends Pick<Prisma.ElevatorFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetElevatorsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: elevators,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.elevator.count({ where }),
      query: (paginateArgs) => db.elevator.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      elevators,
      nextPage,
      hasMore,
      count,
    }
  }
)
