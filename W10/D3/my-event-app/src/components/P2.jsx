// React Event object
/**What is it?
 * > React automatically passes an event object to event handlers
 * this object contains details about the event
 * eg: input field: event.target.value(it gives details of user to the application field)
 * event: info about the input change
 * event.target: the HTML input element
 * event.target.value: the current text typed by the user*/

import { useState } from "react";

export function EventObject(){
    const [mytext,setmyText] = useState('');
    const handleChange = (event) => {
        const currentValue = event.target.value;
        console.log(currentValue);
        setmyText(currentValue);
    };
    return(
        <section>
            <h2>Event object</h2>
            <input type="text" value={mytext}
            onChange={handleChange}
            placeholder="Type something"
            />
            <p>You typed: {mytext}</p>
        </section>
    )
}