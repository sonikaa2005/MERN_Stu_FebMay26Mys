const user = require('./user');
const emitter = require('./events');

function withdraw(courseId){
    if(!user.enrolledCourses[courseId]){
        return "Not enrolled";
    }

    const title = user.enrolledCourses[courseId].title;

    delete user.enrolledCourses[courseId];

    emitter.emit("courseWithdrawn",title);

    return"Withdrawn successfully";
}

module.exports = withdraw;