// useEffect LifeCycle
/** No array : every render
 * [] -> once
 * [sate] --> on mount + when state changes
 */
import { useEffect, useState } from "react";

export function UseEffectLifeCycle() {
    const [count, setCount] = useState(0);
    //1. No dependency array
    useEffect(() => {
        console.log("Effect 1: runs after every render");
    });

    // 2.Empty dependency array
    //this runs only after the component mounts.
    useEffect(()=>{
        console.log("Effect 2: runs only once after mount")
    },[]);

    //3. Dependency based effect
    useEffect(()=>{
        console.log("Effect 3: count changed to",count);

        return()=>{
            console.log("cleanup for effect 3: Previous count: ",count);
        };
    },[count]);

    // Event handler
    function handleIncrement(){
        setCount((prevCount)=>prevCount+1);
    }
    function handleReset(){
        setCount(0);
    }
    return(
        <section>
            <h2>useEffect Lifecycle</h2>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleReset}>Reset</button>
        </section>
    );
}