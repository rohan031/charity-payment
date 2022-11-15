const selectElement = (identifier) => {
    return document.querySelector(identifier)
}

const toggleSwitch = selectElement("#toggle");
const label = selectElement(".label");
const wrapper = selectElement(".wrapper");

label.innerHTML = '<i class="fa-solid fa-bars"></i>';

toggleSwitch.addEventListener("change", (e) => {
    if(e.target.checked) {
        label.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        wrapper.classList.add("open");


        // nav menu mobile animation
        gsap.from(".nav-animate-items", {
            x: 500, 
            opacity: 0,
            stagger: 0.1,   
            duration: 0.8,
            ease: "power4.out"
        });
        return;
    }

    wrapper.classList.remove("open");
    label.innerHTML = '<i class="fa-solid fa-bars"></i>';
});