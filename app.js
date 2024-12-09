// Mock Data Storage
const reviews = []; // Stores all reviews
const adminReviews = []; // Stores reviews pending admin approval

// DOM Elements
const feedbackForm = document.getElementById("feedback");
const reviewList = document.getElementById("review-list");
const adminReviewList = document.getElementById("admin-reviews");
const averageRatingDisplay = document.getElementById("average-rating");

// Event Listener for Form Submission
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get user input
    const rating = parseInt(document.getElementById("rating").value, 10);
    const comment = document.getElementById("comment").value;

    // Create review object
    const review = {
        id: Date.now(),
        rating,
        comment,
        approved: false,
    };

    // Add review to admin list
    adminReviews.push(review);
    alert("Your feedback has been submitted for review!");
    feedbackForm.reset();

    renderAdminReviews();
});

// Function to Render Approved Reviews
function renderReviews() {
    reviewList.innerHTML = "";

    if (reviews.length === 0) {
        reviewList.innerHTML = "<p>No reviews yet.</p>";
        averageRatingDisplay.textContent = "0";
        return;
    }

    let totalRating = 0;

    reviews.forEach((review) => {
        totalRating += review.rating;

        const reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");

        reviewDiv.innerHTML = `
            <p><strong>Rating:</strong> ${review.rating}/5</p>
            <p><strong>Comment:</strong> ${review.comment}</p>
        `;

        reviewList.appendChild(reviewDiv);
    });

    const averageRating = (totalRating / reviews.length).toFixed(2);
    averageRatingDisplay.textContent = averageRating;
}

// Function to Render Admin Reviews
function renderAdminReviews() {
    adminReviewList.innerHTML = "";

    if (adminReviews.length === 0) {
        adminReviewList.innerHTML = "<p>No reviews pending approval.</p>";
        return;
    }

    adminReviews.forEach((review) => {
        const adminReviewDiv = document.createElement("div");
        adminReviewDiv.classList.add("review");

        adminReviewDiv.innerHTML = `
            <p><strong>Rating:</strong> ${review.rating}/5</p>
            <p><strong>Comment:</strong> ${review.comment}</p>
            <div class="admin-controls">
                <button onclick="approveReview(${review.id})">Approve</button>
                <button onclick="deleteReview(${review.id})">Delete</button>
            </div>
        `;

        adminReviewList.appendChild(adminReviewDiv);
    });
}

// Function to Approve a Review
function approveReview(id) {
    const index = adminReviews.findIndex((review) => review.id === id);
    if (index !== -1) {
        const approvedReview = adminReviews.splice(index, 1)[0];
        approvedReview.approved = true;
        reviews.push(approvedReview);
    }

    renderAdminReviews();
    renderReviews();
}

// Function to Delete a Review
function deleteReview(id) {
    const index = adminReviews.findIndex((review) => review.id === id);
    if (index !== -1) {
        adminReviews.splice(index, 1);
    }

    renderAdminReviews();
}

// Initial Render
renderReviews();
renderAdminReviews();
