
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Student</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="speisen.speisename" required>
                </div>

                <div v-for="(zutat, index) in speisen.zutaten" :key="index">
                <div class="form-group">
                                    <label>Menge</label>
                                    <input type="number" class="form-control" v-model="zutat.menge" required>
                                </div>

                                <div class="form-group">
                                    <label>Einheit</label>
                                    <input type="text" class="form-control" v-model="zutat.einheit" required>
                                </div>

                                <div class="form-group">
                                    <label>Zutat</label>
                                    <input type="text" class="form-control" v-model="zutat.zutat" required>
                                </div>                

                                <div class="form-group">
                                    <button class="btn btn-danger btn-block">Update</button>
                                </div>
                </div>
                                
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            speisen: [],
            zutaten: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-speise/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.speisen = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-speise/${this.$route.params.id}`;

            axios.post(apiURL, this.speisen).then((res) => {
                console.log(res)
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>