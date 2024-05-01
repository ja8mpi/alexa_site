const seasonContainer = document.querySelector(".news-season");
const newsText = document.querySelector(".news-text");
const cardSlider = document.querySelector(".card-slider");
const cardSliderScrollWidth = cardSlider.scrollWidth;
const rightsReserved = document.querySelector(".rights-reserved");
const bookButtons = document.querySelectorAll(".btn-book");
const contactsContainer = document.querySelector(".contacts");

/* Colleague elements*/
const colleagueArrowLeft = document.querySelector(".colleague-arrow.arrow-left")
const colleagueArrowRight = document.querySelector(".colleague-arrow.arrow-right")
const colleagueImages = document.querySelectorAll('.colleague-profile')
const colleagueDetails = document.querySelectorAll('.colleague-details')
const colleagueTexts = document.querySelectorAll('.colleague-text')

//service elements
const serviceArrowLeft = document.querySelector(".service-arrow.arrow-left")
const serviceArrowRight = document.querySelector(".service-arrow.arrow-right")
const serviceImages = document.querySelectorAll('.service-image');
const serviceDescriptions = document.querySelectorAll('.service-description');
const serviceButtons = document.querySelectorAll('.btn-service')
const serviceCardSliders = document.querySelectorAll('.card-slider .card');
const navItems = document.querySelectorAll('.nav-item');
const navList = document.querySelector('.nav-list');
const toggleBtn = document.querySelector('.menu-icon');
const header = document.querySelector('header');

// Price elements
const priceButtons = document.querySelectorAll('.btn-price');
const priceCards = document.querySelectorAll('.price-description');

// Dropdown elements
const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropdownToggle = document.querySelector('.dropdown-toggle');  
const dropdownContent = document.querySelector('.dropdown-content');

document.addEventListener('click', (e) => {
  e.preventDefault();
  if(dropdownContent.classList.contains('show') && e.target !== dropdownContent && e.target !== dropdownToggle){
    dropdownContent.classList.remove('show');
  }
  if(e.target.classList.contains('dropdown')){

  }else{
    if(navList.classList.contains('show') && e.target !== navList && e.target !== toggleBtn){
      navList.classList.remove('show');
    }
  }
})

dropdownToggle.addEventListener('click', (e) => {
  dropdownContent.classList.toggle('show');
});


dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    window.scroll({
      top: document.querySelector('.services').getBoundingClientRect().top + window.scrollY - header.clientHeight,
      behavior: 'smooth'
    })
    changeAndToggle([serviceImages, serviceDescriptions, serviceButtons], serviceIndex, (val) => {
      serviceIndex = Number(item.dataset.indexNumber);
      val.index = Number(item.dataset.indexNumber);
    })
  });
})

// toggle menu

toggleBtn.addEventListener('click', (e) => {
  navList.classList.toggle('show');
})

//nav items
navItems.forEach(item =>
  item.addEventListener('click', (e) => {
    if(item.classList.contains("dropdown")){

    }else{
      navList.classList.remove('show');
      window.scroll({
        top: document.querySelector(`.${item.dataset.target}`).getBoundingClientRect().top + window.scrollY -header.offsetHeight,
        behavior: 'smooth'
      })
    }
  })
)

// global values
let colleagueIndex = 0;
let serviceIndex = 0;
let timer = undefined;


const isElementInViewport = (el) => el.getBoundingClientRect().right > 0;
rightsReserved.innerText = `© ${new Date().getFullYear()}`;


bookButtons.forEach(b => {
  b.addEventListener("click", () => {
    window.scroll({
      top: contactsContainer.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    })
  })
})



const scrollLeft = () => {
  const first = document.querySelector(".card-slider .card");
  if (!isElementInViewport(first)) {
    cardSlider.appendChild(first);
    cardSlider.scrollTo(cardSlider.scrollLeft - first.offsetWidth, 0);
  }

  if (cardSlider.scrollLeft !== cardSliderScrollWidth) {
    cardSlider.scrollTo(cardSlider.scrollLeft + 1, 0);
  }

  if (!timer) {
    timer = setInterval(scrollLeft, 1)
  }
}

const stopScrollLeft = () => {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
}

