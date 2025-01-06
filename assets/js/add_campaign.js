document.getElementById("campaignForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the token from localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("You are not logged in. Please log in to submit the form.");
        return;
    }

    // Get form data
    const formData = {
        campaign_name: document.getElementById("campaign_name").value,
        description: document.getElementById("description").value,
        start_date: document.getElementById("start_date").value,
        end_date: document.getElementById("end_date").value,
        vaccine_type: document.getElementById("vaccine_type").value,
        vaccine_doses: document.getElementById("vaccine_doses").value,
        dose_interval: document.getElementById("dose_interval").value,
        available_vaccines: document.getElementById("available_vaccines").value
    };

    // API endpoint
    const apiUrl = "https://vaccination-management-system-backend.vercel.app/api/campaign/";

    // Make the API request
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${authToken}` // Include the token here
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Campaign created successfully!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error creating campaign.");
    });
});
