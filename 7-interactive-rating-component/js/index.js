const numbers = document.getElementsByClassName('number');

Array.from(numbers).forEach((number) => {
    number.addEventListener('click', function() {

        Array.from(numbers).forEach((num) => {
            num.classList.remove('marked');
        });

        number.classList.add('marked');
    });
});

const submit = document.getElementById('btnSubmit');
submit.addEventListener('click', function() {
    let marked = document.querySelector('.number.marked');
    if(marked) {
        localStorage.setItem('number', marked.textContent);
    } else {
        alert('Por favor, selecione um número');
    }
})