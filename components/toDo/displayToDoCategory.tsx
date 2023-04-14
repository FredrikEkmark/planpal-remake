import Image from "next/image"
import TaskBoxCard from "../basic/taskBoxCard"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import { Category } from "@/types/category"
import { Task } from "@/types/task"
import { time } from "console"
import Link from "next/link"

interface Props {
  title: string
}

const DisplayToDoCategory = (props: Props) => {
  const {
    username,
    setUsername,
    currentPage,
    setCurrentPage,
    toDo,
    setToDo,
    addTask,
    editTask,
    deleteTask,
    calendar,
    setCalendar,
  } = useContext(UserContext)

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (props.title === "All Tasks") {
      const allTasks = toDo.category.flatMap((category) => category.toDoList)
      setTasks(allTasks)
    } else {
      const category = toDo.category.find(
        (category) => category.title === props.title
      )
      if (category) {
        setTasks(category.toDoList)
      }
    }
  }, [toDo.category, props.title])

  const [lateTasks, setLateTasks] = useState<Task[]>([])
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10) // Get today's date in the format YYYY-MM-DD

    const late = tasks.filter((task) => task.date < now)
    const today = tasks.filter((task) => task.date === now)
    const upcoming = tasks.filter((task) => task.date > now)

    setLateTasks(late)
    setTodayTasks(today)
    setUpcomingTasks(upcoming)
  }, [tasks])

  const displayLateTasks = lateTasks.map((item) => (
    <div className="flex " key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-center w-[15%] h-8 mr-[2%]"
      >
        <input
          type="checkbox"
          checked={item.done}
          id={`task_${item.id}`}
          name={item.title}
          value={item.id}
        />
      </div>
      <Link
        className="flex items-center justify-begining w-[83%] h-8"
        href={`/toDo/task/${item.id}`}
      >
        <p>{item.title}</p>
      </Link>
    </div>
  ))

  const displayTodayTasks = todayTasks.map((item) => (
    <div className="flex " key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-center w-[15%] h-8 mr-[2%]"
      >
        <input
          type="checkbox"
          checked={item.done}
          id={`task_${item.id}`}
          name={item.title}
          value={item.id}
        />
      </div>
      <Link
        className="flex items-center justify-begining w-[83%] h-8"
        href={`/toDo/task/${item.id}`}
      >
        <p>{item.title}</p>
      </Link>
    </div>
  ))

  const displayUpcomingTasks = upcomingTasks.map((item) => (
    <div className="flex " key={item.id}>
      <div
        onClick={() => {}}
        className="flex items-center justify-center w-[15%] h-8 mr-[2%]"
      >
        <input
          type="checkbox"
          checked={item.done}
          id={`task_${item.id}`}
          name={item.title}
          value={item.id}
        />
      </div>
      <Link
        className="flex items-center justify-begining w-[83%] h-8"
        href={`/toDo/task/${item.id}`}
      >
        <p>{item.title}</p>
      </Link>
    </div>
  ))

  return (
    <div className={`w-full h-full bg-ourcolors-${"green"}`}>
      <div className="flex p-[5%] pt-8 pb-6 ">
        <Image
          src={"/clipBoardWhite.svg"}
          alt={"#"}
          width={"30"}
          height={"30"}
        ></Image>
        <div>
          <h2 className="mx-2 text-white">{props.title}</h2>
          <p className="mx-2 text-white">
            {todayTasks.length + upcomingTasks.length} tasks
          </p>
        </div>
      </div>
      <TaskBoxCard>
        {lateTasks.length > 0 ? (
          <div>
            <p>Late</p>
            {displayLateTasks}
          </div>
        ) : (
          <div></div>
        )}
        {todayTasks.length > 0 ? (
          <div>
            <p>Today</p>
            {displayTodayTasks}
          </div>
        ) : (
          <div></div>
        )}
        {upcomingTasks.length > 0 ? (
          <div>
            <p>Upcomming</p>
            {displayUpcomingTasks}
          </div>
        ) : (
          <div></div>
        )}
      </TaskBoxCard>
    </div>
  )
}

export default DisplayToDoCategory
