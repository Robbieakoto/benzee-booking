<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Settings</h1>  
      </div>
    </template>

    <template v-slot:content>
      <div class="flex items-center justify-center py-10 px-4 lg:px-8">
          <div class="bg-white rounded-lg overflow-hidden shadow transform sm:max-w-lg sm:w-full transition duration-150 ease-in-out" aria-labelledby="modal-headline">
              <div class="px-10 py-8 sm:pb-10">
                <flip-input-with-label
                class="mt-2 flex-shrink w-full inline-block relative"
                label-name="Current Password"
                input-type="password"
                input-name="password"
                :required="true"
                ></flip-input-with-label>
                <flip-input-with-label
                class="mt-6 flex-shrink w-full inline-block relative"
                label-name="New Password"
                input-type="password"
                input-name="new_password"
                :required="true"
                ></flip-input-with-label>
                <flip-button label="Update Password" class="mb-5 mt-5">
                    <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </flip-button>

                <div class="mt-6">
                  <flip-select-input-with-label
                    class="flex-shrink w-full inline-block relative"
                    label-name="Academic Year"
                    input-name="academic_year"
                    option-title="Choose an acdemic year"
                    :required="true"
                    ></flip-select-input-with-label>
                    <span class="mt-5 flex w-full rounded-md shadow-sm">
                        <button type="button" class="w-full flex justify-center py-3 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out">
                        Save Academic Year
                        </button>
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
import FlipSelectInputWithLabel from "../components/SelectInputWithLabel";
import FlipInputWithLabel from "../components/InputWithLabel";
import FlipButton from "../components/Button";

export default {
  name: "RoomList",
  components: {
    DashboardLayout,
    FlipSelectInputWithLabel,
    FlipInputWithLabel,
    FlipButton
  }
};
</script>