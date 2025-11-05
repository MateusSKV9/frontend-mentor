const ask_item = document.getElementsByClassName('ask-item'); 
const images = document.getElementsByClassName('image');
const answers = document.getElementsByClassName('answers');

for(let i = 0; i<ask_item.length; i++) {
    ask_item[i].addEventListener('click', function() {
        if(images[i].src.includes('assets/images/icon-minus.svg')) {
            images[i].src = 'assets/images/icon-plus.svg';
            images[i].alt = 'icon-plus';
        } else if(images[i].src.includes('assets/images/icon-plus.svg')) {
            images[i].src = 'assets/images/icon-minus.svg';
            images[i].alt = 'icon-minus';
        }
        answers[i].classList.toggle('oculta');
    });
}