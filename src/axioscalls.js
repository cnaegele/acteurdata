import axios from 'axios'
let g_devurl = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}
const g_pathurl = '/goeland/acteur/ajax/'

export async function getActeurData(idActeur) {
    const urlad = `${g_devurl}${g_pathurl}acteur_data.php`
    const params = new URLSearchParams([['idacteur', idActeur]])
    const response = await axios.get(urlad, { params })
        .catch(function (error) {
            return traiteAxiosError(error)
        })
    return response.data
}
export async function getActeurDataComplement(idActeur) {
    const urladc = `${g_devurl}${g_pathurl}acteur_datacomplement.php`
    const params = new URLSearchParams([['idacteur', idActeur]])
    const response = await axios.get(urladc, { params })
        .catch(function (error) {
            return traiteAxiosError(error)
        })
    return response.data
}

function traiteAxiosError(error) {
    if (error.response) {
        return `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        return error.request.responseText
    } else {
        return error.message
    }
}