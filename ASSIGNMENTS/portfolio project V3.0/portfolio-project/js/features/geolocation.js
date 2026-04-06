function initGeolocation() {
    const text = document.getElementById("location-text");

    // Check if geolocation is supported
    if (!navigator.geolocation) {
        text.textContent = "Geolocation not supported.";
        return;
    }

    // Get user location
    navigator.geolocation.getCurrentPosition(
        function (position) {

            // Extract latitude & longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Optional: Fetch location name
            fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat="
                + latitude + "&lon=" + longitude)

                .then(function (response) {
                    return response.json();
                })

                .then(function (data) {
                    let city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        "";

                    let state = data.address.state || "";

                    if (city && state) {
                        text.textContent =
                            "You are browsing from " + city + ", " + state;
                    } else if (state) {
                        text.textContent =
                            "You are browsing from " + state;
                    } else {
                        text.textContent =
                            "You are browsing from your location";
                    }
                })

                .catch(function () {
                    text.textContent = "Unable to fetch location.";
                });
        },

        // Error handling
        function (error) {
            if (error.code === 1) {
                text.textContent = "Permission denied.";
            } else if (error.code === 2) {
                text.textContent = "Location unavailable.";
            } else if (error.code === 3) {
                text.textContent = "Request timeout.";
            } else {
                text.textContent = "An error occurred.";
            }
        }
    );
}