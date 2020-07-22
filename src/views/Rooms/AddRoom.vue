<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Add a Room</h1>  
      </div>
    </template>

    <template v-slot:content>
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
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <router-link :to="{name: 'room-list'}" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Cancel
                        </router-link>
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
           data.todos.push(insertRoom[0]);
           cache.writeQuery({
             query: GET_ROOMS,
             data
           });
          return insert_rooms
       },
      })
      
    }
   }
  
};
</script>