import { Input } from "app/core/components/Input"
import { Task } from "app/tasks/components/Task"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { useState } from "react"
import createTask from "app/tasks/mutations/createTask"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import getTasks from "app/tasks/queries/getTasks"
import updateTask from "app/tasks/mutations/updateTask"
import deleteTask from "app/tasks/mutations/deleteTask"

const Tasks: BlitzPage = () => {
  const [newTaskLabel, setNewTaskLabel] = useState("")
  const [createTaskMutation, { isLoading }] = useMutation(createTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks)
    },
  })
  const [{ tasks }] = useQuery(getTasks, {
    orderBy: { id: "asc" },
  })

  const [checkTaskMutation] = useMutation(updateTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks)
    },
  })

  const [deleteTaskMutation] = useMutation(deleteTask, {
    onSuccess: async () => {
      await invalidateQuery(getTasks)
    },
  })

  const handleCheck = async (id: number, checked: boolean) => {
    try {
      await checkTaskMutation({ id, checked })
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTaskMutation({ id })
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <div>
      <div className="text-5xl font-semibold tracking-wide text-gray-100 py-9">
        <span role="img" aria-label="Taskhero logo">
          🦸‍♂️
        </span>
        Taskmaster
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={{ label: task.label, checked: task.checked, id: task.id }}
          onClick={async () => {
            await handleCheck(task.id, task.checked)
          }}
          onDelete={async () => {
            await handleDelete(task.id)
          }}
        />
      ))}
      <Input
        value={newTaskLabel}
        onChange={setNewTaskLabel}
        onPressEnter={async () => {
          await createTaskMutation({ label: newTaskLabel, checked: false })
          setNewTaskLabel("")
        }}
        isLoading={isLoading}
      />
    </div>
  )
}

Tasks.getLayout = (page) => <Layout title="Taskmaster">{page}</Layout>

export default Tasks
