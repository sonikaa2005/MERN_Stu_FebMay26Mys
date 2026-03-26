//Allocating buffers

const emptyBuffer = Buffer.alloc(8);
console.log("Contents of emptyBuffer: ",emptyBuffer);
console.log("Allocated buffer bytes:",[...emptyBuffer]);

const textBuffer = Buffer.from([65,66,67]);
console.log("Buffer from Byte array:",textBuffer);

//Buffer.write() writes text into the buffer

const buffer = Buffer.alloc(20);
const bytesWritten = buffer.write("HelloWorld");//from
console.log("Bytes written: ",bytesWritten);

//Subarray
const firstSlice = buffer.subarray(3,6);
console.log("First slice as bytes: ",[...firstSlice]);

//decode the bytes into text: toString()
console.log("Decode firstslice of buffer:",firstSlice.toString("utf-8"));//firstSlice.subarray/ Buffer.subarray.toString