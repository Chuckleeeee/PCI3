// Automatically update the copyright year
document.getElementById("year").textContent = new Date().getFullYear();


// Small reveal animation when the page loads
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
