<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Add a Room</h1>  
      </div>
    </template>

    <template v-slot:content>
        <div class="flex items-center justify-center py-2 px-4 sm:px-6">
          <div v-if="roomCreated" class="mt-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-bold">Room has been Added</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg overflow-hidden shadow transform sm:max-w-lg sm:w-full transition duration-150 ease-in-out" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <flip-input-with-label
                    class="mt-2 flex-shrink w-full inline-block relative"
                    label-name="Room Name"
                    input-type="text"
                    input-name="room_name"
                    :required="true"
                    v-model="room.name"
                    ></flip-input-with-label>

                   <flip-select-input-with-label
                    class="mt-2 flex-shrink w-full inline-block relative"
                    label-name="Room Type"
                    input-name="room"
                    option-title="Choose Room Type"
                    :required="true"
                    :options="roomTypes"
                    v-model="room.type"
                    ></flip-select-input-with-label>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button v-on:click="addRoom()" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Add a room
                        </button>
                    </span>
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
import {CREATE_ROOM} from '@/graphql/mutations'
import { GET_ROOMS , GET_ROOM_TYPES} from '@/graphql/queries'


export default {
  name: "AddRoom",
  components: {
    DashboardLayout,
    FlipInputWithLabel,
    FlipSelectInputWithLabel
  },
  apollo: {
    rooms: {
      query: GET_ROOMS
    },
    room_types: {
      query: GET_ROOM_TYPES
    },
  },
   data: () => ({
    room_types: [],
    roomCreated: false,
    room:{
      name:null,
      type:null,
    }
   }),
   computed:{
    roomTypes: function() {
      return this.room_types.map((type) => {
        return {
          key: type.id,
          label: type.title,
          value: type.id
        }
      })
    }
   },
   methods:{
    async addRoom(){
      const {name, type} = this.room;
      
      await this.$apollo.mutate({
        mutation: CREATE_ROOM,
        variables: {
          roomName: name,
          roomType: type
        },
        update: (cache, { data: { insert_rooms } }) => {
          const data = cache.readQuery({
             query: GET_ROOMS
           });
           const insertRoom = insert_rooms.returning;
           data.rooms.push(insertRoom[0]);
           cache.writeQuery({
             query: GET_ROOMS,
             data
           });
          return insert_rooms
       },
      })
      this.roomCreated = true
        // this.$router.replace("/rooms")
      
    }
   }
  
};
</script>