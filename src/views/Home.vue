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
          class="flex items-center justify-between relative pt-8 md:pt-16 px-0 lg:px-10 xl:px-20 lg:pb-8"
        >
          <logo></logo>
          <div>
            <router-link
              :to="{name: 'login'}"
              class="text-sm font-medium text-gray-500 focus:outline-none focus:underline"
            >Login →</router-link>
          </div>
        </div>
        <main
          class="mx-auto max-w-screen-xl mt-8 relative w-full lg:flex lg:items-center lg:justify-center lg:w-4/5"
        >
          <div class="text-left">
            <h2 class="text-4xl font-extrabold text-gray-800 leading-tight sm:leading-none">
              A Home away from Home
              <br class="xl:hidden" />
            </h2>
            <p
              class="mt-3 text-xl text-gray-500 sm:text-2xl sm:max-w-xl md:text-xl lg:mx-0"
            >We can't wait to be your second home. Book a room and let's make you feel at home.</p>
            <!-- booking form section -->
            <form class="py-8 border-gray-200 lg:w-full" @submit.prevent="bookroom">
              <flip-input-with-label
                label-name="Full Name"
                input-type="text"
                input-name="fullname"
                :required="true"
              ></flip-input-with-label>

              <div class="flex flex-wrap -mx-3">
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Email"
                  input-type="email"
                  input-name="email"
                  :required="true"
                ></flip-input-with-label>
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Telephone"
                  input-type="tel"
                  input-name="telephone"
                  :required="true"
                ></flip-input-with-label>
              </div>

              <div class="flex flex-wrap -mx-3">
                <flip-select-input-with-label
                  class="md:w-1/2 px-3"
                  label-name="Nationality"
                  input-name="nationality"
                  option-title="Choose your nationality"
                  :required="true"
                  :options="countries"
                ></flip-select-input-with-label>
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Instituition"
                  input-type="text"
                  input-name="instituition"
                  :required="true"
                ></flip-input-with-label>
              </div>

              <div class="flex flex-wrap -mx-3">
                <flip-select-input-with-label
                  class="md:w-1/2 px-3"
                  label-name="What level are you?"
                  input-name="level"
                  option-title="Choose your level"
                  :required="true"
                  :options="levelOptions"
                ></flip-select-input-with-label>
                <flip-select-input-with-label
                  class="md:w-1/2 px-3"
                  label-name="Room Type"
                  input-name="room"
                  option-title="Choose Room Type"
                  :required="true"
                  :options="roomTypes"
                ></flip-select-input-with-label>
              </div>

              <flip-select-input-with-label
                label-name="Duration"
                input-name="duration"
                option-title="Choose Duration of Stay"
                :required="true"
                :options="duration"
              ></flip-select-input-with-label>

              <div class="rounded-md shadow mt-10">
                <flip-button label="Book a room">
                  <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </flip-button>
              </div>
            </form>
            <!-- booking form ends here -->
          </div>
        </main>
      </div>
    </div>

    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
      <img class="h-full w-full" src="@/assets/images/sample-image.jpg" alt="sample-room" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import roomTypes from "../../json/room-types.json";
import countries from "../../json/countries.json";

import Logo from "../components/Logo";
import FlipButton from "../components/Button";
import FlipInputWithLabel from "../components/InputWithLabel";
import FlipSelectInputWithLabel from "../components/SelectInputWithLabel";

export default {
  name: "Home",
  components: {
    Logo,
    FlipButton,
    FlipInputWithLabel,
    FlipSelectInputWithLabel
  },
  data: () => ({
    country: "",
    roomTypes,
    countries,
    booking: {
      fullname: "",
      email: "",
      telephone: "",
      nationality: "",
      instituition: "",
      level: "",
      room_type: "",
      duration: ""
    },
    duration: [
      {
        key: 1,
        value: "9 months",
        label: "9 months"
      },
      {
        key: 2,
        value: "12 months",
        label: "12 months"
      }
    ],
    levelOptions: [
      {
        key: 1,
        value: "1st Year",
        label: "1st Year"
      },
      {
        key: 2,
        value: "2nd Year",
        label: "2nd Year"
      },
      {
        key: 3,
        value: "3rd Year",
        label: "3rd Year"
      },
      {
        key: 4,
        value: "4th Year",
        label: "4th Year"
      },
      {
        key: 5,
        value: "Foundation",
        label: "Foundation"
      }
    ]
  }),
  methods: {
    bookroom() {}
  }
};
</script>
