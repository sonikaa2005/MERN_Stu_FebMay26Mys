//Prop validation
import propTypes from "prop-types"
function Profile({name,age}){
    return(
        <div className="card">
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}
Profile.propTypes = {
    name:propTypes.string.isRequired,
    age:propTypes.number.isRequired
};
export function PropTypesDemo(){
    return(
        <>
        <Profile name="Sonika" age={21} />
        </>
    )
}