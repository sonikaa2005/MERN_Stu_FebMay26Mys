function displayCourses(courses)
{
    courses.forEach(c =>{
        console.log(`${c.id}. ${c.title} (${c.level})`);
    });
}

module.exports={
    displayCourses
};