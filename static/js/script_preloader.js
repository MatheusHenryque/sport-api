document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none"; 
        }, 500); 
    }, 500); 
});
