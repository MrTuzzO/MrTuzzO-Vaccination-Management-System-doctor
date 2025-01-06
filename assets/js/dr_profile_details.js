// with api call---------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken'); // Fetch token from localStorage
    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader


    if (!token) {
        showAlert('You must be logged in to view your profile.');
        window.location.href = 'dr_login.html'; // Redirect to login page
        return;
    }

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.user.user;
            const userInfo = data.user

            // Populate the profile section
            document.getElementById('full-name').textContent = `${user.first_name} ${user.last_name}`;
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email || 'N/A';
            document.getElementById('contact_number').textContent = userInfo.contact_number || 'N/A'; // Replace with dynamic age if available
            document.getElementById('hospital_name').textContent = userInfo.hospital_name || 'N/A'; // Replace with dynamic age if available
            document.getElementById('speciality').textContent = userInfo.speciality || 'N/A';

        } else {
            const errorData = await response.json();
            showAlert(`Failed to load profile: ${errorData.detail || 'Unknown error occurred.'}`);
            localStorage.clear();
            window.location.href = 'login.html'; // Redirect to login if unauthorized
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        showAlert('An error occurred while fetching the profile data.');
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }
});
