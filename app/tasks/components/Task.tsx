import classNames from "classnames"
import Image from "next/image"
import React from "react"
import { text } from "stream/consumers"

export const containerStyle =
  "h-12 w-80 mb-5 flex items-center rounded-full bg-gray-700 shadow-md px-4 focus:ring outline-none justify-items-end"
export const textStyle = "relative text-md color-gray-50"
export const deleteButtonStyle =
  "h-12 w-12 mb-5 ml-2 flex items-center text-center rounded-full bg-gray-700 shadow-md px-4 focus:ring outline-none justify-items-end"

type TaskType = {
  checked: boolean
  label: string
  id: number
}

export const Task: React.FC<{ task: TaskType; onClick: () => void; onDelete: () => void }> = ({
  task,
  onClick,
  onDelete,
}) => {
  return (
    <div className={classNames("flex flex-row")}>
      <div
        onClick={onClick}
        onKeyPress={onClick}
        className={classNames(containerStyle, "cursor-pointer")}
        role="checkbox"
        aria-checked={task.checked}
        tabIndex={0}
      >
        <div
          className={classNames(
            "rounded-full w-5 h-5 mr-4 transition-all flex items-center justify-center bg-gray-900 cursor-pointer",
            task.checked && "bg-transparent"
          )}
        >
          <Image
            src="/check.svg"
            width="20px"
            height="20px"
            className={classNames(
              "transition-opacity w-3",
              task.checked ? "opacity-100" : "opacity-0"
            )}
            alt="check"
          />
        </div>
        <div className={textStyle}>
          {task.label}
          <div
            className={classNames(
              "absolute top-1/2 -left-1 -right-1 h-0.5 transform origin-left transition-transform bg-blue-400",
              task.checked ? "scale-x-1" : "scale-x-0"
            )}
          />
        </div>
      </div>
      <div onClick={onDelete} className={classNames(deleteButtonStyle, "cursor-pointer")}>
        <Image
          src="/trash.svg"
          width="20px"
          height="20px"
          className={classNames("w-3 ")}
          alt="check"
        />
      </div>
    </div>
  )
}
