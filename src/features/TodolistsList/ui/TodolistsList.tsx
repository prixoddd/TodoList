import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"
import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useActions } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"
import { selectTasks } from "features/TodolistsList/model/tasks/tasksSelectors"
import { selectTodolists } from "features/TodolistsList/model/todolists/todolistsSelectors"
import s from "./TodolistsList.module.css"

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const { addTodolist, fetchTodolists } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])

    const addTodolistCallback = useCallback((title: string) => {
        return addTodolist(title).unwrap()
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <Grid container className={s.grid}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <Paper className={s.paper}>
                                <Todolist todolist={tl} tasks={allTodolistTasks} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
