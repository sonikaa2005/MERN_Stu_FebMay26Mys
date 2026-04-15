// Date fundamentals

const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/embrel');
        console.log("Connnected to MongoDB");
        const schema = new mongoose.Schema({
            name: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        });
        const Model = mongoose.model('DateFund', schema);
        await Model.deleteMany();

        const doc = await Model.create({
            name: "Test"
        });
        console.log("Document:", doc);
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