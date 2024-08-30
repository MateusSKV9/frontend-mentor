const share = document.getElementById('share');
share.addEventListener('click', function() {
    const box_share = document.getElementById('box-share');
    const icon = document.getElementsByTagName('i');

    if(box_share.classList.contains('disable')) {
        share.style.background = 'var(--very-dark-grayish-blue)';
        icon[0].style.background = 'var(--desaturated-dark-blue)'
        icon[0].style.color = 'white';
    } else {
        share.style.background = 'var(--light-grayish-blue)';
        icon[0].style.background = ''
        icon[0].style.color = '';
    }
    box_share.classList.toggle('disable');
})