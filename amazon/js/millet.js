let s = document.querySelectorAll('.sg-col-4-of-12');
for (var i = 0; i < s.length; i++) {
    s[i].setAttribute('index', i + 1);
}
for (let i = 0; i < s.length; i++) {

    s[i].onclick = function() {
        let n = this.getAttribute('index');
        window.location.href = './details.html?' + '=' + n;
    }
}