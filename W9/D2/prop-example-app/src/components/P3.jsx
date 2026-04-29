//Container / wrapper component
import { React } from "react";
//Childre is a special React prop
//It holds nested JSX passed between component tags
//It helps create reusable wrapper/layout components
function Container({ children }) { 
    return (
        <div className="card">
            {children}
        </div>
    );
}
// Parent component
export function PropsChildren() {
    return (
        <>
            <Container>
            {/* Conatiner is a name of child component */}
                <h3>First child element in Nested approach</h3>
            </Container>
        </>
    )
}