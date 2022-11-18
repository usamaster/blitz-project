import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetFloorsInput
  extends Pick<Prisma.FloorFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFloorsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: floors,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.floor.count({ where }),
      query: (paginateArgs) => db.floor.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      floors,
      nextPage,
      hasMore,
      count,
    }
  }
)
