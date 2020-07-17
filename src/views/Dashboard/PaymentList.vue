<template>
    <dashboard>
        <template v-slot:dashboardContent>
          <div>
            <ul>
              <li>
                <router-link
                  :to="{name: 'booking-details'}"
                  class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div
                            class="text-sm leading-5 font-medium text-indigo-600 truncate"
                          >Richard Osei</div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <span class="truncate">Foundation - Lancaster University</span>
                          </div>
                        </div>
                        <div class="hidden md:block">
                            <div class="text-sm leading-5 text-gray-900 flex items-center">
                              Paid on
                              <time datetime="2020-01-07">January 7, 2020</time>
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
              <li class="border-t border-gray-200">
                <router-link
                  :to="{name: 'booking-details'}"
                  class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div
                            class="text-sm leading-5 font-medium text-indigo-600 truncate"
                          >Joshua Addai</div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <span class="truncate">1st Year - Knutsford University College</span>
                          </div>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <div class="text-sm leading-5 text-gray-900">
                              Submitted on
                              <time datetime="2020-01-07">January 7, 2020</time>
                            </div>
                            <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <svg
                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                                />
                              </svg>
                              Awaiting Room Assignment
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
              <li class="border-t border-gray-200">
                <router-link
                  :to="{name: 'booking-details'}"
                  class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="min-w-0 flex-1 flex items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <div
                            class="text-sm leading-5 font-medium text-indigo-600 truncate"
                          >Ricardo Cooper</div>
                          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                            <span class="truncate">2nd Year - Lancaster University</span>
                          </div>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <div class="text-sm leading-5 text-gray-900">
                              Submitted on
                              <time datetime="2020-01-07">January 7, 2020</time>
                            </div>
                            <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                              <svg
                                class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              Completed
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
        </template>
    </dashboard>
</template>

<script>
import Dashboard from "../Dashboard";

export default {
  name: "PaymentList",
  components: {
    Dashboard
  }
};
</script>