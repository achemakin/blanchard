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

const accordionsEl = document.querySelectorAll('.js-accordion');
// Для открытие секции аккордиона при загрузке сайта
if (accordionsEl) {
  accordionsEl.forEach(el => {
    if (el.classList.contains('accordion--active')) {
      el.lastElementChild.style.maxHeight = el.lastElementChild.scrollHeight + 'px';
    }
  });
}

// Элементы для работы табов в каталоге
const accContentBtnEl = document.querySelectorAll('.js-acc-content-btn');
const tabArticleEl = document.querySelectorAll('.js-tab-article');
const tabsBtnEl = document.querySelectorAll('.js-tabs-btn');
const catalogTabEl = document.querySelectorAll('.js-catalog-tab');

// Для открытие всех карточек при нажатии на кнопку все события
const eventsSlideEl = document.querySelectorAll('.js-events-slide');

// Открытие модального окна
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

// Закрытие модального окна
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
    console.log(target);

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

    // открытие/закрытие accordion
    const isAccordion = target.classList.contains('js-accordion-btn');
    if (isAccordion) {      
      const isActiveAccordion = target.parentElement.classList.contains('accordion--active'); 
     
      accordionsEl.forEach(el => {
        if (el.classList.contains('accordion--active')) {
          el.classList.remove('accordion--active');
          el.lastElementChild.style.maxHeight = null;
          el.firstElementChild.setAttribute('aria-expanded', 'false');
          el.lastElementChild.setAttribute('aria-hidden', 'true');
        }
      })

      if (!isActiveAccordion) {
        target.parentElement.classList.add('accordion--active');
        target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + 'px';
        target.setAttribute('aria-expanded', 'true');
        target.nextElementSibling.setAttribute('aria-hidden', 'false');
      }
    }

    //выбор автора в accordion__item
    const isAccContentBtn = target.classList.contains('js-acc-content-btn');
    if (isAccContentBtn) {
      accContentBtnEl.forEach(el => {
        if (el.classList.contains('accordion__content-btn--active')) {          
          el.classList.remove('accordion__content-btn--active');
        }
      })

      tabArticleEl.forEach(el => {
        el.classList.remove('tab__article--active');

        if (el.getAttribute('data-target') === target.getAttribute('data-path')) {
          el.classList.add('tab__article--active');
          if (el.querySelector('.js-img-name') != null) el.querySelector('.js-img-name').innerHTML = target.innerHTML;
        }   
      })

      target.classList.add('accordion__content-btn--active');

      if (window.matchMedia("(max-width: 991px)").matches) {
        window.scrollTo({
            top: document.getElementById('tab-left').getBoundingClientRect().top + window.scrollY - 50,
            behavior: "smooth"
        });
      }
    }

    // Переключение табов
    const isTabsBtn = target.classList.contains('js-tabs-btn');
    if (isTabsBtn) {
      tabsBtnEl.forEach(el => {
        el.classList.remove('tabs__btn--active');
      })

      target.classList.add('tabs__btn--active');

      catalogTabEl.forEach(el => {
        el.classList.remove('tab--active');
        if (el.getAttribute('data-tab-target') === target.getAttribute('data-tab-path')) {
          el.classList.add('tab--active');
        }
      })
    }

    // Нажатие кнопки Все события
    const isBtnAll = target.classList.contains('js-events-all');
    if (isBtnAll) {
      eventsSlideEl.forEach(el => {
        if (getComputedStyle(el).display === 'none') {
          el.style.display = 'flex';
        }
      })

      target.style.display = 'none';
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

// Gallery-swiper
const gallerySwiper = new Swiper('.js-gallery-swiper', {
  speed: 500,
  spaceBetween: 34,
  slidesPerView: 1,
  slidesPerGroup: 1,
  grid: {
    fill: 'columns',
    rows: 1
  },
  
  pagination: {
    el: '.swiper-pagination--gallery',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.swiper-button-next--gallery',
    prevEl: '.swiper-button-prev--gallery',
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

// Events-swiper
let eventsSwiper = new Swiper('.js-events-swiper', {
  speed: 500,
  spaceBetween: 27,
  pagination: {
    el: '.events__swiper-pagination',
  },
});

if (window.matchMedia("(min-width: 768px)").matches) {
  eventsSwiper.destroy();
}

window.addEventListener('resize', () => {
  if (window.matchMedia("(min-width: 768px)").matches && !eventsSwiper.destroyed) {
      eventsSwiper.destroy();
    }

  if (window.matchMedia("(max-width: 767px)").matches && eventsSwiper.destroyed) {
    eventsSwiper = new Swiper('.js-events-swiper', {
      speed: 500,
      spaceBetween: 27,
      pagination: {
        el: '.events__swiper-pagination',
      },
    });
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


// Search Button
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