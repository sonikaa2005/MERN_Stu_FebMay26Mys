/**Introducion to buffers in NodeJs
 * A buffer stores raw bytes
 * Here we create buffer directly from a string*/

const textBuffer = Buffer.from("Anitha");

//The value in the buffer is the encoded form of the text
console.log("Buffer object:",textBuffer);
console.log("Buffer length in bytes:",textBuffer.length);
console.log("Byte at index 0",textBuffer[0]);
console.log("Byte at index 1",textBuffer[1]);


/**Each character is stored internally as byte data
 * For standard ASCII letters there will be a equivalent code
 * Buffer stores numeric value between 0 to 255
*/
