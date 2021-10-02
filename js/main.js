document.body.classList.remove('no-js');

const bodyEl = document.body;
const headerEl = document.querySelector('.js-header');
const burgerBtnEl = headerEl.querySelector('.js-burger-menu');
const headerNavEl = headerEl.querySelector('.js-header-nav');
const headerMenuEl = headerEl.querySelector('.js-header-menu');
const headerBottomEl = headerEl.querySelector('.js-header-bottom');
const searchBtnEl = headerEl.querySelector('.js-search-btn');
const searchCloseEl = headerEl.querySelector('.js-search-close');
const modalsEl = document.querySelector('.js-modals');
const modals = document.querySelectorAll('.js-modal');
const widthScroll = window.innerWidth - document.body.offsetWidth + 'px';

function openModals(modalId) {
  const pagePosition = window.scrollY;
  bodyEl.dataset.position = pagePosition;
  bodyEl.style.top = -pagePosition + 'px'; 
  bodyEl.style.paddingRight = widthScroll;
  modalsEl.style.paddingRight = widthScroll;
  
  bodyEl.classList.add('modals-active');

  modals.forEach(modal => {
    if (modal.dataset.id === modalId) {
      modal.classList.add('active');
    }
  })
}

function closeModals() {
  const pagePosition = parseInt(bodyEl.dataset.position, 10);
  const activeModalEl = modalsEl.querySelector('.active');
  bodyEl.classList.remove('modals-active');
  bodyEl.style.paddingRight = 0;
  bodyEl.style.top = 'auto';
  window.scroll({ top: pagePosition, behavior: 'instant' });
  bodyEl.removeAttribute('data-position');
  modalsEl.style.paddingRight = 0;
  if (activeModalEl) activeModalEl.classList.remove('active');
}

function openBurger() {  
  headerEl.classList.add('open');
}

function closeBurger() {
  headerEl.classList.remove('open');
}

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
    const isModalGallery = target.classList.contains('js-gallery-open')
    const isModalClose = target.classList.contains('js-modal-gallery-close')
    const isModals = target.classList.contains('js-modals')
    
    if (isModalGallery) {
      const modalId = target.dataset.modal;
      openModals(modalId);
    }

    if (isModalClose || isModals) {
      closeModals();
    }

    // Открытие/закрытие меню по нажатию на бургер
    const isBurger = target.classList.contains('js-burger-menu')
    const isOpen = headerEl.classList.contains('open');
    const isHeaderNav = target.classList.contains('js-header-nav');  
    if (!isOpen && isBurger) {
      openBurger();      
    }
    if (isOpen && isBurger || isHeaderNav) {
      closeBurger();
    }

    // Открытие/закрытие поля поиск
    if (target === searchBtnEl) {
      headerBottomEl.classList.toggle('search--open');
    }
    if (target === searchCloseEl) {
      headerBottomEl.classList.remove('search--open');
    }
});

// Закрытие меню при скролле
window.addEventListener('scroll', (e) => {
    const submenuOpen = headerMenuEl.querySelector('.submenu-open');
    const isBurgerOpen = headerEl.classList.contains('open');
    if (submenuOpen){      
       submenuOpen.classList.remove('submenu-open');
    }
    if (isBurgerOpen && window.scrollY >= headerNavEl.clientHeight - 40) {
      closeBurger();
    }
});

// Закрытие меню/модального окна/burger при нажатии на кнопку клавиатуры Esc
document.body.addEventListener('keyup', event => {
  const submenuOpen = headerMenuEl.querySelector('.submenu-open');
  if (event.key === 'Escape') {
    if (submenuOpen) {        
      submenuOpen.classList.remove('submenu-open');
    }
    if (bodyEl.classList.contains('modals-active')) {
      closeModals();
    }
    if (headerEl.classList.contains('open')) {
      closeBurger();
    }
  }
});

// Swiper
const gallrySwiper = new Swiper('.js-gallery-swiper', {
  speed: 500,
  spaceBetween: 34,
  slidesPerView: 1,
  slidesPerGroup: 1,
  grid: {
    fill: 'columns',
    rows: 1
  },
  
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      grid: {
        rows: 2
      },   
    },
    1400: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
      grid: {
        rows: 2
      },
    }  
  }
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


// Media query
if (window.matchMedia("(max-width: 1399px)").matches) {  
  searchBtnEl.removeAttribute('disabled');
  searchBtnEl.nextElementSibling.removeAttribute('placeholder');
}

window.addEventListener('resize', () => {
  if (window.matchMedia("(max-width: 1399px)").matches) {  
    searchBtnEl.removeAttribute('disabled');
    searchBtnEl.nextElementSibling.removeAttribute('placeholder');
  } else {
    searchBtnEl.setAttribute('disabled', true);
  }
});