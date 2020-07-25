<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">Booking Details </h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                <div v-if="booking" class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                
                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                     {{duration_amount}}
                </div>
                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    Submitted on {{bookingDate}}
                </div>
                </div>
            </div>
          </div>
           <div v-if="!$apollo.queries.booking.loading && !booking[0].is_available" class="mt-5 flex flex-wrap lg:mt-0 lg:ml-4"> 
            <span class="shadow-sm rounded-md pr-4 md:pr-0">
              <button v-on:click="approveRequest()" class="inline-flex items-center px-4 py-2 bg-indigo-200 text-sm leading-5 font-medium rounded-md text-indigo-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                Approve Request
              </button>
            </span>

            <span class="sm:ml-3 shadow-sm rounded-md">
              <button v-on:click="declineRequest()" type="submit" class="inline-flex items-center px-4 py-2 bg-red-200 text-sm leading-5 font-medium rounded-md text-red-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-red focus:border-red-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                Decline Request
              </button>
            </span>
          </div> 
      </div>
    </template>

    <template v-slot:content>
      <div v-if="roomAssigned" class="mt-2 mb-6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Room has been assigned</p>
            <br>
          </div>
        </div>
      </div>

      <div v-if="bookingApproved" class="my-6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Booking Request Approved!</p>
            <p class="text-sm">An email notification has been sent out to <b>{{bookingDetails.resident.email}}</b> to make payment</p>
          </div>
        </div>
      </div>

      <div v-if="booking[0].is_available && bookingDetails.is_paid" class="my-4 mx-4 md:flex transform transition duration-150 ease-in-out" aria-labelledby="modal-headline">
        <flip-select-input-with-label
          class="md:mr-6 md:w-2/3"
          input-name="room"
          option-title="Assign booking a room"
          :required="true"
          :options="roomsList"
          v-model="room"
        ></flip-select-input-with-label>
        <button v-on:click="assignRoom()" type="submit" class="my-4 md:my-10 w-full md:w-1/3 justify-center py-3 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out">
          Assign Room
        </button>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg mx-4">
        <div v-if="!$apollo.queries.booking.loading" class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Booking Details
            <span v-if="!bookingDetails.is_available" class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending Approval
            </span>
            <span v-if="bookingDetails.is_available && !bookingDetails.is_paid" class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
              Pending Payment
            </span>
             <span v-if="booking[0].is_available && bookingDetails.is_paid" class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Awaiting Room Assignment
            </span>
          </h3>
          
        </div>
        
         <div v-if="!$apollo.queries.booking.loading">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
               {{bookingDetails.resident.name}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Email
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.resident.email}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Telephone
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.resident.telephone}}
            </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Nationality
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.resident.nationality}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Institution
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.resident.institution}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Level
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.resident.level}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Room Type
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.room_type.title}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Duration
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{bookingDetails.duration}}
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
import FlipSelectInputWithLabel from "@/components/SelectInputWithLabel";

import { GET_BOOKING_DETAILS } from '@/graphql/queries'
import {APPROVE_BOOKING_REQUEST} from '@/graphql/mutations'
import {DECLINE_BOOKING_REQUEST} from '@/graphql/mutations'
import { GET_BOOKINGS } from '@/graphql/queries'
import { GET_ROOMS } from '@/graphql/queries'
import {ASSIGN_ROOM} from '@/graphql/mutations'
import {UPDATE_RESIDENT} from '@/graphql/mutations'


import moment from 'moment'

export default {
  name: "BookingDetails",
  components: {
    DashboardLayout,
    FlipSelectInputWithLabel
  },
   mounted: function(){
    this.bookingId = this.$route.params.bookingId
  },
  data() {
    return{
      bookingId: null,
      room: null,
      bookingApproved: false,
      roomAssigned: false
    }
  },

  apollo: {
    booking: {
      query: GET_BOOKING_DETAILS,
      variables (){
        return {
          id: this.bookingId
        }
      },
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    },
    bookings: {
      query: GET_BOOKINGS
    },
    rooms: {
        query: GET_ROOMS
    }
  },
  methods:{
    async approveRequest(){
     await this.$apollo.mutate({
        mutation: APPROVE_BOOKING_REQUEST,
        variables:{
          id:  this.bookingId,
          is_available: true
        },
        update: (cache, { data: { update_bookings } }) => {
          if (update_bookings.affected_rows ) {
            // Read the data from our cache for this query.
            const data = cache.readQuery({
              query: GET_BOOKINGS
            });
            const updatedBooking = data.bookings.find(booking => booking.id === this.bookingId);
            updatedBooking.is_available = true
            cache.writeQuery({
              query: GET_BOOKINGS,
              data
            })
            this.bookingApproved = true  
           } 
         }
      })
    },
    async declineRequest(){
     await this.$apollo.mutate({
        mutation: DECLINE_BOOKING_REQUEST,
        variables:{
          id:  this.bookingId,
          is_deleted: true
        },
        update: (cache, { data: { update_bookings } }) => {
          if (update_bookings.affected_rows ) {
            const data = cache.readQuery({
              query: GET_BOOKINGS
            });
            const updatedBooking = data.bookings.find(booking => booking.id === this.bookingId);
            updatedBooking.is_deleted = true
            cache.writeQuery({
              query: GET_BOOKINGS,
              data
            })
            return update_bookings    
           } 
        }
      })
    },
    async assignRoom(){
      await this.$apollo.mutate({
        mutation: ASSIGN_ROOM,
        variables:{
          id:this.bookingId,
          roomId: this.room
        },
        update:async (cache, {data: {update_bookings_by_pk}}) =>{
          // update resident status
          await this.updateResidentStatus(this.bookingDetails.resident.id)
          const data = cache.readQuery({
              query: GET_BOOKINGS
          });
          const updatedBooking = data.bookings.find(booking => booking.id === this.bookingId);
          updatedBooking.roomId = this.room
          cache.writeQuery({
              query: GET_BOOKINGS,
              data
          })
          this.roomAssigned = true
          return update_bookings_by_pk
        }
      })
    },
    async updateResidentStatus(residentId){
      await this.$apollo.mutate({
        mutation: UPDATE_RESIDENT,
        variables:{
          id:residentId,
          status: true
        },
        update:(cache, {data: {update_residents}}) =>{
         if (update_residents.affected_rows ) {
           return update_residents
           } 
        }
      })
    }
  },
  computed: {
    duration_amount(){
      if (this.$apollo.queries.booking.loading) return 0
      const duration = this.bookingDetails.duration
      return this.bookingDetails.room_type[`amount_${duration.replace(/ /g, "_")}_duration`]
    },
    bookingDate(){
      return moment(this.booking.created_at).format("MMMM DD YYYY")
    },
    bookingDetails() {
      if (this.$apollo.queries.booking.loading) return {}
      return this.booking[0]
    },
    roomsList: function() {
      return this.rooms.map((room) => {
        return {
          key: room.id,
          label: room.name,
          value: room.id
        }
      })
    },
  },
 
};
</script>