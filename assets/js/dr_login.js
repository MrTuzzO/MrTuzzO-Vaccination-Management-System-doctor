if (localStorage.getItem('authToken')) {
    window.location.href = 'index.html';
}

document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader

    const usernameOrEmail = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameOrEmail,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('authToken', data.key);

            // Fetch user profile data after successful login
            const profileResponse = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${data.key}`,
                },
            });

            const profileData = await profileResponse.json();

            if (profileResponse.ok) {
                const userInfo = profileData.user.user; // Extract the nested user info
                const profileInfo = profileData.user;


                if (userInfo.user_type !== 'doctor') {
                    showAlert('You are not authorized to access this page.', 'warning');
                    localStorage.removeItem('authToken');
                    localStorage.clear();
                    return;
                }

                // localStorage.setItem('userId', userInfo.id);
                // localStorage.setItem('drId', profileInfo.id);
                localStorage.setItem('username', userInfo.username);
                localStorage.setItem('userType', userInfo.user_type);

                // alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                showAlert('Failed to retrieve user profile. Please try again.');
            }
        } else {
            showAlert(`Login failed: ${data.detail || 'Please check your credentials.'}`, "warning");
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        showAlert('An unexpected error occurred. Please try again later.');
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }
});
