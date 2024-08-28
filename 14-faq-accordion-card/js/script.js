const asks = document.getElementsByClassName('asks');
const answers = document.getElementsByClassName('answer');
const title_asks = document.getElementsByClassName('title-asks');

for(let i = 0; i<asks.length; i++) {
    asks[i].addEventListener('click', function() {
        answers[i].classList.toggle('oculta');
        const icons = asks[i].getElementsByTagName('img');
        if(!answers[i].classList.contains('oculta')) {
            title_asks[i].classList.add('open');

            icons[0].classList.add('icon-up');
        } else {
            title_asks[i].classList.remove('open')

            icons[0].classList.remove('icon-up');
        }
    });
}