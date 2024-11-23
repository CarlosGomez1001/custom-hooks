import { useEffect, useReducer } from "react";
import { todoReducer } from "./todo.Reducer";




export const useTodos = (  ) => {

    const initialState = [];
    
    const init = () => {
        return JSON.parse( localStorage.getItem('todos')) || [];
    }
    
    const [ todos, dispatch ] = useReducer(todoReducer, initialState, init);    
    
    let todosCount = todos.length;
    let pendingTodosCount = todos.filter( todo => !todo.done ).length;

    useEffect(() => {
      
        localStorage.setItem('todos', JSON.stringify( todos ) );

    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        
        const action = { 
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo = ( id ) => {

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }


    return {
        todos,
        todosCount, 
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }

}