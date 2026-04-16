// Timestamp and Advanced queries

const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/datedb'); // connection string | base URLto coonect the server
        console.log("Connnected to MongoDB");
        const demoSchema = new mongoose.Schema(
            {
                name: String,
            },
            {
                timestamps: true
            }
        );
        const Model = mongoose.model('LogTime', demoSchema);
        // await Model.deleteMany();

        // await Model.create([
        //     { name: "gowri" },
        //     { name: "lakshmi" },
        //     { name: "saraswathi" }
        // ]);

        const recent = await Model.find({
            createdAt:{
                $gte: new Date(Date.now()-1500000)
            }
        }).sort({createdAt:-1});


        console.log("Recent:",recent);
    }
    catch (err) {
        console.error("Error:", err.message);
    }
     finally {
            await mongoose.disconnect();
            console.log("Db disconnected");
     }
}
main();

