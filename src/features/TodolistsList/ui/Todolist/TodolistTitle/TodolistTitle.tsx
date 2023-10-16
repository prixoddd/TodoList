import React, { useCallback } from "react"
import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"

type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: Props) => {
    const { id, entityStatus, title } = todolist
    const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            changeTodolistTitle({ title, id })
        },
        [id],
    )

    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete />
            </IconButton>
        </h3>
    )
}
