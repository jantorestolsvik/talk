import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

// action types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

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
            ];
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            });
        default:
            return state
    }
}


it('can add todo', () => {
    const result = todos([], addTodo("new todo"));
    expect(result).to.deep.equal([
        {
            text: "new todo",
            completed: false
        }
    ])
});

it('can toggle todo', () => {
    const result = todos([
        {
            text: "new todo",
            completed: false
        }
    ], toggleTodo(0));
    expect(result).to.deep.equal([
        {
            text: "new todo",
            completed: true
        }
    ])
});

it('renders todos', () => {
    const todos = shallow(<TodoList todos={ [
        {
            text: "new todo",
            completed: false
        }
    ]}/>);
    console.log(todos.debug());
    expect(todos.containsMatchingElement(<Todo text="new todo" completed={false}/>)).to.equal(true);
});

it('invokes callback on click', () => {
    const onButtonClick = sinon.spy();
    const todos = shallow(<Todo text="test" completed={false} onClick={onButtonClick}/>);
    todos.find('li').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
});