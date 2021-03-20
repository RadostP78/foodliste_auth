<template>
 <div class="container-fluid">
   <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
        <!-- Speise erstellen -->
<!-- 1.  ToDo: Add, Remove Buttons hinzufügen -->
<!-- 2. ToDo: Einlesen von DB-Daten von MengenEinheit und Zutat (lookup) -->
<!-- 3. ToDo: Mobile Friendly machen - damit die Inputs nicht zu lang sind -->
<!-- 4. ToDo: Mobile Friendly machen - irgendwie Responsive machen -->
<!-- 5. ggf. Bootstrap Kurs machen -->


   <h1>Speise erstellen </h1>

<!-- TODO: bei Select den ausgewählten Begriff schwarz darstellen und Standardeinstellung grau belassen -->

    <form @submit.prevent="handleSubmitForm">
      <div class="form-group col-sm-5">
        <input  v-model="speise.speisename" type="text" class="form-control" id="" placeholder="Speisename">
      </div>

           

     <!-- Zutaten hinzufügen      -->
     <div class="form-group col-sm-4">
        <button v-if="!zutatenAnsicht" type="button" class="btn btn-primary" @click="zutatenAdd; zutatenAnsicht = !zutatenAnsicht;">Zutaten hinzufügen</button>
     </div>

<div class="input-group">
      <div class="form-group col-sm-1">
        <!-- !!! ACHTUNG !!! anzahl ist text und nicht number, muss convertiert werden !!! -->
        <!-- <b-form-select v-if="zutatenAnsicht" v-model="selected" :options="anzahl"></b-form-select> -->
      </div>
      <div class="form-group col-sm-2">
        <!-- muss noch gestyled werden!!  -->
        <span v-if="zutatenAnsicht" > Person(en) </span>
      </div>
</div>

      

<!-- anfang von v-if -->
     <div v-if="zutatenAnsicht">
      <div id="speisenteil"   >

        <div>
          <div class="input-group">
              <!-- <div class="form-group col-sm-1">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
              </div> -->
                  <!-- <div class="mt-3"><strong>{{ selected }}</strong>
  
                  </div> -->

              
            
        </div>

          <!-- Speisenteil neu Button -->


        <div>          
          
        </div> 

          <div id="zutaten">
            <div class="input-group" id="drei" v-for="(zutat, index) in speise.zutaten" :key="index">
              <div class="form-group col-md-2">
                
                <input v-model="zutat.menge" type="number" class="form-control" id="" placeholder="Menge">
              </div>
              <div class="form-group col-md-2">
                
                <!-- <b-form-select v-model="selected" type="text" :options="options"></b-form-select> -->
                <b-form-select v-model="zutat.einheit"  type="text" :options="einheiten">                
                </b-form-select>
                <!-- <input v-model="zutat.mengeeinheit" type="text" class="form-control" id="" placeholder="Mengeeinheit"> -->
              </div>
              
              <div class="form-group col-md-4" id="inputKurz" >            
              
                <input v-model="zutat.zutat"  type="text" class="form-control" id="" placeholder="Zutat">            
              </div> 
              <button id="butt" style="float: right;" type="button" class="btn btn-primary my-auto" @click="zutatenAdd"><i class="fas fa-plus"></i></button>
              <button id="butt" style="float: right;" type="button"  class="btn btn-danger my-auto" @click="removeInput(index)"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
      <!-- Speisenteil Ende -->

     </div>
     <!-- Ende von v-if -->

      

      
</div>
</div>
      
      <!-- Speichern - Button -->
      <div class="col-sm-4">
          <button type="submit" class="btn btn-success">Speichern</button>
      </div>       
    </form>
</div>
</template>


<script>
import axios from "axios";

export default {
  data(){
    return {
      speise: {        
        speisename: '',                  
          zutaten: [
            {
              menge: null,
              einheit: '',
              zutat: ''
            }
          ],        
      },
          einheiten: ['Gramm', 'Stück', 'Portion', 'Scheibe', 'Spritzer'],
          options1: [
            {text: 0},
            {text: 1},
            {text: 2},
            {text: 3},
            {text: 4},
            {text: 5},
            {text: 6},
          ],
    
      zutatenAnsicht: false
    }
  },
  
  methods: {
    zutatenAdd() {
      this.speise.zutaten.push({
          menge: 0,
          einheit: '',
          zutat: ''        
      });
    },
    removeInput(index){
      this.speise.zutaten.splice(index, 1);
    },
    handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-speise';
              
              // probleme probleme
                axios.post(apiURL, this.speise).then(() => {
                  this.$router.push('/view')
                  this.speise = 
                  {        
                    speisename: '',                
                      zutaten: [
                        {
                          menge: 0,
                          einheit: '',
                          zutat: ''
                        }
                      ],        
                  }
                    
                }).catch(error => {
                    console.log(error)
                });
            }
  }
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


#inputKurz {
  display:inline-block;
}

#butt {
  margin-top: 0 !important;
}

.form-control {
  color: black !important;
}

#speisenteil {
  padding-top: 0 !important;
}

.custom-select, #option{
  color: black !important;
}
</style>
