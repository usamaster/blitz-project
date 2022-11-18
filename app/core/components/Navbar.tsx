import Link from "next/link"
import React from "react"
import { useCurrentUser } from "app/users/hooks/useCurrentUser"

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/tasks">Taskmaster</Link>
        <Link href="/elevators">Elevator</Link>
      </div>
    </div>
  )
}

export default Navbar
