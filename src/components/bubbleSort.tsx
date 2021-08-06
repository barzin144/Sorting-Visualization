import React from 'react';
import { Action } from '../interfaces/action';
import { State } from '../interfaces/bubbleSort/bubbleSortInterface';
import { Item } from '../interfaces/item';
import { Props } from '../interfaces/props';

const init = (initArray: Item[]) => {
    return { array: initArray, iteration: 0, sorted: 0, started: false } as State;
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setArray': {
            return { ...state, array: action.payload.array, iteration: 0, sorted: 0 };
        }
        case 'swapeItems': {
            const array = [...state.array];
            if (array[action.payload.firstIndex].value > array[action.payload.secondIndex].value) {
                [array[action.payload.firstIndex].value, array[action.payload.secondIndex].value] = [array[action.payload.secondIndex].value, array[action.payload.firstIndex].value];
            }
            return { ...state, array: array };
        }

        case 'setArrayStatusCompare': {
            const array = [...state.array];
            array[action.payload.firstIndex].status = "compare";
            array[action.payload.secondIndex].status = "compare";
            return { ...state, array: array };
        }

        case 'setArrayStatusUnsorted': {
            const array = [...state.array];
            array[action.payload.firstIndex].status = "unsorted";
            array[action.payload.secondIndex].status = "unsorted";
            return { ...state, array: array };
        }

        case 'setStart':
            return { ...state, started: action.payload };

        case 'setIteration':
            return { ...state, iteration: action.payload };

        case 'setIterationAndSorted':
            const array = [...state.array];
            array[action.payload.sortedIndex].status = "sorted";
            return { ...state, array: array, iteration: action.payload.iteration, sorted: action.payload.sorted };

        default:
            return state;
    }
}
const BubbleSort = (props: Props) => {
    const globalInterval = React.useRef<NodeJS.Timeout>();
    const [state, dispatch] = React.useReducer(reducer, init(props.items));

    React.useEffect(() => {
        if (state.started) {
            globalInterval.current = setTimeout(sort, 100);
        }
    }, [state.iteration, state.started]);

    React.useEffect(() => {
        dispatch({ type: 'setArray', payload: { array: props.items } });

    }, [props.items]);

    const start = () => {
        dispatch({ type: 'setStart', payload: true });
    }

    const pause = () => {
        dispatch({ type: 'setStart', payload: false });

        if (!!globalInterval.current) {
            clearTimeout(globalInterval.current);
        }
    }

    const sort = () => {
        const { iteration, sorted, array } = state;

        dispatch({ type: 'setArrayStatusUnsorted', payload: { firstIndex: iteration === 0 ? 0 : iteration - 1, secondIndex: iteration } });

        if (iteration < array.length - sorted - 1) {
            const k = iteration + 1;

            dispatch({ type: 'setArrayStatusCompare', payload: { firstIndex: iteration, secondIndex: k } });

            if (array[iteration].value > array[k].value) {
                dispatch({ type: 'swapeItems', payload: { firstIndex: iteration, secondIndex: k } });

            }
            dispatch({ type: 'setIteration', payload: iteration + 1 });
        }
        else {
            dispatch({ type: 'setIterationAndSorted', payload: { iteration: 0, sorted: sorted + 1, sortedIndex: iteration } });
        }
    }
    const generateRandomArray = () => {
        dispatch({ type: "setArray", payload: { array: Array.from({ length: 30 }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" })) } });
    }
    return (
        <>
            <section className="header">
                <button className="btn btn-primary btn-sm" disabled={state.started} onClick={generateRandomArray}>Generate Random Array</button>
                {!state.started && <button className="btn btn-secondary btn-sm" onClick={start}>Start</button>}
                {state.started && <button className="btn btn-secondary btn-sm" onClick={pause}>Pause</button>}
            </section>
            <section className="chartContainer">
                {
                    state.array.map((item, index) => {
                        return (<div className={`pipe ${item.status}`} key={index} style={{ height: item.value + 'px' }}></div>);
                    })
                }
            </section>
        </>
    );
}

export default BubbleSort;