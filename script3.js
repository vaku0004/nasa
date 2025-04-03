const $date = document.getElementById('date');
const $form = document.getElementById('form');
const $submit = document.getElementById('submit');

$form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const date = $date.value; 
  const apiKey = 'qgJyShk6YlWpNWaZyRJBDqMjR412A6WS77jgrC1U';
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
  const data = await response.json();

  localStorage.setItem('selectedDate', date);
  localStorage.setItem('data', JSON.stringify(data));

  updateUI(date, data);
});

function updateUI(date, data) {
  document.getElementById('selectedDate').textContent = date;
  document.querySelector('.col-lg-8 h2').textContent = data.title;
  document.querySelector('.col-lg-4.datebox p').textContent = data.explanation;
  document.querySelector('.col-lg-8 img').src = data.url;
  document.querySelector('.col-lg-8 img').alt = data.title;

const imageElement = document.querySelector('.col-lg-8 img');
const modal = document.getElementById('hdImageModal');
const modalImg = document.getElementById('modalImg');

imageElement.addEventListener('click', function() {
  modal.style.display = "block";
  modalImg.src = data.hdurl; 
});

modalImg.addEventListener('click', function() {
  modal.style.display = "none"; 
});


}

document.getElementById('dayImage').addEventListener('click', function() {
  let hdUrl = data.hdurl; 
  document.querySelector('.col-lg-8 img').src = hdUrl;
});

(function() {
  const savedDate = localStorage.getItem('selectedDate');
  const savedData = localStorage.getItem('data');

  if (savedDate && savedData) {
    updateUI(savedDate, JSON.parse(savedData));
  }
})();




const images = [ 

];


let htmlParts = [];




for (const image of images) {
  htmlParts.push(`
    <div class="col mb-4">
      <img src="${image.url}" class="img-fluid" alt="${image.alt}">
    </div>
  `);
}

let html = htmlParts.join('');


document.getElementById('likePhotos').innerHTML = `<div class="row row-cols-1 row-cols-1-2 row-cols-lg-2">${html}</div>`;
//Favorite section

const $like = document.getElementById('like');

//add button


$like.addEventListener('click', function() {
  const savedData = JSON.parse(localStorage.getItem('data'));
  if (!savedData) return;

  const isAlreadyLiked = images.some(image => image.url === savedData.url);
  if (!isAlreadyLiked) {
      images.push({
          url: savedData.url,
          hdurl: savedData.hdurl, 
          alt: savedData.title,
          date: savedData.date,
          title: savedData.title,
          explanation: savedData.explanation
      });

      localStorage.setItem('likedImages', JSON.stringify(images));
      updateLikedImagesUI();
      updateCurrentImage(savedData);
  }
});

const $delete = document.getElementById('delete');

$delete.addEventListener('click', function() {
  const savedData = localStorage.getItem('data');
  if (!savedData) return;

  const data = JSON.parse(savedData);
  const index = images.findIndex(image => image.url === data.url);
  
  if (index !== -1) {
    images.splice(index, 1);

    localStorage.setItem('likedImages', JSON.stringify(images));
    updateLikedImagesUI();
  }
});




//// Update images UI
function updateLikedImagesUI() {
  let htmlParts = [];
  images.forEach((image, index) => {
    htmlParts.push(`
    <div class="like" id="image-${index}">
    <div class="image-container" style="position: relative;">
      <img src="${image.url}" class="img-fluid" alt="${image.alt}" data-index="${index}">
      <p class="image-date"> Date: ${image.date}</p>
    <button class="btn delete-btn" data-index="${index}">X</button>
    </div>
  </div>
  
    `);
  });

  let html = htmlParts.join('');
  document.getElementById('likePhotos').innerHTML = html;

  setupFavoriteImageClicks();
  setupDeleteButtons();
}

function setupFavoriteImageClicks() {
  images.forEach((image, index) => {
    const imgElement = document.querySelector(`#image-${index} img`);
    if (imgElement) {
      imgElement.addEventListener('click', () => {
        updateUI(image.date, image);
        localStorage.setItem('currentImage', JSON.stringify(image)); // Сохранение состояния текущего изображения
      });
    }
  });
}


function setupDeleteButtons() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'), 10);
      images.splice(index, 1);
      localStorage.setItem('likedImages', JSON.stringify(images));
      updateLikedImagesUI();
    });
  });
}



const savedLikedImages = JSON.parse(localStorage.getItem('likedImages'));
if (savedLikedImages) {
  images.push(...savedLikedImages); 
  updateLikedImagesUI(); 
}



