function renderEducation(){
    const eduContainer = document.getElementById("education-container");

    if(!eduContainer){
        console.log("Education container not found");
        return;
    }

    eduContainer.innerHTML = "";

    educationData.forEach(function(edu){

        // main card (clean + professional)
        const card = document.createElement("div");
        card.className = "flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 mb-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300";

        // LEFT: university / board
        const left = document.createElement("div");
        left.className = "text-sm font-semibold text-gray-500 dark:text-gray-400";
        left.textContent = edu.university;

        // CENTER: degree/title
        const center = document.createElement("div");
        center.className = "flex-1";

        const title = document.createElement("h3");
        title.className = "text-lg font-semibold text-gray-900 dark:text-white";
        title.textContent = edu.title;

        center.appendChild(title);

        // RIGHT: college + score
        const right = document.createElement("div");
        right.className = "text-sm text-gray-600 dark:text-gray-400 text-right";

        const college = document.createElement("p");
        college.textContent = edu.college;

        const score = document.createElement("p");
        score.className = "font-medium";
        score.textContent = edu.score;

        right.appendChild(college);
        right.appendChild(score);

        // append all
        card.appendChild(left);
        card.appendChild(center);
        card.appendChild(right);

        eduContainer.appendChild(card);
    });

    console.log("education rendered successfully");
}