eventListeners();

function eventListeners() {
    const ui = new UI()
    //preloader
    window.addEventListener('load', function(){
        ui.hidePreloader();
    });
    // navBTn
    document.querySelector('.navBtn').addEventListener('click', function(){
        ui.showNav();
    });
    // control the video
    document.querySelector('.video__switch').addEventListener('click', function(){
        ui.videoControls();
    });

    // submit the form
    document.querySelector('.drink-form').addEventListener('click', function(event){
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const  lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email);
        //console.log(value);
        if (value) {

            let customer = new Customer(name,lastName,email);
            console.log(customer);
            ui.addCustomer(customer);

            ui.showFeedback('customer added the list','success');
            ui.clearfield();
        } else {
            ui.showFeedback('please  fill out entire form', 'error');
        }
    });

    // display modal
    const links = document.querySelectorAll('.work-item__icon');


    links.forEach(function (item) {
      item.addEventListener('click', function (event) {
        ui.showModal(event)
      });
    });

    //hide the modal
    document.querySelector('.work-modal__close').addEventListener('click', function (event) {
        ui.closeModal();
    });
}

function UI() {

}

UI.prototype.hidePreloader = function () {
    document.querySelector('.preloader').style.display = 'none';
}

UI.prototype.showNav = function() {
    document.querySelector('.nav').classList.toggle('nav--show');
}

UI.prototype.videoControls = function () {
   let btn = document.querySelector('.video__switch-btn');

   if (!btn.classList.contains('btnSlide')) {
       btn.classList.add('btnSlide');
       document.querySelector('.video__item').pause();
   } else {
       btn.classList.remove('btnSlide');
       document.querySelector('.video__item').play();
   }
}
// check for empty values
UI.prototype.checkEmpty = function (name,lastName,email) {
    let result;
    if(name === '' || lastName ==='' || email === '') {
        result = false;
    } else {
        result = true;
    }
    return result;
}

UI.prototype.showFeedback = function(text, type) {
    const feedBack = document.querySelector('.drink-form__feedback');
    if(type === 'success') {
        feedBack.classList.add('success')
        feedBack.innerText = text;
        this.removeAlert('success');

    } else if ( type === 'error') {
        feedBack.classList.add('error');
        feedBack.innerText = text;
        this.removeAlert('error');
    }
}

// remove alert
UI.prototype.removeAlert = function (type) {
    setTimeout(function(){
        document.querySelector('.drink-form__feedback').classList.remove(type)
    }, 3000);
}

// add customer
UI.prototype.addCustomer = function (customer) {
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random() * images.length);
   // console.log(random);
   const div = document.createElement('div');
   div.classList.add('person')
   div.innerHTML = ` <img src="img/person-${random}.jpeg" alt="" class="person__thumbnail">
   <h4 class="person__name">${customer.name}</h4>
   <h4 class="person_last-name">${customer.lastName}</h4>`;
   document.querySelector('.drink-card__list').appendChild(div);
}

// clear field
UI.prototype.clearfield = function () {
    document.querySelector('.input-name').value ='';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}
// show modal

UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item__icon')) {
  
  
      let id = event.target.parentElement.dataset.id
  
      const modal = document.querySelector('.work-modal');
      const modalItem = document.querySelector('.work-modal__item');
  
      modal.classList.add('work-modal--show');
      modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
    }
  }
 // hide modal

 UI.prototype.closeModal = function () {
     document.querySelector('.work-modal').classList.remove('work-modal--show');
 }

function Customer (name,lastName,email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;

}
