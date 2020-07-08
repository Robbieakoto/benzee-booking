<template>
  <div class="relative bg-white min-h-screen">
    <div class="mx-auto px-8 sm:px-20 lg:p-0 xl:px-16">
      <div class="relative z-10 lg:w-1/2 lg:px-10">
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 w-48 min-h-screen text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <div
          class="flex items-center justify-between relative pt-12 md:pt-24 lg:px-10 xl:px-20 lg:pb-8"
        >
          <div class="text-2xl text-gray-600">Benzee Booking</div>
          <div>
            <a
              href="/login"
              class="text-sm font-medium text-gray-500 focus:outline-none focus:underline"
            >Login →</a>
          </div>
        </div>

        <main
          class="mx-auto max-w-screen-xl mt-10 sm:mt-12 lg:mt-4 relative w-full lg:flex lg:items-center lg:justify-center lg:w-4/5"
        >
          <div class="text-left">
            <h2 class="text-4xl font-extrabold text-gray-800 leading-tight sm:leading-none">
              A Home away from Home
              <br class="xl:hidden" />
            </h2>
            <p
              class="mt-3 text-xl text-gray-500 sm:mt-5 sm:text-2xl sm:max-w-xl md:mt-5 md:text-xl lg:mx-0"
            >We'd love to be your second home. Book a room and let's make you feel at home.</p>
            <!-- booking form section -->
            <form class="py-12 border-gray-200 lg:w-full mb-8" @submit.prevent="bookroom">
              <label
                for="category"
                class="block mb-2 leading-none text-gray-800 font-medium"
              >Full Name</label>
              <input
                type="text"
                name="fullname"
                v-model="fullname"
                class="form-input border-gray-300 shadow-sm block w-full pl-7 pr-12 py-3 sm:text-sm sm:leading-5"
                required
              />

              <div class="flex flex-wrap -mx-3">
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >Email</label>
                  <input
                    type="email"
                    name="email"
                    v-model="email"
                    class="form-input border-gray-300 shadow-sm block w-full pl-7 pr-12 py-3 sm:text-sm sm:leading-5"
                    required
                  />
                </div>
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >Telephone</label>
                  <input
                    type="tel"
                    name="telephone"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    v-model="telephone"
                    class="form-input border-gray-300 shadow-sm block w-full pl-7 pr-12 py-3 sm:text-sm sm:leading-5"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3">
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >Nationality</label>
                  <select
                    aria-label="Type"
                    v-model="nationality"
                    class="form-select shadow-sm block appearance-none text-gray-600 w-full bg-white border border-gray-300 px-4 pr-12 py-3 rounded"
                  >
                    <option disabled selected value>Choose Nationality</option>
                    <option
                      v-for="data in countries"
                      v-bind:key="data.countryShortCode"
                      :value="data"
                    >{{data.countryName}}</option>
                  </select>
                </div>
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >Instituition</label>
                  <input
                    type="text"
                    name="text"
                    v-model="instituition"
                    class="form-input border-gray-300 shadow-sm block w-full pl-7 pr-12 py-3 sm:text-sm sm:leading-5"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3">
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >What level are you?</label>
                  <select
                    aria-label="Type"
                    v-model="level"
                    class="form-select shadow-sm block appearance-none text-gray-600 w-full bg-white border border-gray-300 px-4 pr-12 py-3 rounded"
                  >
                    <option disabled selected value>Choose your level</option>
                    <option value="text">1st Year</option>
                    <option value="stream">2nd Year</option>
                    <option value="stream">3rd Year</option>
                    <option value="stream">4th Year</option>
                    <option value="stream">Foundation</option>
                  </select>
                </div>
                <div class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3">
                  <label
                    for="category"
                    class="block mb-2 leading-none text-gray-800 font-medium"
                  >Room Type</label>
                  <select
                    aria-label="Type"
                    v-model="room_type"
                    class="form-select shadow-sm block appearance-none text-gray-600 w-full bg-white border border-gray-300 px-4 pr-12 py-3 rounded"
                  >
                    <option disabled selected value>Choose Type</option>
                    <option
                      v-for="data in room_types"
                      v-bind:key="data.id"
                      :value="data"
                    >{{data.room_type}}</option>
                  </select>
                </div>
              </div>

              <div class="mt-8 flex-shrink w-full inline-block relative">
                <label
                  for="category"
                  class="block mb-2 leading-none text-gray-800 font-medium"
                >Duration</label>
                <select
                  aria-label="Type"
                  v-model="duration"
                  class="form-select shadow-sm block appearance-none text-gray-600 w-full bg-white border border-gray-300 px-4 pr-12 py-3 rounded"
                >
                  <option disabled selected value>Choose Duration of stay</option>
                  <option value="text">9 months</option>
                  <option value="stream">12 months</option>
                </select>
              </div>

              <div class="rounded-md shadow mt-10">
                <a
                  href="#"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >Book a room</a>
              </div>
            </form>
            <!-- booking form ends here -->
          </div>
        </main>
      </div>
    </div>

    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
      <img
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit"
        alt="sample-room"
      />
    </div>
  </div>
</template>

<script>
import room_types from "../../json/room-types.json";
import countries from "../../json/countries.json";

export default {
  name: "HomePage",
  data: () => ({
    country: "",
    room_types: room_types,
    countries: countries,
    booking: {
      fullname: "",
      email: "",
      telephone: "",
      nationality: "",
      instituition: "",
      level: "",
      room_type: "",
      duration: ""
    }
  }),
  methods: {
    bookroom() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
