import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {expect} from "chai";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

// action types
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

// actions
export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function toggleTodo(index) {
    return {type: TOGGLE_TODO, index}
}

// reducer
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}


it('can add todo', () => {
    const result = todos([], addTodo("new todo"))
    console.log(result);
    expect(result).to.deep.equal([
        {
            text: "new todo",
            completed: false
        }
    ])
});

it('can toggle todo', () => {
    const result = todos([], toggleTodo(0));
    console.log(result);
    expect(result).to.deep.equal([
        {
            text: "new todo",
            completed: false
        }
    ])
});
