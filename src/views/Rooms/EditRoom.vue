<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Edit Room</h1>  
      </div>
    </template>

    <template v-slot:content>
        <div v-if="!$apollo.queries.room.loading" class="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
          <div>
            <div v-if="roomIsUpdated" class="flex items-center sm:px-6 lg:px-8 sm:max-w-lg sm:w-full my-6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Room has been updated</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg overflow-hidden shadow transform sm:max-w-lg sm:w-full transition duration-150 ease-in-out" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <flip-input-with-label
                    class="mt-2 flex-shrink w-full inline-block relative"
                    label-name="Room Name"
                    input-type="text"
                    input-name="room_name"
                    :required="true"
                    v-model="roomDetails.name"
                    :value="roomDetails.name"
                    ></flip-input-with-label>

                   <flip-select-input-with-label
                    class="mt-2 flex-shrink w-full inline-block relative"
                    label-name="Room Type"
                    input-name="room"
                    option-title="Choose Room Type"
                    :required="true"
                    :options="roomTypes"
                    v-model="room_type_id"
                    :selected-option="selectedRoom"
                    ></flip-select-input-with-label>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button v-on:click="updateRoom()" type="submit" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo ease-in-out duration-150 sm:text-sm sm:leading-5">
                          Update room
                        </button>
                    </span>
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <router-link :to="{name: 'room-list'}" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Cancel
                        </router-link>
                    </span>
                </div>
            </div>
          </div>
        </div>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import FlipInputWithLabel from "../../components/InputWithLabel";
import FlipSelectInputWithLabel from "../../components/SelectInputWithLabel";
import { GET_ROOM_TYPES, GET_ROOM_DETAILS, GET_ROOMS} from '@/graphql/queries'
import {UPDATE_ROOM} from '@/graphql/mutations'
export default {
  name: "EditRoom",
  components: {
    DashboardLayout,
    FlipInputWithLabel,
    FlipSelectInputWithLabel
  },
  mounted: function(){
    this.roomId = this.$route.params.roomId
  },
   data() {
     return{
      room_types: [],
      room_type_id: null,
      roomId: null,
      roomIsUpdated: false
     } 
  },
   apollo: {
    room_types: {
      query: GET_ROOM_TYPES,
      error (error) {
        this.error = JSON.stringify(error.message).split(': ')[1]
      }
    },
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
    }
   },
   computed: {
    roomTypes() {
      return this.room_types.map((type) => {
        return {
          key: type.id,
          label: type.title,
          value: type.id
        }
      })
    },
    roomDetails(){
      if (this.$apollo.queries.room.loading) return {}
      return this.room[0]
    },
    selectedRoom() {
      return {
        id: this.roomDetails.room_type.id,
        title: this.roomDetails.room_type.title,
      }
    }
  },
  methods:{
    async updateRoom(){
      this.roomIsUpdated = false
      if (!this.room_type_id) {
        this.room_type_id = this.selectedRoom.id
      }
      await this.$apollo.mutate({
         mutation: UPDATE_ROOM,
         variables:{ 
           id: this.roomId,
           roomTypeId: this.room_type_id,
           roomName: this.roomDetails.name
         },
         update:(cache, {data:{update_rooms} }) => {
          if (update_rooms.affected_rows ) {
            this.roomIsUpdated = true
            const data = cache.readQuery({
              query: GET_ROOMS
            });
            
            const roomIndex = data.rooms.findIndex(room => room.id === this.roomId);
            const selectedRoomTypeDetails = this.room_types.find(room_type => room_type.id === this.room_type_id)
            
            data.rooms[roomIndex].name =  this.roomDetails.name
            data.rooms[roomIndex].room_type.id =  this.room_type_id
            data.rooms[roomIndex].room_type.title = selectedRoomTypeDetails.title
            data.rooms[roomIndex].room_type.number_of_occupants = selectedRoomTypeDetails.number_of_occupants
            
            cache.writeQuery({
              query: GET_ROOMS,
              data
            });
           } 
         }
      })
      }
    }
};
</script>