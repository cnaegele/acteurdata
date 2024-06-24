import axios from 'axios'
let g_devurl = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}
const g_pathurl = '/goeland/acteur/ajax/'

export async function getDataUserInfo() {
    const urlui = `${g_devurl}/goeland/gestion_spec/g_login_f5.php`
    const response = await axios.get(urlui)
        .catch(function (error) {
            traiteAxiosError(error, lesData)
        })   
    return response.data
}
export async function getActeurData(idActeur) {
    const urlad = `${g_devurl}${g_pathurl}acteur_data.php`
    const params = new URLSearchParams([['idacteur', idActeur]])
    const response = await axios.get(urlad, { params })
        .catch(function (error) {
            return traiteAxiosError(error)
        })
    return response.data
}
export async function getActeurDataAdresse(idActeur) {
    const urlada = `${g_devurl}${g_pathurl}acteur_dataadresse.php`
    const params = new URLSearchParams([['idacteur', idActeur]])
    const response = await axios.get(urlada, { params })
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
export async function getActeurDataActeurLie(idActeur) {
    const urladal = `${g_devurl}${g_pathurl}acteur_dataacteurlie.php`
    const params = new URLSearchParams([['idacteur', idActeur]])
    const response = await axios.get(urladal, { params })
        .catch(function (error) {
            return traiteAxiosError(error)
        })
    return response.data
}
export async function getActeurDataRole(idActeur, idemploye) {
    if (idemploye === undefined || idemploye === null) {
        idemploye = 0
    }
    const urladr = `${g_devurl}${g_pathurl}acteur_datarole.php`
    const params = new URLSearchParams([['idacteur', idActeur], ['idemploye', idemploye]])
    const response = await axios.get(urladr, { params })
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