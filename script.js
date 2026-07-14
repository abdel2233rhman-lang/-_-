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
