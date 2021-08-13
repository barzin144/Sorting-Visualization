import { Button, Slider, Typography, Grid, Box } from '@material-ui/core';
import React from 'react';
import { Action } from '../interfaces/action';
import { State } from '../interfaces/bubbleSort/bubbleSortInterface';
import { Item } from '../interfaces/item';
import { Props } from '../interfaces/props';

const init = (initArray: Item[]) => {
    return { array: initArray, iteration: 0, sorted: 0, started: false, speed: 50, arrayCount: 30 } as State;
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setArray': {
            return { ...state, array: action.payload.array, iteration: 0, sorted: 0 };
        }
        case 'setArrayCount': {
            return { ...state, array: action.payload.array, arrayCount: action.payload.arrayCount, iteration: 0, sorted: 0 };
        }
        case 'setSpeed': {
            return { ...state, speed: action.payload };
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
            if (!!globalInterval.current) {
                clearTimeout(globalInterval.current);
            }
            globalInterval.current = setTimeout(sort, 150 - state.speed);
        }
    }, [state.iteration, state.started, state.speed]);

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

        if (sorted + 1 === array.length) {
            pause();
        }
    }

    const generateRandomArray = () => {
        dispatch({ type: "setArray", payload: { array: Array.from({ length: state.arrayCount }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" })) } });
    }

    const changeArray = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        const arrayCount: number = typeof (value) === 'number' ? value : value[0];
        dispatch({ type: "setArrayCount", payload: { array: Array.from({ length: arrayCount }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" })), arrayCount: arrayCount } });
    }

    const changeSpeed = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        dispatch({ type: 'setSpeed', payload: value });

    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                    <Box component="div" mb={1}>
                        <Button variant="contained" size="small" color="primary" disabled={state.started} onClick={generateRandomArray}>Random Array</Button>
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Box component="div" mb={1}>
                        {!state.started && <Button size="small" variant="contained" onClick={start}>Start</Button>}
                        {state.started && <Button size="small" variant="contained" onClick={pause}>Pause</Button>}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box component="div" mb={1}>
                        <Typography>
                            Speed
                        </Typography>
                        <Slider
                            defaultValue={50}
                            onChangeCommitted={changeSpeed}
                            min={10}
                            max={100}
                            valueLabelDisplay="auto"
                            step={10}
                            marks />
                    </Box>
                    <Box component="div" mb={1}>
                        <Typography>
                            Array
                        </Typography>
                        <Slider
                            defaultValue={30}
                            onChangeCommitted={changeArray}
                            min={10}
                            max={100}
                            valueLabelDisplay="auto"
                            step={10}
                            marks />
                    </Box>
                </Grid>
            </Grid>
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