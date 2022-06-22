<template>
  <div v-if="order" class="edit-form">
    <h4>Edit Buy Order</h4>
    <form>
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
        <option v-for="(data_package_type, index) in data_package_types" :key="index" :selected="data_package_type.id==order.data_package_type_id ?true : false" :value="data_package_type.id">{{data_package_type.title}}</option>
      </select>
      </div>
    </form>
    
    <button class="badge badge-danger mr-2" @click="deleteOrder"> Delete</button>
    <button type="submit" class="badge badge-success" @click="updateOrder">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Order...</p>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "order",
  data() {
    return {
      order: null,
      message: ''
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
    getOrder(id) {
      this.retrieveDataPackageTypes();
      OrderDataService.get(id)
        .then(response => {
          this.order = response.data.data;
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

    updateOrder() {
      OrderDataService.update(this.order.id, this.order)
        .then(response => {
          console.log(response.data);
          this.message = 'The Order was updated successfully!';
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

    deleteOrder() {

      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          OrderDataService.delete(this.order.id)
          .then(response => {
            console.log(response.data);
            this.$swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
            this.$router.push({ name: "orders" });
          })
          .catch(e => {
            console.log(e);
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              });
          });
        }
      })
    }
  },
  mounted() {
    this.message = '';
    this.getOrder(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
