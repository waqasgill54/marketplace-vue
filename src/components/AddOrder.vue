<template>
  <div class="submit-form">
    <h4>Add New Buy Order</h4>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="order.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="max_bid_price">Maximum Bid Price</label>
        <input type="number" class="form-control"
        id="max_bid_price"
        required
        v-model="order.max_bid_price"
        name="max_bid_price"  placeholder="0.00" min="0" step="0.01" title="Maximum Bid Price" pattern="^\d+(?:\.\d{1,2})?$">

      </div>
      <div class="form-group">
        <label for="data_package_type_id">Data Package Type</label>
      <select name="max_bid_price" id="max_bid_price" required class="form-control form-select" v-model="order.data_package_type_id">
        <option selected>Open this select menu</option>
        <option v-for="(data_package_type, index) in data_package_types" :key="index" :value="data_package_type.id">{{data_package_type.title}}</option>
      </select>
      </div>

      <button @click="saveOrder" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrder">Add</button>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      data_package_types: null,
      order: {
        id: null,
        name: "",
        max_bid_price: "",
        data_package_type_id: "",
      },
      submitted: false
    };
  },
  methods: {
    retrieveDataPackageTypes() {
      OrderDataService.getAllDataPackageTypes()
        .then(response => {
          this.data_package_types = response.data.data;
        })
        .catch(e => {
          console.log(e);
          this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          });
        });
    },
    saveOrder() {
      var data = {
        name: this.order.name,
        max_bid_price: this.order.max_bid_price,
        data_package_type_id: this.order.data_package_type_id,
      };

      OrderDataService.create(data)
        .then(response => {
          this.order.id = response.data.id;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
          this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          });
        });
    },
    
    newOrder() {
      this.submitted = false;
      this.order = {};
    }
  },
  mounted() {
    this.retrieveDataPackageTypes();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
