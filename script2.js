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
  var hdUrl = data.hdurl; 
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
//Like button

const $like = document.getElementById('like');



$like.addEventListener('click', function() {
  const savedData = localStorage.getItem('data');
  const savedDate = localStorage.getItem('selectedDate'); // Получаем сохраненную дату
  if (!savedData) return;
  
  const data = JSON.parse(savedData);
  
  const isAlreadyLiked = images.some(image => image.url === data.url);
  if (!isAlreadyLiked) {
    images.push({
      url: data.url,
      alt: data.title,
      date: savedDate // Используем сохраненную дату вместо неопределенной переменной `date`
    });
    
    localStorage.setItem('likedImages', JSON.stringify(images));
    updateLikedImagesUI();
  }
});



//// Update images UI
function updateLikedImagesUI() {
  let htmlParts = [];
  images.forEach((image, index) => {
      htmlParts.push(`
          <div class="col mb-4" id="image-${index}">
              <div class="image-container">
                  <img src="${image.url}" class="img-fluid" alt="${image.alt}">
                  <p class="image-date"> Date: ${image.date}</p> 
              </div>
              <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
          </div>
      `);
  });

  let html = htmlParts.join('');
  document.getElementById('likePhotos').innerHTML = `<div class="row row-cols-1 row-cols-1-2 row-cols-lg-2">${html}</div>`;

  document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
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





/*SAVING */




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
