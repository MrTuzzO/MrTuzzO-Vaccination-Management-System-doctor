document.getElementById("campaignForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const loader = document.getElementById("loader");
    loader.classList.remove("d-none"); // Show loader

    // Get the token from localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("You are not logged in. Please log in to submit the form.");
        loader.classList.add("d-none"); // Hide loader
        return;
    }

    // Get form data
    const formData = {
        campaign_name: document.getElementById("campaign_name").value,
        description: document.getElementById("description").value,
        start_date: document.getElementById("start_date").value,
        end_date: document.getElementById("end_date").value,
        vaccine_type: document.getElementById("vaccine_type").value,
        vaccine_doses: parseInt(document.getElementById("vaccine_doses").value, 10),
        dose_interval: parseInt(document.getElementById("dose_interval").value, 10),
        available_vaccines: parseInt(document.getElementById("available_vaccines").value, 10)
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
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to create campaign");
            }
            return response.json();
        })
        .then(data => {
            alert("Campaign created successfully!");
            window.location.href = `campaign_detail.html?id=${data.id}`; // Redirect to campaign detail page
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error creating campaign.");
        })
        .finally(() => {
            loader.classList.add("d-none"); // Hide loader
        });
});
