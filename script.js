function formatDoc(cmd, value=null) {
    if (value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd);
    }
}

function addLink() {
    const url = prompt('Enter the URL:', '');
    if (url) {
        formatDoc('createlink', url);
    }
}


const content = document.getElementById('content');
content.addEventListener('mouseenter', function () {
    const a = content.querySelectorAll('a');
    a.forEach((link) => {
        link.addEventListener('mouseenter', function () {
            content.setAttribute('contenteditable', false);
            link.target = '_blank';
        })
        link.addEventListener('mouseleave', function () {
            content.setAttribute('contenteditable', true);
        })
    })
})


const showCode = document.getElementById('show-code');
let active = false;
showCode.addEventListener('click', function () {
    showCode.dataset.active = !active;
    active = !active;
    if (active) {
        content.textContent = content.innerHTML;
        content.setAttribute('contenteditable', false);
    } else {
        content.innerHTML = content.textContent;
        content.setAttribute('contenteditable', true);
    }
})


const filename = document.getElementById('filename');
function fileHandle(value) {
    if (value === 'new') {
        content.innerHTML = '';
        filename.value = 'untitled';
    } else if (value === 'txt') {
        const blob = new Blob([content.textContent]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename.value + '.txt';
        link.click();
    } else if (value === 'pdf') {
        html2pdf().from(content).save(filename.value);
    }
}
