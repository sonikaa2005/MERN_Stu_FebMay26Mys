// Role-Based Resolver Using switch+Function

const getRoute = function(role, isLoggedIn) {

    if (!isLoggedIn) {
        return "/login";
    }

    switch(role) {
        case "admin":
            return "/admin";

        case "student":
            return "/student";

        case "college":
            return "/college";

        case "proctor":
            return "/proctor";

        default:
            return "/denied";
    }
};


// Test
console.log(getRoute("admin", true));
console.log(getRoute("student", true));
console.log(getRoute("college", true));
console.log(getRoute("proctor", true));
console.log(getRoute("guest", true));
console.log(getRoute("admin", false));