import react from 'react';
function Welcome(props) { // it is an approach/method that pass data from a parent component to a child component.
    //child component: reusable UI
    return ( 
        <p>Hello,{props.name}</p>
    );
}

export function FunctionalComponentsBasics() { //parent function
    return (
        <div>
            <h2>Functional Components Basics</h2>
            {/* We are passing 'Sonika' as prop, Welcome function receives is as {name:"Sonika"} */}
            <Welcome name="Sonika" />
            {/* We are passing 'Developer' as prop, Welcome function receives is as {name:"Developer"} */}
            <Welcome name="Developer" />
        </div>
    )
}