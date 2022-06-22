import http from "../http-common";

class OrderDataService {
  getAllDataPackageTypes() {
    return http.get("/data_package_types");
  }
  getAll() {
    return http.get("/orders");
  }

  get(id) {
    return http.get(`/order/${id}`);
  }

  create(data) {
    console.table(data);
    return http.post("/order", data);
  }

  update(id, data) {
    return http.put(`/order/${id}`, data);
  }

  delete(id) {
    return http.delete(`/order/${id}`);
  }
}

export default new OrderDataService();
