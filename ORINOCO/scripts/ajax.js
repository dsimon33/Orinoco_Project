const AJAX_GET = (url) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let response = JSON.parse(this.responseText);
                resolve(response);
                console.log("connexion serveur ok");
            } 
        }
        request.open("GET", url);
        request.send();
    });
};