/*STICKY */
/*
window.addEventListener('scroll', function() {
  var element = document.getElementById('stickyElement');
  var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollDistance >= 600) { // Проверяем, достигла ли прокрутка 400px
      element.style.position = 'fixed';
      element.style.top = '0'; // Устанавливаем позицию margin-bottom в режиме стики
      element.style.right = '0px'; 
      element.classList.add('sticky')
  } else {
      element.style.position = 'static'; // Возвращаем к обычному положению
      element.style.bottom = 'auto'; // Убираем позицию margin-bottom
      element.classList.remove('sticky');
  }
});

*/

window.addEventListener('scroll', function() {
  var element = document.getElementById('stickyElement');
  var form = document.querySelector('.form'); // Получаем элемент формы
  var submitButton = document.getElementById('submit'); // Получаем кнопку отправки
  var scrollDistance =  document.documentElement.scrollTop;

  // Активируем "sticky" только если прокрутка находится между 600 и 700 пикселями
  if (scrollDistance >= 630 && scrollDistance <= 720) {
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.right = '0px';
      element.classList.add('sticky');
      form.classList.add('sticky'); // Добавляем класс 'sticky' к форме
      submitButton.classList.add('sticky'); // Добавляем класс 'sticky' к кнопке отправки
  } else {
      element.style.position = 'static';
      element.classList.remove('sticky');
      form.classList.remove('sticky'); // Удаляем класс 'sticky' у формы
      submitButton.classList.remove('sticky'); // Удаляем класс 'sticky' у кнопки отправки
  }
});













/*SAVING 

window.addEventListener('scroll', function() {
  var element = document.getElementById('stickyElement');
  var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollDistance >= 500 && scrollDistance <= 800) { // Проверяем, находится ли прокрутка в диапазоне от 500 до 800 пикселей
      element.style.position = 'fixed';
      element.style.backgroundColor = '#4E4D4D'; // Добавляем цвет фона только в режиме стики
      element.style.width = '100%'; // Занимаем всю ширину страницы
      element.style.zIndex = '1000'; // Поверх всех остальных элементов
      element.style.padding = '10px 0'; // Добавляем отступы сверху и снизу
      element.style.top = '0'; // Прикрепляем элемент к верхней части страницы
  } else {
      element.style.position = 'static';
      element.style.zIndex = 'auto'; // Возвращаем обратно значение по умолчанию
      element.style.backgroundColor = 'transparent'; // Убираем фон в обычном режиме
  }
});
*/

/* ___версия которая делает активной кнопку удаления

const $delete = document.getElementById('delete');


$delete.addEventListener('click', function() {

  const savedData = localStorage.getItem('data');
  if (!savedData) return; 
  
  const data = JSON.parse(savedData);
  
 
  const index = images.findIndex(image => image.url === data.url);
  
  if (index !== -1) {
    images.splice(index, 1);
    updateLikedImagesUI();
  }
});

function updateLikedImagesUI() {
  let htmlParts = [];
  for (const image of images) {
    htmlParts.push(`
      <div class="col mb-4">
        <img src="${image.url}" class="img-fluid" alt="${image.alt}">
      </div>
    `);
  }
  
  let html = htmlParts.join('');
  document.getElementById('likePhotos').innerHTML = `<div class="row row-cols-1 row-cols-1-2 row-cols-lg-2">${html}</div>`;
}

updateLikedImagesUI();
*/
/*
function updateUI(date, data) {
  document.getElementById('selectedDate').textContent = date;
  document.querySelector('.col-lg-8 h2').textContent = data.title; 
  document.querySelector('.col-lg-4.datebox p').textContent = data.explanation; 
  document.querySelector('.col-lg-8 img').src = data.url; 
  document.querySelector('.col-lg-8 img').alt = data.title; 
}
document.addEventListener('DOMContentLoaded', () => {
  const savedDate = localStorage.getItem('selectedDate');
  const savedData = localStorage.getItem('data');

  if (savedDate && savedData) {
    updateUI(savedDate, JSON.parse(savedData));
  }
});
*/

/*
$form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const date = $date.value; // Получаем значение даты из поля ввода.
    const apiKey = 'qgJyShk6YlWpNWaZyRJBDqMjR412A6WS77jgrC1U';
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
    const data = await response.json();

    // Преобразуем дату в UTC для отображения, чтобы избежать проблем с временными зонами.
    const displayDate = new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });

    document.getElementById('selectedDate').textContent = displayDate;
});
*/


