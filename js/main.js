window.addEventListener('DOMContentLoaded', () => {
  // Tab

  const tabs = document.querySelector('.tabheader'),
    tabContent = document.querySelectorAll('.tabcontent'),
    tabHeaderItem = document.querySelectorAll('.tabheader__item');

  const hideTabContent = () => {
    tabContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });

    tabHeaderItem.forEach((item) => item.classList.remove('tabheader__item_active'));
  };

  const showTabContent = (i = 0) => {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');

    tabHeaderItem[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();

  tabs.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('tabheader__item')) {
      tabHeaderItem.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Tab Image
  /* 
  const currentNumber = document.querySelector('#current'),
    arrowLeft = document.querySelector('.offer__slider-prev'),
    arrowRight = document.querySelector('.offer__slider-next'),
    slideImage = document.querySelectorAll('.offer__slide');
  let i = 1,
    a = 1;

  const closeImageSlide = () => {
    slideImage.forEach(function (num) {
      num.classList.add('hide');
    });
  };

  const openImageSlide = () => {
    slideImage[i].classList.add('show', 'fade');
    slideImage[i].classList.remove('hide');

    currentNumber.innerHTML = `
    <span id="current">0${a}</span>/`;
  };

  closeImageSlide();
  openImageSlide();

  arrowLeft.addEventListener('click', () => {
    if (i <= 0) i = 3;
    else i--;
    if (a == 1) a = 4;
    else a--;

    currentNumber.innerHTML = `
      <span id="current">0${a}</span>/`;

    closeImageSlide();
    openImageSlide(i);
  });

  arrowRight.addEventListener('click', () => {
    if (i >= 3) i = 0;
    else i++;
    if (a == 4) a = 1;
    else a++;

    currentNumber.innerHTML = `
      <span id="current">0${a}</span>/`;

    closeImageSlide();
    openImageSlide(i);
  }); */

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider__inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');

    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: 0.5;
        transition: opacity 0.6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = '.5'));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  /* 
  showSlides(slideIndex);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = 'none'));

    slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });
 */

  // Timer
  const deadLine = '2022-11-25';

  const getTimeRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = () => {
    const timer = document.querySelector('.timer'),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function zeroNumber(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function updateClock() {
      const t = getTimeRemaining(deadLine);

      days.innerHTML = zeroNumber(t.days);
      hours.innerHTML = zeroNumber(t.hours);
      minutes.innerHTML = zeroNumber(t.minutes);
      seconds.innerHTML = zeroNumber(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock();

  // Модальное окно

  const btnModal = document.querySelectorAll('[data-modal]'),
    modalClose = document.querySelector('[data-modalClose]'),
    modal = document.querySelector('.modal');

  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
  };

  const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  };

  // Закрывает модальное окно
  modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Открывает модальное окно
  btnModal.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('show');
      modal.classList.remove('hide');

      document.body.style.overflow = 'hidden';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Таймер для модального окна

  const modalTimer = setTimeout(openModal, 30000);

  const showModalByScroll = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);

  // Карточки блюдов

  class menuCard {
    constructor(src, alt, title, desc, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.grm = 10;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.grm;
    }

    render() {
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
          ${this.desc}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      </div>
      `;
      this.parent.append(div);
    }
  }

  new menuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    15,
    '.menu .container'
  ).render();

  new menuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    23,
    '.menu .container'
  ).render();

  new menuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    18,
    '.menu .container'
  ).render();

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свжемся',
    failure: 'Что-то пошло не так',
  };

  forms.forEach(function (item) {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const request = new XMLHttpRequest();
      const formData = new FormData(form);

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'multipart/form-data');

      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);

          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);

          statusMessage.textContent = message.success;
        } else {
          console.log(request.response);

          statusMessage.textContent = message.failure;
        }
      });
    });
  }

  // // Calc

  // const result = document.querySelector('.calculating__result span');
  // let sex = 'female',
  //   height,
  //   weight,
  //   age,
  //   ratio = 1.375;

  // function calcTotal() {
  //   if (!sex || !height || !weight || !age || !ratio) {
  //     result.textContent = '______';
  //     return;
  //   }

  //   if (sex == 'female') {
  //     result.textContent = Math.round(
  //       (88.36 + 13.4 * weigth + 4.8 * height - 5.7 * age) * ratio
  //     );
  //   } else {
  //     result.textContent = Math.round(
  //       (447.6 + 9.2 * weigth + 3.1 * height - 4.3 * age) * ratio
  //     );
  //   }
  // }

  // function getStaticInformation(parentSelector, activeClass) {
  //   const elements = document.querySelectorAll(`${parentSelector} div`);

  //   elements.forEach((elem) => {
  //     elem.addEventListener('click', (e) => {
  //       const target = e.target;

  //       if (target.getAttribute('data-ratio')) {
  //         ratio = +target.getAttribute('data-ratio');
  //       } else {
  //         sex = +target.getAttribute('id');
  //       }

  //       elements.forEach((elem) => {
  //         elem.classList.remove(activeClass);
  //       });

  //       target.classList.add(activeClass);

  //       calcTotal();
  //     });
  //   });
  // }

  // getStaticInformation('#gender', 'calculating__choose-item_active');
  // getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

  
  const result = document.querySelector('.calculating__result');
  let sex = 'female',
    height,
    weigth,
    age,
    ratio = 1.375;

  function calcTotal() {
    if (!sex || !height || !weigth || !age || !ratio) {
      result.textContent = '______ккал';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round(
        (88.36 + 13.4 * weigth + 4.8 * height - 5.7 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (447.6 + 9.2 * weigth + 3.1 * height - 4.3 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const target = e.target;
        if (target.getAttribute('data-ratio')) {
          ratio = +target.getAttribute('data-ratio');
        } else {
          sex = target.getAttribute('id');
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big',
    'calculating__choose-item_active'
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weigth = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
});
