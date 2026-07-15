// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// بيانات مشروعك
const firebaseConfig = {
    apiKey: "AIzaSyDM7UnyYnuGL-zSf6QelhbM3WgcOa0poTo",
    authDomain: "alyosr-furniture.firebaseapp.com",
    projectId: "alyosr-furniture",
    storageBucket: "alyosr-furniture.firebasestorage.app",
    messagingSenderId: "671274875928",
    appId: "1:671274875928:web:b56aa25b9912f892add76d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");
// عرض الآراء
async function loadReviews() {

    reviewsContainer.innerHTML = "";

    const q = query(collection(db, "reviews"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        const stars = "⭐".repeat(data.rating);

        reviewsContainer.innerHTML += `
            <div class="review-card">
                <h3>${data.name}</h3>
                <div class="stars">${stars}</div>
                <p>${data.comment}</p>
            </div>
        `;

    });

}

loadReviews();
// إضافة رأي جديد
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;
    const rating = parseInt(document.getElementById("rating").value);

    try {

        await addDoc(collection(db, "reviews"), {

            name: name,
            comment: comment,
            rating: rating,
            createdAt: Date.now()

        });

        alert("تم إرسال رأيك بنجاح ❤️");

        form.reset();

        loadReviews();

    } catch (error) {

        console.error(error);

        alert("حدث خطأ أثناء إرسال الرأي.");

    }


});
const backHome = document.querySelector(".back-home");
const footer = document.querySelector(".foot");

function updateBackButton() {

    if (!backHome || !footer) return;

    const footerRect = footer.getBoundingClientRect();

    if (footerRect.top < window.innerHeight) {

        backHome.style.position = "absolute";
        backHome.style.top = (window.scrollY + footerRect.top - backHome.offsetHeight - 20) + "px";
        backHome.style.bottom = "auto";

    } else {

        backHome.style.position = "fixed";
        backHome.style.bottom = "20px";
        backHome.style.top = "auto";

    }
}

window.addEventListener("scroll", updateBackButton);
window.addEventListener("resize", updateBackButton);

updateBackButton();
const galleryImages = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });

});

const galleryImages = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

