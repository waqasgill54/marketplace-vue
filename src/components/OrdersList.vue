<template>
  <div class="list row">
    <div class="col-md-12">
      <h4>Buy Orders List</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Max Bid Price</th>
            <th>Data Package Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
          <td>{{order.name}}</td>
          <td>${{order.max_bid_price}}</td>
          <td>{{order.data_package_type.title}}</td>
          <td><router-link :to="'/order/' + order.id" class="badge badge-warning">Edit</router-link></td>
          <td><button class="badge badge-danger mr-2" @click="removeOrder(order.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "orders-list",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    retrieveOrders() {
      OrderDataService.getAll()
        .then(response => {
          this.orders = response.data.data;
          console.log(this.orders);
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

    removeOrder(id) {

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
          OrderDataService.delete(id)
          .then(response => {
            console.log(response.data);
            this.$swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
            this.refreshList();
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
    },
    refreshList(){
      this.retrieveOrders();
    },
  },
  mounted() {
    this.retrieveOrders();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
