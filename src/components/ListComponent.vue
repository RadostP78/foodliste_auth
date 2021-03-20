<template>
    <div class="row">
        <div class="col-md-12">
            
                <tbody>
                    <div v-for="speise in speisen" :key="speise._id">
                        <table class="table table-striped">
                <thead class="thead-dark">
                    <p>Speisenname: {{ speise.speisename }}</p>
                    <tr>
                        
                        <th>Menge</th>
                        <th>Mengeneinheit</th>
                        <th>Zutat</th>
                    </tr>
                </thead>
                        
                         <tr v-for="zutat in speise.zutaten" :key="zutat._id">
                            <td>{{ zutat.menge }}</td>
                            <td>{{ zutat.einheit }}</td>
                            <td>{{ zutat.zutat }}</td>
                             </tr>

                       
                        <td>
                            <router-link :to="{name: 'edit', params: { id: speise._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteZutat(speise._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </table>    
                    </div>
                </tbody>
            
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
               speisen: []
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/api';
            axios.get(apiURL).then(res => {
                this.speisen = res.data
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteZutat(id){
                let apiURL = `http://localhost:4000/api/delete-speise/${id}`;
                let indexOfArrayItem = this.speisen.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.speisen.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            speiseLastCount() {
                return this.speisen[this.speisen.length - 1];
            }
        },
        
        
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>