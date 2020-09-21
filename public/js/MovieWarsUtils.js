    //* EASY Approach : without debounce //
    // let timeoutID;
    // const onInput = (event) => {
    //     if(timeoutID){
    //         clearInterval(timeoutID)
    //     }
    //     timeoutID = setTimeout(()=>{
    //         fetchData(event.target.value)
    //     }, 500)
    // }

    // input.addEventListener("input", inputEvent)

//* DEBOUNCE function = if we want to limit frequency of calling of a function //
const debounce = (func, delay=1000) => {
    let timeoutID
    return (...args) => {
        if(timeoutID){
            clearInterval(timeoutID)
        }
        timeoutID = setTimeout(()=>{
            func.apply(null, args)      //? .apply() ??
        }, delay)
    }
}