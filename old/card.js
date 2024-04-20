const sliderImages = [
    {
        src: "./img/arckezeles.png",
        alt: "arckezeles",
        title: "ARCKEZELÉSEK",
    },
    {
        src: "./img/elektro.jpg",
        alt: "elektrokezelesek",
        title: "ELEKTROKOZMETIKA",
    },
    {
        src: "./img/pilla.jpg",
        alt: "szempilla styling",
        title: "SZEMPILLASTYLING",
    },
    {
        src: "./img/szemoldok.png",
        alt: "szemoldok styling",
        title: "SZEMÖLDÖKSTYLING",
    },
];

class Card {
    constructor(src, alt, title) {
        this.src = src;
        this.alt = alt;
        this.title = title;
    }

    render() {
        return `
      <div class="card">
        <img src="${this.src}" alt="${this.alt}">
        <button>${this.title}</button>
      </div>
    `;
    }
}

class CardSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cardQueue = [];
        sliderImages.forEach(({ src, alt, title }) =>
            this.addCard(src, alt, title)
        );
    }

    connectedCallback() {
        this.render();
        this.slideCards();
    }

    addCard(src, alt, title) {
        const card = new Card(src, alt, title);
        this.cardQueue.push(card);
        this.render();
    }

    removeCard() {
        this.cardQueue.shift();
        this.render();
    }

    slideCards() {
        const container = this.shadowRoot.querySelector(".card-slider");
        const cards = Array.from(container.querySelectorAll(".card"));
        const cardWidth = cards[0].offsetWidth;
        const numCards = cards.length;

        const totalWidth = cardWidth * numCards;
        container.style.width = `${totalWidth}px`; // Set container width to fit all cards

        let currentPosition = 0;
        let animationId = null;

        const animate = () => {
            currentPosition -= 1; // Adjust the scroll speed here
            container.style.transform = `translateX(${currentPosition}px)`;

            if (currentPosition <= -(cardWidth * numCards)) {
                // Shift the cards until the first card is completely out of view
                if (currentPosition <= -(cardWidth * (numCards + 1))) {
                    // Remove the first card from the card queue
                    const removedCard = this.cardQueue.shift();
                    // Add the removed card back to the end of the card queue
                    this.cardQueue.push(removedCard);
                    // Update the card content dynamically
                    cards.forEach((card, index) => {
                        card.innerHTML = this.cardQueue[index].render();
                    });
                    // Reset the current position without transition
                    currentPosition = -(cardWidth * numCards);
                    container.style.transform = `translateX(${currentPosition}px)`;
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Pause animation on hover
        container.addEventListener("mouseenter", () => {
            cancelAnimationFrame(animationId);
        });

        // Resume animation on hover out
        container.addEventListener("mouseleave", () => {
            animate();
        });
    }

    render() {
        let html = `
    <style>
        .card-slider {
          max-width: 100%;
          display: flex;
          overflow-x: scroll;
          margin: 2rem; /* Remove default margin */
          padding: 2rem; /* Remove default padding */
        }

        .card {
          flex: 0 0 auto;
          margin: 0px 20px; /* Adjust spacing between cards here */
          position: relative;

        }

        .card img {
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          width: 300px;
          height: 200px;
          object-fit: cover;
        }
        .card button {
          position: absolute;
          margin-left: auto;
          margin-right: auto;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 50%);
          border: none;
          background-color: var(--clr-brown-400);
          padding: 10px 20px;
          border-radius: 10px;
        }
      </style>
      <div class="card-slider">`;

        this.cardQueue.forEach((card) => {
            html += card.render();
        });

        html += `</div>`;

        this.shadowRoot.innerHTML = html;
    }
}

customElements.define("card-slider", CardSlider);
const cardSlider = document.querySelector("card-slider");

class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<h3>${this.innerText}</h3>`;
        console.log("classes: ", this.classList);
    }
}

customElements.define("todo-item", TodoItem);
