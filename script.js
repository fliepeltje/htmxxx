const parser = new DOMParser();

function patchElement(element) {
    if (element.tagName === 'A' && !element.patched) {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            fetch(element.href)
                .then(response => response.text())
                .then(data => performUpdate(data))
                .catch(_ => {});
        });
    } else if (element.tagName === 'FORM' && !element.patched) {
        element.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(element);
            const url = element.action;
            const method = element.method;
            let urlWithQueryParams = url;
            if (method === 'get') {
                const queryParams = new URLSearchParams(formData);
                urlWithQueryParams += '?' + queryParams.toString();
                fetch(urlWithQueryParams)
                    .then(response => response.text())
                    .then(data => performUpdate(data))
                    .catch(_ => {});
            } else {
                fetch(url, {
                    method: method,
                    body: formData
                })
                .then(response => response.text())
                .then(data => performUpdate(data))
                .catch(_ => {});
            }
        });
    }
    element.patched = true;
}

function performUpdate(htmldata) {
    const doc = parser.parseFromString(htmldata, 'text/html');
    const elements = doc.querySelectorAll('[xxx-update]');
    elements.forEach(element => {
        target_id = element.getAttribute('xxx-update');
        target = document.getElementById(target_id);
        target.outerHTML = element.innerHTML;
    });
    const topatch = document.querySelectorAll('[xxx]');
    topatch.forEach(patchElement);

}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[xxx]');
    elements.forEach(patchElement);
});
