document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://vaccination-management-system-backend.vercel.app/api/campaign/doctor/campaign-list/";
    const authToken = localStorage.getItem("authToken");
    const cardHolder = document.querySelector(".card-holder");

    if (!authToken) {
        alert("You are not logged in. Please log in to view campaigns.");
        return;
    }

    // Fetch campaigns
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": `Token ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            cardHolder.innerHTML = ""; // Clear any existing cards
            if (data.length === 0) {
                cardHolder.innerHTML = "<p class='text-muted'>No campaigns found.</p>";
                return;
            }

            data.forEach(campaign => {
                const cardHTML = `
                    <div class="col-md-6">
                        <div class="card mb-4 rounded shadow border-0 vc_card">
                            <div class="card-header bg-primary text-white text-center fs-5 fw-bold">
                                <i class="fas fa-syringe me-2"></i>${campaign.campaign_name}
                            </div>
                            <div class="card-body p-4">
                                <h5 class="card-title text-secondary fw-semibold">${campaign.vaccine_type}</h5>
                                <p class="card-text text-muted">
                                    <strong>Description:</strong> ${campaign.description}<br>
                                    <strong><i class="fas fa-calendar-day me-2"></i>Start Date:</strong> ${campaign.start_date}<br>
                                    <strong><i class="fas fa-calendar-times me-2"></i>End Date:</strong> ${campaign.end_date}<br>
                                    <strong><i class="fas fa-pills me-2"></i>Doses:</strong> ${campaign.vaccine_doses} (Interval: ${campaign.dose_interval} days)<br>
                                    <strong><i class="fas fa-capsules me-2"></i>Available Vaccines:</strong> ${campaign.available_vaccines}
                                </p>
                                <div class="d-flex flex-wrap gap-2">
                                    <a href="campaign_detail.html?id=${campaign.id}" class="btn btn-primary px-4 mb-2">
                                        <i class="fas fa-calendar-check me-2"></i>Campaign Details
                                    </a>
                                    <a href="edit_campaign.html?id=${campaign.id}" class="btn btn-warning px-4 mb-2 edit-btn">
                                        <i class="fas fa-edit me-2"></i>Edit
                                    </a>
                                    <button class="btn btn-danger px-4 mb-2 delete-btn" data-id="${campaign.id}">
                                        <i class="fas fa-trash-alt me-2"></i>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cardHolder.innerHTML += cardHTML;
            });

            // Add delete functionality
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const campaignId = this.getAttribute("data-id");
                    if (confirm("Are you sure you want to delete this campaign?")) {
                        deleteCampaign(campaignId);
                    }
                });
            });
        })
        .catch(error => {
            console.error("Error fetching campaigns:", error);
            cardHolder.innerHTML = "<p class='text-danger'>Failed to load campaigns. Please try again later.</p>";
        });


    // Delete campaign function
    function deleteCampaign(campaignId) {

        const loader = document.getElementById('loader');
        loader.classList.remove('d-none'); // Show loader

        fetch(`https://vaccination-management-system-backend.vercel.app/api/campaign/${campaignId}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${authToken}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 204) {
                    alert("Campaign deleted successfully.");
                    location.reload(); // Reload to reflect changes
                } else {
                    alert("Failed to delete campaign. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error deleting campaign:", error);
                alert("An error occurred. Please try again.");
            })
            .finally(() => {
                loader.classList.add("d-none"); // Hide loader
            });
    }
});
