document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://vaccination-management-system-backend.vercel.app/api/campaign/";
    const campaignContainer = document.getElementById("campaignContainer");

    // Display loading text
    campaignContainer.innerHTML = "<p class='text-primary'>Loading campaigns, please wait...</p>";

    // Fetch campaign data
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            campaignContainer.innerHTML = "";
            data.forEach((campaign) => {
                const campaignCard = `
                    <div class="col-md-6">
                        <div class="card mb-4 rounded shadow border-0 vc_card">
                            <div class="card-header bg-primary text-white text-center fs-5 fw-bold">
                                <i class="fas fa-syringe me-2"></i>${campaign.campaign_name}
                            </div>
                            <div class="card-body p-4">
                                <h5 class="card-title text-secondary fw-semibold">${campaign.vaccine_type}</h5>
                                <p class="card-text text-muted">
                                    <strong>Description:</strong> ${campaign.description}<br>
                                    <strong class="mt-3"><i class="fas fa-calendar-day me-2"></i>Start Date:</strong> ${campaign.start_date}<br>
                                    <strong><i class="fas fa-calendar-times me-2"></i>End Date:</strong> ${campaign.end_date}<br>
                                    <strong><i class="fas fa-pills me-2"></i>Doses:</strong> ${campaign.vaccine_doses} (Interval: ${campaign.dose_interval} days)<br>
                                    <strong><i class="fas fa-capsules me-2"></i>Available Vaccines:</strong> ${campaign.available_vaccines}
                                </p>
                                <a href="campaign_detail.html?id=${campaign.id}" class="btn btn-primary px-4">
                                    <i class="fas fa-calendar-check me-2"></i>Booking Details
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                campaignContainer.innerHTML += campaignCard;
            });
        })
        .catch((error) => {
            console.error("Error fetching campaigns:", error);
            campaignContainer.innerHTML = "<p class='text-danger'>Failed to load campaigns. Please try again later.</p>";
        });
});