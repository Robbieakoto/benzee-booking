<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Residents</h1>
        <span class="sm:ml-3 shadow-sm rounded-md">
        </span>
      </div>
    </template>

    <template v-slot:content>
      <div class="flex flex-col m-2 sm:m-0">
        <div class="py-10 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
          >
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >Name</th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >Room</th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >Telephone</th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="resident in residents" :key="resident.id">
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm leading-5 font-medium text-gray-900">{{resident.name}}</div>
                        <div class="text-sm leading-5 text-gray-500">{{resident.level}} - {{resident.institution}}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div v-if="resident.bookings.room" class="text-sm leading-5 text-gray-900">{{ resident.bookings[0].room.name }}</div>
                    <div v-else class="text-sm leading-5 text-gray-900">N/A</div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                  >
                    <div class="text-sm leading-5 text-gray-900">
                      {{resident.telephone}}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                  >
                    <span
                      class="inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-green-800"
                    >
                      <router-link :to="`/resident-details/${resident.id}`">
                        <svg class="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </router-link>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div
              class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            >
              <div class="hidden sm:block">
                <p class="text-sm leading-5 text-gray-700">
                  Showing
                  <span class="font-medium">1</span>
                  to
                  <span class="font-medium">10</span>
                  of
                  <span class="font-medium">20</span>
                  results
                </p>
              </div>
              <div class="flex-1 flex justify-between sm:justify-end">
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >Previous</a>
                <a
                  href="#"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >Next</a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { GET_RESIDENTS } from '@/graphql/queries'

export default {
  name: "Residents",
  components: {
    DashboardLayout
  },
  apollo: {
    residents: {
      query: GET_RESIDENTS
    }
  }
};
</script>