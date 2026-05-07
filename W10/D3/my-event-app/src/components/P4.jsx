//Synthetic event vs Native DOM events
/** Synthetic event:
 * A wrapper created by react around the browser's native event
 * Gives a consistent API across browser
 * works similarly to native DOM events
 * still allows access to the original browser events via event.nativeEvent
 * 
 * Why does React use it
 * To make event handling behave consistently
 * to simplify cross-browser differences
 * To integrate smoothly with React's event system
 * 
 * How synthetic event works:
 * Component renders: A button appears on thescreen,
 *                  > handleCheck is defined but it is not executed
 * 
 * user Clicks the button:
 * >Button creates a native click event
 * >React wraps that native event in a SyntheticEvent
 * >React passes the SyntheticEvent to handleCheck
 * 
 * events refers to the SyntheticEvent
 * event.target gives us the HTML element
 */