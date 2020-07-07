<template>
  <div class="relative bg-white overflow-y-auto min-h-screen">
    <div class="mx-auto">
      <div class="relative z-10 sm:pb-16 md:pb-20 lg:w-1/2 h-screen lg:pb-28 xl:pb-32">
        <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <div class="relative pt-8 px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
              <div>
                <!-- <img class="h-6 lg:h-8 xl:h-9" src="/img/tailwindui-logo-on-dark.svg" alt="Tailwind UI"> -->
                Benzee Booking
              </div>
              <div>
                <a href="/login" class="text-xl font-semibold text-black focus:outline-none focus:underline">
                  Login →
                </a>
              </div>
            </div>
        </div>

        <main class="mx-auto max-w-screen-xl px-4 mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-12">
          <div class="lg:text-left">
            <h2 class="text-center lg:text-left text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              A Home away
              <br class="xl:hidden" />
              <span class="text-indigo-600">from Home</span>
            </h2>
            <p class="text-center lg:text-left mt-3 text-xl text-gray-500 sm:mt-5 sm:text-2xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
               We'd love to be your second home. Book a room and let's make you feel at home
            </p>
            <div class="bg-gray-50 rounded-lg overflow-hidden lg:px-10 px-4 py-10 transform transition sm:w-full mt-10 mb-10">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <form class="px-4 py-10 border-gray-200 sm:px-6">
                    <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Duration</label>
                    <select aria-label="Type" v-model="duration" class="form-select block appearance-none text-gray-600 w-full bg-white border border-gray-200 shadow-inner px-4 pr-12 py-5 rounded">
                          <option disabled selected value>Choose Duration of stay</option>
                          <option value="text">9-months</option>
                          <option value="stream">12-months</option>
                    </select>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Full Name</label>
                      <input type="text" name="fullname" v-model="fullname" class="form-input block w-full pl-7 pr-12 py-5 sm:text-sm sm:leading-5" required />
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Email</label>
                      <input type="email" name="email" v-model="email" class="form-input block w-full pl-7 pr-12 py-5 sm:text-sm sm:leading-5" required />
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Telphone</label>
                      <input type="tel" name="telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="email" class="form-input block w-full pl-7 pr-12 py-5 sm:text-sm sm:leading-5" required />
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Nationality</label>
                      <country-select v-model="nationality" :country="country" topCountry="US" class="form-select block appearance-none text-gray-600 w-full bg-white border border-gray-200 shadow-inner px-4 pr-12 py-5 rounded" />                 
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Instituition</label>
                      <input type="text" name="text" v-model="instituition" class="form-input block w-full pl-7 pr-12 py-5 sm:text-sm sm:leading-5" required />
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Room Type</label>
                      <select aria-label="Type" v-model="room_type" class="form-select block appearance-none text-gray-600 w-full bg-white border border-gray-200 shadow-inner px-4 pr-12 py-5 rounded">
                            <option disabled selected value>Choose Type</option>
                            <option v-for="data in room_types" v-bind:key="data.id" :value="data">{{data.room_type}}</option>
                      </select>
                    </div>

                    <div class="mt-10 flex-shrink w-full inline-block relative">
                      <label for="category" class="block text-md md:text-2xl leading-5 mb-3 font-semibold text-gray-600">Level</label>
                      <select aria-label="Type" v-model="level" class="form-select block appearance-none text-gray-600 w-full bg-white border border-gray-200 shadow-inner px-4 pr-12 py-5 rounded">
                        <option disabled selected value>Choose Room Type</option>
                        <option value="text">100</option>
                        <option value="stream">200</option>
                        <option value="stream">300</option>
                        <option value="stream">400</option>
                      </select>
                    </div>

                    <div class="rounded-md shadow mt-10">
                      <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-xl leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        Book Room
                      </a>
                    </div>
                </form>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>

    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
      <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit" alt="sample-room" />
    </div>
</div>
</template>

<script>
import json from '../../json/room-types.json'

export default {
  name: "HelloWorld",
  data: () => ({
    isOn: false,
    country:'',
    room_types: json
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