window.addEventListener("load", () => {
  scrollLeft();
});

let isDragging = false;

cardSlider.addEventListener("mouseenter", () => {
  stopScrollLeft();
})
cardSlider.addEventListener("mouseleave", () => {
  scrollLeft();
})


// doesn't take into account southern hemisphere

class Season {
  constructor(name, months) {
    this.name = name;
    this.months = months;
  }
  static seasons = [];
}

const updateSeason = () => {
  const seasons = [];
  seasons.push(new Season("tavasz", [2, 3, 4]));
  seasons.push(new Season("nyár", [5, 6, 7]));
  seasons.push(new Season("ősz", [8, 9, 10]));
  seasons.push(new Season("tél", [11, 0, 1]));
  const getSeason = (seasons, month) => {
    return seasons.find(m => m.months.includes(month)).name;
  }

  const currentSeason = getSeason(seasons, new Date().getMonth())
  seasonContainer.innerText = `${currentSeason.toUpperCase()}I`
  newsText.innerText = `Látogass el szalonunkba és fedezd fel a ${currentSeason}i felfrissülés érzését!`
}

updateSeason();

/* */


colleagueArrowLeft.addEventListener('click', (e) => {
  changeAndToggle([colleagueImages, colleagueDetails, colleagueTexts], colleagueIndex, (val) => {
    if (colleagueIndex == 0) {
      colleagueIndex = colleagueImages.length - 1;
      val.index = colleagueImages.length - 1;
    } else {
      colleagueIndex--;
      val.index--;
    }
  })
});


colleagueArrowRight.addEventListener('click', (e) => {

  changeAndToggle([colleagueImages, colleagueDetails, colleagueTexts], colleagueIndex, (val) => {
    if (colleagueIndex >= colleagueImages.length - 1) {
      colleagueIndex = 0;
      val.index = 0;
    } else {
      colleagueIndex++;
      val.index++;
    }
  })

});

/* services code */


const changeAndToggle = (arr, i, fn) => {
  let val = { index: i }
  arr.forEach(a => a[val.index].classList.remove('show'));
  fn(val);
  arr.forEach(a => a[val.index].classList.add('show'));
}
const toggleServiceRight = (e) => {
  changeAndToggle([serviceImages, serviceDescriptions, serviceButtons,priceButtons, priceCards], serviceIndex, (val) => {
    if (serviceIndex >= serviceImages.length - 1) {
      val.index = 0
      serviceIndex = 0;
    } else {
      val.index++
      serviceIndex++
    }
  })
}

const toggleServiceLeft = (e) => {
  changeAndToggle([serviceImages, serviceDescriptions, serviceButtons,priceButtons, priceCards], serviceIndex, (val) => {
    if (serviceIndex == 0) {
      val.index = serviceImages.length - 1
      serviceIndex = serviceImages.length - 1
    } else {
      val.index -= 1
      serviceIndex -= 1
    }
  })
}


serviceArrowLeft.addEventListener('click', toggleServiceLeft)
serviceArrowRight.addEventListener('click', toggleServiceRight)
serviceCardSliders.forEach(slider => {
  slider.addEventListener('click', (e) => {
    window.scroll({
      top: document.querySelector('.services').getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    })
    changeAndToggle([serviceImages, serviceDescriptions, serviceButtons], serviceIndex, (val) => {
      serviceIndex = Number(slider.dataset.indexNumber);
      val.index = Number(slider.dataset.indexNumber);
    })
  });
});



serviceButtons.forEach(button => {
  button.addEventListener('click', e => {
    changeAndToggle([serviceImages, serviceDescriptions, serviceButtons, priceButtons, priceCards], serviceIndex, (val) => {
      serviceIndex = Number(button.dataset.indexNumber);
      val.index = Number(button.dataset.indexNumber);
    })
  });
})

priceButtons.forEach(button => {
  button.addEventListener('click', e => {
      changeAndToggle([serviceImages, serviceDescriptions, serviceButtons, priceButtons, priceCards], serviceIndex, (val) => {
      serviceIndex = Number(button.dataset.indexNumber);
      val.index = Number(button.dataset.indexNumber);
    })
  });
})
