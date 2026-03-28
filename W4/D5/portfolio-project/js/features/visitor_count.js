function updateVisitorCount(){
    let count = localStorage.getItem("visits");

    if(!count){
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }

    localStorage.setItem("visits", count);

    const display = document.getElementById("visitor-count");
    if(display){
        display.textContent = "👁 Visitors: " + count;
    }
}