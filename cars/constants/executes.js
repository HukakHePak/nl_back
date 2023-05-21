const { admin, manager, stuff, unauth, director } = require("./access")

const { P, F } = require("./type")

const executes = {
  // USER
  authorize: {
    access: unauth,
    type: P
  },
  change_password: {
    access: [director, admin, manager, stuff],
    type: P
  },
  get_users: {
    access: [admin],
    type: P
  },
  get_users_by_filter: {
    access: [admin],
    type: P
  },
  edit_user: {
    access: [admin]
  },

  // STATISTIC
  get_order_statistic: {
    access: [director]
  },

  // CARS
  get_cars: {
    access: [manager, director, stuff],
    type: P
  },
  get_public_cars: {
    access: unauth,
    type: P
  },
  get_cars_by_filter: {
    access: [manager, director, stuff]
  },
  create_car: {
    access: [stuff]
  },
  edit_car: {
    access: [stuff]
  },
  get_car_info: {
    access: unauth
  },
  is_car_sold: {
    access: [director, manager],
    type: F
  },
  is_car_reserved: {
    access: [manager],
    type: F
  },
  who_reserve_car: {
    access: [manager]
  },

  // BRAND
  create_brand: {
    access: [stuff],
    type: P
  },
  delete_brand: {
    access: [stuff],
    type: P
  },
  get_brands: {
    access: unauth,
    type: P
  },

  // MODEL
  get_models_by_brand: {
    access: unauth
  },
  create_model: {
    access: [stuff]
  },
  delete_model: {
    access: [stuff]
  },
  // ENGINE
  get_engines_by_filter: {
    access: unauth
  },
  create_engine: {
    access: [stuff]
  },
  delete_engine: {
    access: [stuff]
  },

  // TYPES
  get_compress_types: {
    access: unauth
  },
  get_fuel_types: {
    access: unauth
  },
  get_kpp_types: {
    access: unauth
  },
  get_drive_types: {
    access: unauth
  },
  get_option_types: {
    access: unauth
  },

  // COMPLECTATION
  get_complectation_names: {
    access: unauth,
    type: P
  },
  get_complectations_by_model: {
    access: unauth,
    type: P
  },
  delete_complectation: {
    access: [stuff]
  },
  create_complectation: {
    access: [stuff]
  },

  // OPTIONS
  delete_option: {
    access: [stuff]
  },
  create_option: {
    access: [stuff]
  },
  get_car_complect_options: {
    access: unauth
  },
  get_order_options: {
    access: [director, manager]
  },
  create_order_option: {
    access: [manager]
  },
  delete_order_option: {
    access: [manager]
  },
  get_option_avialable_amount: {
    access: [manager, stuff],
    type: F
  },
  create_option_arrive: {
    access: [stuff]
  },
  get_options_by_filter: {
    access: [unauth, stuff, manager]
  },

  // ORDER
  create_order: {
    access: [manager]
  },
  delete_order: {
    access: [manager]
  },
  make_order_sold: {
    access: [manager]
  },
  make_order_reserved: {
    access: [manager]
  },
  unreserve_order: {
    access: [manager]
  },

  // PAYMENT
  get_order_payments: {
    access: [director, manager]
  },
  create_payment: {
    access: [manager]
  },
  cancel_payment: {
    access: [manager]
  },

  // CUSTOMER
  create_customer: {
    access: [manager]
  },
  edit_customer: {
    access: [manager]
  },
  get_customers_by_filter: {
    access: [manager]
  }
}

module.exports = executes
