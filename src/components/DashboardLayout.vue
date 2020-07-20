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
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                      :to="{name: 'profile'}"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >Your Profile</router-link>
                    <router-link
                     :to="{name: 'settings'}"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >Settings</router-link>
                    <router-link
                      :to="{name: 'login'}"
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
              <router-link :to="{name: 'dashboard'}" class="flex items-center py-1 hover:text-gray-900 font-medium text-gray-600">
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
              <h5 class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">Profile</h5>
                <ul>
                  <li class="mb-3 lg:mb-1">
                  <router-link :to="{name: 'profile'}" class="px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span class="relative">Your Profile</span>
                  </router-link>
                  <router-link :to="{name: 'settings'}" class="mt-3 px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span class="relative">Settings</span>
                  </router-link>
                  <router-link :to="{name: 'login'}" class="mt-3 px-2 -mx-2 py-1 transition duration-200 ease-in-out relative block hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium">
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