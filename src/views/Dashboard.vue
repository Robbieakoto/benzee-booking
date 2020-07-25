<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
      </div>
    </template>

    <template v-slot:content>
      <div class="bg-white shadow overflow-hidden rounded-md my-2 mb-8 md:mx-0 mx-4">
        <div class="lg:flex">
          <div class="lg:w-1/3 text-center py-8">
            <div class="lg:border-r">
              <div class="text-grey-darker mb-2">
                <span class="text-5xl">{{unpaid_bookings.aggregate.count}}</span>
              </div>
              <div class="text-sm uppercase text-grey tracking-wide">Pending Requests</div>
            </div>
          </div>
          <div class="lg:w-1/3 text-center py-8">
            <div class="lg:border-r">
              <div class="text-grey-darker mb-2">
                <span class="text-5xl">{{paid_bookings.aggregate.count}}</span>
              </div>
              <div class="text-sm uppercase text-grey tracking-wide">Paid Bookings</div>
            </div>
          </div>
          <div class="lg:w-1/3 text-center py-8">
              <div class="text-grey-darker mb-2">
                <span class="text-5xl">{{rooms.aggregate.count}}</span>
              </div>
              <div class="text-sm uppercase text-grey tracking-wide">Rooms</div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden rounded-md my-2 md:mx-0 mx-4">
        <div class="bg-white px-4 pt-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          <div class="pt-3 pb-4 sm:p-0">
            <div class="sm:hidden">
              <select
                class="form-select block w-full text-gray-900 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150"
              >
                <option>
                  <button
                    class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700 transition ease-in-out duration-150"
                    @click="changeView('bookings')"
                  >Bookings</button>
                </option>
                <option>
                  <button
                    class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition ease-in-out duration-150"
                    @click="changeView('payments')"
                  >Payments</button>
                </option>
              </select>
            </div>
            <div class="hidden sm:block">
              <div>
                <nav class="-mb-px flex">
                  <button
                    class=" whitespace-no-wrap ml-8 py-4 px-1 border-b-2 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700 transition ease-in-out duration-150"
                    active-class="border-indigo-500"
                    @click="changeView('bookings')"
                  >Bookings</button>
                  <button 
                    class="whitespace-no-wrap ml-8 py-4 px-1 border-b-2 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700 transition ease-in-out duration-150"
                    active-class="border-indigo-500"
                    @click="changeView('payments')"
                  >Payments</button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5 pb-3" v-if="currentTable == 'bookings'">
              <label for="filter" class="sr-only">Search candidates</label>
              <div class="flex rounded-md shadow-sm px-4 sm:px-6">
                <div class="relative flex-grow focus-within:z-10">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                        />
                    </svg>
                    </div>
                    <input
                    id="filter"
                    class="appearance-none rounded-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md text-gray-900 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                    placeholder="John Doe"
                    />
                </div>
                <button
                    class="-ml-px relative flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm leading-5 bg-gray-50 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                >
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clip-rule="evenodd"
                    />
                    </svg>
                    <span class="ml-2">Filter</span>
                </button>
              </div>

                <ul>
                  <li v-for="booking in bookings" :key="booking.id">
                  <router-link
                  :to="{name:'booking-details', params:{bookingId: booking.id }}"
                  class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                          <div
                              class="text-sm leading-5 font-medium text-indigo-600 truncate"
                          >{{booking.resident.name}}</div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <span class="truncate">{{booking.resident.level}} - {{booking.resident.institution}}</span>
                          </div>
                          </div>
                          <div class="hidden md:block">
                          <div>
                              <div class="text-sm leading-5 text-gray-900">
                              Submitted on
                              <time>{{bookingDate}}</time>
                              </div>
                              <div v-if="booking.is_paid" class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                  <svg
                                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  Paid
                                </div>
                                <div v-else class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                  <svg
                                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  Pending Payment
                                </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          />
                      </svg>
                      </div>
                  </div>
                  </router-link>
                  </li>
                </ul>
        </div>

        <div class="pb-3" v-if="currentTable == 'payments'">
          <div>
            <div >
              <p> No Payments have been made yet</p>
            </div>
            <ul>
              <li >
                <router-link
                :to="{name: 'payment-details'}"
                class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <div
                                  class="text-sm leading-5 font-medium text-indigo-600 truncate"
                              >Roberta Akoto</div>
                              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                  <span class="truncate">4th Year - Knustford</span>
                              </div>
                            </div>
                            <div>
                                <div class="py-4 text-sm leading-5 text-gray-900">
                                Paid 
                                </div>
                            </div>
                        </div>
                      </div>
                      <div>
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                            />
                        </svg>
                      </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- pagination -->
        <div>
          <div
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
          </div>
        </div>
      </div>

    </template>

  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { GET_FIVE_BOOKINGS } from '@/graphql/queries';
import { GET_DASHBOARD_STATS} from '@/graphql/queries';
import moment from 'moment'


export default {
  name: "Dashboard",
  metaInfo: {
    title: 'Dashboard'
  },
  components: {
    DashboardLayout
  },
  data(){
    return{
      currentTable: 'bookings',
      paymentsTable:'',
      bookingsTable:'',
    }
  },
  apollo: {
    bookings: {
      query: GET_FIVE_BOOKINGS
    },
    unpaid_bookings: {
      query: GET_DASHBOARD_STATS
    },
    paid_bookings: {
      query: GET_DASHBOARD_STATS
    },
    rooms: {
      query: GET_DASHBOARD_STATS
    },
  },
  methods:{
    changeView(viewName){
      this.currentTable = viewName;
    }
  },
  computed:{
    bookingDate(){
      return moment(this.bookings.created_at).format("MMMM DD YYYY")
    }
  }
};
</script>
