<style>
  .coltitre {
    font-weight: bold;
  }
  .colinfoimportant {
    color: red;
  }
  .colinfo {
    font-size: small;
  }
  .aregcom {
    text-decoration: none;
    color: inherit;
  }
</style>

<template>
  <v-container class="bg-surface-variant">
    <v-row v-if="acteurD.bactif == '0'" no-gutters>
      <v-col cols="12" md="12" class="colinfoimportant">Acteur désactive <span v-if="acteurD.datedesactivation !== null"> le {{ acteurD.datedesactivation }}</span></v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="2" class="coltitre">Nom</v-col>
      <v-col cols="12" md="10">{{ acteurD.acteurnom }}</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="2" class="coltitre">Adresse</v-col>
      <v-col cols="12" md="10"><div v-html="acteurD.acteuradresse"></div></v-col> <!-- v-html pour garder les <br/>-->
    </v-row>
    <v-row v-if="acteurD.acteurcommentaire !== null" no-gutters>
      <v-col cols="12" md="2" class="coltitre">Commentaire</v-col>
      <v-col cols="12" md="10"><div v-html="acteurD.acteurcommentaire"></div></v-col> <!-- v-html pour garder les <br/>-->
    </v-row>
    <v-row v-for="complement in acteurDCompl" no-gutters>
      <v-col cols="12" md="2" class="coltitre">{{ complement.acteurcomplementtype }}</v-col>
      <v-col cols="12" md="10"><div v-html="complement.acteurcomplement"></div></v-col> <!-- v-html pour garder les <br/>-->
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12" class="colinfo">Création le {{ acteurD.datecreation }}. <span v-if="acteurD.datemodification !== null"> Dernière modification le {{ acteurD.datemodification }}.</span> id goéland: {{ acteurD.acteurid }}</v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { getActeurData, getActeurDataComplement } from '../axioscalls.js'
const props = defineProps({
  acteurId: String,
})
const acteurId = ref(props.acteurId)
const acteurData = await getActeurData(acteurId.value)
const acteurDataComplement = await getActeurDataComplement(acteurId.value)
//console.log(acteurData)
//console.log(acteurDataComplement)
const acteurD = acteurData[0]

//tout le binz ci-dessous pour afficher plus joli les cas avec plusieurs type de complément identique
//et les cas spéciaux avec un url 
const transformActeurDCompl = (acteurDataComplement) => {
  const nbrComplements = acteurDataComplement.length
  const aActeurDCompl = []
  if (nbrComplements > 0) {
    let idTypeComplement = acteurDataComplement[0].acteurcomplementtypeid
    let idTypeComplementPrec = idTypeComplement
    let typeComplement = acteurDataComplement[0].acteurcomplementtype
    let urlRegCom
    let complement = '', complementplus
    if (idTypeComplement == '22') {
      urlRegCom = acteurDataComplement[0].acteurcomplement
    } else if (idTypeComplement == '8') {
      complement = `<a class="aregcom" href="${acteurDataComplement[0].acteurcomplement}" target="_blank">${acteurDataComplement[0].acteurcomplement}</a>`
    } else if (idTypeComplement == '24') {
      complement = `<a class="aregcom" href="https://debiteur.lausanne.ch/debiteur-ui/details-debiteur/${acteurDataComplement[0].acteurcomplement}" target="_blank">${acteurDataComplement[0].acteurcomplement}</a>`
    } else {
      complement = acteurDataComplement[0].acteurcomplement
    }
    let oActeurDCompl 
    for (let i=1; i<acteurDataComplement.length; i++) {
      idTypeComplement = acteurDataComplement[i].acteurcomplementtypeid
      if (idTypeComplement == '22') {
        urlRegCom = acteurDataComplement[i].acteurcomplement
        idTypeComplementPrec = '22' 
      } else {
        if (idTypeComplement != idTypeComplementPrec) {
          if (idTypeComplementPrec != 22) {
            oActeurDCompl = {
              "acteurcomplementtype" : typeComplement, 
              "acteurcomplement" : complement, 
            }
            aActeurDCompl.push(oActeurDCompl)
          }
          idTypeComplementPrec = idTypeComplement
          typeComplement = acteurDataComplement[i].acteurcomplementtype
          if (idTypeComplement == '21') {
            complement = `<a class="aregcom" href="${urlRegCom}" target="_blank">${acteurDataComplement[i].acteurcomplement}</a>`
          } else if (idTypeComplement == '8') {
            complement = `<a class="aregcom" href="${acteurDataComplement[i].acteurcomplement}" target="_blank">${acteurDataComplement[i].acteurcomplement}</a>`
          } else if (idTypeComplement == '24') {
            complement = `<a class="aregcom" href="https://debiteur.lausanne.ch/debiteur-ui/details-debiteur/${acteurDataComplement[i].acteurcomplement}" target="_blank">${acteurDataComplement[i].acteurcomplement}</a>`
          } else {
              complement = acteurDataComplement[i].acteurcomplement
            }
        } else {
          if (idTypeComplement == '8') {
            complementplus = `<a class="aregcom" href="${acteurDataComplement[i].acteurcomplement}" target="_blank">${acteurDataComplement[i].acteurcomplement}</a>`
          } else if (idTypeComplement == '24') {
            complement = `<a class="aregcom" href="https://debiteur.lausanne.ch/debiteur-ui/details-debiteur/${acteurDataComplement[i].acteurcomplement}" target="_blank">${acteurDataComplement[i].acteurcomplement}</a>`
          } else {
            complementplus = acteurDataComplement[i].acteurcomplement
          }
          complement = `${complement}<br>${complementplus}`  
        }
      }
    }
    typeComplement = typeComplement.replace("ABACUS", "")
    oActeurDCompl = {
      "acteurcomplementtype" : typeComplement, 
      "acteurcomplement" : complement, 
    }
    aActeurDCompl.push(oActeurDCompl) 
  } 
  return aActeurDCompl
}
const acteurDCompl = transformActeurDCompl(acteurDataComplement)
//console.log(acteurDCompl)
</script>