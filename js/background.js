const starContainer = document.getElementById("stars");

if (starContainer) {

    const colors = [
        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#8B5CF6",
        "#A78BFA"
    ];

    for (let i = 0; i < 120; i++) {

        const star = document.createElement("div");
        star.classList.add("star");

        const size = Math.random() * 2 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        star.style.animationDuration =
            `${25 + Math.random() * 40}s`;

        star.style.animationDelay =
            `${-Math.random() * 40}s`;

        star.style.opacity = Math.random() * .7 + .2;

        starContainer.appendChild(star);

    }

}