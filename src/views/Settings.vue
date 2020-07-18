<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Select Academic Year</h1>  
      </div>
    </template>

    <template v-slot:content>
      <div class="flex items-center justify-center py-10 px-4 lg:px-8">
          <div class="bg-white rounded-lg overflow-hidden shadow transform sm:max-w-lg sm:w-full transition duration-150 ease-in-out" aria-labelledby="modal-headline">
              <div class="bg-white px-4 sm:pb-10">
                  <flip-select-input-with-label
                  class="mt-2 flex-shrink w-full inline-block relative px-2 mb-5 md:mb-0"
                  label-name="Academic Year"
                  input-name="academic_year"
                  option-title="Choose an acdemic year"
                  :required="true"
                  :options="roomTypes"
                  ></flip-select-input-with-label>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo ease-in-out duration-150 sm:text-sm sm:leading-5">
                      Save Academic Year
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
import FlipSelectInputWithLabel from "../components/SelectInputWithLabel";

export default {
  name: "RoomList",
  components: {
    DashboardLayout,
    FlipSelectInputWithLabel
  }
};
</script>