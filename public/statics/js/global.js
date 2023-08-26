const header = document.getElementById("header")
fetch('statics/components/nav.html')
.then(e => (e.text()))
.then(e => header.innerHTML = e)