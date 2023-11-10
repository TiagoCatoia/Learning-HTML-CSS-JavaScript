/* NÃO DINAMICO:
import portugues from "./strings/pt-br.js"
import ingles from "./strings/de.js"
import alemao from "./strings/en.js"

function boasVindas(idioma){
    let strings = ""
    /* Método ruim de fazer!
    switch (idioma){
        case "pt-br":
            strings = portugues
            break
        case "en":
            strings = ingles
        case "de":
            strings = alemao
    }
    console.log(strings.ola)
    console.log(portugues.ola)
}
export default boasVindas
*/

// DINAMICO (Deixar para usar para quando querer algo usado raramente, pois pode conflitar com o WEBPACK)
function boasVindas(idioma){
    // é assincrona a função
    import("./strings/pt-br.js").then( // import retorna uma promisse
        ({default:msg}) => {
            console.log(msg.ola)
        }
    )
}

export default boasVindas