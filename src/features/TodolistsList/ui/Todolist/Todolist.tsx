import React, { memo, useCallback, useEffect } from "react"
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice"
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice"
import { useActions } from "common/hooks"
import { AddItemForm } from "common/components"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks"
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle"
import s from "./Todolist.module.css"

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist = memo(function ({ todolist, tasks }: Props) {
    const { id, entityStatus } = todolist
    const { fetchTasks, addTask } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(id)
    }, [])

    const addTaskCallback = useCallback(
        (title: string) => {
            return addTask({ title, todolistId: id }).unwrap()
        },
        [id],
    )

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={entityStatus === "loading"} />
            <Tasks todolist={todolist} tasks={tasks} />
            <div className={s.divButtons}>
                <FilterTasksButtons todolist={todolist} />
            </div>
        </div>
    )
})
