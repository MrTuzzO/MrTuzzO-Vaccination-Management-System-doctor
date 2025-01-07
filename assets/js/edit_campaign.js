document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken'); // Fetch token from localStorage
    const campaignId = new URLSearchParams(window.location.search).get('id');
    const apiUrl = `https://vaccination-management-system-backend.vercel.app/api/campaign/${campaignId}/`;

    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader

    if (!token) {
        showAlert('You must be logged in to edit a campaign.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    try {
        // Fetch campaign details
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            // Populate form with fetched data
            document.getElementById('campaign_name').value = data.campaign_name;
            document.getElementById('description').value = data.description;
            document.getElementById('start_date').value = data.start_date;
            document.getElementById('end_date').value = data.end_date;
            document.getElementById('vaccine_type').value = data.vaccine_type;
            document.getElementById('vaccine_doses').value = data.vaccine_doses;
            document.getElementById('dose_interval').value = data.dose_interval;
            document.getElementById('available_vaccines').value = data.available_vaccines;
        } else {
            const errorData = await response.json();
            showAlert(`Failed to load campaign: ${errorData.detail || 'Unknown error occurred.'}`);
            window.location.href = 'dashboard.html'; // Redirect if the campaign is inaccessible
        }
    } catch (error) {
        console.error('Error fetching campaign details:', error);
        showAlert('An error occurred while fetching the campaign details.');
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }

    // Submit edited campaign details
    const form = document.getElementById('campaignForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const updatedData = {
            campaign_name: document.getElementById('campaign_name').value,
            description: document.getElementById('description').value,
            start_date: document.getElementById('start_date').value,
            end_date: document.getElementById('end_date').value,
            vaccine_type: document.getElementById('vaccine_type').value,
            vaccine_doses: parseInt(document.getElementById('vaccine_doses').value, 10),
            dose_interval: parseInt(document.getElementById('dose_interval').value, 10),
            available_vaccines: parseInt(document.getElementById('available_vaccines').value, 10),
        };

        loader.classList.remove('d-none'); // Show loader during submission

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                // showAlert('Campaign updated successfully.');
                window.location.href = `campaign_detail.html?id=${campaignId}`;
            } else {
                const errorData = await response.json();
                showAlert(`Failed to update campaign: ${errorData.detail || 'Unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Error updating campaign:', error);
            showAlert('An error occurred while updating the campaign.');
        } finally {
            loader.classList.add('d-none'); // Hide loader
        }
    });
});

