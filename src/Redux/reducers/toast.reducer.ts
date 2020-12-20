const initialState = {
    enqueue: ['Pepperoni']
}

export default function toastReducer(state = initialState, action) {
    switch (action.type) {

        case 'ADD_TOAST_TO_ENQUEUE':
            const enqueue = state.enqueue
            enqueue.push(action.payload)

            return {...state, enqueue}

        case 'REMOVE_TOAST_FROM_ENQUEUE':
            const newEnqueue = state.enqueue.filter(x=> x != action.payload)

            return {...state, enqueue: newEnqueue}
    }

    return state
}
