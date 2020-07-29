<template>
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form ref="form" :model="form" @submit="onSubmit" label-width="120px">
                        <el-form-item label="Name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>

                        <el-form-item label="Price">
                            <el-col :span="11">
                                <el-input type="number" v-model="form.price_min"></el-input>
                            </el-col>
                            <el-col class="line is-centered" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-input type="number" v-model="form.price_max"></el-input>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="Bedrooms">
                            <el-input type="number" v-model="form.bedrooms"></el-input>
                        </el-form-item>

                        <el-form-item label="Bathrooms">
                            <el-input type="number" v-model="form.bathrooms"></el-input>
                        </el-form-item>

                        <el-form-item label="Storeys">
                            <el-input type="number" v-model="form.storeys"></el-input>
                        </el-form-item>

                        <el-form-item label="Garages">
                            <el-input type="number" v-model="form.garages"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary"
                                       :icon="searchIconStyle"
                                       @click="onSubmit">Search</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-table
                            :data="houses"
                            v-loading="loading"
                            border
                    >
                        <el-table-column
                                prop="name"
                                label="Name"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="Price"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="bedrooms"
                                label="Bedrooms">
                        </el-table-column>
                        <el-table-column
                                prop="bathrooms"
                                label="Bathrooms">
                        </el-table-column>
                        <el-table-column
                                prop="storeys"
                                label="Storeys">
                        </el-table-column>
                        <el-table-column
                                prop="garages"
                                label="Garages">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row v-show="!this.loading && !this.houses.length">
                <el-col :span="24"><p>No data have been found</p></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import axiosInstance from '@/services/axios-instance'
    export default {
        name: "Search",
        computed: {
            searchIconStyle() {
                return this.loading ? 'el-icon-loading' : 'el-icon-search';
            }
        },
        data: function () {
            return {
                loading: false,
                form: {
                    name: '',
                    price_min: '',
                    price_max: '',
                    bedrooms: '',
                    bathrooms: '',
                    storeys: '',
                    garages: '',
                },
                houses:[]
            };
        },
        methods: {
            /*in test case there's no pagination implemented
            * but in bigger project it must be
            * */
            onSubmit() {
                this.loading = true;
                this.houses = [];
                axiosInstance.get('/api/search', {
                    params: this.form
                }).then((response) => {
                    this.houses = response.data.records || [];
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        created() {
            this.onSubmit();
        }
    }
</script>

<style scoped>
    .is-centered {
        text-align: center;
    }
</style>