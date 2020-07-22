<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Resident Details</h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          </div>
      </div>
    </template>

    <template v-slot:content>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Resident Details
          </h3>
        </div>
        <div>
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
               {{residents.name}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Email
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                baffour@gmail.com
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Telephone
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                0548797248
            </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Nationality
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                Ghana
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Instiuition
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                Lancaster University
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Level
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                100
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Room Type
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                Double Room
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm leading-5 font-medium text-gray-500">
                Duration
              </dt>
              <dd class="mt-1 text-sm leading-5 font-medium text-gray-900 sm:mt-0 sm:col-span-2">
                12 months
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
import { GET_RESIDENTS } from '@/graphql/queries'


export default {
  name: "RoomList",
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