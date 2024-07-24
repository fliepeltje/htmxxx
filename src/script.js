const parser = new DOMParser();
const txt_decoder = new TextDecoder();

async function patchElement(element) {
    if (element.tagName === 'A' && !element.patched) {
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const response = await fetch(element.href);
                await performXXXUpdate(response);
            } catch (error) {
                console.log(error);
            }
        });
    } else if (element.tagName === 'FORM' && !element.patched) {
        element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(element);
            const url = element.action;
            const method = element.method;
            let urlWithQueryParams = url;
            if (method === 'get') {
                const queryParams = new URLSearchParams(formData);
                urlWithQueryParams += '?' + queryParams.toString();
                try {
                    const response = await fetch(urlWithQueryParams);
                    await performXXXUpdate(response);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const response = await fetch(url, {
                        method: method,
                        body: formData
                    });
                    await performXXXUpdate(response);
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
    element.patched = true;
}

async function performXXXUpdate(response) {
    for await (const chunk of response.body) {
        const html = txt_decoder.decode(chunk);
        updateHTML(html);
    }
}

function updateHTML(htmldata) {
    const doc = parser.parseFromString(htmldata, 'text/html');
    const elements = doc.querySelectorAll('[xxx-update]');
    elements.forEach(element => {
        const target_id = element.getAttribute('xxx-update');
        const target = document.getElementById(target_id);
        target.outerHTML = element.innerHTML;
    });
    const topatch = document.querySelectorAll('[xxx]');
    topatch.forEach(patchElement);
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[xxx]');
    elements.forEach(patchElement);
});