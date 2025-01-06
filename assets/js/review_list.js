document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const apiUrl = `https://vaccination-management-system-backend.vercel.app/api/campaign/${campaignId}/reviews/`;

    reviewsContainer.innerHTML = '<p class="text-muted">Loading reviews...</p>'
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                reviewsContainer.innerHTML = '<p class="text-muted">No reviews available for this campaign.</p>';
                return;
            }

            reviewsContainer.innerHTML = "";
            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('border-bottom', 'pb-2');

                reviewElement.innerHTML = `
                    <h6><strong>${review.patient_full_name}</strong> <small class="text-muted">- ${new Date(review.created_at).toLocaleString()}</small></h6>
                    <p class="text-muted">${review.review_text}</p>
                `;

                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error(error);
            reviewsContainer.innerHTML = '<p class="text-danger">Failed to load reviews. Please try again later.</p>';
        });
});
