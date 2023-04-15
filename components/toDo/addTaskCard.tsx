import { NextPage } from "next"
import InputDate from "../basic/inputDate"
import InputCategory from "../basic/inputCategroy"
import Button from "../basic/button"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context-provider"
import Task from "@/pages/toDo/task/[task]"
import { randomUUID } from "crypto"
import Link from "next/link"
import DoubleTextInput from "../basic/doubleTextInput"
import Box from "../basic/box"

interface Props {}

const AddTaskCard = ({}) => {
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

  useEffect(
    () => setCurrentPage("home") // set name of folder so navBar know where you are
  )

  const [titleInput, setTitleInput] = useState<string>("")

  function handleTitleInput(newValue: string) {
    setTitleInput(newValue)
  }

  const [descriptionInput, setDescriptionInput] = useState<string>("")

  function handleDescriptionInput(newValue: string) {
    setDescriptionInput(newValue)
  }

  const [dateInput, setDateInput] = useState<string>(
    new Date().toISOString().slice(0, 10)
  )

  function handleDateInput(newValue: string) {
    setDateInput(newValue)
  }

  const [categoryInput, setCategoryInput] = useState<string>("")

  function handleCategoryInput(newValue: string) {
    setCategoryInput(newValue)
  }

  function handleSubmit() {
    const categoryId = toDo.category.find(
      (category) => category.title === categoryInput
    )?.id
    if (categoryId === undefined) {
      return "Error no such category"
    }
    const newTask = {
      title: titleInput,
      description: descriptionInput,
      id: `${Math.random()}`, // this should be changed
      categoryId: categoryId,
      date: dateInput,
      done: false,
    }
    addTask(categoryInput, newTask)
    console.log("handle submithas been called " + newTask.id)
  }
  return (
    <div>
      <Box>
        <DoubleTextInput
          initialValueTop={titleInput}
          initialValueBottom={descriptionInput}
          onChangeTop={handleTitleInput}
          onChangeBottom={handleDescriptionInput}
        />
      </Box>
      <Box className="flex flex-col items-center">
        <InputDate
          className="w-full my-2"
          initialValue={dateInput}
          onChange={handleDateInput}
        />
        <InputCategory
          className="w-full my-2"
          categories={toDo.category}
          onChange={handleCategoryInput}
          initialValue={categoryInput}
        />
        <Link href={"/toDo"}>
          <Button className="my-4 mt-8" onClick={handleSubmit} color={"green"}>
            Save
          </Button>
        </Link>
      </Box>
    </div>
  )
}

export default AddTaskCard
