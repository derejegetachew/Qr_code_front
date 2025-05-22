const initstate={
    dark: false
}

// Action/Dispatch
export const darkModeAction = (value) => {
    if (value) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }
    return {type: 'DARKMODE', value}
}

// Mutations/Reducer
const Mode = (state = initstate,action) =>{
    switch (action.type) {
        case 'DARKMODE':
            return Object.assign({}, state, {
                dark: action.value
            })
        default:
            return state
    }
}

// Selectores
export const getDarkMode = (state) => state.mode.dark;

export default Mode