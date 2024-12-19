function includeHTML() {
    const elements = document.getElementsByTagName("*");  // Usando const, pois elements não será reatribuído.
    
    // Usando for-of para iterar sobre os elementos
    for (const elmnt of elements) {  // Usando for-of para iteração simplificada
        const file = elmnt.getAttribute("w3-include-html");  // Usando const para a constante file
        
        if (file) {
            // Usando fetch em vez de XMLHttpRequest
            fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Falha ao carregar o arquivo: ' + file);
                    }
                })
                .then(data => {
                    elmnt.innerHTML = data;
                    elmnt.removeAttribute("w3-include-html");
                    // A recursão foi removida. Agora o código é executado uma vez por elemento
                })
                .catch(error => {
                    console.error(error);
                });
            return;  // Retorna após a primeira requisição
        }
    }
}
