<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Room Details</h1>

          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <div v-if="!$apollo.queries.room.loading" class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
              {{roomDetails.room_type.amount_9_months_duration}} &ndash; {{roomDetails.room_type.amount_12_months_duration}}
            </div>
            <!-- <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              Created on {{roomCreatedAt}}
            </div> -->
          </div>
        </div>

        <div class="mt-5 flex flex-wrap lg:mt-0 lg:ml-4">
          <span class="shadow-sm rounded-md pr-4 md:pr-0">
            <router-link :to="{name: 'edit-room'}" class="inline-flex items-center px-4 py-2 bg-indigo-200 text-sm leading-5 font-medium rounded-md text-indigo-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
              <svg class="-ml-1 mr-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </router-link>
          </span>

          <span class="sm:ml-3 shadow-sm rounded-md">
            <button v-on:click="deleteRoom()" type="submit" class="inline-flex items-center px-4 py-2 bg-red-200 text-sm leading-5 font-medium rounded-md text-red-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-red focus:border-red-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
              Delete Room
            </button>
          </span>
        </div>
      </div>
    </template>

    <template v-slot:content>
      <div v-if="roomIsDeleted" class="my-6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Booking Request Approved!</p>
            <p class="text-sm">An email notification has been sent out to <b>{{bookingDetails.resident.email}}</b> to make payment</p>
          </div>
        </div>
      </div>

      <div v-if="!$apollo.queries.room.loading" class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            BG1 Details
          </h3>
        </div>
        <div>
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Name
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{roomDetails.name}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Room Type
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{roomDetails.room_type.title}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Number of Occupants
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{roomDetails.room_type.number_of_occupants}}
            </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Created On
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                {{roomCreatedAt}}
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
import { GET_ROOM_DETAILS } from '@/graphql/queries'
import { DELETE_ROOM } from '@/graphql/mutations'
import { GET_ROOMS } from '@/graphql/queries'

import moment from 'moment'

export default {
  name: "RoomDetails",
  components: {
    DashboardLayout
  },
  data() {
    return{
      roomId: null,
      roomIsDeleted: false
    }
  },
  mounted: function(){
    this.roomId = this.$route.params.roomId
  },
  apollo: {
    room: {
      query: GET_ROOM_DETAILS,
      variables (){
        return {
          id: this.roomId
        }
      },
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    },
    rooms: {
      query: GET_ROOMS,
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    }
  },
  computed:{
    roomDetails(){
      if (this.$apollo.queries.room.loading) return {}
      return this.room[0]
    },
    roomCreatedAt(){
      return moment(this.room.created_at).format("MMMM DD YYYY")
    },
    roomRangePrice(){
      return moment(this.room.amount_12_months_duration)
    }
  },
  methods: {
    async deleteRoom(){
      await this.$apollo.mutate({
        mutation: DELETE_ROOM,
        variables:{
          id: this.roomId
        },
        update: (cache, {data:{delete_rooms}})=>{
          if(delete_rooms.affected_rows){
            const data = cache.readQuery({
              query: GET_ROOMS
            });
            data.rooms = data.rooms.filter(room =>{
              return room.id !== this.roomId;
            });
            cache.writeQuery({
              query: GET_ROOMS,
              data
            });
            this.roomIsDeleted = true
          }
        }
      })
      // this.$router.replace("/rooms")
    }
  },
};
</script>