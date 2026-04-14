// Combinde example of virtual,index,filter,select,sort,lean

const mongoose = require("mongoose");

async function demo() {
    try {
        await mongoose.connect("mongodb://localhost:27017/abcmern");
        console.log("MongoDB connected successfully");

        // const productSchema = new mongoose.Schema({
        //     name:String,
        //     price:Number,
        //     category:String,
        //     stock:Number,
        //     tag:String
        // });

        const userSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: { type: String, index: true },
            username: { type: String, unique: true },
            role: String,
            createdAt: Date,
            tag: String
        },
            {
                toJSON: { virtuals: true },
                toObject: { virtuals: true }
            }
        );

        //compound index
        // Query filter by role and sort by createdAt
        userSchema.index({ role: 1, createdAt: -1 });

        //A virtual field is not stored on MongoDB
        //It is computed dynamically from existing stored fields
        userSchema.virtual("fullname").get(function () {
            return this.firstName + " " + this.lastName;
        });

        const User = mongoose.models.PerformenceUser || mongoose.model("PerformenceUser", userSchema);

        await User.deleteMany({ tag: "demo-example" });

        await User.create([
            {
                firstName: "Sonika",
                lastName: "K",
                email: "s@s.com",
                username: "sonu2005",
                role: "user",
                createdAt: new Date("2026-04-11"),
                tag: "demo-example"
            },
            {
                firstName: "Anu",
                lastName: "Saara",
                email: "a@s.com",
                username: "saara123",
                role: "user",
                createdAt: new Date("2026-04-09"),
                tag: "demo-example"
            },
            {
                firstName: "Megha",
                lastName: "syama",
                email: "m@s.com",
                username: "ms890",
                role: "user",
                createdAt: new Date("2026-04-01"),
                tag: "demo-example"
            }
        ]);

        //filter,select,sort,lean
        const users = await User.find({tag: "demo-example"})
                        .select("firstName lastName email role createdAt")
                        .sort({createdAt:-1})
                        .limit(2)
                        .lean();
        console.log("Optimized user query result: ",users);

        const oneUser = await User.findOne({ email: "s@s.com", tag: "demo-example"});
        console.log("Virtual fullname: ",oneUser.fullname);

        await mongoose.connection.close();
        console.log("connection closed");
    }
    catch(error){
        console.log("Demo error",error.message);
    }
}
demo();