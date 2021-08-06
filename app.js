document.addEventListener('DOMContentLoaded', downloadMenu);
document.addEventListener('DOMContentLoaded', subscribe);

function downloadMenu() {
    const button = document.getElementById("download");
    button.addEventListener("click", function () {
        const download = document.createElement("a");
        download.setAttribute("href", "menu.pdf");
        download.setAttribute("download", "menu.pdf");
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    });
}

function subscribe() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const myData = { name: null, phone: null, email: null };
        myData.name = form.elements.name.value;
        myData.phone = form.elements.phone.value;
        myData.email = form.elements.email.value;
        const req = new XMLHttpRequest();
        req.open("POST", "https://httpbin.org/post", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                const response = JSON.parse(req.responseText);
                document.getElementById("submitStatus").textContent = "We have received your contact information as follows:";
                document.getElementById("submitName").textContent = "Name: " + response.json.name;
                document.getElementById("submitPhone").textContent = "Phone: " + response.json.phone;
                document.getElementById("submitEmail").textContent = "Email: " + response.json.email;
            } else {
                document.getElementById("submitStatus").textContent = "We did NOT receive your contact information! Error in network request: " + req.statusText;
            }
        });
        req.send(JSON.stringify(myData));
    });
}
