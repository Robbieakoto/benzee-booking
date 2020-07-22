<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Booking Details </h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                <div v-if="bookings" class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                
                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                     {{duration}}
                </div>
                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    Submitted on January 9, 2020
                </div>
                </div>
          </div>
      </div>
    </template>

    <template v-slot:content>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Booking Details
            <span v-if="bookings[0].is_paid" class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Payment Completed
            </span>
            <span v-else class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending Payment
            </span>
          </h3>
        </div>
        
        <div>
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
               {{bookings[0].resident.name}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Email
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].resident.email}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Telephone
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].resident.telephone}}
            </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Nationality
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].resident.nationality}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Institution
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].resident.institution}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Level
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].resident.level}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Room Type
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].room_type.title}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Duration
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookings[0].duration}}
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { GET_BOOKING_DETAILS } from '@/graphql/queries'

export default {
  name: "BookingDetails",
  components: {
    DashboardLayout
  },
  apollo: {
    bookings: {
      query: GET_BOOKING_DETAILS,
      variables (){
        return {
          id: this.bookingId
        }
      },
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }
  },
  data() {
    return{
      bookingId: null
    }
  },
  mounted: function(){
    this.bookingId = this.$route.params.bookingId
  },
  computed: {
    duration(){
      const duration = this.bookings[0].duration
      return this.bookings[0].room_type[`amount_${duration.replace(/ /g, "_")}_duration`]
    }

  }
};
</script>