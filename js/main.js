document.body.classList.remove('no-js');

const headerMenuEl = document.querySelector('.js-header-menu');

document.addEventListener('click', event => {
    const target = event.target;   
    
    // Открытие/закрытие меню при нажатии кнопки меню или за границами окна меню
    const submenuOpen = headerMenuEl.querySelector('.submenu-open');
    const isSubmenuOpen = target.classList.contains('submenu-open');
    const isSubmenu = target.classList.contains('simplebar-content');
    const isBtnMenu = target.classList.contains('js-btn-menu');

    if (isBtnMenu && !submenuOpen) {
     target.classList.add('submenu-open');
    }

    if (isBtnMenu && submenuOpen) {
      if (isSubmenuOpen) {
        target.classList.remove('submenu-open');        
      } else {
        submenuOpen.classList.remove('submenu-open');
        target.classList.add('submenu-open');
      }      
    }

    if (submenuOpen && !isBtnMenu && !isSubmenu) {
      submenuOpen.classList.remove('submenu-open');
    }

    // Открытие/закрытие модального окна
    const isModalGallery = target.classList.contains('js-swiper-btn')
    const isModalClose = target.classList.contains('js-modal-gallery-close')
    const isModal = target.classList.contains('js-modal')
    
    if (isModalGallery) {
      document.body.classList.add('modal-active');
    }

    if (isModalClose || isModal) {
      document.body.classList.remove('modal-active');
    }
});

// Закрытие меню при скролле
window.addEventListener('scroll', () => {
    const submenuOpen = headerMenuEl.querySelector('.submenu-open');
    if (submenuOpen){      
       submenuOpen.classList.remove('submenu-open');
    }
});

// Закрытие меню/модального окна при нажатии на кнопку клавиатуры Esc
document.body.addEventListener('keyup', event => {
    const submenuOpen = headerMenuEl.querySelector('.submenu-open');
    if (event.key === 'Escape' && submenuOpen) {        
      submenuOpen.classList.remove('submenu-open');
    }
    if (document.body.classList.contains('modal-active')) {
      document.body.classList.remove('modal-active');
    }
});

// Swiper
const gallrySwiper = new Swiper('.js-gallery-swiper', {
  speed: 500,
  spaceBetween: 50,
  slidesPerView: 3,
  slidesPerGroup: 3,
  grid: {
    fill: 'row',
    rows: 2
  },
  
  pagination: {
    el: '.swiper-pagination',
    type: "fraction",
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//Choices
const element = document.querySelector('.js-gallery-choice');
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSort: false,  
  itemSelectText: '',
});

// custom scroll (simplebar)
const scrollEl = document.querySelectorAll('.js-simplebar');
scrollEl.forEach(el => new SimpleBar(el,
  { 
    autoHide: false,
    scrollbarMinSize: 28,
    scrollbarMaxSize: 28
  }
));