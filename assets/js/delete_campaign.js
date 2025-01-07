// Delete campaign function
const authToken = localStorage.getItem("authToken");

function deleteCampaign(campaignId) {
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
        });
}