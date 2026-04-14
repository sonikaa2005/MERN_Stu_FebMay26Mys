// Validation and Schema constraints

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: { type: Number, min: 18 },
    role: {
        type: String,
        enum: ["admin", "user", "manager"]
    },
    email: {
        type: String, // \. it diffrentiate domain name and exension(.com | .org | .edu.in | .in)
        match: /.+@.+\..+/  //. indicates multiple occurance, + indicates single occurence of the character 
    }
});
const User = mongoose.model("HookValidationUser", userSchema);

async function runValidationDemo() {
    try {
        // const invalidUser = new User({
        //     age: 15,
        //     role: "guest",
        //     email: "notvalidemail"
        // });

        // await invalidUser.validate();

          const validUser = new User({
            name:"ansh",
            age:19,
            role:"admin",
            email:"a@a.com"
        });
        await validUser.validate();
    }

    
    catch (error) {
        console.log("Validation errors found:");

        for (const fieldName in error.errors) {
            console.log(fieldName + ":", error.errors[fieldName].message);
        }
    }
}

runValidationDemo();