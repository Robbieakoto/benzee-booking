<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link :to="{name: 'Home'}">
                <img class="w-24" src="@/assets/images/logo.png" alt="Workflow logo" />
              </router-link>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline">
                <router-link
                  :to="{name: 'dashboard'}"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  active-class="text-white bg-gray-900"
                >Dashboard</router-link>
                <router-link
                  :to="{name: 'bookings-list'}"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  active-class="text-white bg-gray-900"
                >Bookings</router-link>
                <router-link
                  :to="{name: 'room-list'}"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  active-class="text-white bg-gray-900"
                >Rooms</router-link>
                <router-link
                  :to="{name: 'residents'}"
                   class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  active-class="text-white bg-gray-900"
                >Residents</router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">

              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button
                    class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    @click="displayProfileDropdown()"
                  >
                    <img
                      class="h-8 w-8 rounded-full"
                      src="data:image/jpeg;base64,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"
                      alt
                    />
                  </button>
                </div>
                <!--
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                <div
                  v-if="showProfileDropdown"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                  <div
                    class="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <router-link
                     :to="{name: 'settings'}"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >Settings</router-link>
                    <router-link
                      :to="{name: 'logout'}"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >Sign out</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:text-white"
              @click="displayProfileOnPhone()"

            >
              <!--Menu icon -->
              <svg class="block h-6 w-6" stroke="currentColor" viewBox="0 0 20 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  v-if="!showProfileOnPhone"
                />
              </svg>
              <!--Close icon -->
              <svg class="block h-6" stroke="currentColor" viewBox="0 0 20 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                  v-if="showProfileOnPhone"
                />
              </svg>
            </button>
          </div>
        
        </div>
      </div>

    </nav>
      <div v-if="showProfileOnPhone" class="min-h-screen fixed h-full z-40 bg-white w-full">
        <div class="h-full">
          <nav class="bg-white px-6 pt-6 text-base">
            <div class="mb-10">
              <router-link 
                :to="{name: 'dashboard'}" 
                class="flex items-center py-1 hover:text-gray-900 font-medium text-gray-600">
                <span class="ml-3">Dashboard</span>
              </router-link>
              <router-link :to="{name: 'bookings-list'}" class="mt-3 lg:mt-1 flex items-center py-1 hover:text-gray-900 font-medium text-gray-900">
                <span class="ml-3">Booking</span>
              </router-link>
              <router-link :to="{name: 'room-list'}" data-external="" class="mt-3 lg:mt-1 flex items-center py-1 hover:text-gray-900 font-medium text-gray-600">
                <span class="ml-3">Rooms</span>
              </router-link>
              <router-link :to="{name: 'residents'}" data-external="" class="mt-3 lg:mt-1 flex items-center py-1 hover:text-gray-900 font-medium text-gray-600">
                <span class="ml-3">Residents</span>
              </router-link>
            </div>
            <div class="mb-8">
              <h5 class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">Other</h5>
                <ul>
                  <li class="mb-3 lg:mb-1">
                  <router-link :to="{name: 'settings'}" class="mt-3 px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span class="relative">Settings</span>
                  </router-link>
                  <router-link :to="{name: 'logout'}" class="mt-3 px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span class="relative">Sign out</span>
                  </router-link>
                </li>         
              </ul>
          </div>
          </nav>
        </div>
      </div>

    <header class="bg-white shadow">
      <slot name="header"></slot>
    </header>
    <main class="bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <slot name="content"></slot>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: "DashboardLayout",
  data: () => ({
    showProfileDropdown: false,
    showProfileOnPhone: false
  }),

  methods: {
    displayProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    displayProfileOnPhone(){
      this.showProfileOnPhone = !this.showProfileOnPhone;
    }
  }
};
</script>