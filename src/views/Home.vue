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

            <div v-if="bookingSubmitted" class="mt-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Booking Request Submitted!</p>
                  <p class="text-sm">Keep an eye on your <b>email ({{ resident.email }})</b> as we review and confirm your request.</p>
                  <br>
                  <p class="text-sm">Thank you, for choosing BenZee Residency</p>
                </div>
              </div>
            </div>

            <div v-if="error" class="mt-2 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1">
                  <svg class="h-6 w-6 text-red-600 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  </div>
                <div>
                  <p class="font-bold">Whoops! something went wrong</p>
                  <p class="text-sm">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- booking form section -->
            <div class="py-8 border-gray-200 lg:w-full">
              <flip-input-with-label
                label-name="Full Name"
                input-type="text"
                input-name="fullname"
                :required="true"
                v-model="resident.fullname"
              ></flip-input-with-label>

              <div class="flex flex-wrap -mx-3">
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Email"
                  input-type="email"
                  input-name="email"
                  :required="true"
                  v-model="resident.email"
                ></flip-input-with-label>
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Telephone"
                  input-type="tel"
                  input-name="telephone"
                  :required="true"
                  v-model="resident.telephone"
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
                  v-model="resident.nationality"
                ></flip-select-input-with-label>
                <flip-input-with-label
                  class="mt-8 flex-shrink w-full md:w-1/2 inline-block relative px-3"
                  label-name="Institution"
                  input-type="text"
                  input-name="institution"
                  :required="true"
                  v-model="resident.institution"
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
                  v-model="resident.level"
                ></flip-select-input-with-label>
                <flip-select-input-with-label
                  class="md:w-1/2 px-3"
                  label-name="Room Type"
                  input-name="room"
                  option-title="Choose Room Type"
                  :required="true"
                  :options="roomTypes"
                  v-model="booking.roomType"
                ></flip-select-input-with-label>
              </div>

              <flip-select-input-with-label
                label-name="Duration"
                input-name="duration"
                option-title="Choose Duration of Stay"
                :required="true"
                :options="duration"
                v-model="booking.duration"
              ></flip-select-input-with-label>

              <div v-if="feeEstimate != 0" class="bg-gray-100 h-auto mt-6 rounded-lg shadow-inner p-4">
                  <div class="w-full text-center text-gray-700 flex flex-wrap justify-center">
                      <div class="font-bold md:w-2/5 w-full pb-2">
                          <span class="text-xl">$</span>
                          <span class="text-3xl mr-2"> {{ feeEstimate }} </span>                               
                      </div>
                      <div class="md:w-3/5 w-full">
                          <span class="text-sm font-medium">
                              This is your hostel fee for 
                              <span id="estimate-duration">{{ booking.duration }}</span>. Electricity bills not inclusive 
                          </span>
                      </div>
                  </div>
              </div>

              <div class="rounded-md shadow mt-4">
                <flip-button label="Book a room" @button-clicked="storeBookingRequest()">
                  <svg 
                    class="icon-book-open h-6 w-6 text-indigo-300 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <g>
                      <path fill-rule="evenodd" class="secondary" d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"/>
                      <path class="primary" d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"/>
                    </g>
                  </svg>
                </flip-button>
              </div>
            </div>
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
// import roomTypes from "../../json/room-types.json";
import countries from "../../json/countries.json";

import Logo from "../components/Logo";
import FlipButton from "../components/Button";
import FlipInputWithLabel from "../components/InputWithLabel";
import FlipSelectInputWithLabel from "../components/SelectInputWithLabel";

import { GET_ROOM_TYPES, GET_CURRENT_ACADEMIC_YEAR } from '@/graphql/queries'
import { CREATE_RESIDENT, CREATE_BOOKING } from '@/graphql/mutations'

export default {
  name: "Home",
  components: {
    Logo,
    FlipButton,
    FlipInputWithLabel,
    FlipSelectInputWithLabel
  },
  apollo: {
    room_types: {
      query: GET_ROOM_TYPES,
      error (error) {
        this.error = JSON.stringify(error.message).split(': ')[1]
      }
    },
    academic_year: {
      query: GET_CURRENT_ACADEMIC_YEAR,
      error (error) {
        this.error = JSON.stringify(error.message).split(': ')[1]
      }
    }
  },
  data: () => ({
    error: null,
    bookingSubmitted: false,
    country: "",
    room_types: [],
    academic_year: null,
    countries,
    resident: {
      fullname: null,
      email: null,
      telephone: null,
      nationality: null,
      institution: null,
      level: null,
    },
    booking: {
      roomType: null,
      duration: null,
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
    async storeBookingRequest() {
      const residentId = await this.addResident(this.resident)
      if (!residentId) {
        console.log("Failed", )
      }

      let bookingId;
      const academicYear = this.currentAcademicYear
      const { roomType, duration} = this.booking;

      await this.$apollo.mutate({
       mutation: CREATE_BOOKING,
       variables: {
         residentId,
         roomType,
         duration,
         academicYear
       },
       update: (cache, { data: { insert_bookings } }) => {
         bookingId = insert_bookings.returning[0].id
       },
     });

     if (!bookingId) {
       this.error = "There seems to be an issue on our end. Kindly notify as to fix it"
     }

     this.bookingSubmitted = true
     window.scrollTo(0,0)
    },

    async addResident(residentDetails) {
      const { fullname, email, telephone, nationality, institution, level } = residentDetails;
      
      if (!fullname || !email || !telephone || !nationality || !institution || !level) return null
      
      let newResidentId;

      await this.$apollo.mutate({
        mutation: CREATE_RESIDENT,
        variables: {
          fullname,
          email,
          telephone,
          nationality,
          institution,
          level
        },
        update: (cache, { data: { insert_residents } }) => {
          newResidentId = insert_residents.returning[0].id
        },
      });
      return newResidentId
    }
  },
  computed: {
    roomTypes: function() {
      return this.room_types.map((type) => {
        return {
          key: type.id,
          label: type.title,
          value: type.id
        }
      })
    },
    feeEstimate() {
      if (!this.booking.roomType || !this.booking.duration) return 0.00
      const roomTypeDetails = this.room_types.filter((room) => room.id === this.booking.roomType)
      const roomDuration = `amount_${this.booking.duration.replace(/ /g,"_")}_duration`
      return roomTypeDetails[0][roomDuration].substr(1)
    },
    currentAcademicYear() {
      return this.academic_year[0].id
    } 
  }
};
</script>
